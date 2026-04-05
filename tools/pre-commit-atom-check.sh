#!/usr/bin/env bash
#
# pre-commit-atom-check.sh — Phase IV Wave 0
#
# Prueft die ATOM-UNIT-Checks aus VERTRAG_ATOM_UNITS.md Abschnitt 4 sowie
# die Policy-Guards aus POLICY_TRIGGER_SICHTBARKEIT.md.
#
# Aktivierung (NICHT automatisch durch diesen Commit — User entscheidet):
#   git config core.hooksPath tools/git-hooks
# oder
#   ln -s ../../tools/pre-commit-atom-check.sh .git/hooks/pre-commit
#
set -e

CHANGED=$(git diff --cached --name-only || true)
if [ -z "$CHANGED" ]; then
  exit 0
fi

FAIL=0

# ---------------------------------------------------------------------------
# Check C1 — AU-2 Feedback-Schema-Atom:
# Wenn der Vertrag geaendert wird, MUSS auch die Engine im selben Commit sein.
# ---------------------------------------------------------------------------
if echo "$CHANGED" | grep -q "VERTRAG_FEEDBACK_SCHEMA.md"; then
  if ! echo "$CHANGED" | grep -q "assets/js/escape-engine.js"; then
    echo "ATOM-UNIT VERLETZT (AU-2): VERTRAG_FEEDBACK_SCHEMA.md geaendert, aber assets/js/escape-engine.js nicht im Commit."
    FAIL=1
  fi
fi

# ---------------------------------------------------------------------------
# Check C2 — AU-Registry-Atom:
# Wenn VERTRAG_ATOM_UNITS.md oder die Renderer-Registry geaendert wird,
# muss der Engine-Code mitgeliefert sein.
# ---------------------------------------------------------------------------
if echo "$CHANGED" | grep -q "VERTRAG_ATOM_UNITS.md"; then
  if ! echo "$CHANGED" | grep -q "assets/js/escape-engine.js"; then
    echo "ATOM-UNIT HINWEIS: VERTRAG_ATOM_UNITS.md geaendert ohne Engine-Aenderung — ok, wenn nur Dokumentation betroffen ist."
  fi
fi

# ---------------------------------------------------------------------------
# Grep-Guard — Trigger-Warnungen und lehrkraft_meta duerfen nicht in
# Schueler-HTML landen (Policy K2).
# ---------------------------------------------------------------------------
LEAK=$(git diff --cached --unified=0 -- 'escape-games/*/mappe-*.html' 'escape-games/*/index.html' 2>/dev/null | grep -E '^\+.*(trigger_warnung|lehrkraft_meta)' || true)
if [ -n "$LEAK" ]; then
  echo "POLICY K2 VERLETZT: Lehrkraft-Metadaten in Schueler-HTML:"
  echo "$LEAK"
  FAIL=1
fi

# ---------------------------------------------------------------------------
# Grep-Guard — keine Wikimedia-Hotlinks in data.json oder Mappe-HTML.
# ---------------------------------------------------------------------------
HOTLINK=$(git diff --cached --unified=0 -- 'escape-games/*/data.json' 'escape-games/*/*.html' 2>/dev/null | grep -E '^\+.*(upload\.wikimedia\.org|commons\.wikimedia\.org)' || true)
if [ -n "$HOTLINK" ]; then
  echo "POLICY D1 VERLETZT: Wikimedia-Hotlink in Schueler-Artefakt (data.json oder HTML):"
  echo "$HOTLINK"
  FAIL=1
fi

# ---------------------------------------------------------------------------
# Validator-Runs (nur wenn passende Runtimes vorhanden).
# ---------------------------------------------------------------------------
if command -v node >/dev/null 2>&1 && [ -f tools/validate-feedback-schema.js ]; then
  node tools/validate-feedback-schema.js || FAIL=1
fi

if command -v python3 >/dev/null 2>&1 && [ -f tools/validate-no-lehrkraft-meta.py ]; then
  python3 tools/validate-no-lehrkraft-meta.py || FAIL=1
fi

if [ "$FAIL" -ne 0 ]; then
  echo ""
  echo "Pre-Commit abgebrochen. Bitte die Verletzungen oben beheben."
  exit 1
fi

exit 0
