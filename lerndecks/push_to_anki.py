#!/usr/bin/env python3
"""
push_to_anki.py — pushes Schulrecht-Lerndecks (MP_03/05/06/08) into Anki via AnkiConnect.

Idempotent: checks deck existence + duplicate notes via tag-match.
Run with: cd ~/weitergehts.online/lerndecks/ && python3 push_to_anki.py
"""
import json
import sys
import urllib.request
import urllib.error
from pathlib import Path

ANKI_URL = "http://localhost:8765"
DECK_FILES = ["MP_01_cards.json", "MP_02_cards.json", "MP_03_cards.json", "MP_04_cards.json", "MP_05_cards.json", "MP_06_cards.json", "MP_07_cards.json", "MP_08_cards.json", "MP_09_cards.json"]


def anki(action: str, **params) -> dict:
    payload = json.dumps({"action": action, "version": 6, "params": params}).encode("utf-8")
    req = urllib.request.Request(ANKI_URL, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        result = json.load(resp)
        if result.get("error"):
            raise RuntimeError(f"AnkiConnect error: {result['error']}")
        return result.get("result")


def main() -> int:
    base_dir = Path(__file__).resolve().parent
    total_added = 0
    total_skipped = 0
    total_failed = 0

    print(f"AnkiConnect version: {anki('version')}")

    for fname in DECK_FILES:
        fpath = base_dir / fname
        if not fpath.exists():
            print(f"[SKIP] {fname} not found")
            continue

        data = json.loads(fpath.read_text(encoding="utf-8"))
        deck_name = data["deck"]
        cards = data["cards"]

        existing = anki("deckNames")
        if deck_name not in existing:
            anki("createDeck", deck=deck_name)
            print(f"[NEW] Deck: {deck_name}")
        else:
            print(f"[OK]  Deck exists: {deck_name}")

        added = 0
        skipped = 0
        failed = 0
        for card in cards:
            front = card.get("front", "")
            back = card.get("back", "")
            tags = card.get("tags", [])
            card_id = card.get("id", "")
            id_tag = f"id:{card_id}" if card_id else None
            search_tag = id_tag or f"front_hash:{hash(front) & 0xFFFFFFFF}"
            all_tags = list(tags)
            if search_tag not in all_tags:
                all_tags.append(search_tag)

            # Idempotency: search for existing note via id-tag
            try:
                existing_notes = anki("findNotes", query=f'deck:"{deck_name}" tag:{search_tag}')
                if existing_notes:
                    skipped += 1
                    continue
            except Exception:
                pass

            try:
                anki("addNote", note={
                    "deckName": deck_name,
                    "modelName": "Basic",
                    "fields": {"Front": front, "Back": back},
                    "tags": all_tags,
                    "options": {"allowDuplicate": False},
                })
                added += 1
            except Exception as e:
                failed += 1
                print(f"  [FAIL] {card_id or front[:40]}: {e}")

        print(f"  {fname}: +{added} added, ={skipped} skipped, !{failed} failed")
        total_added += added
        total_skipped += skipped
        total_failed += failed

    print(f"\n=== TOTAL: +{total_added} added · ={total_skipped} skipped · !{total_failed} failed ===")
    return 0 if total_failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
