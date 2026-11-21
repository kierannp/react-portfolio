# Grouper: interactive demo

A small web app around [Grouper](https://github.com/mosdef-hub/Grouper), the
symmetry-aware functional-group graph library described in
[npj Computational Materials (2026)](https://www.nature.com/articles/s41524-026-02263-y).

| Tab | What it does | Downloads |
| --- | --- | --- |
| Fragment a molecule | SMILES → group graph using the UNIFAC, Joback or SAFT-γ Mie library, with atoms coloured by group | Grouper JSON, CSV, SVG |
| Enumerate a chemical space | Every distinct molecule built from *n* chosen groups (`exhaustive_generate`) | CSV, SDF, Grouper JSON |
| Random sampling | Distinct molecules drawn at random from a group set | CSV, SDF, Grouper JSON |

Requests are capped (≤ 6 groups per molecule for enumeration, ≤ 250k coloured
graphs, ≤ 200 samples) so the shared CPU stays responsive. Run Grouper locally
for anything bigger.

## Run locally

```sh
docker build -t grouper-demo .
docker run --rm -p 7860:7860 grouper-demo
# open http://localhost:7860
```

Or, inside an existing Grouper dev environment (nauty's `geng`/`vcolg` must be on `PATH`):

```sh
pip install gradio==6.32.0
python app.py
```

## Deploy (Google Cloud Run)

Hosted on Cloud Run in the GCP project `grouper-demo-0348`
(scales to zero, max 1 instance). Redeploy from this directory with:

```sh
gcloud run deploy grouper-demo --source . --region us-central1 \
  --project grouper-demo-0348 \
  --allow-unauthenticated --memory 2Gi --cpu 2 \
  --min-instances 0 --max-instances 1 --concurrency 20 \
  --timeout 300 --session-affinity --cpu-boost --set-env-vars GROUPER_PROCS=2 \
  --service-account grouper-demo-runtime@grouper-demo-0348.iam.gserviceaccount.com
```

The service runs as `grouper-demo-runtime`, a service account with **no**
project roles, so a compromised container can't touch the GCP project.
Inputs are size-capped and requests bounded (one instance, 5-minute timeout,
queue of 32) to keep it cheap and responsive.

The portfolio site embeds it at `/grouper-demo` (URL in `src/yourdata.js`).
