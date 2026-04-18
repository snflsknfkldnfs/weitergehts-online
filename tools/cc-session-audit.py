#!/usr/bin/env python3
"""
cc-session-audit.py — Audit-Report-Generator fuer Claude-Code-Session-Transcripts

Usage: python3 cc-session-audit.py <session.jsonl> [--json]

Parst eine CC-Session-JSONL-Datei (aus ~/.claude/projects/<slug>/<uuid>.jsonl)
und erzeugt strukturierten Audit-Report (Markdown default, JSON mit --json).

Felder:
  - Meta: session_id, cwd, git_branch, model, entrypoint, timestamps
  - Turn-Breakdown: pro assistant-message (tool_uses + text-content)
  - Tool-Call-Inventory: Count + Success/Error-Quote pro Tool-Name
  - File-Touches: Write/Edit/Read-Pfade (deduped)
  - Git-Operations: git-Commandos aus Bash-Tool-Inputs
  - Network-Calls: WebFetch-URLs + MCP-Calls
  - Error-Events: Tool-Errors + API-Errors
  - Cost-Timeline: Tokens + cost pro Message (wenn vorhanden)

Zweck: Post-Run-Audits von CC-Handoff-Runs, Compliance-Checks,
Debugging von CC-Verhalten, Forensik bei unerwarteten Commits.
"""
import json
import sys
import argparse
from collections import Counter, defaultdict
from datetime import datetime


