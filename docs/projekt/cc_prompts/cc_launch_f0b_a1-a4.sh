#!/bin/bash
# cc_launch_f0b_a1-a4.sh — Launcher fuer F0b CC-Handoff A1-A4
# Aufruf: vom Terminal auf dem Host (macOS), nicht aus Cowork-Sandbox.
# Pfad:   /Users/paulad/weitergehts.online/weitergehts-online/docs/projekt/cc_prompts/cc_launch_f0b_a1-a4.sh
#
# Live-Stream-Output + Log-Datei parallel:
#   docs/projekt/cc_responses/cc_stream_f0b_a1-a4.log
#
# CC selbst schreibt am Ende:
#   docs/projekt/cc_responses/response_f0b_a1-a4.json
#
# Stop-Kriterium: CC beendet sich nach Response-Schreiben automatisch.

set -e

REPO_ROOT="/Users/paulad/weitergehts.online/weitergehts-online"
GENERATOR_DIR="/Users/paulad/escape-game-generator"
PROMPT_FILE="${REPO_ROOT}/docs/projekt/cc_prompts/cc_prompt_f0b_a1-a4.txt"
RESPONSE_DIR="${REPO_ROOT}/docs/projekt/cc_responses"
LOG_FILE="${RESPONSE_DIR}/cc_stream_f0b_a1-a4.log"

mkdir -p "${RESPONSE_DIR}"

echo "[cc_launch_f0b_a1-a4] Starte CC-Headless fuer F0b A1-A4"
echo "[cc_launch_f0b_a1-a4] Prompt:      ${PROMPT_FILE}"
echo "[cc_launch_f0b_a1-a4] Primary-Dir: ${REPO_ROOT}"
echo "[cc_launch_f0b_a1-a4] Add-Dir:     ${GENERATOR_DIR}"
echo "[cc_launch_f0b_a1-a4] Log:         ${LOG_FILE}"

cd "${REPO_ROOT}"

# Prompt via STDIN — vermeidet haengenden Parser bei grossen Multi-Line-Prompts via argv.
# cc-launch.sh macht Pre-Flight-Check + exec claude "$@". stdin wird an exec vererbt.
./tools/cc-launch.sh \
  -p \
  --output-format stream-json \
  --verbose \
  --dangerously-skip-permissions \
  --add-dir "${GENERATOR_DIR}" \
  < "${PROMPT_FILE}" 2>&1 | tee "${LOG_FILE}"

echo "[cc_launch_f0b_a1-a4] CC-Lauf beendet. Response erwartet unter:"
echo "[cc_launch_f0b_a1-a4]   ${RESPONSE_DIR}/response_f0b_a1-a4.json"
