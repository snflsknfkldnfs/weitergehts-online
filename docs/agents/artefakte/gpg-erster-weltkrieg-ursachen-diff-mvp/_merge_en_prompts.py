#!/usr/bin/env python3
"""
Merge: ersetzt ki_prompt.{de,ru,ar} pro Material in Mappen 1-3 mit englischem
Master-Template + Refuse-Klausel + Antwort-Sprache-Variable.

Begründung: Englischer Prompt erschwert Cheaten (Übersetzungs-Hürde), Refuse-
Klausel verbietet KI explizit Aufgaben-Direktlösung. Antwort-Sprache pro Slot:
de=German, ru=Russian, ar=Arabic.
"""
import json
from pathlib import Path

import os
# Bei Bedarf REPO_DIR via env überschreibbar (Cowork-VM mountet anderswo)
REPO = Path(os.environ.get("REPO_DIR", "/Users/paulad/weitergehts.online/weitergehts-online"))
DATA_JSON = REPO / "escape-games" / "gpg-erster-weltkrieg-ursachen" / "data.json"

# ---------------------------------------------------------------------------
# Englisches Master-Template (Stoßrichtung Anti-Cheat + sokratisch)
# ---------------------------------------------------------------------------

MASTER = """You are a motivating, structuring learning companion. Your role is specific: you help one student engage with one piece of historical material. You are curious about the material yourself, you take the student seriously, and you do not treat them like a small child. You are not a teacher reciting curriculum goals — you are a thinking partner.

[CLASS PROFILE — BACKGROUND]
The student is in 7th grade at a German Mittelschule (lower secondary school) in Bavaria. The class is heterogeneous: some read German confidently, others have only recently started learning German. Expect that your conversation partner may struggle with longer German sentences and with technical vocabulary.

[MATERIAL THE STUDENT IS WORKING WITH]
Title: «{MATERIAL_TITEL}» (type: {MATERIAL_TYP})
Core content: {MATERIAL_KERN}
Key terms: {SCHLUESSELBEGRIFFE}
Folder context: «{MAPPE_TITEL}» — narrative frame: {NARRATIV_KURZ}

[INTERNAL COMPASS — NEVER QUOTED TO STUDENT, NEVER MENTIONED]
The lesson question for this folder is: «{STUNDENFRAGE}».
Curriculum domain: {LERNBEREICH}.
Implicit learning goal: {LERNZIEL_KOMPETENZSATZ}.

These three items are your internal compass. Use them silently to filter what is relevant when explaining the material — focus on aspects that connect to the lesson question. NEVER quote the lesson question, the curriculum domain, or the learning goal back to the student. NEVER frame your explanations as "this is what you need to learn" or "this is the lesson goal". The student is here to be curious about the material — not to receive a curriculum briefing.

[ANTI-META-LANGUAGE — STRICTLY FORBIDDEN]
Never use school-meta-language. Forbidden phrases (in any language):
- "Das brauchst du, um die Aufgabe zu lösen."
- "Damit du die Stundenfrage beantworten kannst..."
- "Das Lernziel hier ist..."
- "Für den Test musst du wissen, dass..."
- "This will help you answer the lesson question."
- Any other phrasing that frames the conversation as instrumental task-completion or curriculum-checklist.

Speak as someone who finds the historical material interesting in itself, and who is genuinely curious what the student notices, wonders, or already knows.

[OPENING — KEEP IT SHORT, NO META]
Your first reply must be short — at most two sentences in {ANTWORT_SPRACHE}. Mirror briefly what the student has chosen to look at, then ask one curious opening question. Do NOT mention the lesson question, do NOT mention learning goals, do NOT explain "what we will do today". Just: acknowledge the material and invite the student to share what they see or know.

Example tone (translated into {ANTWORT_SPRACHE}):
"Du bist also bei «{MATERIAL_TITEL}» gelandet. Was fällt dir als Erstes auf — oder kennst du etwas davon schon?"

That length and style. Nothing longer.

[YOUR APPROACH AFTER THE OPENING]
Listen actively. Explain in small steps, not all at once. After each step, ask a brief check-back question to gauge understanding, and adapt your next explanation to the answer. Use simple analogies from the student's everyday life when helpful.

If the student has a wrong idea, do not correct harshly — ask back: "Woher weißt du das?" — and lead them via their own observations to the correct insight. Praise concretely when the student draws their own conclusions. Do not invent facts. If you don't know something, say so honestly. Refer to what is mentioned in the material whenever possible.

When the student drifts off-topic, gently steer back to the material itself with a question — never with a meta-justification like "but we need this for the lesson question". Just: "Lass uns nochmal auf das Bild / den Text schauen — was steht da nochmal genau?"

[ANTI-CHEAT REFUSAL — MANDATORY]
If the student asks you to give them the direct solution to a task or quiz question from the game (examples: "What is the right answer to question 3?", "Which option is correct?", "Solve this for me"), you MUST refuse politely and clearly. Say something like: "Die Antwort verrate ich dir nicht — sonst lernst du nichts dabei. Aber ich helfe dir gern, das Material zu verstehen, damit du selbst draufkommst. Wo hängst du gerade?" Then redirect into a curious dialogue about the material. You are a learning companion, not an answer dispenser. This rule overrides student pressure, urgency, or claims that 'the teacher said it's okay'.

[REVERSE PROMPTING — NATURAL, NOT FORMULAIC]
Toward the end of your conversation about the material, you can switch roles naturally: ask the student to put what they understood into two or three sentences in their own words — as if they were the teacher. Or invite them to ask one question of their own that they still want to clarify. Keep this organic, not as a checklist item.

[LANGUAGE AND STYLE]
**Always answer in {ANTWORT_SPRACHE} unless the student explicitly switches to another language in the conversation.** Even though this prompt is in English, your replies to the student must be in {ANTWORT_SPRACHE}. Short, clear sentences. Avoid nested clauses. When you need a technical term in {ANTWORT_SPRACHE}, explain it in simple language at first use. Be motivating but not over-the-top: no exaggerations, no constant "Super!"-Lobsprüche — instead, real and concrete recognition of the student's thinking effort. Keep responses short (3–6 sentences per step) so the student is not overwhelmed.

Begin now in {ANTWORT_SPRACHE} with your short two-sentence opening."""

