#!/usr/bin/env bash
# Prettier sur les seuls fichiers d'orion-web modifiés par rapport à la branche
# de base (config Prettier dans orion-web/package.json). orion-web n'est pas
# encore entièrement formaté : on ne bloque l'agent que sur ce qu'il a touché.
# orion-api n'a pas de formateur Python configuré pour l'instant.
#
# Usage : bash scripts/agent/format-changed.sh [--check|--write]   (défaut : --check)
# Env   : BASE_REF (défaut : origin/main)
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/../.."

mode="${1:---check}"
base="${BASE_REF:-origin/main}"

mapfile -t files < <(
  {
    git diff --name-only --diff-filter=ACMR "$base" -- orion-web 2>/dev/null || true
    git ls-files --others --exclude-standard -- orion-web
  } | sort -u | grep -E '\.(ts|html|scss|css|json|md|mjs|js)$' \
    | grep -v '^orion-web/package-lock\.json$' | sed 's#^orion-web/##' || true
)

if [ "${#files[@]}" -eq 0 ]; then
  echo "Aucun fichier orion-web modifié à vérifier."
  exit 0
fi

cd orion-web
npx prettier "$mode" --ignore-unknown "${files[@]}"
