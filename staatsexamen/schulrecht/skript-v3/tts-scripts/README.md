# TTS-Audio-Skripte · Mock-Prüfung Schulrecht

## Verwendung

Ein Markdown-File pro Modul mit „Prüfer fragt / Kandidat antwortet"-Skripten. Konvertierbar zu MP3 via:

### Option A · OpenAI TTS (empfohlen für deutsche Sprache)

```bash
# Pro Modul (Beispiel mp03)
curl https://api.openai.com/v1/audio/speech \
  -H "Authorization: Bearcat $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1-hd",
    "input": "INHALT VON mp03.md HIER EINFÜGEN",
    "voice": "onyx",
    "response_format": "mp3"
  }' --output mp03.mp3
```

Voices auf Deutsch (Stand 2026):
- **onyx** — männlich, ruhig, prüfungsnah (Empfehlung Prüfer-Rolle)
- **nova** — weiblich, klar, schnell
- **shimmer** — weiblich, warm
- **alloy** — neutral

Kosten Stand 2026: ca. 0.015 USD pro 1000 Zeichen (tts-1-hd) — alle 9 Skripte ~3-5 USD.

### Option B · ElevenLabs

Höhere Qualität, deutsche Stimmen besser betont. Pro Modul ~0.30 USD bei Standard-Plan.

- Login: <https://elevenlabs.io>
- Voice-Empfehlung: „George" (deutsche Variante, ruhig)
- Settings: Stability 0.5 · Similarity 0.75 · Style 0.0

### Option C · MacOS `say` (kostenlos)

```bash
say -v "Anna" -f mp03.md -o mp03.aiff
# Anna ist die deutsche Stimme · ggf. installieren via Systemeinstellungen
```

Qualität reicht für einfache Wiederholung, nicht für längeres Hören.

## Datei-Struktur

Pro Modul-Skript: 3-4 themenorientierte + 2-3 fallorientierte Frage-Antwort-Paare, je ~3-5 Min Hörzeit.

Die 5-Schritt-Choreographie ist in den Antworten konkret durchgespielt, damit sie sich akustisch einprägt.

## Hör-Strategie

Modul-Audio höre dir an, **bevor** du den Mock im Tagesplan durchgehst — dann hast du den Klang der „richtigen" Antwort-Choreographie im Ohr und kannst nachsprechen.

Optimal: Audio einmal hören → 5 Min Pause → Mock-Frage selbst beantworten → mit eigener Aufnahme vergleichen.