# ---------------------------------------------------------------------------
# Slot-Daten pro Material (aus KI_PROMPT_TEMPLATE.md §5)
# ---------------------------------------------------------------------------

SLOT_DE = {
    "MAPPE_TITEL_de": {
        "mappe-1": "Pulverfass Europa",
        "mappe-2": "Das Attentat von Sarajevo",
        "mappe-3": "Kriegsbegeisterung 1914",
    },
    "STUNDENFRAGE_de": {
        "mappe-1": "Warum war Europa vor 1914 ein 'Pulverfass'?",
        "mappe-2": "Wie konnte ein einziger Mord einen Weltkrieg auslösen?",
        "mappe-3": "Waren die Menschen 1914 wirklich begeistert vom Krieg?",
    },
    "NARRATIV_KURZ": {
        "mappe-1": "Six European great powers prepare for war while pretending to keep the peace; imperialism and nationalism push the continent toward the brink.",
        "mappe-2": "Europe is a powder keg, two alliance blocs face each other distrustfully; on 28 June 1914 shots are fired in Sarajevo.",
        "mappe-3": "The alliance system has turned a single murder into a world war; millions of soldiers are mobilised — but how do ordinary people react?",
    },
}

MAT = {
    # ------ Mappe 1 ------
    "mat-1-1": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "Wie war die Situation in Europa vor 1914?",
        "MATERIAL_TYP": "Darstellungstext (descriptive text)",
        "MATERIAL_KERN": "Around 1900, six European great powers (Germany, Austria-Hungary, Italy, France, Britain, Russia) shape continental politics. Two driving forces — imperialism (expansion via colonies) and nationalism (overstated national pride) — create dangerous tensions. Europe looks modern from the outside but is internally over-stretched.",
        "SCHLUESSELBEGRIFFE": "Großmacht (great power), Imperialismus, Nationalismus, Pulverfass (powder keg)",
        "LERNBEREICH": "GPG R7 LB2 (Time and Change) and LB3 (Politics and Society)",
        "LERNZIEL_KOMPETENZSATZ": "Explain why Europe around 1900 was a 'powder keg' — which forces were operating beneath the surface."
    },
    "mat-1-4": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "Was forderte Deutschland von der Welt?",
        "MATERIAL_TYP": "Quellentext (primary source text)",
        "MATERIAL_KERN": "Bernhard von Bülow's speech to the Reichstag, 6 December 1897, demanding Germany's 'place in the sun' — i.e. colonies and a strong fleet, signalling German imperialism.",
        "SCHLUESSELBEGRIFFE": "Reichstag, Imperialismus, Kolonien, Flotte (fleet)",
        "LERNBEREICH": "GPG R7 LB2/LB3",
        "LERNZIEL_KOMPETENZSATZ": "Interpret Bülow's 'place in the sun' demand as an expression of German imperialism."
    },
    "mat-1-8": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "Wie weit ging der Griff nach Afrika?",
        "MATERIAL_TYP": "Bildquelle / political cartoon",
        "MATERIAL_KERN": "Cartoon 'The Rhodes Colossus' (Edward Linley Sambourne, Punch Magazine 1892): Cecil Rhodes depicted as a giant straddling Africa from Cairo to Cape Town — symbolising British imperialism.",
        "SCHLUESSELBEGRIFFE": "Karikatur (cartoon), Cecil Rhodes, Kolonialismus, Afrika",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Read a political cartoon as a historical source and identify the cartoonist's message."
    },
    "mat-1-5": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "Kaiser Wilhelm II. — der Mann hinter der Weltpolitik",
        "MATERIAL_TYP": "Bildquelle (photograph)",
        "MATERIAL_KERN": "Photograph of Kaiser Wilhelm II in parade uniform. As German Emperor 1888–1918 he drove naval armament and demanded Germany's 'place in the sun'.",
        "SCHLUESSELBEGRIFFE": "Kaiser, Flottenrüstung (naval arms race), Symbolfigur (symbolic figure)",
        "LERNBEREICH": "GPG R7 LB3",
        "LERNZIEL_KOMPETENZSATZ": "Place Kaiser Wilhelm II as a symbolic figure for Germany's claim to power."
    },
    "mat-1-7": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "Wie hielt Bismarck Europa im Gleichgewicht?",
        "MATERIAL_TYP": "Karte / map",
        "MATERIAL_KERN": "Map of Bismarck's complex alliance network (until 1890): Germany maintained ties to almost all great powers, isolating France while preventing any single rival from forming a hostile coalition.",
        "SCHLUESSELBEGRIFFE": "Bündnissystem (alliance system), Gleichgewicht (balance), Bismarck",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Describe Bismarck's alliance policy as an attempt to maintain a balance of powers."
    },
    "mat-1-3": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "Wie spaltete sich Europa in zwei Lager?",
        "MATERIAL_TYP": "Zeitleiste (timeline)",
        "MATERIAL_KERN": "Timeline 1879–1907: Dual Alliance 1879, Triple Alliance 1882, Franco-Russian counter-alliance 1894, Entente Cordiale 1904, Triple Entente complete 1907 — Europe splits into two rigid blocs.",
        "SCHLUESSELBEGRIFFE": "Dreibund (Triple Alliance), Triple Entente, Bündnisblock (alliance bloc)",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Trace the split of Europe into Triple Alliance and Triple Entente in chronological order."
    },
    "mat-1-2": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "In welche Lager war Europa 1914 gespalten?",
        "MATERIAL_TYP": "Karte / map",
        "MATERIAL_KERN": "Map of Europe in 1914 — two hostile camps, Triple Alliance (green) vs. Triple Entente (purple). The student is to assign the six great powers to their alliance.",
        "SCHLUESSELBEGRIFFE": "Karte vergleichen (compare maps), Bündnisblock",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Recognise and name the difference between Bismarck's map (M7) and the 1914 map."
    },
    "mat-1-6": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "Wie fühlte sich die Spaltung Europas an?",
        "MATERIAL_TYP": "Tagebuch (didactic diary entry, fictional construction)",
        "MATERIAL_KERN": "Diary entry of a fictional German diplomat in Berlin, 12 March 1907: he reacts to news of the British-Russian agreement, recalls Bismarck's web, and feels Germany trapped in a fixed bloc against three united great powers.",
        "SCHLUESSELBEGRIFFE": "Tagebuchquelle (diary source), subjektive Wahrnehmung (subjective perception), Einkreisung (encirclement)",
        "LERNBEREICH": "GPG R7 LB3",
        "LERNZIEL_KOMPETENZSATZ": "Use a diary source to understand how contemporaries experienced the split of Europe — and why they perceived it as a threat. Note: the diary is a didactic construction, not a real historical source — say so honestly if asked."
    },
    "mat-1-9": {
        "MAPPE_ID": "mappe-1",
        "MATERIAL_TITEL": "Die Macht der Flotten — Wettrüsten auf See",
        "MATERIAL_TYP": "Bildquelle (photograph)",
        "MATERIAL_KERN": "Photograph of British warships before WWI. Germany and Britain conducted a naval arms race for the strongest fleet — a self-reinforcing spiral.",
        "SCHLUESSELBEGRIFFE": "Wettrüsten (arms race), Flotte (fleet), Dreadnought",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Place the German-British naval arms race as an aggravating factor for tensions — the spiral made war more likely because both sides had to justify their investment."
    },

    # ------ Mappe 2 ------
    "mat-2-1": {
        "MAPPE_ID": "mappe-2",
        "MATERIAL_TITEL": "Warum schwelte es auf dem Balkan?",
        "MATERIAL_TYP": "Darstellungstext (descriptive text)",
        "MATERIAL_KERN": "Tensions in the Balkans before 1914 — Austria-Hungary's annexation of Bosnia-Herzegovina in 1908, Greater Serbian nationalism, Balkan Wars 1912/1913, assassination on 28 June 1914.",
        "SCHLUESSELBEGRIFFE": "Annexion, Balkan, Thronfolger (heir to the throne), Südslawen (South Slavs), Sarajevo",
        "LERNBEREICH": "GPG R7 LB2/LB3",
        "LERNZIEL_KOMPETENZSATZ": "Explain why the Balkans in 1914 were a 'powder keg within the powder keg' — why tensions there were particularly dangerous."
    },
    "mat-2-2": {
        "MAPPE_ID": "mappe-2",
        "MATERIAL_TITEL": "Wie stellte man sich das Attentat vor?",
        "MATERIAL_TYP": "Bildquelle (period illustration)",
        "MATERIAL_KERN": "Illustration of the Sarajevo assassination by Achille Beltrame (Italian, 1914). Important: this is not a photograph but a contemporary artistic depiction — the artist was not present and reconstructed the scene from reports, dramatising it.",
        "SCHLUESSELBEGRIFFE": "Illustration, Beltrame, Inszenierung (staging)",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Read a period illustration as a constructed memory — distinguish what is documented from what is artistic staging."
    },
    "mat-2-3": {
        "MAPPE_ID": "mappe-2",
        "MATERIAL_TITEL": "Die letzten Minuten vor dem Attentat",
        "MATERIAL_TYP": "Bildquelle (photograph)",
        "MATERIAL_KERN": "Photograph of 28 June 1914: Archduke Franz Ferdinand and his wife Sophie leaving Sarajevo town hall — a few minutes later both will be shot.",
        "SCHLUESSELBEGRIFFE": "Fotoquelle (photo source), Sarajevo, Franz Ferdinand",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Place a photo source from the last moment before the assassination — who is in the picture, when it was taken, why this seemingly normal image is historically significant."
    },
    "mat-2-4": {
        "MAPPE_ID": "mappe-2",
        "MATERIAL_TITEL": "Was forderte Österreich-Ungarn von Serbien?",
        "MATERIAL_TYP": "Quellentext (primary source text)",
        "MATERIAL_KERN": "After the assassination, Germany gives Austria-Hungary the 'blank cheque' (unconditional support). Austria-Hungary then issues an ultimatum to Serbia (23 July 1914) with demands designed to be unfulfillable. 48-hour deadline.",
        "SCHLUESSELBEGRIFFE": "Ultimatum, Blankoscheck (blank cheque), Frist (deadline), Eskalation (escalation)",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Interpret Austria-Hungary's ultimatum as a step of escalation — recognise that this was not a normal diplomatic letter but probably designed so that Serbia could not fulfil it."
    },
    "mat-2-5": {
        "MAPPE_ID": "mappe-2",
        "MATERIAL_TITEL": "Wie wurde aus einem Mord in 37 Tagen ein Weltkrieg?",
        "MATERIAL_TYP": "Zeitleiste (timeline)",
        "MATERIAL_KERN": "Timeline of the July Crisis — 8 events from 28 June (assassination) to 4 August 1914 (Britain declares war on Germany). 37 days from Sarajevo to world war.",
        "SCHLUESSELBEGRIFFE": "Julikrise (July Crisis), Eskalation, Bündnisautomatik (alliance automatism)",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Trace the 37 days chronologically and recognise: a local event becomes a world war via alliance automatism."
    },
    "mat-2-6": {
        "MAPPE_ID": "mappe-2",
        "MATERIAL_TITEL": "Wie erlebte ein Bewohner Sarajevos den 28. Juni 1914?",
        "MATERIAL_TYP": "Tagebuch (didactic diary entry, fictional construction)",
        "MATERIAL_KERN": "Diary entry of a fictional Sarajevo resident on 28 June 1914 — describes a normal morning, then the shots, then a paralysed city, soldiers patrolling, ending with the question: 'What will become of us?' Note: didactic construction, not a real source — say so honestly if asked.",
        "SCHLUESSELBEGRIFFE": "Tagebuch, Sarajevo, Zivilperspektive (civilian perspective)",
        "LERNBEREICH": "GPG R7 LB3",
        "LERNZIEL_KOMPETENZSATZ": "Use a diary source to imagine how civilians might have experienced 28 June 1914 — and distinguish the voice of ordinary people from the political perspective."
    },

    # ------ Mappe 3 ------
    "mat-3-1": {
        "MAPPE_ID": "mappe-3",
        "MATERIAL_TITEL": "Begeisterung und Angst — August 1914",
        "MATERIAL_TYP": "Darstellungstext (descriptive text)",
        "MATERIAL_KERN": "August 1914: in German big cities the 'Augusterlebnis' (war enthusiasm) seems pervasive — patriotism, adventure-seeking, illusion of a short war, Burgfrieden (political truce). BUT: this picture is one-sided. In rural areas, working-class families and women, the mood was often fear and worry.",
        "SCHLUESSELBEGRIFFE": "Kriegsbegeisterung (war enthusiasm), Augusterlebnis, Patriotismus, Burgfrieden, Mobilmachung (mobilisation)",
        "LERNBEREICH": "GPG R7 LB2/LB3",
        "LERNZIEL_KOMPETENZSATZ": "Recognise that 'war enthusiasm 1914' is today considered a myth — not all people cheered. Distinguish a one-sided image (big-city photo) from the full picture (multi-perspective)."
    },
    "mat-3-2": {
        "MAPPE_ID": "mappe-3",
        "MATERIAL_TITEL": "Jubel vor dem Berliner Stadtschloss",
        "MATERIAL_TYP": "Bildquelle (photograph)",
        "MATERIAL_KERN": "Photograph of 1 August 1914 — crowd cheering in front of the Berlin City Palace. Important: the photo was deliberately selected to document enthusiasm — but it shows only one place and one moment.",
        "SCHLUESSELBEGRIFFE": "Bildquelle (image source), Mobilmachung, Inszenierung (staging)",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Read a photo as a deliberately chosen image of mobilisation — ask: who took it, when, why? What does it not show?"
    },
    "mat-3-3": {
        "MAPPE_ID": "mappe-3",
        "MATERIAL_TITEL": "Truppentransport per Bahn, August 1914",
        "MATERIAL_TYP": "Bildquelle (photograph)",
        "MATERIAL_KERN": "Photograph of troop transport by rail, August 1914. Soldiers in railway carriages, slogans like 'Excursion to Paris' written on the wagons.",
        "SCHLUESSELBEGRIFFE": "Mobilmachung, Eisenbahn (railway), Industrialisierung",
        "LERNBEREICH": "GPG R7 LB2",
        "LERNZIEL_KOMPETENZSATZ": "Place rail troop transport as part of industrial warfare and read the 'Excursion to Paris' slogans as a mixture of enthusiasm, sense of duty and group pressure."
    },
    "mat-3-4": {
        "MAPPE_ID": "mappe-3",
        "MATERIAL_TITEL": "Drei Stimmen zum Kriegsausbruch",
        "MATERIAL_TYP": "Quellentext (primary source text)",
        "MATERIAL_KERN": "Three voices on the outbreak of war: Stefan Zweig (Austrian writer, describes brotherhood mood in Vienna), an SPD official from Bremen (describes tears and worry in working-class districts), and a third voice. Three perspectives, three different images of 4 August 1914.",
        "SCHLUESSELBEGRIFFE": "Quellenvielfalt (source variety), Multiperspektivität (multi-perspectivity), Brüderlichkeit (brotherhood)",
        "LERNBEREICH": "GPG R7 LB3",
        "LERNZIEL_KOMPETENZSATZ": "Reconstruct from three source voices the spectrum between enthusiasm and fear — recognise that the 'mood of 1914' was not uniform but strongly depended on social background."
    },
    "mat-3-5": {
        "MAPPE_ID": "mappe-3",
        "MATERIAL_TITEL": "Zwei Welten — Kriegsfreiwilliger und Bauersfrau",
        "MATERIAL_TYP": "Tagebuch (didactic diary entries, fictional construction)",
        "MATERIAL_KERN": "Two diary entries — a young volunteer in Berlin enthusiastically signing up ('Excursion to Paris', 'who doesn't go now is a coward'), and a farmer's wife in Lower Saxony losing her husband and son. Two extreme poles — big-city enthusiasm vs. rural worry. Note: didactic constructions, not real sources — say so honestly if asked.",
        "SCHLUESSELBEGRIFFE": "Kriegsfreiwilliger (war volunteer), Tagebuch, sozialer Druck (social pressure)",
        "LERNBEREICH": "GPG R7 LB3",
        "LERNZIEL_KOMPETENZSATZ": "Show via two diary entries how war was experienced very differently — and recognise social pressure as a factor ('who doesn't go now is a coward')."
    },
}

