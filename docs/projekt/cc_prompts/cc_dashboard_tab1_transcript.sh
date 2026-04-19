#!/bin/bash
# cc_dashboard_tab1_transcript.sh — Live-Transcript-Viewer fuer F0b A1-A4 CC-Run
# Findet das NEUESTE jsonl-Transcript dynamisch (nach Start des Haupt-Runs)
# und tailed darauf. Filtert auf tool_use / text / tool_result.

set -u

PROJECT_DIR="${HOME}/.claude/projects/-Users-paulad-weitergehts-online-weitergehts-online"

echo "[dashboard:tab1] Live-Transcript-Viewer (dynamisch)"
echo "[dashboard:tab1] Project-Dir: ${PROJECT_DIR}"
echo "[dashboard:tab1] Warte auf neuesten Transcript-File (>=10 KB, wachsen muss)..."

# Baseline: was existiert jetzt (Pre-Flight + alte Files)
BASELINE=$(ls -1 "${PROJECT_DIR}"/*.jsonl 2>/dev/null | sort)

# Warten auf neuen File ODER bestehenden File der waechst
while true; do
    CANDIDATE=$(ls -t "${PROJECT_DIR}"/*.jsonl 2>/dev/null | head -1)
    if [[ -n "${CANDIDATE}" ]]; then
        SIZE=$(wc -c < "${CANDIDATE}" | tr -d ' ')
        if [[ ${SIZE} -gt 10000 ]]; then
            echo "[dashboard:tab1] Gefunden: ${CANDIDATE}  (${SIZE} bytes)"
            break
        fi
    fi
    sleep 2
done

TRANSCRIPT_FILE="${CANDIDATE}"
echo "[dashboard:tab1] Tail-Source: ${TRANSCRIPT_FILE}"
echo "[dashboard:tab1] Filter: tool_use (Tool+Input-Preview) + text (Assistant-Prose) + tool_result"
echo "[dashboard:tab1] -------------------------------------------------------------"

tail -n 0 -F "${TRANSCRIPT_FILE}" | while IFS= read -r LINE; do
    echo "${LINE}" | jq -r '
      if .type == "assistant" then
        (.message.content // [])[] |
        if .type == "tool_use" then
          "[TOOL] " + .name + "  " + ((.input // {}) | tostring | .[0:200])
        elif .type == "text" then
          "[TEXT] " + (.text | .[0:400])
        else empty end
      elif .type == "user" then
        (.message.content // [])[] |
        if .type == "tool_result" then
          "[RES ] " + ((.content // "" | tostring) | .[0:200])
        else empty end
      else empty end
    ' 2>/dev/null
done
