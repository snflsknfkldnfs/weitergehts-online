#!/bin/bash
# cc-launch-preflight.sh — Pfad- und Prompt-Size-Gate vor CC-Launcher-Exec.
#
# Zweck: Verhindert F0b.2b-Klasse-Fehler (Nested-Pfad-ENOENT + argv-Hang).
# Erweitert cc-launch.sh (Auth-Pre-Flight) um strukturelle Voraussetzungen.
#
# Verwendung in Launcher-Scripts VOR cc-launch.sh-Aufruf:
#   export CC_PROMPT_FILE="/path/to/prompt.txt"
#   export CC_PRIMARY_DIR="/path/to/repo"
#   export CC_ADDITIONAL_DIRS="/path/to/secondary-repo /path/to/tertiary-repo"
#   export CC_MAX_PROMPT_BYTES=32768   # optional, Default 32768
#   ./tools/cc-launch-preflight.sh "F0b-A1-A4" || exit $?
#
# Exit-Codes: 0 = PASS (alle Gates gruen), 2 = FAIL (mindestens ein Gate ROT).
#
# Ableitung: CC_COWORK_INTEROP_LEARNINGS.md §1.2 (Host-Dual-Root) + §1.3 (v1->v2-Incident).
# Aktiviert durch: F0b.2b-Incident (2026-04-19) — v1-Run ENOENT wg. falschem Nested-Pfad
# /Users/paulad/weitergehts.online/escape-game-generator (existiert nicht).

set -u

LAUNCHER_LABEL="${1:-unbenannter-Launcher}"
FAILED=0
PASSED_LINES=()

fail() {
    echo "[preflight FAIL] ${LAUNCHER_LABEL}: $1" >&2
    FAILED=1
}

pass() {
    PASSED_LINES+=("$1")
}

# --- Gate 1: CC_PROMPT_FILE ---
if [[ -z "${CC_PROMPT_FILE:-}" ]]; then
    fail "CC_PROMPT_FILE nicht gesetzt"
elif [[ ! -f "${CC_PROMPT_FILE}" ]]; then
    fail "CC_PROMPT_FILE existiert nicht: ${CC_PROMPT_FILE}"
elif [[ ! -r "${CC_PROMPT_FILE}" ]]; then
    fail "CC_PROMPT_FILE nicht lesbar: ${CC_PROMPT_FILE}"
else
    SIZE=$(wc -c < "${CC_PROMPT_FILE}" | tr -d ' ')
    MAX="${CC_MAX_PROMPT_BYTES:-32768}"
    if [[ "${SIZE}" -gt "${MAX}" ]]; then
        fail "CC_PROMPT_FILE ist ${SIZE} bytes, Hardlimit ${MAX} (argv-Hang-Risiko). Empfehlung: Prompt kuerzen oder Sub-Prompt-Splitting."
    else
        pass "Prompt: ${CC_PROMPT_FILE} (${SIZE} bytes, Limit ${MAX})"
    fi
fi

# --- Gate 2: CC_PRIMARY_DIR ---
if [[ -z "${CC_PRIMARY_DIR:-}" ]]; then
    fail "CC_PRIMARY_DIR nicht gesetzt"
elif [[ ! -d "${CC_PRIMARY_DIR}" ]]; then
    fail "CC_PRIMARY_DIR existiert nicht: ${CC_PRIMARY_DIR}"
else
    if [[ ! -d "${CC_PRIMARY_DIR}/.git" ]]; then
        echo "[preflight WARN] CC_PRIMARY_DIR ohne .git: ${CC_PRIMARY_DIR}" >&2
    fi
    pass "Primary: ${CC_PRIMARY_DIR}"
fi

# --- Gate 3: CC_ADDITIONAL_DIRS (space-separated) ---
if [[ -n "${CC_ADDITIONAL_DIRS:-}" ]]; then
    for DIR in ${CC_ADDITIONAL_DIRS}; do
        if [[ ! -d "${DIR}" ]]; then
            fail "CC_ADDITIONAL_DIRS enthaelt nicht-existierenden Pfad: ${DIR}"
        else
            pass "Add-Dir: ${DIR}"
        fi
    done
fi

# --- Gate 4: Host-Dual-Root Nested-Pfad-Detektor ---
# Kanon-Fallstrick F0b.2b: "/Users/paulad/weitergehts.online/escape-game-generator" existiert nicht.
# Dual-Root auf /Users/paulad/ ist: {escape-game-generator, weitergehts.online/weitergehts-online}.
if [[ -n "${CC_PROMPT_FILE:-}" && -f "${CC_PROMPT_FILE}" ]]; then
    NESTED_HITS=$(grep -c '/Users/paulad/weitergehts\.online/escape-game-generator' "${CC_PROMPT_FILE}" 2>/dev/null)
    NESTED_HITS=${NESTED_HITS:-0}
    if [[ "${NESTED_HITS}" -gt 0 ]]; then
        fail "Prompt enthaelt ${NESTED_HITS} Nested-Pfad(e) '/Users/paulad/weitergehts.online/escape-game-generator' — dieser Pfad existiert nicht. Korrigieren auf '/Users/paulad/escape-game-generator' (Host-Dual-Root auf /Users/paulad/-Ebene)."
    fi
fi

# --- Gate 5: cc-launch.sh existiert + ausfuehrbar (delegierter Auth-Check) ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ ! -x "${SCRIPT_DIR}/cc-launch.sh" ]]; then
    fail "cc-launch.sh nicht ausfuehrbar in ${SCRIPT_DIR} — Auth-Pre-Flight nicht verfuegbar."
else
    pass "cc-launch.sh bereit fuer Auth-Pre-Flight"
fi

# --- Report ---
if [[ "${FAILED}" -eq 0 ]]; then
    echo "[preflight PASS] ${LAUNCHER_LABEL}" >&2
    for LINE in "${PASSED_LINES[@]}"; do
        echo "  + ${LINE}" >&2
    done
    exit 0
else
    echo "[preflight FAIL] ${LAUNCHER_LABEL}: mindestens ein Gate ROT — Launcher abgebrochen. Kein CC-Start." >&2
    exit 2
fi
