"""Interactive demo of Grouper (https://github.com/mosdef-hub/Grouper).

Three tabs, each backed by the real Grouper C++/Python library:

  1. Enumerate  — exhaustive, symmetry-aware enumeration of a chemical space.
  2. Sample     — random non-isomorphic molecules from a group set.
  3. Fragment   — SMILES -> group graph using a group-contribution library.

Every result can be downloaded (CSV / SDF / JSON).
"""

from __future__ import annotations

import html
import io
import json
import os
import re
import tempfile
import time
from itertools import cycle

import gradio as gr
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import networkx as nx  # noqa: E402
import pandas as pd  # noqa: E402
from PIL import Image  # noqa: E402
from rdkit import Chem, RDLogger  # noqa: E402
from rdkit.Chem import AllChem  # noqa: E402
from rdkit.Chem.Draw import rdMolDraw2D  # noqa: E402

import Grouper  # noqa: E402
from Grouper import Group, estimate_vcolg_lines, exhaustive_generate  # noqa: E402
from Grouper import random_generate  # noqa: E402
from Grouper.fragmentation import fragment  # noqa: E402
from Grouper.libraries.Libraries import Joback, SaftGammaMie, Unifac  # noqa: E402

# `random_sample` (direct construction, scales to larger graphs) only exists
# on newer Grouper builds; fall back to vcolg-backed `random_generate`.
random_sample = getattr(Grouper, "random_sample", None)
RDLogger.DisableLog("rdApp.*")  # generated ring systems are noisy

# ---------------------------------------------------------------------------
# Limits — the demo runs on a small CPU instance, so keep every request bounded.
# ---------------------------------------------------------------------------
MAX_ENUM_NODES = 6
MAX_VCOLG_LINES = 250_000
MAX_SAMPLE_NODES = 12 if random_sample else MAX_ENUM_NODES
MAX_SAMPLES = 200
MAX_GROUPS = 8
GRID_MOLS = 48
SDF_MAX = 20_000
MAX_SMILES_CHARS = 300
MAX_FRAG_ATOMS = 60
MAX_EXHAUSTIVE_FRAG_ATOMS = 30  # exhaustive matching grows combinatorially
MAX_CUSTOM_CHARS = 2_000
MAX_CUSTOM_GROUP_ATOMS = 30
TMP_DIR = os.path.join(tempfile.gettempdir(), "grouper-demo")
TMP_MAX_AGE_S = 30 * 60  # /tmp is RAM on Cloud Run, so don't let it grow
NUM_PROCS = int(os.environ.get("GROUPER_PROCS", "2"))

LIBRARIES = {
    "UNIFAC": Unifac,
    "Joback": Joback,
    "SAFT-γ Mie": SaftGammaMie,
}
_library_cache: dict = {}

PALETTE = [
    "#4C78A8", "#F58518", "#54A24B", "#E45756", "#72B7B2",
    "#EECA3B", "#B279A2", "#FF9DA6", "#9D755D", "#BAB0AC",
]

# key -> (group name, description, SMILES pattern, hubs). Hubs are atom
# indices that can bond out; repeating an index gives that atom several ports.
GROUP_PRESETS = {
    "C": ("C", "sp3 carbon", "C", [0, 0, 0, 0]),
    "O": ("O", "ether oxygen", "O", [0, 0]),
    "N": ("N", "amine nitrogen", "N", [0, 0, 0]),
    "CH3": ("CH3", "methyl", "C", [0]),
    "OH": ("OH", "hydroxyl", "O", [0]),
    "NH2": ("NH2", "amino", "N", [0]),
    "C=O": ("C=O", "carbonyl", "C=O", [0, 0]),
    "COOH": ("COOH", "carboxylic acid", "C(=O)O", [0]),
    "F": ("F", "fluoro", "F", [0]),
    "Cl": ("Cl", "chloro", "Cl", [0]),
    "Ph": ("Ph", "phenyl", "c1ccccc1", [0]),
    "C6H4": ("C6H4", "para-phenylene", "c1ccccc1", [0, 3]),
}
GROUP_CHOICES = [(f"{name} · {desc}", key) for key, (name, desc, _, _) in GROUP_PRESETS.items()]

# One-click starting points for the enumerate tab: (label, groups, size).
ENUM_PRESETS = [
    ("Simple organics", ["C", "O", "N"], 4),
    ("Alcohols & acids", ["C", "OH", "C=O", "COOH"], 4),
    ("Halocarbons", ["C", "F", "Cl"], 5),
    ("Aromatic linkers", ["C6H4", "O", "C=O", "CH3"], 4),
]

