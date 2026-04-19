#!/bin/bash
# cc_dashboard_tab3_watcher.sh — Completion-Watcher + Post-Run-Audit fuer F0b A1-A4
# Wartet auf response_f0b_a1-a4.json und triggert anschliessend cc-session-audit.py.

set -u

REPO_ROOT="/Users/paulad/weitergehts.online/weitergehts-online"
RESPONSE_FILE="${REPO_ROOT}/docs/projekt/cc_responses/response_f0b_a1-a4.json"
STREAM_LOG="${REPO_ROOT}/docs/projekt/cc_responses/cc_stream_f0b_a1-a4.log"
AUDIT_SCRIPT="${REPO_ROOT}/tools/cc-session-audit.py"

echo "[dashboard:tab3] Completion-Watcher"
echo "[dashboard:tab3] Response:  ${RESPONSE_FILE}"
echo "[dashboard:tab3] StreamLog: ${STREAM_LOG}"
echo "[dashboard:tab3] -------------------------------------------------------------"

# --- Warte auf Response-File ---
while [[ ! -f "${RESPONSE_FILE}" ]]; do
    # CC-Prozesse zaehlen (grobe Heuristik)
    CC_COUNT=$(pgrep -f "claude -p" | wc -l | tr -d ' ')
    STREAM_BYTES=0
    if [[ -f "${STREAM_LOG}" ]]; then
        STREAM_BYTES=$(wc -c < "${STREAM_LOG}" | tr -d ' ')
    fi
    printf "[dashboard:tab3] %s  CC-procs=%s  stream_bytes=%s  response=MISSING\n" \
        "$(date '+%H:%M:%S')" "${CC_COUNT}" "${STREAM_BYTES}"
    sleep 10
done

echo "[dashboard:tab3] -------------------------------------------------------------"
echo "[dashboard:tab3] RESPONSE DETECTED: ${RESPONSE_FILE}"
echo "[dashboard:tab3] Inhalt (erste 80 Zeilen):"
echo "[dashboard:tab3] -------------------------------------------------------------"
head -n 80 "${RESPONSE_FILE}"

echo ""
echo "[dashboard:tab3] -------------------------------------------------------------"
echo "[dashboard:tab3] JSON-Validierung via jq:"
if jq empty "${RESPONSE_FILE}" 2>/dev/null; then
    echo "[dashboard:tab3] JSON VALID"
    echo ""
    echo "[dashboard:tab3] Summary:"
    jq '{
      batch,
      completed_counts: (.completed | to_entries | map({(.key): (.value | length)}) | add),
      failed_count:  (.failed  // [] | length),
      skipped_count: (.skipped // [] | length),
      hash_check,
      commit_count: (.commits // [] | length)
    }' "${RESPONSE_FILE}"
else
    echo "[dashboard:tab3] JSON INVALID — manuelle Pruefung noetig"
fi

echo ""
echo "[dashboard:tab3] -------------------------------------------------------------"
if [[ -x "${AUDIT_SCRIPT}" ]]; then
    echo "[dashboard:tab3] Starte Post-Run-Audit: ${AUDIT_SCRIPT}"
    "${AUDIT_SCRIPT}" --response "${RESPONSE_FILE}" --stream "${STREAM_LOG}" || echo "[dashboard:tab3] Audit returned non-zero"
else
    echo "[dashboard:tab3] Audit-Script nicht vorhanden oder nicht ausfuehrbar — skip."
    echo "[dashboard:tab3] Erwartet: ${AUDIT_SCRIPT}"
fi

echo ""
echo "[dashboard:tab3] Watcher fertig. Fenster offen lassen zur Kontrolle."
read -r -p "[dashboard:tab3] Enter zum Schliessen..." _