def load_events(path):
    events = []
    with open(path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                events.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    return events


def extract_meta(events):
    meta = {}
    for e in events:
        if e.get('type') == 'assistant':
            meta.setdefault('session_id', e.get('sessionId'))
            meta.setdefault('cwd', e.get('cwd'))
            meta.setdefault('git_branch', e.get('gitBranch'))
            meta.setdefault('version', e.get('version'))
            meta.setdefault('entrypoint', e.get('entrypoint'))
            meta.setdefault('permission_mode', e.get('permissionMode'))
            m = e.get('message', {})
            if 'model' in m:
                meta.setdefault('model', m['model'])
    ts = [e.get('timestamp') for e in events if e.get('timestamp')]
    if ts:
        meta['first_ts'] = min(ts)
        meta['last_ts'] = max(ts)
    meta['event_count'] = len(events)
    return meta


def iter_tool_uses(events):
    """Yield (turn_idx, tool_name, tool_input, tool_use_id, ts) for each tool_use block."""
    turn = 0
    for e in events:
        if e.get('type') != 'assistant':
            continue
        turn += 1
        ts = e.get('timestamp', '')
        content = e.get('message', {}).get('content', [])
        if isinstance(content, list):
            for blk in content:
                if isinstance(blk, dict) and blk.get('type') == 'tool_use':
                    yield turn, blk.get('name', '?'), blk.get('input', {}), blk.get('id', ''), ts


def iter_tool_results(events):
    """Yield (tool_use_id, is_error, content_preview) for tool_result blocks."""
    for e in events:
        if e.get('type') != 'user':
            continue
        content = e.get('message', {}).get('content', [])
        if isinstance(content, list):
            for blk in content:
                if isinstance(blk, dict) and blk.get('type') == 'tool_result':
                    c = blk.get('content', '')
                    if isinstance(c, list):
                        c = ' '.join(str(x.get('text', x)) if isinstance(x, dict) else str(x) for x in c)
                    preview = str(c)[:300]
                    yield blk.get('tool_use_id', ''), blk.get('is_error', False), preview


def iter_text_blocks(events):
    """Yield (turn_idx, text, ts) for assistant text content."""
    turn = 0
    for e in events:
        if e.get('type') != 'assistant':
            continue
        turn += 1
        ts = e.get('timestamp', '')
        content = e.get('message', {}).get('content', [])
        if isinstance(content, list):
            for blk in content:
                if isinstance(blk, dict) and blk.get('type') == 'text':
                    yield turn, blk.get('text', ''), ts


def audit(path):
    events = load_events(path)
    meta = extract_meta(events)

    # Tool usage inventory
    tool_calls = list(iter_tool_uses(events))
    tool_counter = Counter(t[1] for t in tool_calls)

    # Tool results map (is_error per tool_use_id)
    results_by_id = {}
    for tid, is_err, preview in iter_tool_results(events):
        results_by_id[tid] = {'is_error': is_err, 'preview': preview}

    # Success/error per tool
    tool_errors = defaultdict(int)
    tool_ok = defaultdict(int)
    for turn, name, inp, tid, ts in tool_calls:
        res = results_by_id.get(tid)
        if res:
            if res['is_error']:
                tool_errors[name] += 1
            else:
                tool_ok[name] += 1

    # File touches (Write, Edit, Read)
    file_writes = []
    file_edits = []
    file_reads = []
    for turn, name, inp, tid, ts in tool_calls:
        if name == 'Write':
            file_writes.append(inp.get('file_path', '?'))
        elif name == 'Edit':
            file_edits.append(inp.get('file_path', '?'))
        elif name == 'Read':
            file_reads.append(inp.get('file_path', '?'))

    # Bash commands (esp. git)
    bash_cmds = []
    git_cmds = []
    for turn, name, inp, tid, ts in tool_calls:
        if name == 'Bash':
            cmd = inp.get('command', '')
            bash_cmds.append((turn, cmd))
            if 'git ' in cmd:
                git_cmds.append((turn, cmd))

    # Network (WebFetch + MCP)
    webfetch_urls = []
    mcp_calls = []
    for turn, name, inp, tid, ts in tool_calls:
        if name == 'WebFetch':
            webfetch_urls.append((turn, inp.get('url', '?')))
        elif name.startswith('mcp__'):
            mcp_calls.append((turn, name, inp))

    # Text events
    text_blocks = list(iter_text_blocks(events))

    report = {
        'meta': meta,
        'summary': {
            'total_events': len(events),
            'assistant_turns': sum(1 for e in events if e.get('type') == 'assistant'),
            'user_events': sum(1 for e in events if e.get('type') == 'user'),
            'tool_calls_total': len(tool_calls),
            'tool_calls_by_name': dict(tool_counter.most_common()),
            'tool_errors_by_name': dict(tool_errors),
            'tool_ok_by_name': dict(tool_ok),
        },
        'file_ops': {
            'writes': sorted(set(file_writes)),
            'edits_unique': sorted(set(file_edits)),
            'edits_total_ops': len(file_edits),
            'reads_unique': sorted(set(file_reads)),
            'reads_total_ops': len(file_reads),
        },
        'git_ops': [{'turn': t, 'cmd': c} for t, c in git_cmds],
        'bash_ops_total': len(bash_cmds),
        'webfetch_urls': [{'turn': t, 'url': u} for t, u in webfetch_urls],
        'mcp_calls': [{'turn': t, 'name': n} for t, n, _ in mcp_calls],
        'text_blocks': [{'turn': t, 'text_preview': tx[:400], 'ts': ts} for t, tx, ts in text_blocks],
        'errors': [
            {'tool_use_id': tid, 'preview': r['preview']}
            for tid, r in results_by_id.items() if r['is_error']
        ],
    }
    return report


def render_markdown(r):
    m = r['meta']
    s = r['summary']
    out = []
    out.append(f"# CC Session Audit — {m.get('session_id', '?')}")
    out.append('')
    out.append('## Meta')
    out.append(f"- Model: `{m.get('model', '?')}`")
    out.append(f"- Cwd: `{m.get('cwd', '?')}`")
    out.append(f"- Git-Branch: `{m.get('git_branch', '?')}`")
    out.append(f"- Entrypoint: `{m.get('entrypoint', '?')}`")
    out.append(f"- Permission-Mode: `{m.get('permission_mode', '?')}`")
    out.append(f"- Version: `{m.get('version', '?')}`")
    out.append(f"- First ts: `{m.get('first_ts', '?')}`")
    out.append(f"- Last ts: `{m.get('last_ts', '?')}`")
    out.append(f"- Event count: {m.get('event_count')}")
    out.append('')
    out.append('## Summary')
    out.append(f"- Assistant turns: {s['assistant_turns']}")
    out.append(f"- User events: {s['user_events']}")
    out.append(f"- Tool calls total: {s['tool_calls_total']}")
    out.append(f"- Tool-error total: {sum(s['tool_errors_by_name'].values())}")
    out.append('')
    out.append('## Tool-Call-Inventory')
    out.append('| Tool | Calls | OK | Errors |')
    out.append('|---|---:|---:|---:|')
    for name, n in s['tool_calls_by_name'].items():
        ok = s['tool_ok_by_name'].get(name, 0)
        err = s['tool_errors_by_name'].get(name, 0)
        out.append(f"| `{name}` | {n} | {ok} | {err} |")
    out.append('')
    out.append('## File-Ops')
    fo = r['file_ops']
    out.append(f"### Writes ({len(fo['writes'])})")
    for p in fo['writes']:
        out.append(f"- `{p}`")
    out.append('')
    out.append(f"### Edits ({len(fo['edits_unique'])} unique files, {fo['edits_total_ops']} total ops)")
    for p in fo['edits_unique']:
        out.append(f"- `{p}`")
    out.append('')
    out.append(f"### Reads ({len(fo['reads_unique'])} unique files, {fo['reads_total_ops']} total ops)")
    for p in fo['reads_unique'][:50]:
        out.append(f"- `{p}`")
    if len(fo['reads_unique']) > 50:
        out.append(f"- ... ({len(fo['reads_unique']) - 50} weitere)")
    out.append('')
    out.append(f"## Git-Ops ({len(r['git_ops'])})")
    for g in r['git_ops']:
        cmd = g['cmd'].replace('\n', ' ')[:200]
        out.append(f"- Turn {g['turn']}: `{cmd}`")
    out.append('')
    out.append(f"## WebFetch ({len(r['webfetch_urls'])})")
    for w in r['webfetch_urls']:
        out.append(f"- Turn {w['turn']}: {w['url']}")
    out.append('')
    out.append(f"## MCP-Calls ({len(r['mcp_calls'])})")
    mcp_counter = Counter(c['name'] for c in r['mcp_calls'])
    for name, n in mcp_counter.most_common():
        out.append(f"- `{name}`: {n}")
    out.append('')
    out.append(f"## Errors ({len(r['errors'])})")
    for e in r['errors']:
        out.append(f"- {e['tool_use_id'][:12]}: `{e['preview'][:200]}`")
    out.append('')
    out.append('## Assistant-Text-Blocks (Previews)')
    for tb in r['text_blocks']:
        ts = tb['ts'].split('T')[-1][:8] if 'T' in tb['ts'] else tb['ts']
        out.append(f"- Turn {tb['turn']} [{ts}]: {tb['text_preview'][:300]}")
    return '\n'.join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('transcript', help='Path to session .jsonl')
    ap.add_argument('--json', action='store_true', help='Output JSON instead of Markdown')
    args = ap.parse_args()
    r = audit(args.transcript)
    if args.json:
        print(json.dumps(r, indent=2, ensure_ascii=False))
    else:
        print(render_markdown(r))


if __name__ == '__main__':
    main()