FRAG_EXAMPLES = [
    ("Ibuprofen", "CC(C)Cc1ccc(cc1)C(C)C(=O)O", "UNIFAC"),
    ("Aspirin", "CC(=O)Oc1ccccc1C(=O)O", "UNIFAC"),
    ("Caffeine", "Cn1cnc2c1c(=O)n(C)c(=O)n2C", "Joback"),
    ("Triethylamine", "CCN(CC)CC", "Joback"),
    ("Ethyl acetate", "CC(=O)OCC", "SAFT-γ Mie"),
    ("Diethyl ether", "CCOCC", "SAFT-γ Mie"),
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _library(name):
    if name not in _library_cache:
        _library_cache[name] = LIBRARIES[name]()
    return _library_cache[name]


def _purge_old_tmpfiles():
    cutoff = time.time() - TMP_MAX_AGE_S
    try:
        for entry in os.scandir(TMP_DIR):
            try:
                if entry.is_file() and entry.stat().st_mtime < cutoff:
                    os.remove(entry.path)
            except OSError:
                pass
    except FileNotFoundError:
        pass


def _tmpfile(suffix):
    os.makedirs(TMP_DIR, exist_ok=True)
    _purge_old_tmpfiles()
    fd, path = tempfile.mkstemp(suffix=suffix, prefix="grouper_", dir=TMP_DIR)
    os.close(fd)
    return path


def _err(msg):
    """gr.Error renders HTML, so escape anything that echoes user input."""
    return gr.Error(html.escape(str(msg)))


def _group_graph_to_dict(gg, atom_map=None):
    nodes = []
    for nid in sorted(gg.nodes):
        g = gg.nodes[nid]
        node = {
            "id": int(nid),
            "type": g.type,
            "pattern": g.pattern,
            "hubs": list(g.hubs),
            "ports": list(g.ports),
        }
        if atom_map is not None and nid < len(atom_map):
            node["atoms"] = list(atom_map[nid])
        nodes.append(node)
    edges = [
        {
            "src": int(s), "src_port": int(sp),
            "dst": int(d), "dst_port": int(dp),
            "order": float(o),
        }
        for (s, sp, d, dp, o) in sorted(gg.edges)
    ]
    return {"smiles": gg.to_smiles(), "nodes": nodes, "edges": edges}


def _responsive_svg(svg, max_width):
    """Make a fixed-size SVG scale with its container."""
    svg = re.sub(r"<\?xml[^>]*\?>", "", svg)
    svg = re.sub(r"<!DOCTYPE[^>]*>", "", svg)
    return re.sub(
        r"width=['\"][\d.]+(px|pt)?['\"]\s+height=['\"][\d.]+(px|pt)?['\"]",
        f"width='100%' style='max-width:{max_width}px;height:auto'",
        svg, count=1,
    )


def _svg_highlight(mol, atom_groups, colors, size=(520, 380)):
    """Draw `mol` with each group's atoms (and intra-group bonds) tinted."""
    from matplotlib.colors import to_rgb

    atom_cols, bond_cols, radii = {}, {}, {}
    for atoms, hexcol in zip(atom_groups, colors):
        rgb = to_rgb(hexcol)
        aset = set(atoms)
        for a in atoms:
            atom_cols[a] = rgb
            radii[a] = 0.45
        for b in mol.GetBonds():
            if b.GetBeginAtomIdx() in aset and b.GetEndAtomIdx() in aset:
                bond_cols[b.GetIdx()] = rgb
    d = rdMolDraw2D.MolDraw2DSVG(*size)
    opts = d.drawOptions()
    opts.clearBackground = False
    opts.bondLineWidth = 2
    rdMolDraw2D.PrepareAndDrawMolecule(
        d, mol,
        highlightAtoms=list(atom_cols), highlightAtomColors=atom_cols,
        highlightBonds=list(bond_cols), highlightBondColors=bond_cols,
        highlightAtomRadii=radii,
    )
    d.FinishDrawing()
    return d.GetDrawingText()


def _group_graph_svg(gg, colors_by_type):
    """Port-graph view: groups as nodes, inter-group bonds as edges."""
    G = nx.Graph()
    for nid in gg.nodes:
        G.add_node(nid)
    for s, sp, d, dp, o in gg.edges:
        G.add_edge(s, d)
    fig, ax = plt.subplots(figsize=(5.6, 4.2))
    # spring_layout is numpy-only (kamada_kawai would pull in scipy).
    pos = nx.spring_layout(G, seed=7, iterations=300,
                           k=1.6 / max(len(G), 1) ** 0.5)
    big = len(G) > 8
    nx.draw_networkx_edges(G, pos, ax=ax, width=2.2, edge_color="#9aa0a6")
    nx.draw_networkx_nodes(
        G, pos, ax=ax, node_size=900 if big else 1700,
        node_color=[colors_by_type[gg.nodes[n].type] for n in G],
        edgecolors="#ffffff", linewidths=2,
    )
    nx.draw_networkx_labels(
        G, pos, ax=ax, font_size=7 if big else 9, font_weight="bold", font_color="#111",
        labels={n: gg.nodes[n].type for n in G},
    )
    ax.set_axis_off()
    ax.margins(0.18)
    fig.tight_layout()
    buf = io.StringIO()
    fig.savefig(buf, format="svg", transparent=True)
    plt.close(fig)
    return buf.getvalue()


def _mol_image(smiles, size=(280, 210)):
    m = Chem.MolFromSmiles(smiles)
    if m is None:
        return None
    d = rdMolDraw2D.MolDraw2DCairo(*size)
    o = d.drawOptions()
    o.bondLineWidth = 2
    o.padding = 0.15
    o.fixedBondLength = 34  # keeps small molecules from being blown up
    rdMolDraw2D.PrepareAndDrawMolecule(d, m)
    d.FinishDrawing()
    return Image.open(io.BytesIO(d.GetDrawingText())).convert("RGB")


def _gallery(smiles_list):
    items = []
    for s in smiles_list[:GRID_MOLS]:
        img = _mol_image(s)
        if img is not None:
            items.append((img, s))
    return items


def _stat_cards(cards, note=""):
    """cards: [(value, label), ...] rendered as a row of summary tiles."""
    tiles = "".join(
        f'<div class="stat"><div class="stat-v">{v}</div>'
        f'<div class="stat-l">{label}</div></div>'
        for v, label in cards
    )
    note_html = f'<p class="stat-note">{note}</p>' if note else ""
    return f'<div class="stats">{tiles}</div>{note_html}'


def _message(title, body):
    return f'<div class="msg"><strong>{title}</strong><p>{body}</p></div>'


def _write_sdf(rows, path):
    """2D SDF (fast and deterministic; 3D embedding is left to the user)."""
    w = Chem.SDWriter(path)
    n = 0
    for row in rows[:SDF_MAX]:
        m = Chem.MolFromSmiles(row["smiles"])
        if m is None:
            continue
        AllChem.Compute2DCoords(m)
        m.SetProp("_Name", row["smiles"])
        for k, v in row.items():
            m.SetProp(k, str(v))
        w.write(m)
        n += 1
    w.close()
    return n


def _parse_groups(selected, custom_text):
    """Build a Group set from preset chips + 'name | pattern | hubs' lines."""
    groups, names = [], []
    if len(custom_text or "") > MAX_CUSTOM_CHARS:
        raise _err(f"Custom groups are limited to {MAX_CUSTOM_CHARS:,} characters.")
    for key in selected or []:
        if key not in GROUP_PRESETS:
            raise _err(f"Unknown building block: {key}")
        name, _, pattern, hubs = GROUP_PRESETS[key]
        groups.append(Group(name, pattern, hubs))
        names.append(name)
    for i, line in enumerate((custom_text or "").splitlines(), 1):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = [p.strip() for p in line.split("|")]
        if len(parts) != 3:
            raise _err(
                f"Custom group line {i} should look like 'name | SMILES | hubs', "
                f"e.g. 'ester | C(=O)O | 0 2'."
            )
        name, pattern, hubs_s = parts
        if not name or len(name) > 24:
            raise _err(f"Custom group line {i}: names must be 1-24 characters.")
        mol = Chem.MolFromSmiles(pattern) if len(pattern) <= MAX_SMILES_CHARS else None
        if mol is None:
            raise _err(f"Custom group '{name}': '{pattern[:60]}' is not valid SMILES.")
        if mol.GetNumAtoms() > MAX_CUSTOM_GROUP_ATOMS:
            raise _err(
                f"Custom group '{name}' is too large for the demo "
                f"(max {MAX_CUSTOM_GROUP_ATOMS} atoms)."
            )
        try:
            hubs = [int(h) for h in hubs_s.replace(",", " ").split()]
        except ValueError:
            raise _err(f"Custom group '{name}': hubs must be integers, e.g. '0 0 1'.")
        n_atoms = mol.GetNumAtoms()
        if not hubs or len(hubs) > 12 or any(h < 0 or h >= n_atoms for h in hubs):
            raise _err(
                f"Custom group '{name}': give 1-12 hubs, each an atom index "
                f"0..{n_atoms - 1}."
            )
        if name in names:
            raise _err(f"Group name '{name}' is used twice.")
        groups.append(Group(name, pattern, hubs))
        names.append(name)
    if not groups:
        raise gr.Error("Pick at least one group.")
    if len(groups) > MAX_GROUPS:
        raise gr.Error(f"Use at most {MAX_GROUPS} groups in the demo.")
    return set(groups)


def _results_outputs(gset, prefix, cards, note):
    rows = []
    for g in gset:
        smi = g.to_smiles()
        mol = Chem.MolFromSmiles(smi)
        rows.append({
            "smiles": smi,
            "n_groups": len(g.nodes),
            "group_counts": ", ".join(
                f"{t}×{c}" for t, c in sorted(
                    pd.Series([g.nodes[n].type for n in g.nodes]).value_counts().items()
                )
            ),
            "heavy_atoms": mol.GetNumHeavyAtoms() if mol else None,
            "rings": mol.GetRingInfo().NumRings() if mol else None,
            "_gg": g,
        })
    # Chain-like molecules first: they read best as a first impression,
    # while strained cages (also valid graphs) sink to the end.
    rows.sort(key=lambda r: (r["rings"] or 0, r["heavy_atoms"] or 0, r["smiles"]))
    plain = [{k: v for k, v in r.items() if k != "_gg"} for r in rows]

    df = pd.DataFrame(plain)
    csv_path = _tmpfile(f"_{prefix}.csv")
    df.to_csv(csv_path, index=False)

    sdf_path = _tmpfile(f"_{prefix}.sdf")
    _write_sdf(plain, sdf_path)

    json_path = _tmpfile(f"_{prefix}.json")
    with open(json_path, "w") as f:
        json.dump([_group_graph_to_dict(r["_gg"]) for r in rows], f, indent=1)

    gallery = _gallery([r["smiles"] for r in rows])
    if len(rows) > GRID_MOLS:
        note += (f" Showing {GRID_MOLS}, fewest rings first; the downloads "
                 f"contain all {len(rows):,}.")
    return (
        _stat_cards(cards, note.strip()), gallery, df.head(2000),
        gr.update(value=csv_path, visible=True),
        gr.update(value=sdf_path, visible=True),
        gr.update(value=json_path, visible=True),
    )


def _size_estimate(selected, custom, n_nodes, cap=True):
    """One-line feasibility hint shown under the enumerate controls."""
    try:
        groups = _parse_groups(selected, custom)
    except gr.Error as e:
        # Messages are already escaped (see _err).
        return f'<p class="hint warn">{e.message}</p>'
    est = estimate_vcolg_lines(int(n_nodes), len(groups))
    if not cap or est <= MAX_VCOLG_LINES:
        return (f'<p class="hint ok">≈ {est:,} graph skeletons to expand · '
                "fits in the demo</p>")
    return (f'<p class="hint warn">≈ {est:,} graph skeletons, above the demo\'s '
            f"{MAX_VCOLG_LINES:,} limit. Use fewer groups or a smaller size.</p>")


# ---------------------------------------------------------------------------
# Tab handlers
# ---------------------------------------------------------------------------
def run_fragment(smiles, library_name, mode):
    smiles = (smiles or "").strip()
    if not smiles:
        raise gr.Error("Enter a SMILES string.")
    if len(smiles) > MAX_SMILES_CHARS:
        raise _err(f"SMILES is limited to {MAX_SMILES_CHARS} characters in the demo.")
    if library_name not in LIBRARIES or mode not in ("ideal", "exhaustive"):
        raise gr.Error("Unknown library or matching mode.")
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise _err(f"RDKit could not parse '{smiles}' as SMILES.")
    if mol.GetNumHeavyAtoms() > MAX_FRAG_ATOMS:
        raise _err(f"Please keep the demo to molecules with ≤ {MAX_FRAG_ATOMS} heavy atoms.")
    if mode == "exhaustive" and mol.GetNumHeavyAtoms() > MAX_EXHAUSTIVE_FRAG_ATOMS:
        raise _err(
            f"Exhaustive matching is limited to {MAX_EXHAUSTIVE_FRAG_ATOMS} heavy "
            "atoms in the demo; use ideal matching for larger molecules."
        )

    lib = _library(library_name)
    nodes = list(lib.get_groups())
    t0 = time.perf_counter()
    try:
        # The ideal matcher reports which atoms each group claims (used for
        # colouring). Exhaustive matching is C++-side and returns bare graphs,
        # so it only contributes the alternative fragmentations.
        results = fragment(
            smiles, nodes, returnHandler="ideal", returnMatchStates=True
        )
        all_graphs = (
            fragment(smiles, nodes, returnHandler="exhaustive")
            if mode == "exhaustive" else [g for g, _ in results]
        )
    except Exception as e:  # GrouperParseException, ValueError, ...
        raise _err(f"Fragmentation failed: {e}")
    dt = time.perf_counter() - t0

    safe_smiles = html.escape(smiles)
    if not results:
        msg = _message(
            "No complete fragmentation",
            f"{library_name} has no combination of its {lib.n_groups} groups that "
            f"covers every atom of <code>{safe_smiles}</code>. Try another library: "
            "each was built for a different family of molecules.",
        )
        hide = gr.update(visible=False)
        return msg, "", None, hide, hide, hide

    gg, state = results[0]
    atom_map = state.all_group_indices
    types = [gg.nodes[n].type for n in sorted(gg.nodes)]
    color_iter = cycle(PALETTE)
    colors_by_type = {}
    for t in types:
        if t not in colors_by_type:
            colors_by_type[t] = next(color_iter)
    node_colors = [colors_by_type[gg.nodes[n].type] for n in sorted(gg.nodes)]

    mol_svg = _svg_highlight(mol, atom_map, node_colors)
    graph_svg = _group_graph_svg(gg, colors_by_type)
    counts = pd.Series(types).value_counts()
    legend = "".join(
        f'<span class="legend-item"><span class="swatch" style="background:{c}"></span>'
        f'{html.escape(t)}<span class="legend-n">×{counts[t]}</span></span>'
        for t, c in colors_by_type.items()
    )
    view = (
        '<div class="frag-view">'
        f'<figure class="panel"><figcaption>Molecule, coloured by group</figcaption>'
        f'{_responsive_svg(mol_svg, 520)}</figure>'
        f'<figure class="panel"><figcaption>Group graph</figcaption>'
        f'{_responsive_svg(graph_svg, 480)}</figure>'
        f'</div><div class="legend">{legend}</div>'
    )

    table = pd.DataFrame([
        {
            "node": n,
            "group": gg.nodes[n].type,
            "SMARTS": gg.nodes[n].pattern,
            "atoms": ", ".join(str(a) for a in atom_map[n]) if n < len(atom_map) else "",
            "ports": len(gg.nodes[n].ports),
        }
        for n in sorted(gg.nodes)
    ])

    n_alt = len(all_graphs)
    stats = _stat_cards(
        [
            (len(gg.nodes), "groups"),
            (len(gg.edges), "inter-group bonds"),
            (n_alt, "complete fragmentations"),
            (f"{dt * 1000:.0f} ms", "runtime"),
        ],
        f"<code>{safe_smiles}</code> fragmented with {library_name} "
        f"({mode} matching)."
        + (" Showing the fragmentation with the fewest groups." if n_alt > 1 else ""),
    )

    payload = {
        "input_smiles": smiles,
        "library": library_name,
        "mode": mode,
        "grouper_version": getattr(Grouper, "__version__", "unknown"),
        "best": _group_graph_to_dict(gg, atom_map),
        "fragmentations": [_group_graph_to_dict(g) for g in all_graphs],
    }
    json_path = _tmpfile("_fragmentation.json")
    with open(json_path, "w") as f:
        json.dump(payload, f, indent=1)
    csv_path = _tmpfile("_groups.csv")
    table.to_csv(csv_path, index=False)
    svg_path = _tmpfile("_molecule.svg")
    with open(svg_path, "w") as f:
        f.write(mol_svg)

    return (
        stats, view, table,
        gr.update(value=json_path, visible=True),
        gr.update(value=csv_path, visible=True),
        gr.update(value=svg_path, visible=True),
    )


def run_enumerate(selected, custom, n_nodes):
    groups = _parse_groups(selected, custom)
    n_nodes = int(n_nodes)
    if not 1 <= n_nodes <= MAX_ENUM_NODES:
        raise gr.Error(f"Groups per molecule must be 1-{MAX_ENUM_NODES}.")
    est = estimate_vcolg_lines(n_nodes, len(groups))
    if est > MAX_VCOLG_LINES:
        raise gr.Error(
            f"That space needs ~{est:,} coloured graphs to be screened, above this "
            f"demo's {MAX_VCOLG_LINES:,} limit. Use fewer groups or a smaller size "
            "(or run Grouper locally, where there's no cap)."
        )
    t0 = time.perf_counter()
    try:
        result = exhaustive_generate(
            n_nodes, groups, num_procs=NUM_PROCS, max_vcolg_lines=MAX_VCOLG_LINES
        )
    except Exception as e:
        raise _err(f"Enumeration failed: {e}")
    dt = time.perf_counter() - t0

    cards = [
        (f"{len(result):,}", "unique molecules"),
        (n_nodes, "groups per molecule"),
        (len(groups), "building blocks"),
        (f"{dt:.2f} s", "runtime"),
    ]
    names = ", ".join(sorted(html.escape(g.type) for g in groups))
    note = (
        f"Every distinct molecule built from exactly {n_nodes} of {{{names}}}, "
        "each generated once: nauty enumerates the non-isomorphic graph "
        "skeletons and Grouper uses their symmetry to skip port assignments that "
        "would reproduce a molecule it has already found."
    )
    return _results_outputs(result, f"enumerate_n{n_nodes}", cards, note)


def run_sample(selected, custom, n_nodes, n_samples, seed):
    groups = _parse_groups(selected, custom)
    n_nodes, n_samples, seed = int(n_nodes), int(n_samples), int(seed or 0)
    if not 2 <= n_nodes <= MAX_SAMPLE_NODES or not 1 <= n_samples <= MAX_SAMPLES:
        raise gr.Error(
            f"Use 2-{MAX_SAMPLE_NODES} groups per molecule and "
            f"1-{MAX_SAMPLES} molecules."
        )
    t0 = time.perf_counter()
    try:
        if random_sample is not None:
            result = random_sample(
                n_nodes, groups, n_samples, NUM_PROCS,
                seed=seed, show_progress=False,
            )
            method = "random_sample (direct construction)"
        else:
            est = estimate_vcolg_lines(n_nodes, len(groups))
            if est > MAX_VCOLG_LINES:
                raise gr.Error(
                    "This space is too large for the demo's sampler; use fewer "
                    "groups or a smaller size."
                )
            result = random_generate(
                n_nodes, groups, n_samples, NUM_PROCS,
                max_vcolg_lines=MAX_VCOLG_LINES,
            )
            method = "random_generate (uniform over orbits)"
    except gr.Error:
        raise
    except Exception as e:
        raise _err(f"Sampling failed: {e}")
    dt = time.perf_counter() - t0
    if len(result) > n_samples:
        result = Grouper.GroupGraphSet(list(result)[:n_samples])

    cards = [
        (f"{len(result):,}", "distinct molecules"),
        (n_nodes, "groups per molecule"),
        (len(groups), "building blocks"),
        (f"{dt:.2f} s", "runtime"),
    ]
    note = f"Sampled with {method}."
    if random_sample is not None:
        note += f" Seed {seed}."
    if len(result) < n_samples:
        note += (f" Only {len(result)} of the {n_samples} requested exist or "
                 "could be found; the space may be smaller than that.")
    return _results_outputs(result, f"sample_n{n_nodes}", cards, note)


# ---------------------------------------------------------------------------
# UI
# ---------------------------------------------------------------------------
INTRO = """
<div class="hero">
  <h1>Grouper</h1>
  <p>Grouper represents molecules as <em>graphs of functional groups</em> joined
  through labelled ports, and uses graph symmetry so that every molecule is
  generated exactly once.</p>
  <p class="hero-links">
    <a href="https://www.nature.com/articles/s41524-026-02263-y" target="_blank" rel="noopener">Paper (npj Computational Materials)</a>
    <span>·</span>
    <a href="https://github.com/mosdef-hub/Grouper" target="_blank" rel="noopener">Source code</a>
  </p>
</div>
"""

CUSTOM_HELP = (
    "One group per line: name | SMILES | hubs. Hubs are the atom indices that "
    "can bond to other groups; repeat an index to give an atom several bonds."
)

INK = "#111111"
SOFT = "#e3e5e8"
MUTED = "#5f646b"

theme = gr.themes.Base(
    primary_hue=gr.themes.colors.neutral,
    neutral_hue=gr.themes.colors.gray,
    radius_size=gr.themes.sizes.radius_md,
    font=[gr.themes.GoogleFont("Open Sans"), "ui-sans-serif", "system-ui", "sans-serif"],
).set(
    body_text_color=INK,
    body_text_color_subdued=MUTED,
    color_accent=INK,
    color_accent_soft="#f2f3f5",
    loader_color=INK,
    slider_color=INK,
    link_text_color=INK,
    link_text_color_hover="#444",
    link_text_color_visited=INK,
    # panels
    block_border_width="1px",
    block_border_color=SOFT,
    block_shadow="none",
    block_radius="12px",
    block_label_background_fill="transparent",
    block_label_border_width="0px",
    block_label_text_color=MUTED,
    block_title_text_weight="600",
    block_title_text_color=INK,
    # inputs
    input_background_fill="#f7f8f9",
    input_background_fill_focus="#ffffff",
    input_border_color=SOFT,
    input_border_color_focus=INK,
    input_shadow="none",
    input_shadow_focus=f"0 0 0 3px rgba(17,17,17,.08)",
    input_radius="10px",
    # buttons
    button_border_width="1px",
    button_transition="all .15s ease",
    button_transform_hover="translateY(-1px)",
    button_transform_active="translateY(0)",
    button_large_radius="10px",
    button_large_padding="12px 22px",
    button_large_text_weight="600",
    button_medium_radius="10px",
    button_small_radius="999px",
    button_small_padding="6px 14px",
    button_small_text_weight="600",
    button_primary_background_fill=INK,
    button_primary_background_fill_hover="#2b2b2b",
    button_primary_border_color=INK,
    button_primary_border_color_hover="#2b2b2b",
    button_primary_text_color="#ffffff",
    button_primary_text_color_hover="#ffffff",
    button_primary_shadow="0 1px 2px rgba(0,0,0,.12)",
    button_primary_shadow_hover="0 6px 16px rgba(0,0,0,.18)",
    button_primary_shadow_active="0 1px 2px rgba(0,0,0,.12)",
    button_secondary_background_fill="#ffffff",
    button_secondary_background_fill_hover="#ffffff",
    button_secondary_border_color=SOFT,
    button_secondary_border_color_hover=INK,
    button_secondary_text_color=INK,
    button_secondary_text_color_hover=INK,
    button_secondary_shadow="none",
    button_secondary_shadow_hover="0 4px 12px rgba(0,0,0,.08)",
    # chips (checkbox groups and radios)
    checkbox_label_background_fill="#ffffff",
    checkbox_label_background_fill_hover="#f7f8f9",
    checkbox_label_background_fill_selected=INK,
    checkbox_label_border_color=SOFT,
    checkbox_label_border_color_hover="#b9bec4",
    checkbox_label_border_color_selected=INK,
    checkbox_label_border_width="1px",
    checkbox_label_text_color=INK,
    checkbox_label_text_color_selected="#ffffff",
    checkbox_label_shadow="none",
    checkbox_label_padding="7px 14px",
    checkbox_label_gap="8px",
    checkbox_label_text_weight="500",
    # tables
    table_border_color=SOFT,
    table_even_background_fill="#fafafb",
    table_odd_background_fill="#ffffff",
    table_radius="10px",
)

CSS = """
.gradio-container { max-width: 1180px !important; margin: 0 auto !important; }
.gradio-container h1, .gradio-container h2, .gradio-container h3,
.stat-v, .tab-lede strong { font-family: 'Montserrat', 'Open Sans', sans-serif !important; }

/* hero (hidden when embedded in the portfolio page) */
.hero h1 { font-size: 2.1rem; margin: 6px 0 8px; letter-spacing: -.01em; }
.hero p { max-width: 760px; color: #44474d; font-size: 16px; line-height: 1.6; margin: 0 0 8px; }
.hero-links { display: flex; gap: 10px; flex-wrap: wrap; }
.hero-links a { font-weight: 600; text-underline-offset: 3px; }

/* tabs: bold labels with an ink underline */
.tabs button[role="tab"] { font-weight: 600; font-size: 15px; padding: 10px 16px; color: #6b7076; }
.tabs button[role="tab"].selected,
.tabs button[role="tab"][aria-selected="true"] { color: #111; }
.tabs button[role="tab"].selected::after,
.tabs button[role="tab"][aria-selected="true"]::after { background: #111 !important; height: 2px !important; }

.tab-lede { color: #44474d; font-size: 15px; margin: 6px 0 4px; }

/* chips: hide the native box, the whole label is the toggle */
.chips label { border-radius: 999px !important; cursor: pointer; transition: all .12s ease; }
.chips label input[type="checkbox"], .chips label input[type="radio"] {
  position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
.chips label span { margin-left: 0 !important; }
.chips label.selected span, .chips label:has(input:checked) span { color: #fff !important; }
.chips label:has(input:checked) { background: #111 !important; border-color: #111 !important; }

/* segmented control for small radios */
.segmented .wrap { display: inline-flex !important; gap: 0 !important; border: 1px solid #e3e5e8;
  border-radius: 10px; padding: 3px; background: #f7f8f9; width: fit-content; }
.segmented label { border: 0 !important; border-radius: 8px !important; background: transparent !important;
  box-shadow: none !important; padding: 6px 16px !important; }
.segmented label:has(input:checked) { background: #111 !important; }

/* preset + download buttons: outlined pills */
.presets button.secondary, .downloads button.secondary {
  border: 1px solid #d5d8dc !important; background: #fff !important; color: #111 !important;
  border-radius: 999px !important; padding: 6px 14px !important; font-size: 13px !important;
  font-weight: 600 !important; box-shadow: none !important; }
.presets button.secondary:hover, .downloads button.secondary:hover {
  border-color: #111 !important; box-shadow: 0 4px 12px rgba(0,0,0,.08) !important; }
.downloads button.secondary { background: #f7f8f9 !important; }

.presets { gap: 8px !important; flex-wrap: wrap !important; align-items: center; }
.presets > * { flex: 0 0 auto !important; min-width: 0 !important; width: auto !important; }
.presets-label { font-size: 13px; font-weight: 600; color: #5f646b; margin: 2px 0 6px; }

/* summary tiles */
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
.stat { border: 1px solid #e3e5e8; border-radius: 12px; padding: 12px 14px; background: #fff; }
.stat-v { font-size: 24px; font-weight: 700; color: #111; line-height: 1.15; }
.stat-l { font-size: 11.5px; text-transform: uppercase; letter-spacing: .06em; color: #6b7076; margin-top: 4px; }
.stat-note { color: #44474d; font-size: 14px; line-height: 1.55; margin: 12px 2px 0; }
.stat-note code, .msg code { background: #f2f3f5; border-radius: 4px; padding: 1px 5px; font-size: 13px; }

.msg { border: 1px solid #f0c9a8; background: #fff8f2; border-radius: 12px; padding: 14px 16px; }
.msg p { margin: 4px 0 0; color: #44474d; }

.hint { font-size: 13px; margin: 2px 2px 0; }
.hint.ok { color: #2f7d32; }
.hint.warn { color: #b3261e; }

/* fragment view */
.frag-view { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; margin-top: 4px; }
.frag-view .panel { margin: 0; border: 1px solid #e3e5e8; border-radius: 12px; padding: 10px 12px; background: #fff;
  display: flex; flex-direction: column; align-items: center; }
.frag-view figcaption { align-self: flex-start; font-size: 12px; font-weight: 600; color: #6b7076;
  text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px; }
.legend { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.legend-item { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; padding: 4px 10px;
  border: 1px solid #e3e5e8; border-radius: 999px; background: #fff; }
.swatch { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
.legend-n { color: #6b7076; }

/* downloads */
.downloads { gap: 8px !important; flex-wrap: wrap !important; }
.downloads > * { flex: 0 0 auto !important; min-width: 0 !important; width: auto !important; }

/* gallery: square cards, not pills */
.mol-gallery .thumbnail-item, .mol-gallery .thumbnail-item img,
.mol-gallery .thumbnail-lg, .mol-gallery .thumbnail-small { border-radius: 10px !important; }
.mol-gallery .thumbnail-item { border: 1px solid #eceef0 !important; box-shadow: none !important; }
.mol-gallery .grid-container {
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important; }
.mol-gallery .caption-label { font-family: ui-monospace, Menlo, monospace; font-size: 11px; }

.run-btn { margin-top: 4px; }
footer { display: none !important; }
@media (max-width: 520px) {
  .gradio-container { padding-left: 12px !important; padding-right: 12px !important; }
  .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stat-v { font-size: 20px; }
}
"""

HEAD = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700'
    '&display=swap" rel="stylesheet">'
)


