"""Budget kill switch for the Grouper demo.

A Cloud Billing budget publishes to a Pub/Sub topic several times a day.
When the reported cost reaches the budget, this function makes the Cloud Run
service private by removing the public (allUsers) invoker binding. Nothing is
deleted; restore access with the command in grouper-demo/README.md.
"""

import base64
import json
import os

import functions_framework
import google.auth
from google.auth.transport.requests import AuthorizedSession

PROJECT = os.environ["TARGET_PROJECT"]
REGION = os.environ.get("TARGET_REGION", "us-central1")
SERVICE = os.environ.get("TARGET_SERVICE", "grouper-demo")
RESOURCE = f"projects/{PROJECT}/locations/{REGION}/services/{SERVICE}"
API = f"https://run.googleapis.com/v2/{RESOURCE}"
PUBLIC = "allUsers"
INVOKER = "roles/run.invoker"


def _session():
    creds, _ = google.auth.default(
        scopes=["https://www.googleapis.com/auth/cloud-platform"]
    )
    return AuthorizedSession(creds)


def make_private():
    """Remove allUsers from the service's invoker role. Idempotent."""
    s = _session()
    policy = s.get(f"{API}:getIamPolicy").json()
    bindings = policy.get("bindings", [])
    changed = False
    for b in bindings:
        if b.get("role") == INVOKER and PUBLIC in b.get("members", []):
            b["members"].remove(PUBLIC)
            changed = True
    if not changed:
        print(f"{SERVICE} is already private; nothing to do.")
        return False
    policy["bindings"] = [b for b in bindings if b.get("members")]
    r = s.post(f"{API}:setIamPolicy", json={"policy": policy})
    r.raise_for_status()
    print(f"KILL SWITCH: removed public access from {RESOURCE}.")
    return True


@functions_framework.cloud_event
def on_budget(cloud_event):
    data = json.loads(base64.b64decode(cloud_event.data["message"]["data"]))
    cost = float(data.get("costAmount", 0))
    budget = float(data.get("budgetAmount", 0))
    print(f"Budget '{data.get('budgetDisplayName')}': cost {cost} / budget {budget}")
    # Earlier threshold notifications (e.g. 50%) only log.
    if budget > 0 and cost >= budget:
        make_private()
