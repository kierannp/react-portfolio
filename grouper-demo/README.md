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

## Budget kill switch

Cloud Run usage normally stays inside the free tier ($0). If it ever costs
real money, the demo switches itself off:

1. A Cloud Billing budget (**$1**, this project's **Cloud Run** charges
   only) emails at 50% and 100% and publishes to the Pub/Sub topic
   `billing-kill-switch`.
2. The function in `kill-switch/` (`grouper-kill-switch`, runs as
   `grouper-kill-switch@…`, which can administer only the `grouper-demo`
   service) removes public access once cost ≥ budget. Nothing is deleted.

Billing data lags by a few hours, and `--max-instances 1` caps the worst
case at roughly $4–5/day, so any overshoot is a few dollars at most.
Container-image storage (a few cents a month) is outside the budget so it
can't trip the switch; a cleanup policy keeps only the 3 newest images.

**If it trips**, check usage in the billing console, then re-open the demo:

```sh
gcloud run services add-iam-policy-binding grouper-demo --region us-central1 \
  --project grouper-demo-0348 --member=allUsers --role=roles/run.invoker
```

Redeploy the function after editing it:

```sh
cd kill-switch && gcloud functions deploy grouper-kill-switch --gen2 \
  --runtime python312 --region us-central1 --source . --entry-point on_budget \
  --trigger-topic billing-kill-switch --project grouper-demo-0348 \
  --service-account grouper-kill-switch@grouper-demo-0348.iam.gserviceaccount.com \
  --set-env-vars TARGET_PROJECT=grouper-demo-0348,TARGET_REGION=us-central1,TARGET_SERVICE=grouper-demo \
  --max-instances 1 --memory 256Mi --retry
```
