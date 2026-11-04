#!/usr/bin/env bash
# Point d'entrée unique des vérifications, utilisé par l'agent, par les
# workflows agent-* et par la CI. Se lance depuis la racine du dépôt.
#
#   bash scripts/agent/run.sh check                    # manage.py check (orion-api)
#   bash scripts/agent/run.sh migrations               # aucune migration manquante
#   bash scripts/agent/run.sh makemigrations [app]     # génère les migrations
#   bash scripts/agent/run.sh test-api [label…]        # manage.py test (ex. apps.complaints)
#   bash scripts/agent/run.sh lint-web                 # ng lint (orion-web)
#   bash scripts/agent/run.sh test-web [vitest args]   # ng test --watch=false
#   bash scripts/agent/run.sh build-web                # ng build (production)
#   bash scripts/agent/run.sh all                      # tout, sauf le format
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/../.."

PYTHON="${PYTHON:-python}"
command -v "$PYTHON" >/dev/null 2>&1 || PYTHON=python3

# Valeurs par défaut sûres pour le dev et la CI (jamais de vrai fournisseur IA).
export SECRET_KEY="${SECRET_KEY:-agent-ci-insecure-key}"
export DEBUG="${DEBUG:-True}"
export ALLOWED_HOSTS="${ALLOWED_HOSTS:-localhost,127.0.0.1}"
export PRIORITIZATION_PROVIDER="${PRIORITIZATION_PROVIDER:-mock}"
export EXTERNAL_COMPLAINTS_SYSTEM_API_BASE_URL="${EXTERNAL_COMPLAINTS_SYSTEM_API_BASE_URL:-http://localhost:3001/api/v1}"

cmd="${1:-all}"
shift || true

case "$cmd" in
  check) (cd orion-api && "$PYTHON" manage.py check) ;;
  migrations) (cd orion-api && "$PYTHON" manage.py makemigrations --check --dry-run) ;;
  makemigrations) (cd orion-api && "$PYTHON" manage.py makemigrations "$@") ;;
  test-api) (cd orion-api && "$PYTHON" manage.py test "$@") ;;
  lint-web) (cd orion-web && npx ng lint) ;;
  test-web) (cd orion-web && npx ng test --watch=false "$@") ;;
  build-web) (cd orion-web && npx ng build) ;;
  all)
    bash "$0" check
    bash "$0" migrations
    bash "$0" test-api
    bash "$0" lint-web
    bash "$0" test-web
    bash "$0" build-web
    ;;
  *)
    echo "Commande inconnue : $cmd" >&2
    exit 2
    ;;
esac