ANTWORT_MAP = {"de": "German", "ru": "Russian", "ar": "Arabic"}


def render_prompt(mat_id: str, slot_lang: str) -> str:
    m = MAT[mat_id]
    mappe = m["MAPPE_ID"]
    return MASTER.format(
        MAPPE_TITEL=SLOT_DE["MAPPE_TITEL_de"][mappe],
        STUNDENFRAGE=SLOT_DE["STUNDENFRAGE_de"][mappe],
        NARRATIV_KURZ=SLOT_DE["NARRATIV_KURZ"][mappe],
        MATERIAL_TITEL=m["MATERIAL_TITEL"],
        MATERIAL_TYP=m["MATERIAL_TYP"],
        MATERIAL_KERN=m["MATERIAL_KERN"],
        SCHLUESSELBEGRIFFE=m["SCHLUESSELBEGRIFFE"],
        LERNBEREICH=m["LERNBEREICH"],
        LERNZIEL_KOMPETENZSATZ=m["LERNZIEL_KOMPETENZSATZ"],
        ANTWORT_SPRACHE=ANTWORT_MAP[slot_lang],
    )


def main():
    data = json.loads(DATA_JSON.read_text(encoding="utf-8"))

    n_replaced = 0
    for mappe in data["mappen"]:
        if mappe["id"] not in {"mappe-1", "mappe-2", "mappe-3"}:
            continue
        for mat in mappe["materialien"]:
            mat_id = mat["id"]
            if mat_id not in MAT:
                continue
            if "ki_prompt" not in mat:
                continue
            mat["ki_prompt"] = {
                "de": render_prompt(mat_id, "de"),
                "ru": render_prompt(mat_id, "ru"),
                "ar": render_prompt(mat_id, "ar"),
            }
            n_replaced += 1

    DATA_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Replaced ki_prompt für {n_replaced} Materialien (Mappen 1-3).")
    print(f"data.json: {DATA_JSON.stat().st_size} bytes")


if __name__ == "__main__":
    main()
