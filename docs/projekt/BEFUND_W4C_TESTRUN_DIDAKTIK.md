# BEFUND: W4-C Testrun AGENT_DIDAKTIK (Game 2)

**Datum:** 2026-04-06
**Methode:** Externer PM-Audit des Testrun-Outputs `DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ende.md` gegen VERTRAG_PHASE_0-1_DIDAKTIK QD1-QD8
**Zweck:** Prozessqualitaet pruefen, Luecken im Agent-Prompt und im Vertrag identifizieren

---

## 1. Q-Gate-Audit (externe Pruefung)

### QD1 Lehrplan-Abdeckung — **WARN**

**Problem:** KE-E, KE-F, KE-G sind vom Agent aus dem Fachlehrplan-Inhalt `GPG7_LB2_I_06` *abgeleitet*, nicht direkt aus einer Kompetenzerwartungs-Tabelle extrahiert. Die exakten K-Nummern (GPG7_LB2_K_08 etc.) sind plausibel aber nicht verifiziert.

**Ursache:** Der Fachlehrplan liegt nicht als maschinenlesbare Datei im Repo. Der Agent musste aus indirekten Quellen (bestehende UE-Planungen, Fachlehrplan-Inhalte in DIDAKTIK_RAHMEN Game 1) rekonstruieren.

**Prozess-Finding PF-1:** AGENT_DIDAKTIK braucht *entweder* Zugang zum Fachlehrplan *oder* eine vorab-kuratierte KE-Datenbank pro Fach/Jahrgangsstufe. Ohne das ist QD1 (BLOCKER) nicht zuverlaessig pruefbar.

**Vorschlag:** KE-Katalog als Referenz-Datei: `docs/referenz/KE_KATALOG_GPG_R7.md` — einmalig vom User validiert, dann von allen Games referenziert.

### QD2 KE-Vollstaendigkeit — **PASS**

Scope-Abgrenzung vorhanden (6 Eintraege). Game-1-KEs explizit als abgedeckt markiert. Vorgaenger-Anschluss dokumentiert. KE-D (Kriegsschuldfrage) als "tangential" eingestuft mit Verweis auf moegliches Game 3.

### QD3 Teilziel-Qualitaet — **PASS**

Alle 4 TZ haben dreigliedriges Format (Operator + indem + Erkennbarkeitskriterium). Messbare Kriterien: "mindestens drei Aspekte" (TZ1), "Zusammenhang begruenden" (TZ2), "aus verschiedenen Perspektiven benennen" (TZ3), "mindestens drei Faktoren + Zusammenwirken erklaeren" (TZ4).

### QD4 KE-Matrix-Konsistenz — **PASS**

4 KEs × 4 Mappen. Jede KE hat genau 1 Hauptzuordnung. Jede Mappe hat genau 1 Hauptzuordnung. Nebenzuordnungen plausibel (KE-C = Front+Heimat → M1 Haupt + M2/M3 Neben).

### QD5 Mappen-Balance — **PASS mit Beobachtung**

4 Mappen thematisch klar abgegrenzt. Zentrale Erkenntnis je 1 Satz.

**Beobachtung:** Mappe 4 (Kriegsende) hat potenziell die hoechste Stoffdichte: US-Eintritt, Erschoepfung, Matrosenaufstand, Novemberrevolution, Waffenstillstand. Risiko der Ueberladung. Der Agent hat dies nicht explizit als Risiko markiert.

**Prozess-Finding PF-2:** Aufgabe 2d (Gegenpruefung) im Agent-Prompt fordert "Balance plausibel?" — aber es fehlt eine Heuristik fuer quantitative Stoffdichte-Schaetzung. Der Agent koennte pro Mappe eine "Ereignis-Zaehlung" machen (wie viele distinkte Ereignisse/Konzepte?) als Proxy fuer Stoffumfang.

### QD6 AFB-Progression — **PASS**

M1=I-II → M2=II → M3=II-III → M4=II-III. Monoton steigend. M3→M4 bei gleichem AFB ist begruendet (unterschiedliche Prozesskompetenz).

### QD7 Ethik-Abdeckung — **PASS**

Multiperspektivitaet, Sensibilitaet, Ueberwaetigungsverbot, Kontroversitaet (Dolchstosslegende), Aktualitaetsbezug (Drohnen, Desinformation). Differenzierter als Game 1.

### QD8 Strukturvorgaben — **PASS**

Artikulationsstruktur, Narrativ-Rahmen (Zeitungsreporter-Fortsetzung mit Tonwandel), Differenzierungshinweise (3 Stufen mit Beispiel). Vorgaenger-Anschluss explizit dokumentiert.

