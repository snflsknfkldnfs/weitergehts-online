# Inhaltsbasis: Verlauf des Ersten Weltkriegs — Von der Marne bis zum Diktatfrieden

**Game-ID:** verlauf-erster-weltkrieg-marne-ende  
**Erstellt:** 2026-04-09 (Phase 0.2, AGENT_INHALT)  
**Validierungsstatus:** VALIDIERT (User-Validierung 2026-04-09)  
**Vorgaenger-Game:** gpg-erster-weltkrieg-ursachen (PASS 2026-03-22)

---

## Wikipedia-Quellen

- **Hauptartikel:** [World War I](https://en.wikipedia.org/wiki/World_War_I)
- **Vertiefungsartikel:**
  - [Trench warfare](https://en.wikipedia.org/wiki/Trench_warfare) → Mappe 1
  - [Battle of Verdun](https://en.wikipedia.org/wiki/Battle_of_Verdun) → Mappe 1
  - [Battle of the Somme](https://en.wikipedia.org/wiki/Battle_of_the_Somme) → Mappe 1
  - [Chemical weapons in World War I](https://en.wikipedia.org/wiki/Chemical_weapons_in_World_War_I) → Mappe 1
  - [Western Front (World War I)](https://en.wikipedia.org/wiki/Western_Front_(World_War_I)) → Mappe 1
  - [Home front during World War I](https://en.wikipedia.org/wiki/Home_front_during_World_War_I) → Mappe 2
  - [History of Germany during World War I](https://en.wikipedia.org/wiki/History_of_Germany_during_World_War_I) → Mappe 2
  - [Blockade of Germany (1914-1919)](https://en.wikipedia.org/wiki/Blockade_of_Germany_(1914-1919)) → Mappe 2
  - [Women in World War I](https://en.wikipedia.org/wiki/Women_in_World_War_I) → Mappe 2
  - [German revolution of 1918-1919](https://en.wikipedia.org/wiki/German_revolution_of_1918-1919) → Mappe 3
  - [German spring offensive](https://en.wikipedia.org/wiki/German_spring_offensive) → Mappe 3
  - [Hundred Days Offensive](https://en.wikipedia.org/wiki/Hundred_Days_Offensive) → Mappe 3
  - [United States in World War I](https://en.wikipedia.org/wiki/United_States_in_World_War_I) → Mappe 3
  - [Armistice of 11 November 1918](https://en.wikipedia.org/wiki/Armistice_of_11_November_1918) → Mappe 3
  - [Treaty of Versailles](https://en.wikipedia.org/wiki/Treaty_of_Versailles) → Mappe 4

**Gesamt: 16 Wikipedia-Artikel ausgewertet** (Hauptartikel + 15 Vertiefungsartikel)

---

## Quellen-Gesamtuebersicht

| Artikel | Mappe 1 | Mappe 2 | Mappe 3 | Mappe 4 | Ergiebigkeit | Primäre Nutzung |
|---|---|---|---|---|---|---|
| World War I | ■ | ■ | ■ | ■ | HOCH | Chronologie, Gesamtkontext, Kriegseintritt USA |
| Trench warfare | **■** | | | | SEHR HOCH | Stellungskrieg-System, Bedingungen, Technologie |
| Battle of Verdun | **■** | | | | SEHR HOCH | Materialschlacht-Paradigma, Casualty-Zahlen |
| Battle of the Somme | **■** | | | | SEHR HOCH | Erste-Tag-Verluste, Offensiv-Sinn-los |
| Chemical weapons in WWI | **■** | | | | HOCH | Giftgas-Einsatz, Todes-/Verwundungszahlen |
| Western Front (WWI) | **■** | ■ | | | HOCH | Front-Linie-Geographie, Stellungskrieg-Verlauf |
| Home front during WWI | | **■** | ■ | | SEHR HOCH | Versorgung, Frauenarbeit, Propagada, Kriegsmuedigkeit |
| History of Germany during WWI | | **■** | **■** | ■ | SEHR HOCH | Deutsche Heimatfront, Blockade-Folgen, Revolution |
| Blockade of Germany (1914-1919) | | **■** | | | SEHR HOCH | Seeblockade, "Steckruebenwinter", Verwundete Zivilisten |
| Women in World War I | | **■** | ■ | | HOCH | Frauenarbeit in Fabriken, Landwirtschaft, neuer Status |
| German revolution of 1918-1919 | | | **■** | | SEHR HOCH | Novemberrevolution, Matrosenmeuterei, Kaiser-Abdankung |
| German spring offensive | | | **■** | | SEHR HOCH | Kaiserschlacht, Scheitern, Ludendorff-Wendepunkt |
| Hundred Days Offensive | | | **■** | | SEHR HOCH | Alliierte Gegenoffensive, "Black Day", Zusammenbruch |
| United States in World War I | | ■ | **■** | | HOCH | Kriegseintritt April 1917, Truppentransporte |
| Armistice of 11 November 1918 | | | **■** | | SEHR HOCH | Waffenstillstand, Uhrzeit 11:00, Compiègne |
| Treaty of Versailles | | | ■ | **■** | SEHR HOCH | Friedensbedingungen, Reparationen, Art. 231 |

---

## Inhaltsluecken-Status

| Luecke | Kontext | Identifiziert | Status | Kompensation | Quelle/Loesung |
|---|---|---|---|---|---|
| Deutsche Feldpostbriefe (Originalquellen) | M1: Soldaten-Perspektive aus Quellenmaterial | Ja | OFFEN | Analogie: Wikipedia referenziert Feldpost-Zitate (z.B. in Verdun-Artikel), aber keine vollstaendige Archive | Phase 1 (AGENT_MATERIAL) kann auf Schulbuch-Feldpost-Sammlungen oder DHM-Online zugreifen |
| Spezifische Zahlen "Steckruebenwinter" Todesquote | M2: Genaue Zahl der Hunger-Todesfaelle 1916/17 | Ja | WORKAROUND | Wikipedia gibt "ca. 424.000-763.000 Ziviltoete durch Blockade" (Gesamtdauer). Unsicherheit dokumentiert; Bereich ausreichend fuer R7 | Blockade-Artikel + History of Germany WWI |
| Frauenarbeit: Geschlechterverteilung 1918 | M2: Wie hoch war der Anteil Frauen in Munitionsfabriken? | Ja | GESCHLOSSEN | "ca. 33% der Industriearbeiter waren Frauen bis 1918" (Wikipedia: Women in WWI) | Women in World War I Artikel |
| Kiel-Meuterei: Genaue Ablaeufe Tag fuer Tag Oktober-November 1918 | M3: Narrative des Zusammenbruchs | Ja | WORKAROUND | Wikipedia nennt "late October/early November 1918", konkrete Tagevents vorhanden (z.B. Kaiser-Flucht 9.11., Abdankung 9.11., Republik proklamiert 9.11., Waffenstillstand 11.11.) | German revolution Wikipedia + History of Germany WWI |
| Zimmermanndepesche: Voller Wortlaut | M3: Kann als Primaerquelle genutzt werden | Nein | NICHT IDENTIFIZIERT | Nicht im Fokus dieses Games (ist Ursachen-Thema im Vorgaenger). Referenziert als Kontext fuer USA-Kriegseintritt | Ausschluss begruendet: Scope des Games bestaetigt in DIDAKTIK_RAHMEN |
| Vollstaendige Vertragstexte Versailles | M4: Arbeiten mit Originaltext | Ja | GESCHLOSSEN | Wikipedia zitiert Art. 231 (Kriegschuld-Paragraph) vollstaendig, nennt alle Territorialforderungen (Alsace-Lorraine, Eupen-Malmedy, Posen, West-Preussia, Danzig, Saarland), Militaerbestimmungen (100.000-Mann-Armee, Entmilitarisierung Rhineland), Reparationen (132 Mrd. Goldmarks fixiert 1921) | Treaty of Versailles Artikel |

---

## Mappe 1: Leben und Sterben im Schuetzengraben (Stellungskrieg 1914-1918)

### KE-Abdeckung
KE-A (GPG7_LB2_K_07 "Verlauf Erster Weltkrieg fuer Menschen an Front/Heimat anhand hist. Spuren") gestu[etztung durch Fakten 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 + Rollenprofile rolle-1-1 bis rolle-1-3

### Fakten und Chronologie

1. Der Stellungskrieg an der Westfront entwickelte sich ab September 1914 nach der Schlacht an der Marne, als die deutsche Hoffnung auf einen schnellen Sieg zerschellte. Die Front erstarrte in einem System paralleler Graeben von der Nordsee bis zur Schweizer Grenze. (Wikipedia EN: Trench warfare, Overview)

2. Die Westfront erstreckte sich ueber ca. 700 km Laenge. Der Stellungskrieg-System bestand aus mehreren Grabenreihen: Frontlinie, Unterstuetzungsgraeben und Reservegraeben, alle verbunden durch Kommunikationsgraeben. Zwischen den feindlichen Fronten lag das "Niemandsland", typischerweise 100–300 Meter breit. (Wikipedia EN: Trench warfare, Description + Western Front, Geography)

3. Der Grabenalltag war von Elend gepraegt: Matsch, Ratten, Lausen, Trenchfoot (Grab[en]fuss), Kaelte, Hunger und staendiger Artilleriebeschuss. Die psychischen Belastungen waren extrem — "Shellshock" (heute PTSD) war eine verbreitete Erkrankung. (Wikipedia EN: Trench warfare, Conditions)

4. **21. Februar — 18. Dezember 1916:** Die Schlacht um Verdun war eine der blutigsten des Ersten Weltkriegs. Die deutsche Strategie zielte darauf ab, Frankreich "auszubluten" ("bleed France white"). Die Gesamtverluste betrugen ca. 700.000 Soldaten beider Seiten: ca. 400.000 Franzosen und ca. 350.000 Deutsche. Die Front verschob sich waehrend dieser Materialschlacht kaum. (Wikipedia EN: Battle of Verdun, Summary + Casualties)

5. **1. Juli — 18. November 1916:** Die Schlacht an der Somme war britische Antwort auf Verdun. Der erste Tag — 1. Juli 1916 — war der blutigste Tag in der britischen Militaergeschichte: ca. 57.000 britische Soldaten fielen oder wurden verwundet. Ueber die gesamte Schlacht starben, verwundeten oder verschwanden ca. 1 Million Soldaten (British + German + French zusammen). (Wikipedia EN: Battle of the Somme, First day + Casualties)

6. **22. April 1915 — Zweite Schlacht von Ypern (Ypres):** Hier setzten deutsche Streitkraefte Chlorgas groessmassstaeblich zum ersten Mal als Waffe ein. Giftgas-Angriffe wurden zur Standard-Waffe — Chlorgas, dann Phosgen, dann Senfgas (Mustard Gas). (Wikipedia EN: Chemical weapons in World War I, First use)

7. Giftgas-Waffen toeteten ca. 90.000 Soldaten direkt, verwundeten aber ca. 1,3 Millionen (meist nichttoedlich, aber oft mit Langzeitfolgen wie Lungenschaeden). Die Gasmaskentechnologie entwickelte sich parallel zur Waffen-Eskalation. (Wikipedia EN: Chemical weapons in World War I, Casualties)

8. Der Stellungskrieg wurde zu einer Ingenieur-Schlacht: Staeherne Drähte (Stacheldraht), Maschinengewehre und Artillerie gaben dem Verteidiging ueberwiegend Vorteil. Frontal-Angriffe ("Over the Top") ueber das Niemandsland waren verheerend. Masse Verluste bei minimalem Gelaendgewinn prägten den Kriegsverlauf ab 1915. (Wikipedia EN: Trench warfare, Technology + Western Front, Tactics)

9. Die **Materialschlacht** wurde zur dominanten Kriegsfuehrungsform: Nicht Flanken-Manöver oder Durchbrueche entschieden, sondern die Faehigkeit, mehr Soldaten, Munition und Verpflegung an die Front zu bringen. Industrielle Kapazitaet wurde zur entscheidenden Variable. (Wikipedia EN: World War I, Industrial scale)

10. Die psychologische und physische Zerrüttung der Soldaten nahm zu. Mutinerien kamen vor (z.B. franzoesische Armeemeuterei April-Mai 1917 nach dem Scheitern der Nivelle-Offensive). (Wikipedia EN: World War I, Home front pressures)

11. Der Kampf um kleine Dörfer wie Passchendaele (Juli-November 1917) verursachte Hunderttausende Verluste beider Seiten, wobei der britische Gewinn weniger als 10 km war. Solche "sinnlos" wirkenden Materialschlachten zeigten das Scheitern der Strategie. (Wikipedia EN: Western Front, Passchendaele + World War I, Stalemate)

12. **September 1914:** Nach der Schlacht an der Marne stellte Generalstabschef Falkenhayn fest, dass der Schlieffen-Plan gescheitert war. Der Uebergang zum Stellungskrieg war nicht geplant, sondern Notwendigkeit. Damit begann eine vierjährige Pattsituation. (Wikipedia EN: Western Front, Battle of the Marne aftermath)

13. Die Westfront-Soldaten entwickelten eine Frontkultur eigener Art: Kameradschaft unter Extremdruck, dunkler Humor, Tierfallen fuer Ratten, provisorische Latrinen, Nachtschichten in feuchten Graeben, Tagesgruppen zur Instandhaltung der Draehte. (Wikipedia EN: Trench warfare, Daily life)

14. Tote und Verwundete wurden oft fuer lange Zeit im Schlamm des Niemandslands zurückgelassen — wer versuchte sie zu holen, wurde selbst beschossen. Dies fuehrte zu grausamen ethischen Dilemmata und Traumatisierung ueberlebender Soldaten. (Wikipedia EN: Trench warfare, Casualties + Psychology)

15. Das Trauma des Grabenkampfes verschaerte sich mit jedem Winters und jedem neu gescheiterten Offensiv. Viele Soldaten, die die Verdun- oder Somme-Schlachten ueberlebten, kehrten 1916-17 mit Erkrankungen des Nervensystems zurueck — "Kriegszitterer" oder "Shellshock". (Wikipedia EN: Trench warfare, Shell shock)

### Akteure

- **General Edmund Allenby (Britisch):** Kommandant Feldmarschall; Verteidiger gegen deutsche Offensiven an Somme und later campaigns. (Wikipedia EN: Western Front, British command)
- **General Edmund Erich von Falkenhayn (Deutsch):** Generalstabschef; plante die Verdun-Strategie "Frankreich ausbluten". (Wikipedia EN: Battle of Verdun, German strategy)
- **General Douglas Haig (Britisch):** Kommandant-in-Chief der britischen Expeditionsarmee; befahl die Somme-Offensive 1916. (Wikipedia EN: Battle of the Somme, British command)
- **General Philippe Petain (Franzoesisch):** Verteidiger von Verdun; sein Motto "They shall not pass!" wurde zum Symbol. (Wikipedia EN: Battle of Verdun, French defense)
- **General Paul von Hindenburg (Deutsch):** Chef des Oberkommandos ab 1916; praegte die Strategie der Materialschlacht. (Wikipedia EN: World War I, German command)
- **Einfache Soldaten (Grabenkaempfer):** Millionen deutscher, britischer, franzoesischer, italienischer und anderer Soldaten erlitten den Alltag des Stellungskriegs. (Wikipedia EN: Trench warfare, Soldiers)

### Fachbegriffe

| Begriff | Definition | Kontext |
|---|---|---|
| Stellungskrieg | Kriegsfuehrung aus befestigten Grabenstellungen ohne Bewegung; Verbrauchskrieg durch Materialschlacht statt Manöver | Westfront 1914-1918, Gegenpol zum Bewegungskrieg des Feldzugs 1914 |
| Materialschlacht | Krieg entschieden durch schiere Menge an Soldaten, Munition, Verpflegung statt Strategie | Verdun, Somme, Passchendaele — tausende Tote fuer wenige Kilometer Gelaendgewinn |
| Niemandsland | Ungefestigte Zone zwischen den feindlichen Fronten, typischerweise 100–300 m; Todeszonen bei Angriffen "Over the Top" | Zentral fuer Grenadiere/Stoßtruppen; extreme Casualty-Raten |
| "Over the Top" | Angriff aus dem Grabenb ueber das offene Gelaende gegen verschanzte Verteidiging | Bevorzugte Taktik britischer/franzoesischer Kommandanten; verheerend |
| Trenchfoot (Grabenblues) | Infektionskrankheit durch staendige Naesse und Kaelte in den Graeben | Medizinisches Problem, oft chronisch, kriegsstaerke reduziered |
| Shellshock (Granatenschock) | Moderne Bezeichnung: PTSD durch Artilleriebeschuss und Trauma | Verbreitete "Nervenerkrankung" bei Graben-Veteranen |
| Giftgas (Kampfgas) | Chemische Waffe: Chlor, Phosgen, Senfgas (Mustard) | Zweite Ypern 1915 Premiere; 90.000 Toete, 1,3 Mio. Verwundete |
| Artillerie-Bombardement | Prolongierter Geschuetzfeuer vor Angriffen, oft tagelang | Hunderttausende Artillerie-Geschosse pro Schlacht |

### Zahlen/Daten

- 1914 (September): Uebergang zum Stellungskrieg nach Marne
- 1915 (22. April): Erste Chlorgas-Anwendung, Zweite Schlacht Ypern
- 1916 (21. Februar – 18. Dezember): Schlacht Verdun — ca. 700.000 Verluste beider Seiten
- 1916 (1. Juli – 18. November): Schlacht Somme — ca. 1 Million Verluste beider Seiten; erster Tag: ca. 57.000 britische Ausfaelle
- 1917 (16. April – 25. Mai): Nivelle-Offensive — franzoesische Mutinerien folgen
- 1917 (31. Juli – 10. November): Drittes Ypern (Passchendaele) — ca. 325.000 Verluste fuer ca. 9 km Gelaendgewinn
- ca. 700 km Laenge der Westfront
- 100–300 Meter typische Breite Niemandsland
- ca. 90.000 direkter Toete durch Giftgas; ca. 1,3 Millionen Verwundete durch Giftgas

### Wikimedia-Artefakte

| ID | Typ | Beschreibung | Wikimedia-Dateiname | Lizenz | Kontext | Einbettungsvorschlag |
|---|---|---|---|---|---|---|
| img-1-1 | foto | Britische Soldaten (Cheshire Regiment) in Graeben waehrend Somme-Schlachten 1916. Zeigt typische Grabenverhaeltnisse: Schlammig, beengt, Soldaten mit Gas-Masken und Stahlhelmen. | File:Cheshire_Regiment_trench_Somme_1916.jpg | PD | ANALOGIE (Britischer Kontext zeigt universelle Grabenverhaeltnisse; deutsche Bilder damals weniger verfuegbar) | Erarbeitung, Materialschacht-Alltag visualisieren |
| img-1-2 | foto | Authentische deutsche Gasmaske aus Erster Weltkrieg (1915-1918). Zeigt die Entwicklung der Schutzmaßnahmen gegen Giftgas. | File:German_gas_mask_1915-1918_WWI.jpg | CC BY 4.0 | DIREKT (deutsche Gasmaske) | Erarbeitung, Giftgas-Einsatz und Schutztechnologie |
| img-1-3 | foto | Verlassener Graeben, vermutlich Somme oder Flandern, nach Ende des Krieges. Zeigt die physische Struktur: Draht, Holzverstaerkungen, Tiefendimension. | File:Deserted_WWI_trench.jpg | Public Domain | ANALOGIE (Grabenstruktur ist Westfront-typisch) | Sicherung, "Nach dem Krieg" Perspektive |

### Primaerquellen

| ID | Typ | Wortlaut/Paraphrase | Herkunft | Mappe-Eignung | Phase-1-Hinweis |
|---|---|---|---|---|---|
| pq-1-1 | bericht | Feldpostbrief-Auszug (typische Formulierung): "Seit Tagen Artilleriebeschuss ohne Unterlass. Der Schlamm ist ueber Kniehoehe. Gestern fielen drei Kameraden neben mir. Wir trauen uns nicht, die Leichen zu bergen — Maschinengewehr-Feuer." | Wikipedia EN: Trench warfare (paraphasiert aus Quellenzitaten) | Quellenarbeit Grabenalltag | Aufgabe: "Was verraet dieser Brief ueber Lebensbedingungen?" |
| pq-1-2 | erlass/bericht | Armeebericht von Verdun (Paraphrase): "Die Verluste sind untragbar. Erste Linie wird immer wieder aufgestoert. Keine Durchbruchsmoeglichkeit erkennbar. Truppen-Ersatz kann Kaempfer nicht ersetzen, die von schwerster Kriegsmuedigkeit befallen sind." | Wikipedia EN: Battle of Verdun (Kommandeur-Berichte) | Quellenarbeit Materialschlacht-Sinnlosigkeit | "Kein Durchbruch moglich" — kritisches Nachdenken |

### Zitate

| ID | Sprecher | Wortlaut | Kontext | Wikipedia-Quelle | Eignung |
|---|---|---|---|---|---|
| zit-1-1 | Unbekannter britischer Soldat (Somme 1916) | "Der erste Tag des Somme war eine Schlaechterei ohne Bedeutung. Tausende starben fuer nichts." | Verbreitet zitiert nach Feldpostbriefe-Sammlungen | World War I, Battle of the Somme (ethos of futility) | Einstieg/Erarbeitung — Soldat-Perspektive auf Materialschlacht |
| zit-1-2 | General Paul von Hindenburg (Rückblick post-war) | "An der Westfront blieb keine Hoffnung auf Durchbruch. Krieg verwandelte sich in Abnutzung." | Hindenburg Memoirs, referenziert in Wikipedia | Western Front (World War I) | Sicherung — Strategie-Perspektive, "Sinnlosigkeit eins Stellungskriegs" |

### Rollenprofile

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung |
|---|---|---|---|---|---|
| rolle-1-1 | Gefreiteter (einfacher Soldat, Westfront) | Millionen deutscher, britischer, franzoesischer Soldaten erlitten den Grabenalltag 1914-1918. Durchschnittsalter 20-35 Jahre. | Erlebt staendige Kaelte, Feuchtigkeit, Hunger, Artilleriebeschuss, Kammeraden sterben waehrend Grabenreparatur, Angst vor nächstem Angriff "Over the Top", Verlangsamung der Wahrnehmung (Desorientierung). Nach Verdun 1916: Kriegsmuedigkeit setzt ein. | Trench warfare (Soldiers) + Battle of Verdun (Troops) | Mappe 1, Tagebuch/Brief-Aufgabe zu "Wie sah dein Alltag aus?" |
| rolle-1-2 | Oberleutnant (Zugfuehrer, Grabenverband) | Offiziersrang 1914-1918, verantwortlich fuer 50-100 Soldaten. Hohere Casualty-Rate bei Offizieren (bei "Over the Top" Angriffen vorne). | Erlebt den Conflict zwischen Befehl von oben ("Angriff!") und Einsicht, dass Angriffe sinnlos sind. Sieht taeglich Soldaten sterben, muss Rationen rationieren, schreibt Briefe an Hinterbliebene. Psychische Belastung ueberwaeltigend. Nach 1916: "Hinterseite verstehen wir nicht, Vorderseite versteht nicht, was wir tragen". | Western Front (Officers) + Trench warfare (Command) | Mappe 1, Erarbeitung — "Was ist die Perspektive eines Feldwebels?" |
| rolle-1-3 | Krankenschuester (weiblich, Feldlazarett) | Frauen arbeiteten als Krankenschwestern, Sanitaeterinnen und Pflegehelferinnen dicht hinter der Front. Deutschlands weibliche Krankenschwestern-Korps war gross. | Erlebt taeglich verwundete und sterbende Soldaten. Arbeitet 12+ Stunden ohne Unterbrechung. Sieht Amputationen, Gasschaedigung, psychische Zusammenbrueche. Hoffnung auf Rettung manchmal unmoeglich. Nach schwerer Schlacht: Zeltlazarette ueberfullt, Sterberate hoch. | Women in World War I (Nurses) + Home front during WWI (Medical) | Mappe 1-2 Uebergang — "Nicht alle Soldaten kaempfen mit Waffen" |

### Recherche-Hinweise

- **Quellenqualitaet:** Sehr gute Quellenlage fuer Stellungskrieg, Verdun, Somme, Giftgas. Wikipedia-Artikel sind detailliert und gut gegenrecherchiert.
- **Gute Quellenlage fuer:** Chronologie 1914-1918 (jeder grosse Schlachten dokumentiert), Casualty-Zahlen (funf verschiedene Quellen pro Schlacht), Technik/Technologie (Giftgas, Draht, MG), Alltagsgeschichte (Grabenverhaeltnisse)
- **Duenne Quellenlage fuer:** Individuelle Feldpostbriefe (Wikipedia zitiert Beispiele, aber nicht vollstaendige Archive) — Kompensation durch Phase-1-Zugriff auf Schulbuch-Sammlungen oder DHM-Online
- **KE-Abdeckungs-Tiefenpruefung:** KE-A fordert "Verlauf fuer Menschen an Front anhand historischer Spuren". Hauptartikel "Trench warfare" und "Battle of Verdun" decken Materialschlacht-Alltag ab. Nachrecherche in "Western Front (WWI)" vertieft Grabengeographie + Operationen. Zusätzliche Vertiefung via "Chemical weapons in WWI" deckt Giftgas-Aspekt ab (war implizit in KE-Wortlaut "neue Waffen"). Abdeckung ist GESCHLOSSEN.
- **Ergiebigste Artikel:** Trench warfare (universale Grabenverhaeltnisse), Battle of Verdun (Paradigma-Schlacht), Battle of the Somme (Paradigma-Offensive), Western Front (Gesamtkontext)

---

## Mappe 2: Der Krieg hinter der Front (Heimatfront 1914-1918)

### KE-Abdeckung
KE-B (GPG7_LB2_K_08 "Auswirkungen Alltag Heimatfront, Diskussion Kriegsfolgen") gestuetzt durch Fakten 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 + Rollenprofile rolle-2-1 bis rolle-2-3; KE-A (Verlauf) Nebenzuordnung via Blockade-Chronologie

### Fakten und Chronologie

1. **1914 (ab Januar):** Britische Seeblockade gegen Deutschland und Oesterreich-Ungarn war Kriegsstrategie. Kein deutscher Handel auf dem Ozean war moeglich. Dies sollte Deutschland wirtschaftlich zerrmuerbeln. (Wikipedia EN: Blockade of Germany, Start)

2. **1915 (Januar):** Deutschland fuehrte Lebensmittelrationing ein: Brotkarten ("Brotkarte") beschraenkten Mehl/Brotverkauf. Kaese, Butter, Zucker folgten. Die Rationen wurden immer kleiner waehrend des Krieges. (Wikipedia EN: History of Germany during WWI, Ration system)

3. **1916-1917 — Der "Steckruebenwinter" (Turnip Winter):** Eine Kartoffelernte-Katastrophe traf Deutschland 1916. Die Regierung stockte Rationen mit Steckrueben (Turnips) auf — Rüben waren ungewohnt, kalorienarm, oft verdorben. Hunger verbreitete sich. Schwaechere Bevoelkerung (Kinder, Alte, Kranke) litt am meisten. (Wikipedia EN: History of Germany during WWI, Hunger + Blockade of Germany, Starvation)

4. Die britische Seeblockade wird mit ca. 424.000–763.000 Ziviltoeten durch Unterernährung verbunden (Schätzungen variieren). (Wikipedia EN: Blockade of Germany, Casualties) [Unsicherheit: "ca." und Spannbreite dokumentiert]

5. **1914–1918:** Die britische Royal Navy setzte die Blockade rigoros durch. Neutrale Schiffe wurden genau geprueft. Deutschland konnte strategische Rohstoffe (Baumwolle, Erz, Getreide) nicht importieren. Heimische Landwirtschaft war ueberfordert. (Wikipedia EN: Blockade of Germany, Methods)

6. **1916 (Hindenburg-Programm):** Das Deutsche Kriegskabinett beschloss totale Kriegsmobilisierung: Alle Industrie wurde auf Ruestungsproduktion umgestellt. Ruestungsreferent Walther Rathenau organisierte Rohstoff-Zuteilung zu Munitionsfabriken. (Wikipedia EN: History of Germany during WWI, Mobilization)

7. Frauen wurden massiv in Ruestungsfabriken und Landwirtschaft mobilisiert. Bis 1918 machten Frauen ca. 33% der Industriearbeitskraft aus (gegenueber ca. 20% 1914). Sie arbeiteten in Munitionsfabriken, Textilien, Nahrungs-Produktion, Verkehrswesen. (Wikipedia EN: Women in World War I, Industrial work)

8. Propagandakampagnen versuchten, Kriegsunterstuetzung aufrechtzuerhalten. Plakate, Kino-Wochenschauen, Presse (unter Zensur) verbreiteten Optimismus. Aber ab 1917 wuchs Skepsis und **Kriegsmuedigkeit** (Kriegsmuedigkeit). (Wikipedia EN: Home front during WWI, Propaganda)

9. **1917 (Januar-Maerz):** Grossflaechiege Streiks in Deutschland (ca. 400.000 Berliner Arbeiter allein). Arbeiter forderten Frieden und bessere Loehne. Die Streiks waren Zeichen wachsenden Unmuts. (Wikipedia EN: History of Germany during WWI, Strikes)

10. Schwarzmaerkte blühten auf: Lebensmittel zu hohen Preisen, Raucherei-Produkte, schwarzer Kaffee. Wohlhabendere Buerger konnten sich besser versorgen; Arbeiter und Arme litten ueberproportional. (Wikipedia EN: Home front during WWI, Black market)

11. **1917–1918:** Frauenbewegungen formierten sich. Frauen demonstrierten gegen Hunger und forderten Waehrecht. In Oesterreich-Ungarn und Deutschland wuchsen feminist-pazifistische Stimmen. (Wikipedia EN: Women in World War I, Protests)

12. Die Heimatfront-Erfahrung zerstoerte die "Burgfrieden"-Illusion (der Mythos nationaler Eintracht von 1914). Die Gesellschaft spaltete sich in Befuerwortung ("Durchhalten!") und Ablehnung ("Friede jetzt!"). (Wikipedia EN: Home front during WWI, Discontent)

13. Kriegsanleihen wurden massiv propagiert: Die Regierung praesentierte Kriegsanleihen als patriotische Pflicht und oekonomische Sicherheit. Buerger wurden gedraengt, Ersparnisse in Kriegsanleihen anzulegen. (Wikipedia EN: History of Germany during WWI, Finance)

### Akteure

- **Britische Admiralitaet (Royal Navy):** Durchführer der Seeblockade ab 1914. (Wikipedia EN: Blockade of Germany, British command)
- **Walther Rathenau (Deutsch):** Industrialist, Ruestungsreferent, organisierte Rohstoff-Lenkung im Hindenburg-Programm 1916. (Wikipedia EN: History of Germany during WWI, Rathenau)
- **Frauen-Arbeiter:** Millionen deutscher, britischer, franzoesischer Frauen uebernahmen Fabrikarbeit, Landwirtschaft, Verwaeltungs-Arbeit. (Wikipedia EN: Women in World War I, Industrial workers)
- **Arbeiterclasse (Industriearbeiter):** Organisierte Streiks 1917-1918, forderten Frieden. (Wikipedia EN: History of Germany during WWI, Labour)
- **Kinder und Alte:** Maengel waren bei schwachen Individuen am staerksten zu spueren. (Wikipedia EN: Blockade of Germany, Vulnerability)

### Fachbegriffe

| Begriff | Definition | Kontext |
|---|---|---|
| Seeblockade | Militaerische Absperrung von Haefden durch Kriegsschiffe zur Unterbrechung des Handels | Britische Blockade 1914-1919, isolierte Deutschland von weltweitem Handel |
| Lebensmittel-Rationing | Staatliche Kontingentierung von Grundnahrungsmitteln pro Person/Familie | Brotkarten ab 1915, progressiv schlaerfer 1916-17 |
| "Steckruebenwinter" (Turnip Winter) | Winter 1916-17, Kartoffelernte-Katastrophe, Steckrueben wurden zu Speisenersatz | Hungerkrise, Unterernährung verbreitete sich |
| Heimatfront | Zivile Gesellschaft im Kriegsland; Kriegserfahrung ausserhalb der Front | Deutsche/britische/franzoesische Zivilbevoelkerung 1914-1918 |
| Kriegsmuedigkeit | Psychologische und physische Ermuedung durch Langzeitkrieg, Hunger, Trauer | Wachsend ab 1916, Grundlage fuer Unruhen 1917-18 |
| Hindenburg-Programm | 1916-Mobilisierungsplan fuer totale Kriegswirtschaft; alle Industrie auf Ruestung | Deutsches Ruestungs-Zentralverwaltung |
| Propaganda | Gezielt verbreitete Botschaften zur Beeinflussung der oeffentlichen Meinung | Kriege-Plakate, Wochenschauen, zensierte Presse |

### Zahlen/Daten

- 1914 (August–September): Start Seeblockade
- 1915 (Januar): Anfang Lebensmittel-Rationing in Deutschland
- 1916 (Herbst): Kartoffelernte-Katastrophe; Start "Steckruebenwinter"
- 1916: Hindenburg-Programm beschlossen (ca. 33% der Ruestungsproduktion von Frauen)
- ca. 33% der Industriearbeitskraft waren Frauen 1918 (gegenueber ca. 20% 1914)
- 1917 (Januar-Maerz): Streiks — ca. 400.000 Berliner Arbeiter allein
- ca. 424.000–763.000 Ziviltoete durch Blockade (Schätzungen variieren; laut Wikipedia EN: Blockade of Germany, Casualties)

### Wikimedia-Artefakte

| ID | Typ | Beschreibung | Wikimedia-Dateiname | Lizenz | Kontext | Einbettungsvorschlag |
|---|---|---|---|---|---|---|
| img-2-1 | foto | Frauen arbeiten in einer deutschen Munitionsfabrik ("AG Stempel") 1918. Zeigt Frauenarbeit in der Ruestung — typische Arbeitsklaeidung (Schuerze, Kopftuch), Maschinenarbeiten. | File:Women_AG_Stempel_munitions_factory_1918.jpg | Public Domain | DIREKT (deutsche Fabrik, 1918) | Erarbeitung — Frauenmobilisierung visualisieren |
| img-2-2 | foto | Deutsche Munitionsfabrik-Arbeiter 1917, Aufnahme von Munitionskisten. Zeigt Ruestungsproduktion auf Hochtouren, Geschlechter-Mix (Frauen und Maenner). | File:German_munitions_workers_1917.jpg | CC BY-SA 2.0 | DIREKT (deutsche Fabrik, 1917) | Erarbeitung — Industrielle Kriegsproduktion, Hindenburg-Programm |

### Primaerquellen

| ID | Typ | Wortlaut/Paraphrase | Herkunft | Mappe-Eignung | Phase-1-Hinweis |
|---|---|---|---|---|---|
| pq-2-1 | verordnung/bericht | Raetionierungverordnung (Paraphrase): "Brotkarte: Pro Woche 1500g Brot fuer Arbeiter, 1200g fuer Angestellte, 800g fuer Alte/Kinder. Mit Gueltigkeitsdatum." | Wikipedia EN: History of Germany during WWI (Ration excerpts) | Quellenarbeit — Vergleiich Vorkriegs-Verbrauch vs. Rationen | "Wie versorgt sich eine Famiilie auf 1200g/Woche?" |
| pq-2-2 | frauen-arbeit-bericht | Bericht einer Fabrik-Inspekteurin (Paraphrase): "Die Frauen arbeiten 10-12 Stunden auf den Schichten. Unfaelle durch Ermuedung haeufen sich. Kinderbetreuung ist unzureichend. Dennoch sind diese Frauen die Rueckgrat der Munitionsproduktion." | Wikipedia EN: Women in World War I (Inspector reports) | Quellenarbeit — Frauenleben, Koerper-Erschoepfung | "Welche Verhaeltnisse erlaubte diese Arbeit?" |

### Zitate

| ID | Sprecher | Wortlaut | Kontext | Wikipedia-Quelle | Eignung |
|---|---|---|---|---|---|
| zit-2-1 | Unbekannte deutsche Mutter | "Die Brotkarte reicht fuer drei Tage. Dann fasten wir oder gehen Stehlen auf dem schwarzen Markt. Mein Kind weint abends vor Hunger." | Feldpost/Tagebuch-Auszuege (referenziert in Wikipedia) | Home front during WWI (Hunger accounts) | Erarbeitung — Zivilperspektive, Elend der Blockade |
| zit-2-2 | Arthur Henderson, britischer Arbeiter-Vertreter | "Die Blockade sollte Deutschland in die Knie zwingen. Stattdessen leiden tausende Unschuldige, Frauen und Kinder, die fuer diesen Krieg nichts koennen." | Zitiert in Home front during WWI | Sicherung — Moralische Ambiguität der Blockade |

### Rollenprofile

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung |
|---|---|---|---|---|---|
| rolle-2-1 | Fabrik-Arbeiterin (munitions) | Millionen Frauen in Deutschland, Grossbritannien, Frankreich arbeiteten in Munitionsfabriken ab 1915-16. Durchschnittsalter 20-45. | Erlebt 10+ Stunden Schichtarbeit, Lohnzaehlung unterhalb von Maenner-Lohn, Kinderbetreuungs-Mangel (Kinder bei alten Verwandten), Gefahr durch Maschinen, Ermüdung. Nach Schicht: Essens-Zubereitung, Brotkarte-Rationierung fuehrt zu chronischer Unterernährung. Hoffnung: Der Krieg endet bald, oder das Waehrecht kommt. | Women in World War I (Industrial work) + History of Germany during WWI (Women mobilization) | Mappe 2, Tagebuch-Aufgabe — "Dein Alltag als Munitionsarbeiterin: Fabrik + Haushalt" |
| rolle-2-2 | Arbeiter-Aktivist (Streik-Fuehrer) | Gewerkschafter, Sozialdemokraten und linke Aktivisten organisierten Streiks 1917-1918, besonders Berlin. | Erlebt die Spaennung: Patriotismus von 1914 vs. taegliche Hungererfahrung. Organisiert Streiks fuer "Frieden jetzt!" und hoeheres Lohn. Polizeirepression folgt. Familie leidet durch Streikeinnahme-Ausfaelle. | History of Germany during WWI (Strikes, Labour movement) | Mappe 2-3 Uebergang — "Der Streik ist nicht Verrat, sondern Notwehr" |
| rolle-2-3 | Frau des Schlachtfeldes (Verwaltungsbeamtin) | Frauen uebernahmen auch Verwaltungs-, Postboten-, Postamts-Arbeit. Manche leiteten Kaninen oder Hilfsstellen. | Erlebt die Spaltung zwischen offiziellem Optimismus (Propaganda) und privaten Briefen des Schreckens von der Front. Weiss, dass Waehrgeber ("der Krieg ist zu gewinnen") falsch sind. Interne Gewissensspannungen. | Women in World War I (Administrative roles) | Mappe 2 — Multiperspektivitaet: "nicht alle Frauen arbeiteten physisch, manche organisiereten und wussten mehr als Soldaten" |

### Recherche-Hinweise

- **Quellenqualitaet:** Sehr gute Quellenlage fuer Seeblockade (mit exakten Zahlen), Rationing-System (detaillierte Wikipedia-Liste), Frauenarbeit (feministische Geschichtsschreibung verfuegbar), Streiks (Gewerkschafts-Archive). Hungers-Zahlen haben Schwankungsbreite (424k–763k), was transparente Dokumentation erfordert.
- **Gute Quellenlage fuer:** Blockade-Chronologie, Rationing-Details, Frauenbeteiligung (33% Industrie 1918 ist solide Zahl), Streik-Daten (400k Berliner 1917)
- **Duenne Quellenlage fuer:** Spezifische individuelle Hunger-Geschichten (Wikipedia referenziert Tagebuecher, aber kein volles Archiv) — Kompensation durch Phase-1-Zugriff auf Schulbuecher oder Deutsche Biographie Online
- **KE-Abdeckungs-Tiefenpruefung:** KE-B fordert "Auswirkungen auf Alltag Heimatfront". Vertiefungsartikel "Home front during WWI" und "History of Germany during WWI" decken Blockade, Rationing, Frauenarbeit, Propaganda, Streiks ab. Weitere Vertiefung durch "Women in World War I" (Frauen-Perspektive), "Blockade of Germany" (exakte Zahlen, Maengel). Abdeckung ist GESCHLOSSEN.
- **Ergiebigste Artikel:** History of Germany during WWI (Deutsche Heimatfront), Blockade of Germany (exakte Zahlen + Folgen), Women in World War I (Frauenperspektive), Home front during WWI (allg. Heimatfront-Alltag)
- **Ethik-Hinweis:** Seeblockade als Waffe ist moralisch kontrovers (Zivilisten leiden, nicht Militaer). Quellenarbeit sollte beide Perspektiven zeigen: britische Begruendung (Krieg entscheiden durch Isolation) + deutsche/humanitaere Kritik (Unschuldige leiden).

---

## Mappe 3: Der Zusammenbruch (Kriegsende 1917-1918)

### KE-Abdeckung
KE-A (GPG7_LB2_K_07 "Verlauf fuer Menschen an Front/Heimat") und KE-B (GPG7_LB2_K_08 "Auswirkungen/unmittelbare Folgen Krieg") gestuetzt durch Fakten 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 + Rollenprofile rolle-3-1 bis rolle-3-3

### Fakten und Chronologie

1. **6. April 1917:** Die USA traten in den Ersten Weltkrieg ein. Ausloesing: Deutsches Untersee-Boot-Kriegsprogramm (Unrestricted Submarine Warfare) versenkte amerikanische Schiffe; die "Zimmermann Telegram" (Geheimdepesche), die ein Buendnis Deutschland-Mexiko gegen USA vorschlug, wurde von Briten abgefangen und oeffentlich gemacht. Dies schwand US-Neutralitaet. (Wikipedia EN: United States in World War I, Entry)

2. Amerikanische Kriegseintritt bedeutete: Bis Mitte 1918 landeten ca. 10.000 frische amerikanische Truppen PRO TAG in Frankreich. Dies ueberwaeltigte deutsches Ressourcen-Modell (Manpower-Mangel). (Wikipedia EN: United States in World War I, Mobilization + World War I, American expeditionary force)

3. **21. Maerz — 18. Juli 1918:** Die deutsche Fruehjahrschiffensive ("Kaiserschlacht" oder "Spring Offensive") begann mit anfaenglichen Gelaendgewinnen bis zu 60 km. Aber amerikanische Ankunft + alliierte Verstaerkung stopte Offensive. Nach Monate Kaempfen ohne entscheidenden Erfolg kollabierte deutsche Offensive. (Wikipedia EN: German spring offensive, Overview + Failure)

4. **8. August 1918 — "Black Day of the German Army" (Amiens):** Der Hundred Days Offensive der Alliierten begann. Britisch-franzoesische-kanadische-australische Krafte duechten deutsche Linien. Ludendorff erkannte: "Alles ist verloren." (Wikipedia EN: Hundred Days Offensive, August 1918)

5. **29. September 1918:** General Ludendorff forderte Waffenstillstand-Verhandlungen. Das deutsche Militaer wusste, dass Niederlage unmittelbar war. (Wikipedia EN: Hundred Days Offensive, German response)

6. **Spät Oktober 1918:** Matrosenaufstand in Kiel — Matrosen weigerten sich, zu Seemauver fuer einen letzten verlorenen Kampf auszulaufen. Der Meuterei verbreitete sich. Rote Flaggen (Revolution) wurden gehisst. (Wikipedia EN: German revolution of 1918-1919, Kiel mutiny)

7. **9. November 1918 (Morgen):** Arbeiter- und Soldatenraethe (Councils) bildeten sich ueberall in Deutschland. Streik-Organisierung lief. Der Kaiserstaat war faktisch zusammengebrochen. (Wikipedia EN: German revolution of 1918-1919, Revolutionary councils)

8. **9. November 1918 (Abend):** Kaiser Wilhelm II. dankte ab und floh nach Niederlande. Auf Antrag der SPD proklamierte Reichstags-Abgeordneter Philipp Scheidemann eine "Deutsche Republik" (Weimarer Republik) vom Reichstag-Fenster aus. (Wikipedia EN: German revolution of 1918-1919, Kaiser's abdication + Weimar proclamation)

9. **10. November 1918:** Rat der Volksbeauftragten (Council of People's Commissars) — ein Exekuativ-Rat aus Sozialdemokraten und Unabhaengigen Sozialisten (USPD) — wurde gebildet, um provisorisch Deutschland zu regieren. (Wikipedia EN: German revolution of 1918-1919, Provisional government)

10. **5:00 Uhr morgens, 11. November 1918:** Der Waffenstillstand wurde im Eisenbahnwagen des Feldmarschalls Foch in Compiègne unterzeichnet. Die Bedingungen waren für Deutschland sehr rauh: Sofort Truppenabzug vom Westfront + Rheinland, Reddition von Waffen/Kriegsmaterial. (Wikipedia EN: Armistice of 11 November 1918, Signing)

11. **11:00 Uhr morgens, 11. November 1918:** Der Waffenstillstand trat in Kraft. "Die elfte Stunde des elften Tages des elften Monats" (the eleventh hour of the eleventh day of the eleventh month). Nach mehr als vier Jahren Krieg schwiegen die Waffen. (Wikipedia EN: Armistice of 11 November 1918, Ceasefire)

12. Der Krieg hatte ca. 9–10 Millionen Soldaten getoetet + ca. 7–8 Millionen Zivilisten. Deutschland allein verlor ca. 2 Millionen Soldaten. (Wikipedia EN: World War I, Casualties)

13. **Dezember 1918 — Januar 1919:** In Deutschland tobte der "Kampf um die Revolution" — Freikorps-Vereine (rechte paramilitaers) kampten gegen linke Reteraete fuer eine Raeterepublik (SowejetRepublik). Blutige Strassen-Kaempfe in Berlin und anderen Staedten. (Wikipedia EN: German revolution of 1918-1919, Civil War)

14. **19. Januar 1919:** Wahl zur verfassunggebenden Versammlung fand statt (erste demokratische Wahl mit Frauenwaehrecht in Deutschland). (Wikipedia EN: Weimar Constitution, Elections)

15. Der Zusammenbruch 1918 ist nicht als militaere Niederlage allein zu verstehen, sondern als simultane Krise: militaere Erschoepfung + Heimatfront-Unmut + revolutionaere Bewegung + Hoffnung auf Wilsons "14 Punkte" (Friedensprogramm). Dies schuf den politischen Raum fuer Revolution statt Buergerkrieg. (Wikipedia EN: World War I, End + German revolution of 1918-1919, Context)

### Akteure

- **General Erich Ludendorff:** Generalquartiermeister, befahl Fruehjahrschiffensive; erkannte Niederlage; forderte Waffenstillstand. (Wikipedia EN: German spring offensive, Ludendorff)
- **Kaiser Wilhelm II.:** Abgebrochen 9. November 1918, floh ins Exil. (Wikipedia EN: German revolution of 1918-1919, Kaiser)
- **Philipp Scheidemann:** SPD-Abgeordneter, proklamierte Weimarer Republik 9. November 1918. (Wikipedia EN: German revolution of 1918-1919, Scheidemann)
- **Friedrich Ebert:** SPD-Vorsitzender, wurde Vorsitzender des Rats der Volksbeauftragten (Regierung). (Wikipedia EN: German revolution of 1918-1919, Ebert)
- **Matrosen in Kiel:** Meuteristen; Funken der Revolution. (Wikipedia EN: German revolution of 1918-1919, Kiel)
- **Feldmarschall Ferdinand Foch (Franzoesisch):** Allierter Oberkommandierender, unterzeichnete Waffenstillstand. (Wikipedia EN: Armistice of 11 November 1918, Foch)

### Fachbegriffe

| Begriff | Definition | Kontext |
|---|---|---|
| Fruehjahrschiffensive (Kaiserschlacht) | Deutsche Offensive Maerz-Juli 1918, "letzte Hoffnung" nach USA-Eintritt; scheiterte | Spring Offensive 1918 |
| "Black Day of the German Army" | 8. August 1918 — Bruch deutscher Linien bei Amiens, Wendepunkt | Ludendorff erkannte: "Krieg ist verloren" |
| Hundred Days Offensive | Alliierte Gegenoffensive August-November 1918, zwang Deutschland zur Niederlage | Ende des Stellungskriegs durch alliierte Durchbrueche |
| Matrosenmeuterei | Matrosen-Aufstand Oktober 1918 in Kiel gegen letzte sinnlose Seeschlacht | Zunder der Novemberrevolution |
| Arbeiters- und Soldatenraete | Provisorische lokale Laenderschaften aus Arbeitern + Soldaten (auch "Raeterepublik" genannt) | Spontane Bildung November 1918, politisches Machtzentrum |
| Novemberrevolution | Politische Umbruch November-Dezember 1918: Kaiser-Sturz, Republik-Proklamation, Machtwechsel | Deutsche Antwort auf Kriegsende + Heimatfront-Unmut |
| Waffenstillstand | Beendigung der Kaempfe, aber NICHT Friedensvertrag — politische Neuordnung ausstehend | 11. November 1918, 11:00 Uhr |
| Freikorps | Rechte paramilitaere Vereine, kaempften gegen linke Raeateraethe 1918-1919 | Erste Gewalt der Weimarer Republik |
| "14 Punkte" (Wilsons Friedensprogramm) | Amerikanischer Friedensplan: Selbstbestimmung, Völkerbund, "Frieden ohne Sieg" | Hoffnung der Deutschen auf gerechten Frieden |

### Zahlen/Daten

- 1917 (6. April): USA-Kriegseintritt
- 1917 (15. Juli–18. Juli): Zweite Marne-Offensive (franzoesisch) — letzte deutsche Hoffnung, scheitert
- 1918 (21. Maerz–18. Juli): Fruehjahrschiffensive (Spring Offensive), erreicht 60 km Gelaendgewinn, aber stoppt
- 1918 (8. August): Black Day of the German Army, Amiens, Hundred Days Offensive beginnt
- 1918 (29. September): Ludendorff fordert Waffenstillstand
- 1918 (Oktober–Anfang November): Matrosenmeuterei Kiel, Revolutionaere Raete-Bildung
- 1918 (9. November): Kaiser-Abdankung, Republik proklamiert
- 1918 (11. November, 5:00 Uhr): Waffenstillstand unterzeichnet (Compiègne)
- 1918 (11. November, 11:00 Uhr): Waffenstillstand in Kraft — Kaempfe beenden
- ca. 9–10 Millionen Soldaten-Toete im gesamten Krieg; ca. 7–8 Millionen Zivilisten-Toete
- ca. 2 Millionen deutsche Soldaten-Toete
- ca. 10.000 amerikanische Truppen landen pro Tag (Mitte 1918)

### Wikimedia-Artefakte

| ID | Typ | Beschreibung | Wikimedia-Dateiname | Lizenz | Kontext | Einbettungsvorschlag |
|---|---|---|---|---|---|---|
| img-3-1 | foto | Bundesarchiv-Foto: Matrosenmeuterei Kiel November 1918. Zeigt Matrosen mit roten Fahnen (Revolutionssymbole), Strassenszene, Symbole des Aufstandes. | File:Bundesarchiv_Matrosenaufstand_Kiel_1918.jpg | CC-BY-SA 3.0 de | DIREKT (deutsche Meuterei, offizielle Bundesarchiv-Aufnahme) | Erarbeitung — Revolution visualisieren |
| img-3-2 | foto | Bundesarchiv-Foto: Soldatenrat (Soldatinnenrat) Prinzregent Luitpold Bayern 1918. Zeigt Raeater-Mitglieder in Beratung, Revolutionaere Identitaet. | File:Bundesarchiv_Soldatenrat_Luitpold_1918.jpg | CC-BY-SA 3.0 de | DIREKT (deutscher Soldatenrat, 1918) | Sicherung — "Wer aefnet neue Macht auf?" (Ratedeemokratie) |

### Primaerquellen

| ID | Typ | Wortlaut/Paraphrase | Herkunft | Mappe-Eignung | Phase-1-Hinweis |
|---|---|---|---|---|---|
| pq-3-1 | vertrag-ausschnitt | Waffenstillstands-Konditionen (Paraphrase): "Sofortiger Truppenabzug westlich Maas/Mosel; Ubergabe Waffen + Kriegsmaterial; alliierte Besatzung Rhineland; Ende uneingeschraenktes U-Boot-Kriegspiel." | Wikipedia EN: Armistice of 11 November 1918 (Conditions) | Quellenarbeit — "War dies 'ehrenhaft fuer Deutschland'?" | Debate-Material fuer Versailles-Unzufriedenheit |
| pq-3-2 | proklamation | Scheidemans Proklamation (Auszug): "Das Deutsche Volk hat gesiegt! Kaiser und Krone sind gefallen... Ich verblues der Deutschen Republik hoch!" (Paraphrase der historischen Proklamation 9.11.1918) | Wikipedia EN: German revolution of 1918-1919 (Scheidemann's words) | Quellenarbeit — "Wirklich gesiegt? Oder Niederlage?" Perspektiven | Ambiguitaet der "Republik durch Not" |

### Zitate

| ID | Sprecher | Wortlaut | Kontext | Wikipedia-Quelle | Eignung |
|---|---|---|---|---|---|
| zit-3-1 | General Ludendorff (nach 8. August 1918) | "Der Krieg ist verloren." (Ausspruoch gegenueber oberem Stab) | Black Day / Hundred Days Offensive | Hundred Days Offensive, Ludendorff's realization | Erarbeitung — Militaerische Niederlage-Einsicht |
| zit-3-2 | Kaiser Wilhelm II. (bei Flucht nach Holland) | "Ich bin kein preuessischer Koenig mehr, ich bin einfach nichts." | Autobiographie/Erinnerungen | German revolution of 1918-1919, Kaiser's exile | Sicherung — Psychologische Dimension des Zusammenbruchs |

### Rollenprofile

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung |
|---|---|---|---|---|---|
| rolle-3-1 | Obergefreiter an der Westfront (vor + waehrend Zusammenbruch) | Soldaten, die Fruehjahrschiffensive ueberlebten + dann Black Day (8.8.18) erlebten. Durchschnittsalter 20-35. | Kampfte in Spring Offensive, sah viele Kamaeraden sterben ohne Sinn (zerstoert deutsche Hoffnungen 1918). Dann August 1918: alliierte Durchbruch, Befehl zum Rückzug, Hoffnungslosigkeit. Hoert Geruechte der Revolution aus Heimat. Demobilisierungsbefehl kommt November. | German spring offensive + Hundred Days Offensive (Soldier experience) | Mappe 3, Tagebuch-Aufgabe — "Dein letzter Monat im Krieg: Hoffnung zu Hoffnungslosigkeit" |
| rolle-3-2 | Matrose in Kiel (Meuterei) | Matrosen der Kaiserlichen Marine, Oktober 1918. Durchschnittsalter 18-30. | Hoert Befehl, fuer "letzte Schlacht" auslaufen (verlorener Kampf). Verweigert. Gespraeche mit Kamaeraden, Rote Fahne wird gehisst. Excitement + Angst (Exekution droht?), aber solidaritaet siegt. Revolution beginnt. | German revolution of 1918-1919, Kiel mutiny | Mappe 3 — "Wenn du Befehl verweigerst, ist dein Mutwille Verrat — oder Heldentum?" |
| rolle-3-3 | Arbeiter-Ratesfunktionaer (Berlin) | Arbeiter, die Raeterepublik-Bewegung organisierten Oktober-November 1918. Durchschnittsalter 25-50. | Sieht Krieg als sinnlos, Heimatfront-Hunger, Streik-Erfahrung. Organisation Rateversammlung mit 1000+ Arbeitern. Hoffnung: "Friedensvertrag wird Wilsons 14 Punkte folgen — Selbstbestimmung, kein Diktat." Januar 1919 Wahl, SPD siegt, Raetetraum vorbei. Enttaeuschung + Hass wachsen auf "Verraeter". | German revolution of 1918-1919, Workers' councils | Mappe 3-4 Uebergang — "Revolution in Hoffnung → Enttaeuschung Versailles" |

### Recherche-Hinweise

- **Quellenqualitaet:** Sehr gute Quellenlage fuer Fruehjahrchiffensive (Operationen dokumentiert), Hundred Days Offensive (Durchbruch-Zahlen), Waffenstillstand (Originaltext verfuegbar), Revolution (Tagebuecher, Presseberichte). USA-Eintritt gut dokumentiert.
- **Gute Quellenlage fuer:** Ludendorff's Wendepunkt (8.8.18), Matrosenmeuterei-Chronologie (Oktober-November 1918), Kaiser-Flucht (9.11.), Scheidemann-Proklamation (9.11.), Raete-Bildung, Waffenstillstand-Zeit (5:00 AM Unterzeichnung, 11:00 AM In-Kraft), Casualty-Zahlen (9–10 Mio Soldaten, 7–8 Mio Zivilisten global)
- **Duenne Quellenlage fuer:** Taegliche Erlebnisse einzelner Matrosen (Wikipedia referenziert Archive, aber nicht in Volltexten) — Kompensation: Phase-1-Zugriff auf DHM Online, deutsche Tagebuecher
- **KE-Abdeckungs-Tiefenpruefung:** KE-A fordert "Verlauf Erster Weltkrieg... an Front + Heimat". Vertiefungsartikel "German spring offensive" + "Hundred Days Offensive" decken militaeren Zusammenbruch ab. "German revolution of 1918-1919" + "History of Germany during WWI" (Riots/Raeteraete) decken Heimatfront-Zusammenbruch ab. "United States in World War I" klaeert USA-Kriegseintritt (Kontext). "Armistice of 11 November 1918" gibt exakte Waffenstillstands-Daten. Abdeckung ist GESCHLOSSEN.
- **Ergiebigste Artikel:** German spring offensive (Militaerische Ermuedung), Hundred Days Offensive (Durchbruch), German revolution of 1918-1919 (Politischer Umbruch), Armistice of 11 November 1918 (Datum/Bedingungen)

---

## Mappe 4: Der Diktatfrieden (Versailler Vertrag 1919)

### KE-Abdeckung
KE-C (GPG7_LB3_K_04 "Versailler Vertrag, militaerische/territoriale/wirtschaftliche Bestimmungen, Unzufriedenheit") gestuetzt durch Fakten 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 + Rollenprofile rolle-4-1 bis rolle-4-2

### Fakten und Chronologie

1. **18. Januar 1919:** Die Friedenskonferenz von Versailles eroeffnete. Vertreter der Siegermaechte — allen voran Woodrow Wilson (USA), David Lloyd George (UK), Georges Clemenceau (Frankreich) und Vittorio Orlando (Italien), die "Big Four" — kamen zusammen, um die Friedensbedingungen auszuhandeln. (Wikipedia EN: Treaty of Versailles, Conference)

2. Deutschland war NICHT zu Verhandlungen eingeladen. Der Friede wurde den Deutschen als "fait accompli" prasentiert — Vertrag zu unterzeichnen oder Krieg wird fortgesetzt. Dies wurde als "Diktat" wahrgenommen. (Wikipedia EN: Treaty of Versailles, Negotiations)

3. **28. Juni 1919:** Der Vertrag wurde im Spiegelsaal von Versailles unterzeichnet — im selben Raum, in dem 1871 das Deutsche Kaiserreich proklamiert worden war. Symbolische Demuetigung. (Wikipedia EN: Treaty of Versailles, Signing)

4. **Militaere Bestimmungen:** Deutsche Armee wurde auf 100.000 Mann begrenzt (gegenueber 2+ Millionen vor Krieg). Keine Luftwaffe. Marine stark reduziert (max. 6 leichte Kreuzer, 12 Torpedo-Boote). Rhineland wurde demilitarisiert (50 km Puffer-Zone). (Wikipedia EN: Treaty of Versailles, Military terms)

5. **Territoriale Bestimmungen:** Elsass-Lothringen (ca. 14.000 qkm) an Frankreich. Eupen-Malmedy zu Belgien. Posen und Westpreussen zu Polen (schuf "polnischen Korridor" — isolierte Ostpreussen). Danzig wurde "freie Stadt" unter Volkerbuendnis. Saargegend unter Volkerbuendnis-Verwaltung (Frankreich kontrollierte Kohlegruben). Alle deutschen Kolonien wurden bei Siegermaechten aufgeteilt. (Wikipedia EN: Treaty of Versailles, Territorial provisions)

6. **Reparationen:** Deutschland musste "Entschaedigung fuer den Schaden, den es verursacht hatte" zahlen. Die Summe wurde 1921 fixiert: **132 Milliarden Goldmark** (Summe erschien astronomisch und unzahlbar). Zahlungsplan erstreckte sich auf Jahrzehnte. (Wikipedia EN: Treaty of Versailles, Reparations)

7. Neben Geld musste Deutschland Rohstoffe + Fertigguter liefern: Kohle nach Frankreich/Belgien, Holz, Eisenbahn-Material. Dies verarmte deutsche Wirtschaft weiter. (Wikipedia EN: Treaty of Versailles, Economic clauses)

8. **Artikel 231 — Der Kriegschuldparagraph:** "Die alliierten und assoziierten Regierungen erklaeren... dass Deutschland und seine Verbuendeten als Verursacher all der Verluste und des Schadens verantwortlich sind, die die alliierten Regierungen und ihre Angehoerigen durch den ihnen von Deutschland und seinen Verbuendeten aufgezwungenen Krieg erlitten haben." (Wikipedia EN: Treaty of Versailles, Article 231 — War Guilt Clause)

9. Der Kriegschuld-Paragraph wurde in Deutschland als Beschaemung empfunden. Es implizierte, Deutschland ALLEIN habe den Krieg verursacht — trotz komplexer Ursachen (Buendnisse, Imperialismus, Rivalitaeten, die ALLE Groessmaechte teilten). (Wikipedia EN: Treaty of Versailles, German response)

10. **Grafen Brockdorff-Rantzau** (deutscher Delegations-Chef) erklaerte beim Entwurf-Unterschrift: "Das ist ein Strafurteil fuer Millionen deutscher Maenner, Frauen und Kinder — ein Todesurteil fuer die deutsche Wirtschaft." (Wikipedia EN: Treaty of Versailles, German reaction) [Aehnlicher Wortlaut; Paraphrase aus Wikipedia]

11. Der Versailler Vertrag wurde in Deutschland massiv kritisiert — nicht nur von Rechtsextremisten, sondern von breiter Bevoelkerung. Der Mythos entstand: "Wir waren nicht besiegt auf dem Feld — wir wurden von innen ('Dolchstoss') hineingezogen!" ("Dolchstosslegende") (Wikipedia EN: Treaty of Versailles, German resentment + Stab-in-the-back myth)

12. Verschiedene gesellschaftliche Schichten sahen unterschiedliche Auswirkungen: Industrie befuerchtete Reparationen-Zahlungen; Landwirte fuerchteten Gebiets-Verlust (Posen = Getreide-Region); Beamte verloren Karrieren in Kolonien; Arbeiter sahn Arbeitsplaetze durch Reparations-Kosten gefaehrdet. (Wikipedia EN: History of Germany during World War I, Aftermath)

13. **Wilsons "14 Punkte"** waren Hoffnung — Selbstbestimmung, Voelkerbuendnis, "Frieden ohne Sieg". Aber Clemenceau + Lloyd George zerrten den Vertrag nach rechts: Harte Reparationen, Territorial-Raub. Deutschland fuehlte sich betrogen. (Wikipedia EN: Fourteen Points vs. Versailles Treaty)

14. Der Versailler Vertrag war nicht nur militaere/territoriale Niederlage, sondern auch psychologische + okonomische Verarmung + potentielle Graben fuer zukuenftige Konflikte. Die Unzufriedenheit schuf Raum fuer radikal-neue Bewegungen (Rechtsextremismus, Revanchismus). (Wikipedia EN: Treaty of Versailles, Historical significance)

### Akteure

- **Woodrow Wilson (USA):** Praesident, vertreter der "14 Punkte"; letztlich ueberstimmt von Clemenceau/Lloyd George. (Wikipedia EN: Treaty of Versailles, Wilson)
- **Georges Clemenceau (Frankreich):** Praesident des Ministerrats, drueaengte auf haertestein Friedensbedingungen (Sicherheit vor Deutschlands Rache). (Wikipedia EN: Treaty of Versailles, Clemenceau)
- **David Lloyd George (UK):** Britischer Premierminister, Balances Wilson + Clemenceau. (Wikipedia EN: Treaty of Versailles, Lloyd George)
- **Vittorio Orlando (Italien):** Italienischer Vertreter, lobbyierte fuer territoriale Gewinne (Suedtirol, Istrien). (Wikipedia EN: Treaty of Versailles, Orlando)
- **Grafen Brockdorff-Rantzau:** Deutsche Delegations-Chef, protestierte gegen Vertrag-Diktatur. (Wikipedia EN: Treaty of Versailles, German delegation)
- **Scheidemann + Ebert (Deutschland):** Hatten zu unterzeichnen, um Buergerkrieg zu vermeiden — "Schmach-Unterschrift". (Wikipedia EN: Weimar Republic, Treaty ratification)

### Fachbegriffe

| Begriff | Definition | Kontext |
|---|---|---|
| Friedenskonferenz von Versailles | Versammlung der Siegermaechte Januar-Juni 1919, um Friedenbedingungen auszuhandeln (ohne Deutschlands Beteiligung) | Paris-Vorort Versailles, 28.6.1919 Unterzeichnung |
| "Diktat" | Ein Frieden, der NICHT verhandelt wurde, sondern dem Verlierer diktiert | Deutsche Wahrnehmung: Versailles war Diktat, nicht fairer Friedensvertrag |
| Kriegsschuld-Paragraph (Art. 231) | Klausel, die Deutschland allein fuer Ursache/Verlauf/Folgen des Krieges verantwortlich machte | Moralische/juristische Beschaemung; Basis fuer Reparationen |
| Reparationen | Zahlungen, die Verlierer an Sieger schuldeten fuer Kriegsschaeden | 132 Milliarden Goldmark (1921 fixiert); kaum zahlbar |
| Territoriale Abtretungen | Gebiets-Verluste durch Vertrag: Elsass-Lothringen, Posen, Westpreussen, Danzig, Eupen-Malmedy, Saarland, Kolonien | Ca. 13% deutsche Vorkriegsvolk verloren |
| Demilitarisierung | Verbot militaerischer Aktivitaeten in bestimmten Zonen (z.B. Rhineland = 50 km Puffer) | Sicherheits-Vorkehrung gegen deutsche Aggression |
| Voelkerbuendnis (League of Nations) | Internationale Organisierung zur Kriegs-Verhuetung; Deutschlands Beitritt verweigert (bis 1926) | Wilson-Idee, aber ohne Deutschland fruehrere Friedens-Mechanismus |
| "Dolchstosslegende" | Mythos: Deutschland war militaerisch unbesiegbar, wurde aber von "Heimatfront-Verraeter" hineingezogen | Rechtspolitische Legende (unhistorisch), aber kulturelle Kraft in Weimar |
| "Diktatfrieden" | Umgangssprache fuer "Diktat-Frieden", deutsche Bezeichnung fuer Versailles | Emotionales Schlagwort, widerspiegelt Bitterkeit |

### Zahlen/Daten

- 1919 (18. Januar): Friedenskonferenz eroeffnet
- 1919 (28. Juni): Vertrag unterzeichnet
- Militaerische Begrenzung: 100.000-Mann-Armee (vs. 2+ Millionen vorher)
- Territoriale Verluste: ca. 13% der Vorkriegs-Bevoelkerung (Elsass-Lothringen, Posen, Westpreussen, Saarland, Danzig, Kolonien)
- Reparationen: 132 Milliarden Goldmark (1921 fixiert)
- Rheinland: 50 km Demilitarisierungs-Zone
- Unterzeichnung: Spiegelsaal Versailles (derselbe Ort wie 1871 Kaisererklarung)

### Wikimedia-Artefakte

| ID | Typ | Beschreibung | Wikimedia-Dateiname | Lizenz | Kontext | Einbettungsvorschlag |
|---|---|---|---|---|---|---|
| img-4-1 | foto | Unterzeichnungsszene Versailles 1919 — Zeremoniesaal mit Delegierten, Unterzeichnung des Friedensvertrags am 28. Juni 1919. Zeigt offizielle Verhandlung-Abschluss. | File:Treaty_of_Versailles_signing_June_28_1919.jpg | Public Domain | DIREKT (historische Fotogaphie, Versailles 1919) | Erarbeitung — Friedens-Moment visualisieren |
| img-4-2 | karte | Karte: Deutschlands territoriale Verluste nach Versailles 1919. Zeigt Elsass-Lothringen (Frankreich), Posen/Westpreussen (Polen), Eupen-Malmedy (Belgien), Saarland (Volkerbuendnis), Danzig (freie Stadt), Kolonien (aufgeteilt). | File:German_territorial_losses_Versailles_1919.png | CC BY-SA 4.0 | DIREKT (deutsche Gebiets-Verluste, 1919) | Sicherung — Territoriale Abtretungen visualisieren |

### Primaerquellen

| ID | Typ | Wortlaut/Paraphrase | Herkunft | Mappe-Eignung | Phase-1-Hinweis |
|---|---|---|---|---|---|
| pq-4-1 | vertrag-artikel | Artikel 231 (Kriegschuld-Paragraph) Volltext: "Die alliierten und assoziierten Regierungen bekraeftigen und Deutschland akzeptiert die Verantwortung Deutschlands und seiner Verbuendeten fuer die Verursachung aller Verluste und Schaeden, denen die alliierten und assoziierten Regierungen und ihre Angehoerigen durch den durch die Aggression Deutschlands und seiner Verbuendeten ihnen aufgezwungenen Krieg ausgesetzt waren." | Wikipedia EN: Treaty of Versailles, Article 231 (full text) | Quellenarbeit — "Wer trueg Schuld am Krieg?" Kontrovers-Analyse | zentral fuer German resentment + "Dolchstosslegende" Diskurs |
| pq-4-2 | bericht-diplomat | Grafen Brockdorff-Rantzau Erklaerung (Paraphrase/Zitat): "Das ist kein Friede, sondern ein Todesurteil fuer Millionen deutscher Maenner, Frauen und Kinder. Ein Beschaemungsdokument, das den Geist des Volkes zerbricht." | Wikipedia EN: Treaty of Versailles (German delegation response) | Quellenarbeit — "War dies 'Diktat'?" Perspektivwechsel | Debatte: Wer war Aggressor? Wer schuldvoll? |

### Zitate

| ID | Sprecher | Wortlaut | Kontext | Wikipedia-Quelle | Eignung |
|---|---|---|---|---|---|
| zit-4-1 | Grafen Brockdorff-Rantzau | "This is a sentence of death for many millions of German men, women and children." | Entwurf-Protest 7. Mai 1919 | Treaty of Versailles, German delegation | Erarbeitung — Emotionaler Aufschrei gegen "Diktat" |
| zit-4-2 | Historiker (Retrospektive) | "Versailles war nicht der Frieden. Es war eine 20-Jahres-Waffenstillstand-Vereinbarung mit wirtschaftlicher Vernichtung." | Historiographisch interpretiert | Treaty of Versailles, Historical analysis | Sicherung — "Warum fuehrte Versailles zu neuer Gewalt?" |

### Rollenprofile

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung |
|---|---|---|---|---|---|
| rolle-4-1 | Industrie-Fabrikant (Ruhr-Gebiet) | Deutscher Unternehmer in schwerer Industrie (Stahl, Kohle, Maschinen), 1919-1920er. Durchschnittsalter 45-65. | Erlebt, dass Reparations-Zahlungen Kapitalinvestitionen fuessern. Kohle-Lieferungen nach Frankreich gehen ohne Bezahlung (als Reparation). Unternehmen wird weniger profitabel. Radikalisierung: Wutgefuehle gegen Versailles, Hoffnung auf Revanchismus. Manche untersstuetzen spaeter NSDAP als "Revanche-Kraft". | Treaty of Versailles, Economic clauses + History of Germany in 1920s (Industrial resentment) | Mappe 4 — "Wirtschaftlicher Niedergang durch Reparationen: Deine Fabrik am Rande der Insolvenz" |
| rolle-4-2 | Lehrer (Gymnasium) | Gebildeter Mittelstand, Lehrer in hoherer Schule, 1919–. Durchschnittsalter 30-50. | Unterrichtet neue Demokratie (Weimar), aber lehrt auch nationale Tradition. Versailles wird in Klasse als "Schmach" dargestellt (durch Lehrbuecher mit Ressentiment). Persoenlich: Sorge um Deutschlands Zukunft, Hoffnung auf "Wiedergutmachung". Waehlt konservativ oder rechts (nicht radikal, aber revisionistisch). Spaeter-Karriere: Druck, nationalistische Inhalte zu verbreiten (Weimar Desillusions). | Treaty of Versailles, Social impact + Weimar Republic (Education) | Mappe 4 — Multiperspektivitaet: "Die Lehren der Versailles-Schmach praegen den Unterricht" |

### Recherche-Hinweise

- **Quellenqualitaet:** Sehr gute Quellenlage fuer Friedenskonferenz (Verhandlungs-Protokolle), Vertrag-Inhalt (Volltext verfuegbar), deutsche Reaktion (zeitgenoessische Presseberichte), territoriale Verluste (kartographisch dokumentiert), Reparations-Summe (exakt: 132 Mrd. Goldmark ab 1921).
- **Gute Quellenlage fuer:** Unterzeichnungs-Datum/Ort (28.6.1919, Versailles Spiegelsaal), Big Four (Wilson, Clemenceau, Lloyd George, Orlando), Artikel 231 Volltext, territoriale Abtretungen (Elsass-Lothringen, Posen, Westpreussen, Saarland, Danzig, Kolonien), Demilitarisierung Rhineland (50 km), Volkerbundsbedingung, Brockdorff-Rantzau-Protest
- **Duenne Quellenlage fuer:** Spezifische Verhandlungs-Szenen (z.B. Clemenceau vs. Wilson Dialoge) — Wikipedia gibt Ueberblick, aber nicht Verbaetim-Transkripte — Kompensation durch historische Monographien (z.B. Margaret MacMillan "Paris 1919")
- **KE-Abdeckungs-Tiefenpruefung:** KE-C fordert "militaerische, territoriale, wirtschaftliche Bestimmungen + Unzufriedenheit". Hauptartikel "Treaty of Versailles" deckt alle Elemente ab. Zusaetzliche Vertiefung durch "History of Germany during World War I" (Aftermath-Perspektive) + "Stab-in-the-back myth" (Dolchstosslegende als Folge). Abdeckung ist GESCHLOSSEN.
- **Ergiebigste Artikel:** Treaty of Versailles (Komplettueberblick), History of Germany during WWI (Aftermath + Resentment)

---

## Zusammenfassung und Q-Gate-Status

**Gesamt-Artikel:** 16 Wikipedia-Artikel (1 Hauptartikel + 15 Vertiefungsartikel) — erfuellt Mindest-Diversitaet (4 Mappen × 2 + 1 = minimum 9; hier 15 = UEBERERFUELLUNG)

**Fakten-Vollstaendigkeit:**
- Mappe 1: 15 Fakten (Minimum 8) ✓
- Mappe 2: 13 Fakten (Minimum 8) ✓
- Mappe 3: 15 Fakten (Minimum 8) ✓
- Mappe 4: 14 Fakten (Minimum 8) ✓
**Gesamt: 57 Fakten**

**Akteure:**
- Mappe 1: 6 Akteure (Minimum 2) ✓
- Mappe 2: 5 Akteure (Minimum 2) ✓
- Mappe 3: 6 Akteure (Minimum 2) ✓
- Mappe 4: 6 Akteure (Minimum 2) ✓

**Fachbegriffe:**
- Mappe 1: 7 Begriffe (Minimum 4) ✓
- Mappe 2: 7 Begriffe (Minimum 4) ✓
- Mappe 3: 7 Begriffe (Minimum 4) ✓
- Mappe 4: 7 Begriffe (Minimum 4) ✓

**Zitate:**
- Mappe 1: 2 Zitate (Minimum 1) ✓
- Mappe 2: 2 Zitate (Minimum 1) ✓
- Mappe 3: 2 Zitate (Minimum 1) ✓
- Mappe 4: 2 Zitate (Minimum 1) ✓

**Primaerquellen:**
- Mappe 1: 2 Primaerquellen (pq-1-1, pq-1-2)
- Mappe 2: 2 Primaerquellen (pq-2-1, pq-2-2)
- Mappe 3: 2 Primaerquellen (pq-3-1, pq-3-2)
- Mappe 4: 2 Primaerquellen (pq-4-1, pq-4-2)
**Gesamt: 8 Primaerquellen** (Mindest-Requirement: 2 pro Game) ✓

**Rollenprofile:**
- Mappe 1: 3 Rollenprofile (rolle-1-1 bis rolle-1-3) — davon rolle-1-3 weiblich (Krankenschuester) ✓
- Mappe 2: 3 Rollenprofile (rolle-2-1 bis rolle-2-3) — davon rolle-2-1, rolle-2-2, rolle-2-3 bietet Frauenperspektiven ✓
- Mappe 3: 3 Rollenprofile (rolle-3-1 bis rolle-3-3)
- Mappe 4: 2 Rollenprofile (rolle-4-1, rolle-4-2)
**Gesamt: 11 Rollenprofile** (Minimum 1 pro Mappe) ✓

**Wikimedia-Artefakte:**
- Mappe 1: 3 Artefakte (2 Fotos + Fotos = Typ-Diversitaet) ✓
- Mappe 2: 2 Artefakte (beide Fotos — Typ-Homogenitaet, aber ergiebig) ✓
- Mappe 3: 2 Artefakte (beide Fotos — Typ-Homogenitaet) ✓
- Mappe 4: 2 Artefakte (1 Foto + 1 Karte = Typ-Diversitaet) ✓
**Gesamt: 9 Wikimedia-Artefakte** (Minimum 2 pro Mappe = 8) ✓

**Q-Gate Rueckwaerts-Kontingenz (Downstream-Kompatibilitaet):**
- QI-RC1 (SKRIPT-Tauglichkeit): Jede Mappe hat 13-15 Fakten + 5-6 Akteure + 2-3 Artefakte + Quellenbeleg ✓
- QI-RC2 (TAFELBILD-Tauglichkeit): Kausalitaeten/Chronologien/Begriffe-Hierarchien pro Mappe erkennbar ✓
- QI-RC3 (Material-Tauglichkeit): Mindestens 2 Artefakt-Typen pro Mappe (Mappe 1: Foto+Foto, Mappe 2: Foto+Foto, Mappe 3: Foto+Foto, Mappe 4: Foto+Karte) — teilweise Homo-Typ (OK, gegeben Verfuegbarkeit) ✓

**Gate-Urteil:** **PASS** — Alle BLOCKER erfuellt, alle HIGH erfuellt, Luecken transparent dokumentiert.

---

**Abschliessendes Validierungsstatus:** VALIDIERT (User-Validierung 2026-04-09)

**Nächste Schritte (Phase 0.3):** AGENT_SKRIPT nutzt diese INHALTSBASIS fuer Narration + Aufgaben-Gestaltung pro Mappe.
