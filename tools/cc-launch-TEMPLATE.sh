#!/bin/bash
# cc-launch-TEMPLATE.sh — Kanonisches Launcher-Template fuer CC-Handoffs (v2, post-F0b.2b)
#
# Zweck: Standard-Geruest fuer alle neuen cc_launch_*.sh-Skripte im Repo.
# Bindet Prevent-First-Gate (cc-launch-preflight.sh) + Auth-Pre-Flight (cc-launch.sh)
# strukturell in jeden Launcher ein. Verhindert F0b.2b-Klasse-Fehler (Nested-Pfad-ENOENT,
# argv-Hang, Prompt-Oversize).
#
# Verwendung:
#   1. Kopie erstellen: cp tools/cc-launch-TEMPLATE.sh docs/projekt/cc_prompts/cc_launch_<taskid>.sh
#   2. LAUNCHER_LABEL, TASK_ID, PROMPT_FILE, RESPONSE_DIR, LOG_FILE, REPO_ROOT, ADD_DIRS anpassen.
#   3. chmod +x docs/projekt/cc_prompts/cc_launch_<taskid>.sh
#   4. Vom Host ausfuehren (NICHT aus Cowork-Sandbox): cd <REPO_ROOT> && bash <pfad>.sh
#
# Ableitung:
#   - CC_COWORK_INTEROP_LEARNINGS.md §1 (Auth-Pfad), §1.1 (Launcher-Kanon v2), §1.2 (Host-Dual-Root),
#     §1.3 (v1->v2-Incident F0b.2b), §2 (Background-Launch-Pattern)
#   - tools/cc-launch-preflight.sh (strukturelle Gates)
#   - tools/cc-launch.sh (Auth-Pre-Flight + exec claude)
#
# Aktiviert durch: F0b.2b-Incident (2026-04-19) — v1-Run ENOENT + kevent64-Hang.

set -e

# =========================================================================
# KONFIGURATION — diese Sektion bei Kopie anpassen.
# =========================================================================

# Eindeutiges Label fuer Logs/Report (z.B. "F0b-A1-A4", "v3-12-E2E", "F0b-A3-1").
LAUNCHER_LABEL="TASKID-REPLACE_ME"

# Task-ID fuer File-Naming (untergeordnet, kleinbuchstabig, Bindestrich-separiert).
TASK_ID="taskid-replace-me"

# Primary-Repo am Host (absoluter Pfad, NICHT Sandbox-Pfad).
# VORSICHT: Host-Dual-Root ist /Users/paulad/{escape-game-generator, weitergehts.online/weitergehts-online}
# — diese sind SIBLINGS, nicht nested. Siehe §1.2.
REPO_ROOT="/Users/paulad/weitergehts.online/weitergehts-online"

# Zusaetzliche Verzeichnisse (space-separiert, absolut). Leer lassen wenn keine.
# Beispiel: "/Users/paulad/escape-game-generator"
ADD_DIRS=""

# Prompt-Datei (absolut am Host). Pflicht, muss existieren + lesbar.
PROMPT_FILE="${REPO_ROOT}/docs/projekt/cc_prompts/cc_prompt_${TASK_ID}.txt"

# Response-Verzeichnis + Log-Datei.
RESPONSE_DIR="${REPO_ROOT}/docs/projekt/cc_responses"
LOG_FILE="${RESPONSE_DIR}/cc_stream_${TASK_ID}.log"

# Prompt-Groessen-Hardlimit (bytes). Default 32768 (32 KB) — ueber cc-launch-preflight.sh Gate 1.
# Hoeherer Wert nur nach dokumentierter Risk-Acceptance (argv-Hang-Risiko auf Bun-runtime).
export CC_MAX_PROMPT_BYTES="${CC_MAX_PROMPT_BYTES:-32768}"

# =========================================================================
# AB HIER KEINE AENDERUNGEN NOETIG — Template-Kern.
# =========================================================================

mkdir -p "${RESPONSE_DIR}"

echo "[${LAUNCHER_LABEL}] Launcher-Start"
echo "[${LAUNCHER_LABEL}] Repo:        ${REPO_ROOT}"
echo "[${LAUNCHER_LABEL}] Add-Dirs:    ${ADD_DIRS:-<none>}"
echo "[${LAUNCHER_LABEL}] Prompt:      ${PROMPT_FILE}"
echo "[${LAUNCHER_LABEL}] Log:         ${LOG_FILE}"

cd "${REPO_ROOT}"

# --- Prevent-First-Gate: strukturelle Vorpruefung ---
# Exportiert Env-Vars, die tools/cc-launch-preflight.sh konsumiert.
# Bricht mit Exit 2 ab, wenn ein Gate ROT ist (Pfad-ENOENT, Prompt-Oversize,
# Host-Dual-Root-Nested-Pfad-Hit etc.). Siehe §1.1 + §1.2.
export CC_PROMPT_FILE="${PROMPT_FILE}"
export CC_PRIMARY_DIR="${REPO_ROOT}"
export CC_ADDITIONAL_DIRS="${ADD_DIRS}"

./tools/cc-launch-preflight.sh "${LAUNCHER_LABEL}" || exit $?

# --- Exec: CC via cc-launch.sh (Auth-Pre-Flight) + stdin-pipe (argv-Hang-Vermeidung) ---
# Pattern: cc-launch.sh macht Auth-Check (MAX-OK vs. AUTH-BROKEN), dann exec claude "$@".
# stdin wird an exec vererbt; Prompt kommt NICHT als argv sondern via stdin (Bun-runtime
# hat kevent64-Hang bei grossen argv-Prompts — siehe §1.3).
#
# --add-dir wird dynamisch zusammengebaut: ein Flag-Paar je Eintrag in ADD_DIRS.

ADD_DIR_ARGS=()
if [[ -n "${ADD_DIRS}" ]]; then
    for DIR in ${ADD_DIRS}; do
        ADD_DIR_ARGS+=(--add-dir "${DIR}")
    done
fi

./tools/cc-launch.sh \
    -p \
    --output-format stream-json \
    --verbose \
    --dangerously-skip-permissions \
    "${ADD_DIR_ARGS[@]}" \
    < "${PROMPT_FILE}" 2>&1 | tee "${LOG_FILE}"

echo "[${LAUNCHER_LABEL}] CC-Lauf beendet."
echo "[${LAUNCHER_LABEL}] Response erwartet unter: ${RESPONSE_DIR}/response_${TASK_ID}.json"
echo "[${LAUNCHER_LABEL}] Log-Stream:               ${LOG_FILE}"