---

## 2. Gate-Urteil (extern)

**PASS mit 1 WARN (QD1).**

Der WARN ist ein *Prozess-Problem*, nicht ein *Output-Problem*: Der DIDAKTIK_RAHMEN ist inhaltlich plausibel, aber die KE-IDs koennen nicht formal verifiziert werden, weil die Datenquelle fehlt.

---

## 3. Prozess-Findings

| # | Finding | Typ | Betroffene Komponente | Severity |
|---|---|---|---|---|
| PF-1 | KE-Verifikation ohne Fachlehrplan-Datei nicht zuverlaessig moeglich | Infrastruktur-Luecke | AGENT_DIDAKTIK + Repo | **HIGH** |
| PF-2 | Keine quantitative Stoffdichte-Heuristik in Aufgabe 2d (Balance-Pruefung) | Agent-Prompt-Luecke | AGENT_DIDAKTIK H-Heuristiken | MEDIUM |
| PF-3 | Dolchstosslegende wird als "propagandistischer Mythos" eingestuft — korrekt, aber die Formulierung im Ethik-Hinweis koennte als Werteurteil statt als Sachaussage gelesen werden | Formulierungs-Praezision | Testrun-Output | LOW |
| PF-4 | Output enthaelt "Hinweis zur KE-Verifikation" Disclaimer — das ist gut fuer Transparenz, aber ein produktionsreifer Agent sollte diesen Disclaimer nicht brauchen (PF-1 loest PF-4) | Symptom von PF-1 | Testrun-Output | INFO |
| PF-5 | Mappen-Titel ("Leben im Schuetzengraben", "Die Maschine Krieg") sind ansprechend, aber Aufgabe 2c im Agent-Prompt fordert keinen Mappen-Titel — nur "Thematischer Schwerpunkt". Titel sind ein informelles Add-on. | Agent-Prompt-Luecke | AGENT_DIDAKTIK Aufgabe 2c | LOW |

---

## 4. Vergleich: Agent-Ausfuehrung vs. Manuell

| Dimension | Agent-Ausfuehrung (Testrun) | Manuell (Game 1) |
|---|---|---|
| Mappen-Aufteilung | 4 klar abgegrenzte thematische Cluster, chronologisch sinnvoll, Vorgaenger-Anschluss explizit | 4 Mappen, thematisch klar, aber ohne Vorgaenger-Referenz (erstes Game) |
| KE-Zuordnung | KE-Matrix mit Haupt-/Nebenzuordnungen, Scope-Abgrenzung | KE-Matrix vorhanden, keine Scope-Abgrenzung |
| Teilziele | Dreigliedrig, messbar, AFB-Zuordnung | Dreigliedrig, messbar — qualitativ vergleichbar |
| Ethik | Breiter (5 Aspekte + Dolchstosslegende + Aktualitaetsbezuege) | 5 Aspekte, weniger spezifisch |
| Self-Check | Q-Gate QD1-QD8 mit Evidenz dokumentiert | Kein Self-Check |
| Schwachstelle | QD1 nicht formal pruefbar (Fachlehrplan fehlt) | Gleiche Schwachstelle, aber nicht sichtbar |

**Kern-Erkenntnis:** Die Agent-Ausfuehrung produziert ein qualitativ gleichwertiges bis besseres Ergebnis als die manuelle Erstellung — mit dem entscheidenden Vorteil der Transparenz (Self-Check, Scope-Abgrenzung). Die einzige Blocker-Luecke (PF-1) ist eine fehlende Referenz-Datei, kein Agent-Prompt-Problem.

---

## 5. Empfohlene Massnahmen

| # | Massnahme | Priority | Aufwand |
|---|---|---|---|
| M1 | KE-Katalog erstellen: `docs/referenz/KE_KATALOG_GPG_R7.md` — User-validierte Kompetenzerwartungen mit offiziellen IDs | **HIGH** | S (einmalig, ~30 Min User-Arbeit) |
| M2 | AGENT_DIDAKTIK Aufgabe 2c: Pflicht-Output "Mappen-Titel" ergaenzen | LOW | S |
| M3 | AGENT_DIDAKTIK Heuristik H7 ergaenzen: Stoffdichte-Zaehlung pro Mappe (Anzahl distinkte Ereignisse/Konzepte, Warnung bei >6) | MEDIUM | S |
| M4 | Ethik-Hinweis Dolchstosslegende: Formulierung von "propagandistischer Mythos" zu "wissenschaftlich widerlegte Behauptung" praezisieren (User-Entscheidung) | LOW | S |
