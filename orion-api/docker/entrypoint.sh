#!/bin/sh
# Dev/local only: migrate -> seed demo users -> initial sync (non blocking) -> runserver.
set -e

python manage.py migrate --noinput
python manage.py seed_demo_users

# Initial sync only when no complaint exists; a failure must not stop the API.
if python manage.py shell -c "import sys; from apps.complaints.models import Complaint; sys.exit(1 if Complaint.objects.exists() else 0)"; then
  python manage.py sync_job || echo "WARNING: initial sync failed (mock unavailable?), continuing."
fi

exec python manage.py runserver 0.0.0.0:8000
