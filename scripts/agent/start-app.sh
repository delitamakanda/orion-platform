#!/usr/bin/env bash
# Démarre la plateforme pour les agents (MCP Playwright) en arrière-plan :
#   - mock-system-api (json-server) sur :3001, lancé depuis une COPIE
#     (json-server --watch réécrit db.json : ces écritures ne doivent pas finir
#     dans le commit) ;
#   - orion-api (Django, SQLite locale, fournisseur IA `mock`) sur :8000,
#     migrée, avec un compte de test par rôle et les plaintes synchronisées
#     depuis le mock (`manage.py sync_job`) ;
#   - orion-web (ng serve, configuration de dev) sur :4200.
# Attend que les trois répondent. Logs dans .agent-out/*.log.
#
# Identifiants : .agent-out/test-user.md (mot de passe aléatoire propre au run,
# à ne jamais recopier dans la PR).
#
# Prérequis : pip install -r orion-api/requirement-dev.txt,
#             npm ci --prefix orion-web, npm ci --prefix mock-system-api.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/../.."
root="$PWD"

PYTHON="${PYTHON:-python}"
command -v "$PYTHON" >/dev/null 2>&1 || PYTHON=python3

export SECRET_KEY="${SECRET_KEY:-agent-ci-insecure-key}"
export DEBUG="${DEBUG:-True}"
export ALLOWED_HOSTS="${ALLOWED_HOSTS:-localhost,127.0.0.1}"
export CORS_ALLOWED_ORIGINS="${CORS_ALLOWED_ORIGINS:-http://localhost:4200}"
export PRIORITIZATION_PROVIDER="${PRIORITIZATION_PROVIDER:-mock}"
export EXTERNAL_COMPLAINTS_SYSTEM_API_BASE_URL="${EXTERNAL_COMPLAINTS_SYSTEM_API_BASE_URL:-http://localhost:3001/api/v1}"

out="$root/.agent-out"
mkdir -p "$out/playwright"

# 1. Système externe simulé
rm -rf "$out/mock-system-api"
cp -R mock-system-api "$out/mock-system-api"
(cd "$out/mock-system-api" && nohup npx json-server --watch db.json --host 127.0.0.1 --port 3001 --routes routes.json \
  > "$out/mock-api.log" 2>&1 < /dev/null &)
timeout 60 bash -c 'until curl -s -o /dev/null http://localhost:3001/; do sleep 1; done'

# 2. API Django
cd orion-api
"$PYTHON" manage.py migrate --noinput > "$out/migrate.log" 2>&1

password="${AGENT_TEST_PASSWORD:-$(openssl rand -hex 12)}"
AGENT_TEST_PASSWORD="$password" "$PYTHON" manage.py shell -c "
import os
from django.contrib.auth import get_user_model
User = get_user_model()
for role in ('agent', 'magistrat', 'procureur', 'administrateur'):
    u, _ = User.objects.get_or_create(
        email=f'{role}@orion.test',
        defaults={'username': f'test-{role}', 'first_name': 'Test', 'last_name': role.capitalize(), 'role': role},
    )
    u.role = role
    u.is_staff = role == 'administrateur'
    u.set_password(os.environ['AGENT_TEST_PASSWORD'])
    u.save()
"

"$PYTHON" manage.py sync_job > "$out/sync.log" 2>&1 \
  || echo "::warning::sync_job a échoué (voir .agent-out/sync.log) : la liste des plaintes sera vide"

nohup "$PYTHON" manage.py runserver 8000 > "$out/api.log" 2>&1 < /dev/null &
cd "$root"

cat > "$out/test-user.md" <<EOF
# Comptes de test (plateforme locale uniquement)

- Page de connexion : http://localhost:4200/login
- Mot de passe (identique pour tous) : $password
- Un compte par rôle :
  - agent@orion.test (agent)
  - magistrat@orion.test (magistrat)
  - procureur@orion.test (procureur)
  - administrateur@orion.test (administrateur)
EOF

# 3. Frontend
(cd orion-web && nohup npx ng serve --port 4200 > "$out/ng-serve.log" 2>&1 < /dev/null &)

if ! timeout "${START_TIMEOUT:-300}" bash -c \
  'until curl -s -o /dev/null http://localhost:8000/admin/login/ && curl -sf http://localhost:4200/ >/dev/null; do sleep 3; done'; then
  echo "::error::la plateforme n'a pas démarré à temps"
  tail -n 50 "$out/mock-api.log" "$out/api.log" "$out/ng-serve.log"
  exit 1
fi
echo "Plateforme prête : http://localhost:4200 (API : http://localhost:8000/api/v1, mock : http://localhost:3001/api/v1, comptes dans .agent-out/test-user.md)"