def _group_picker(default):
    picker = gr.CheckboxGroup(
        choices=GROUP_CHOICES, value=default, label="Building blocks",
        elem_classes=["chips"],
    )
    with gr.Accordion("Define your own groups", open=False):
        custom = gr.Textbox(
            lines=3, show_label=False, info=CUSTOM_HELP,
            placeholder="ester | C(=O)O | 0 2",
        )
    return picker, custom


def _results_block(empty_label):
    stats = gr.HTML()
    gallery = gr.Gallery(
        label=empty_label, show_label=False, columns=4, height="auto",
        object_fit="contain", allow_preview=True, elem_classes=["mol-gallery"],
    )
    with gr.Row(elem_classes=["downloads"]):
        csv_btn = gr.DownloadButton("⤓ CSV", visible=False, size="md", variant="secondary")
        sdf_btn = gr.DownloadButton("⤓ SDF", visible=False, size="md", variant="secondary")
        json_btn = gr.DownloadButton("⤓ Grouper JSON", visible=False, size="md", variant="secondary")
    with gr.Accordion("All results as a table", open=False):
        table = gr.Dataframe(show_label=False, wrap=True, max_height=360)
    return stats, gallery, table, csv_btn, sdf_btn, json_btn


with gr.Blocks(title="Grouper demo", analytics_enabled=False,
               delete_cache=(600, 1800)) as demo:
    intro = gr.HTML(INTRO)

    with gr.Tabs(selected="enumerate"):
        # -------------------------------------------------------------- enumerate
        with gr.Tab("Enumerate", id="enumerate"):
            gr.HTML(
                '<p class="tab-lede">Pick building blocks and a size. Grouper '
                "returns <strong>every</strong> distinct molecule made from exactly "
                "that many groups, each one exactly once.</p>"
            )
            with gr.Row(equal_height=False):
                with gr.Column(scale=2, min_width=260):
                    gr.HTML('<p class="presets-label">Start from</p>')
                    with gr.Row(elem_classes=["presets"]):
                        e_preset_btns = [
                            gr.Button(label, size="sm", variant="secondary")
                            for label, _, _ in ENUM_PRESETS
                        ]
                    e_groups, e_custom = _group_picker(["C", "O", "N"])
                    e_n = gr.Slider(1, MAX_ENUM_NODES, value=4, step=1,
                                    label="Groups per molecule")
                    e_hint = gr.HTML(_size_estimate(["C", "O", "N"], "", 4))
                    e_btn = gr.Button("Enumerate molecules", variant="primary",
                                      size="lg", elem_classes=["run-btn"])
                with gr.Column(scale=3, min_width=260):
                    e_out = _results_block("Enumerated molecules")

        # -------------------------------------------------------------- sample
        with gr.Tab("Sample", id="sample"):
            gr.HTML(
                '<p class="tab-lede">When a space is too big to enumerate, draw '
                "distinct (non-isomorphic) molecules from it at random.</p>"
            )
            with gr.Row(equal_height=False):
                with gr.Column(scale=2, min_width=260):
                    s_groups, s_custom = _group_picker(["C", "CH3", "OH", "C=O"])
                    # Without random_sample the fallback shares enumerate's
                    # size cap, so start at a size that fits.
                    s_n = gr.Slider(2, MAX_SAMPLE_NODES,
                                    value=6 if random_sample else 5,
                                    step=1, label="Groups per molecule")
                    s_hint = gr.HTML(
                        _size_estimate(["C", "CH3", "OH", "C=O"], "",
                                       6 if random_sample else 5,
                                       cap=random_sample is None)
                    )
                    s_k = gr.Slider(1, MAX_SAMPLES, value=24, step=1,
                                    label="Number of molecules")
                    s_seed = gr.Number(value=42, precision=0, label="Random seed",
                                       visible=random_sample is not None)
                    s_btn = gr.Button("Sample molecules", variant="primary",
                                      size="lg", elem_classes=["run-btn"])
                with gr.Column(scale=3, min_width=260):
                    s_out = _results_block("Sampled molecules")

        # -------------------------------------------------------------- fragment
        with gr.Tab("Fragment", id="fragment"):
            gr.HTML(
                '<p class="tab-lede">Break a molecule into the functional groups '
                "of a group-contribution library. Atoms are coloured by the group "
                "that claims them.</p>"
            )
            with gr.Row(equal_height=False):
                with gr.Column(scale=2, min_width=260):
                    gr.HTML('<p class="presets-label">Try a molecule</p>')
                    with gr.Row(elem_classes=["presets"]):
                        f_example_btns = [
                            gr.Button(name, size="sm", variant="secondary")
                            for name, _, _ in FRAG_EXAMPLES
                        ]
                    f_smiles = gr.Textbox(label="SMILES", value=FRAG_EXAMPLES[0][1])
                    f_lib = gr.Radio(list(LIBRARIES), value=FRAG_EXAMPLES[0][2],
                                     label="Group library", elem_classes=["chips"])
                    f_mode = gr.Radio(
                        ["ideal", "exhaustive"], value="ideal", label="Matching",
                        info="Exhaustive also finds symmetry-equivalent matches (slower).",
                        elem_classes=["segmented", "chips"],
                    )
                    f_btn = gr.Button("Fragment molecule", variant="primary",
                                      size="lg", elem_classes=["run-btn"])
                with gr.Column(scale=3, min_width=260):
                    f_stats = gr.HTML()
                    f_view = gr.HTML()
                    with gr.Row(elem_classes=["downloads"]):
                        f_json = gr.DownloadButton("⤓ Grouper JSON", visible=False,
                                                   size="md", variant="secondary")
                        f_csv = gr.DownloadButton("⤓ CSV", visible=False,
                                                  size="md", variant="secondary")
                        f_svg = gr.DownloadButton("⤓ SVG", visible=False,
                                                  size="md", variant="secondary")
                    with gr.Accordion("Group table", open=False):
                        f_table = gr.Dataframe(show_label=False)

    # ------------------------------------------------------------------ wiring
    e_inputs = [e_groups, e_custom, e_n]
    s_inputs = [s_groups, s_custom, s_n, s_k, s_seed]
    f_inputs = [f_smiles, f_lib, f_mode]
    f_outputs = [f_stats, f_view, f_table, f_json, f_csv, f_svg]

    e_btn.click(run_enumerate, e_inputs, list(e_out), concurrency_limit=1)
    for comp in (e_groups, e_custom, e_n):
        comp.change(_size_estimate, e_inputs, e_hint, show_progress="hidden",
                    queue=False)
    for btn, (_, keys, size) in zip(e_preset_btns, ENUM_PRESETS):
        btn.click(
            lambda k=keys, n=size: (k, "", n), None, e_inputs, queue=False,
        ).then(run_enumerate, e_inputs, list(e_out), concurrency_limit=1)

    s_btn.click(run_sample, s_inputs, list(s_out), concurrency_limit=1)
    for comp in (s_groups, s_custom, s_n):
        comp.change(
            lambda g, c, n: _size_estimate(g, c, n, cap=random_sample is None),
            [s_groups, s_custom, s_n], s_hint, show_progress="hidden", queue=False,
        )

    f_btn.click(run_fragment, f_inputs, f_outputs, concurrency_limit=2)
    f_smiles.submit(run_fragment, f_inputs, f_outputs, concurrency_limit=2)
    for btn, (_, smi, lib) in zip(f_example_btns, FRAG_EXAMPLES):
        btn.click(
            lambda s=smi, l=lib: (s, l), None, [f_smiles, f_lib], queue=False,
        ).then(run_fragment, f_inputs, f_outputs, concurrency_limit=2)

    # Pre-fill every tab so visitors land on results, not empty panels.
    demo.load(run_enumerate, e_inputs, list(e_out))
    demo.load(run_sample, s_inputs, list(s_out))
    demo.load(run_fragment, f_inputs, f_outputs)

    # The portfolio page (/grouper-demo) embeds this app with ?embed=1 and
    # supplies its own intro, so hide ours there.
    def _hide_intro_when_embedded(request: gr.Request):
        embedded = request is not None and request.query_params.get("embed") == "1"
        return gr.update(visible=not embedded)

    demo.load(_hide_intro_when_embedded, None, intro, queue=False)


if __name__ == "__main__":
    # Serve through uvicorn rather than demo.launch(): launch() probes its own
    # localhost URL and aborts if that probe is slow, which happens on Cloud
    # Run cold starts.
    import uvicorn
    from fastapi import FastAPI

    demo.queue(default_concurrency_limit=2, max_size=32)
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "7860"))
    app = gr.mount_gradio_app(
        FastAPI(), demo, path="/", server_name=host, server_port=port,
        theme=theme, css=CSS, head=HEAD, ssr_mode=False, footer_links=[],
    )
    uvicorn.run(app, host=host, port=port, proxy_headers=True,
                forwarded_allow_ips="*")
