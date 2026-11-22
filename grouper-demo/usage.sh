#!/usr/bin/env bash
# Summarise Grouper demo usage from Cloud Run logs.
#   ./usage.sh          last 30 days
#   ./usage.sh 7        last 7 days
# Needs gcloud access to the project. If your default gcloud account is a
# different one, run e.g. CLOUDSDK_CORE_ACCOUNT=you@example.com ./usage.sh
set -euo pipefail

DAYS="${1:-30}"
PROJECT="${GROUPER_PROJECT:-grouper-demo-0348}"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

gcloud logging read \
  "resource.type=\"cloud_run_revision\" AND resource.labels.service_name=\"grouper-demo\" AND jsonPayload.event:*" \
  --project "$PROJECT" --freshness "${DAYS}d" --limit 100000 --format=json > "$TMP"

python3 - "$TMP" <<'PY'
import json
import sys
from collections import Counter, defaultdict

entries = json.load(open(sys.argv[1]))
views = Counter()
where = Counter()
runs = defaultdict(Counter)
status = Counter()
slowest = None
for e in entries:
    p = e.get("jsonPayload", {})
    day = e["timestamp"][:10]
    if p.get("event") == "page_view":
        views[day] += 1
        where["on your site" if p.get("embedded") else "direct"] += 1
    elif p.get("event") == "grouper_run":
        runs[day][p.get("tab")] += 1
        status[p.get("status")] += 1
        run = (p.get("seconds", 0), p.get("tab"), p.get("n_nodes"))
        slowest = max(slowest or run, run)

days = sorted(set(views) | set(runs))
if not days:
    print("No usage in this period.")
    sys.exit()

print("%-12s%7s%11s%8s%10s" % ("day", "views", "enumerate", "sample", "fragment"))
for d in days:
    r = runs[d]
    print("%-12s%7d%11d%8d%10d" % (d, views[d], r["enumerate"], r["sample"], r["fragment"]))
print()
print("page views: %d  (%s)" % (sum(views.values()),
      ", ".join("%s: %d" % kv for kv in where.items())))
print("runs: %d  (%s)" % (sum(status.values()),
      ", ".join("%s: %d" % kv for kv in status.items()) or "none"))
if slowest:
    print("slowest run: %.1fs (%s, n_nodes=%s)" % slowest)
PY
