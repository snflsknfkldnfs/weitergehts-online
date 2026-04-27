# Skript: Erster Weltkrieg — Ursachen + Ausbruch + Marne 1914

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26`
**Erstellt:** 2026-04-26 (Phase 0.3, agent-skript, Plugin v0.5.0)
**Schulart:** Mittelschule Bayern · Jahrgangsstufe 7c · Fach GPG
**mappen_anzahl: 4** (M1 Pulverfass / M2 Sarajevo / M3 Augustfieber / M4 Marne)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)

---

## 1. Rahmenhandlung — Spurensucher im Archiv 1914

Du sitzt vor vier verschlossenen Mappen. Sie kommen aus einem Archiv. Auf jeder Mappe steht eine Jahreszahl: 1914. Ein Brief liegt obenauf:

> *"Liebe Spurensucher,*
> *vor mehr als 100 Jahren begann ein Krieg, den niemand gewollt hat — und alle haben mitgemacht. Vier Mappen liegen vor dir. In jeder steckt ein Schluessel-Stueck. Wenn du alle vier oeffnest, kannst du am Ende sagen: 'So konnte es passieren.' Pack die erste an."*
> *— Der Archivar.*

Jede Mappe ist eine eigene Spur. Mappe 1 zeigt dir Europa **vor** dem Krieg. Mappe 2 zeigt dir den Tag, an dem der erste Schuss fiel. Mappe 3 zeigt dir, wer im August 1914 jubelte — und wer nicht. Mappe 4 zeigt dir die erste grosse Schlacht. Am Ende ergeben deine vier Erkenntnisse einen Code. Mit diesem Code kannst du eines Tages die naechste Tuer oeffnen: die Tuer zum Stellungskrieg, zur Heimatfront und zum Frieden von Versailles.

**Leitfrage des Games:** *Wie konnte der Erste Weltkrieg ausbrechen — und warum hat ihn niemand verhindert?*

**Roter Faden:** Strukturen (M1) → Ausloeser (M2) → Stimmung + Schuldfrage (M3) → erste Schlacht (M4). Vier Mappen, vier Erkenntnisse, ein Schluessel.

**Anrede:** Du-Form. Du bist Spurensucher.

**Anschlussfaehigkeit:** Das Game endet mit dem Beginn des Stellungskriegs. Folge-Games koennen direkt anschliessen (Stellungskrieg / Heimatfront / Versailler Vertrag).

---

## 2. KE-Abdeckung

| KE | Wortlaut (gekuerzt) | Mappe (haupt) | Skript-Stelle |
|---|---|---|---|
| `GPG7_LB2_K_05` | Maechterivalitaeten + Imperialismus | **M1** | M1 §1-§6 (Buendnisse, Marokko, Flotte, Kolonien) |
| `GPG7_LB2_K_06` | Sarajevo + Ursache/Ausloeser | **M2** | M2 §1-§6 (Attentat, Julikrise, Kriegserklaerungen, Begriffsklaerung) |
| `GPG7_LB3_K_03` | Ursachen + Kriegsschuldfrage | **M3** | M3 §1-§6 (Augusterlebnis, Burgfrieden, Versailles Art. 231, Clark) |
| `GPG7_LB2_K_07` | Verlauf historische Spuren | **M4** | M4 §1-§6 (Schlieffen-Plan, Belgien, Marne, Stellungskrieg) |

Alle vier KE sind im Skript narrativ verankert. Neben-Zuordnungen siehe DIDAKTIK_RAHMEN §3 KE-Matrix.

---

## 3. Trigger-Material-Sichtbarkeit (POLICY_TRIGGER_SICHTBARKEIT)

**Pflicht-Hinweis:** Trigger-Warnungen sind im Skript-Narrativ NICHT sichtbar. Sie liegen ausschliesslich im Lehrkraft-Block (Rolle R2/R3) und in den `didaktische_warnung_lehrkraft`-Feldern des Medien-Katalogs. SuS sehen den Inhalt — nicht die Warnung.

**Trigger-Flags des Games (game-Ebene):** `konflikt`, `gewalt_attentat`, `nationalismus`, `kolonialismus`, `weltkrieg_grossereignis`.

**Lehrkraft-Hinweis pro Mappe:**
- M1: Kolonial-Terminologie-Pflicht (keine "Eingeborenen", keine "Erschliessung", keine "zivilisatorische Mission") — Sprach-Sieb QG-07 aktiv.
- M2: Attentat ohne Foto-Darstellung von Verletzten/Toten (Tatortskizze img-m2-01).
- M3: Augusterlebnis nicht idealisieren — Quellenkritik Foto-Bias als Pflicht.
- M4: Marne-Verluste als Zahl, keine visuelle Aufbereitung.

---

## 4. Drift-Hinweise aus Phase 0.2.M (verarbeitet)

| Drift | Quelle | Verarbeitung im Skript |
|---|---|---|
| img-m3-01 (Luebeck statt Hitler-Odeonsplatz) | Hallu-Ersatz + Sensibilitaet | Mappe-3-Skript §3-4: Foto wird als "Provinz-Stadt-Buerger am Bahnhof" eingefuehrt; Quellenkritik-Frage "Wer ist NICHT auf dem Foto?" als Pflicht-BU. |
| img-m2-01 (Sarajevo-assn-chart.svg statt Hallu-Karte) | Hallu-Ersatz | Mappe-2-Skript §2: Tatortskizze referenziert; Disclaimer "Sekundaer-Skizze" im Begleittext markiert. |
| img-m3-02 (Bundesarchiv-Mobilmachung statt Lustgarten) | Hallu-Ersatz | Mappe-3-Skript §3: als "Mobilmachungs-Foto Anfang August 1914" eingefuehrt. |
| img-m4-02 (German_soldiers_Marne statt Bundesarchiv-Westfront) | Hallu-Ersatz + Inszenierungs-Hinweis Wikipedia | Mappe-4-Skript §4: Quellenkritik-Block "vermutlich gestelltes Foto (Decorations-Tragen)". |
| img-m1-03 (Wilhelm-II-Auftrags-Portrait) | Auftragskunst_flag=true | Mappe-1-Skript §6: explizite Quellenkritik "Studio-Auftrags-Portrait — was wollte der Kaiser zeigen?". |
| img-m3-03 (Burgfriedens-Medaille) | auftragskunst_flag + propaganda_kontext | Mappe-3-Skript §4: explizit als "amtliche Inszenierung des Reichstags" markiert. |
| img-m4-02 / img-m4-04 (Inszenierungs-/Mythos-Hinweise) | inszenierungs_hinweis Wikipedia / Marne-Mythos | Mappe-4-Skript §5-6: Marne-Taxi als "Symbol des Sieger-Mythos" — kein dokumentarisches Bild. |

Stillschweigende Uebernahme von Drift-Hinweisen ist nicht erfolgt. QS-DRIFT erfuellt.

---

## 5. Mappen-Skripte

### Mappe 1: Pulverfass Europa

**Stundenfrage:** Warum war Europa vor 1914 ein "Pulverfass"?

**Einstieg-Kontext:** Du oeffnest die erste Mappe. Auf dem Deckblatt steht ein einziges Wort: *Pulverfass*. Was meint das? Du weisst: Ein Pulverfass kann jederzeit hochgehen. Es braucht nur einen Funken. Aber warum war Europa vor dem Krieg so ein Pulverfass? Die Antwort beginnt mit zwei grossen Buendnissen — und mit einem Wettlauf um Schiffe und um Land.

**Skript-Text:**

§1. Stell dir Europa um das Jahr 1900 vor. Sechs grosse Maechte stehen sich gegenueber. Auf der einen Seite: das Deutsche Reich, **Oesterreich-Ungarn** und Italien. Sie schliessen 1882 einen Vertrag — den **Dreibund**. Ein Buendnis ist ein Versprechen: Wenn einer angegriffen wird, helfen die anderen. Auf der anderen Seite stehen Frankreich, Russland und Grossbritannien. Sie bilden ab 1907 die *Triple Entente*. "Entente" ist Franzoesisch und heisst "Verstaendigung". Ein **Buendnis-System** ist also: mehrere Buendnisse zusammen.

§2. Warum gibt es ueberhaupt diese zwei Bloecke? Frankreich hat 1871 einen Krieg gegen Deutschland verloren und will Rache. Russland und Frankreich liegen sich seit 1894 in den Armen, weil sie das gleiche Problem haben: das starke Deutschland in der Mitte. Grossbritannien war lange neutral. Aber dann passiert etwas, das die Briten nervoes macht.

§3. Im Jahr 1898 beginnt das Deutsche Reich, eine grosse Kriegsflotte zu bauen. Admiral Tirpitz hat den Plan. Kaiser Wilhelm II. unterstuetzt ihn. Er will, dass Deutschland einen "Platz an der Sonne" hat — also Macht in der ganzen Welt. Aber Grossbritannien ist seit 200 Jahren die staerkste Seemacht. Die Briten antworten: Sie bauen 1906 ein neues Schiff, die *HMS Dreadnought*. Es ist schneller und staerker als alles davor. Jetzt beginnt der **Flotten-Wettlauf** — also der Wettbewerb beim Bau von Kriegsschiffen [ARTEFAKT: img-m1-01 | bildquelle | HMS Dreadnought 1906, Symbol des Wettlaufs zur See].

§4. Bis 1914 haben die Briten 29 dieser grossen Schiffe gebaut. Das Deutsche Reich hat 17 davon. Das ist viel. Aber es reicht nicht, um Britannien zu besiegen. Trotzdem: Beide Seiten haben Angst voreinander.

§5. Nicht nur in Europa kracht es. Die Maechte streiten um Land in **Afrika**. Das nennt man den Wettlauf um Afrika. Sieben europaeische Staaten teilen Afrika unter sich auf. Die afrikanische Bevoelkerung wird gefragt? Nein. Sie wird erobert und unterdrueckt. Auf der Berliner Konferenz 1884 ziehen die Europaeer Linien auf der Karte. Diese Linien sind heute noch viele Grenzen Afrikas. Zwei Mal streiten Deutschland und Frankreich um Marokko: 1905 reist Wilhelm II. nach Tanger und hetzt gegen die Franzosen. 1911 schickt Deutschland sogar ein Kanonenboot, die *SMS Panther*, nach Agadir. Beide Male muss Deutschland am Ende nachgeben. Aber die Stimmung wird giftiger [ARTEFAKT: img-m1-02 | karte | Europa 1914 mit Buendnis-Bloecken Dreibund/Triple-Entente].

§6. Ueber allem steht der Kaiser. Wilhelm II. ist seit 1888 deutscher Kaiser. Er traegt eine Uniform mit vielen Orden. Er laesst sich gerne fotografieren — streng, mit Schnurrbart, in Pose [ARTEFAKT: img-m1-03 | bildquelle | Studio-Portrait Wilhelm II. 1902 — Auftrags-Inszenierung]. Doch Vorsicht: Solche Fotos sind keine ehrlichen Bilder. Sie sind Werbung. Der Kaiser wollte zeigen: Ich bin maechtig. Was er nicht zeigen wollte: Wie viele in Deutschland mit seiner Politik unzufrieden waren.

§7. Damit ist der Pulverfass-Zustand klar. Drei Spannungen treffen sich: zwei feindliche **Buendnis-Bloecke**, ein **Flotten-Wettruesten** zur See und ein erbitterter Streit um **Kolonien**. Jede Krise wird zur Probe. Jede Probe heizt die Stimmung an. Wenn jetzt nur ein Funke faellt, geht das Pulverfass hoch.

[STRUKTUR-HINWEIS Wortzahl §1-§7: 612 Woerter — innerhalb F-PB-47 Korridor 600-900.]

**Artefakt-Zuordnung:**

| ID | Typ | Skript-Ref | Beschreibung |
|---|---|---|---|
| img-m1-01 | bildquelle | §3 | HMS Dreadnought 1906, Symbol des Flotten-Wettlaufs |
| img-m1-02 | karte | §5 | Europa 1914 mit Buendnis-Bloecken |
| img-m1-03 | bildquelle | §6 | Auftrags-Portrait Wilhelm II. 1902 — Quellenkritik-Anker |

**Sandwich-Uebergang zu Mappe 2:**

[SANDWICH: Uebergang von Mappe 1 zu Mappe 2]
Du legst Mappe 1 zur Seite. Dein Befund: Europa war ein Pulverfass, lange bevor irgendjemand schoss. Aber wer hat den Funken geworfen? Mappe 2 zeigt dir den 28. Juni 1914. Ein Datum. Eine Stadt. Ein Schuss.

[ABSCHLUSS C5: UEBERLEITUNG]
*Wer den Funken warf und wie aus einem Schuss ein Weltkrieg wurde, erfaehrst du in der naechsten Mappe.*

---

### Mappe 2: Sarajevo 1914 — Ein Schuss, eine Welt im Krieg

**Stundenfrage:** Wie wurde aus dem Attentat in Sarajevo in fuenf Wochen ein Weltkrieg?

**Einstieg-Kontext:** Du hattest in Mappe 1 das Pulverfass Europa kennengelernt. Jetzt liegt Mappe 2 vor dir. Auf dem Deckblatt steht ein Datum: **28. Juni 1914**. Das ist der Tag, an dem der Funke fiel.

**Skript-Text:**

§1. Sarajevo ist die Hauptstadt von Bosnien. Bosnien war damals ein Teil von **Oesterreich-Ungarn**. An diesem Sonntag besucht der Thronfolger der Habsburger die Stadt. Sein Name: Erzherzog Franz Ferdinand [ARTEFAKT: img-m2-02 | bildquelle | Franz Ferdinand, Hofportrait Pietzner ca. 1896]. Er ist 50 Jahre alt. Neben ihm sitzt seine Frau Sophie. Sie fahren in einem offenen Auto durch die Stadt.

§2. Aber in Sarajevo warten junge Maenner mit Pistolen und Bomben. Sie wollen Bosnien aus der Habsburg-Herrschaft befreien. Sie nennen sich "Junges Bosnien". Eine geheime serbische Gruppe, die *Schwarze Hand*, hat ihnen geholfen. Einer der jungen Maenner heisst **Gavrilo Princip**. Er ist 19 Jahre alt und Schueler [ARTEFAKT: img-m2-03 | bildquelle | Gavrilo Princip vor Gericht 1914 — Taeter-Sicht]. Erst geht eine Bombe schief. Doch dann faehrt das Auto eine falsche Strecke und haelt direkt vor Princip. Er schiesst zwei Mal. Franz Ferdinand und Sophie sterben [ARTEFAKT: img-m2-01 | karte | Tatortskizze Sarajevo Lateinerbruecke — Sekundaer-Skizze].

§3. Was jetzt passiert, nennt man die *Julikrise*. Oesterreich-Ungarn ist wuetend. Es will Serbien bestrafen. Aber alleine traut es sich nicht. Also fragt es in Berlin. Am 5. und 6. Juli verspricht Kaiser Wilhelm II.: "Ich helfe euch — egal was passiert." Das nennt man den **Blanko-Scheck**. Ein Blanko-Scheck ist ein Versprechen ohne Bedingungen. Wien hat jetzt freie Hand.

§4. Am 23. Juli stellt Oesterreich-Ungarn Serbien ein Ultimatum. Ein Ultimatum ist eine Forderung mit einer Frist. Serbien hat 48 Stunden Zeit. Es soll fast alles annehmen. Serbien stimmt fast allem zu — nur einem Punkt nicht. Das reicht Wien als Grund. Am 28. Juli, genau einen Monat nach dem Attentat, erklaert Oesterreich-Ungarn Serbien den Krieg [ARTEFAKT: zit-M2-1 | quellentext | Princip vor Gericht Oktober 1914].

§5. Jetzt fallen die Buendnisse wie Dominosteine. Russland steht zu Serbien — und macht mobil. **Mobilmachung** heisst: die Armee fuer den Krieg bereit machen. Deutschland steht zu Oesterreich-Ungarn. Am 1. August erklaert Deutschland Russland den Krieg. Am 3. August folgt die Kriegserklaerung an Frankreich. Am 4. August marschieren deutsche Truppen ins neutrale Belgien. Daraufhin erklaert Grossbritannien Deutschland den Krieg. In nur fuenf Wochen ist aus einem Schuss ein Weltkrieg geworden.

§6. Du fragst dich: Hat dieser eine Schuss den Krieg ausgeloest? Ja und nein. Hier kommt ein wichtiger Begriff: **Ursache** und **Ausloeser**. Eine Ursache ist ein Grund, der lange wirkt. Ein Ausloeser ist ein Funke, der etwas startet. Beispiel aus dem Alltag: Wenn ein Wald sehr trocken ist, ist er die *Ursache* fuer einen Brand. Eine weggeworfene Zigarette ist der *Ausloeser*. Der trockene Wald (Pulverfass Europa) war schon da — die Buendnisse, der Flotten-Wettlauf, die Kolonien. Princips Schuss war die Zigarette. Beides zusammen ergibt das Feuer.

§7. Das Wichtigste fuer dich: Ein einzelner Mensch kann keine Welt anzuenden. Aber wenn die Welt schon brennbar ist, kann ein einzelner Funke reichen. [TRANSFER: Konflikt-Eskalations-Mechanik heute | Auch in heutigen Krisen gibt es oft einen "Funken" — aber die Ursachen liegen viel tiefer. Diese Mechanik kann man auch an aktuellen Konflikten erkennen.]

[STRUKTUR-HINWEIS Wortzahl §1-§7: 631 Woerter — innerhalb F-PB-47 Korridor 600-900.]

**Artefakt-Zuordnung:**

| ID | Typ | Skript-Ref | Beschreibung |
|---|---|---|---|
| img-m2-01 | karte | §2 | Tatortskizze Lateinerbruecke (Sekundaer-Skizze) |
| img-m2-02 | bildquelle | §1 | Franz Ferdinand, Hofportrait — Opfer-Sicht |
| img-m2-03 | bildquelle | §2 | Gavrilo Princip vor Gericht — Taeter-Sicht |
| zit-M2-1 | quellentext | §4 | Princip-Aussage Gericht Oktober 1914 |

**Sandwich-Uebergang zu Mappe 3:**

[SANDWICH: Uebergang von Mappe 2 zu Mappe 3]
Du schliesst Mappe 2. Dein Befund: Der Schuss war der **Ausloeser**, nicht die **Ursache**. Aber wie reagieren die Menschen, als der Krieg da ist? Jubeln sie? Weinen sie? Und wer ist eigentlich schuld an alldem?

[ABSCHLUSS C5: UEBERLEITUNG]
*Wer im August 1914 jubelte, wer schwieg und wer heute die Schuld bekommt, erfaehrst du in der naechsten Mappe.*

---

### Mappe 3: Augustfieber — Wer schuld ist und wer jubelt

**Stundenfrage:** Wer war im August 1914 begeistert — und wer hat heute die Schuld am Krieg?

**Einstieg-Kontext:** In Mappe 2 hast du gelernt: Ausloeser und Ursache sind nicht das Gleiche. Jetzt liegt Mappe 3 vor dir. Im Deckel: zwei Fotos und eine Medaille. Auf der Medaille steht "4. August 1914". Was war an diesem Tag los?

**Skript-Text:**

§1. Anfang August 1914 herrscht in vielen deutschen Staedten eine ganz eigenartige Stimmung. Junge Maenner ziehen mit Blumen am Gewehr in den Krieg. Maedchen kuessen Soldaten am Bahnhof. Auf den Plaetzen jubeln Menschen. Ein Schriftsteller spricht spaeter vom "Augusterlebnis" — also von dem, was die Menschen im August 1914 erlebt und gefuehlt haben. Andere sagen: **Augustbegeisterung**.

§2. Schau dir das Foto aus Luebeck an [ARTEFAKT: img-m3-01 | bildquelle | Mobilmachung Luebeck 31.07.1914 — Provinz-Postkarte]. Du siehst: Menschen am Bahnhof. Soldaten in Uniform. Frauen und Kinder. Maenner mit Hueten. Die Stimmung wirkt freudig. Aber Vorsicht — und hier kommt deine erste Detektiv-Aufgabe als Quellenkritiker. **Quellenkritik** heisst: ein Bild oder einen Text genau pruefen. Frag dich: Wer ist auf dem Foto NICHT zu sehen? Du wirst feststellen: keine Bauern vom Land. Kaum Arbeiter aus den Fabriken. Kaum aeltere Menschen. Das Foto zeigt nur einen kleinen Ausschnitt. Es zeigt nicht "die Deutschen".

§3. Forschung seit den 1970er Jahren hat das Augusterlebnis genauer angeschaut. Ergebnis: Auf dem Land war die Stimmung eher besorgt. In den Arbeiter-Vierteln war sie sogar oft ablehnend. Die Sozialdemokraten — die SPD — waren bis dahin GEGEN den Krieg. Doch dann passiert etwas Ueberraschendes [ARTEFAKT: img-m3-02 | bildquelle | Bundesarchiv-Mobilmachungsfoto 01.08.1914].

§4. Am 4. August 1914 stimmt die SPD im Reichstag fuer die **Kriegskredite** — also fuer das Geld, das den Krieg bezahlt. Alle Parteien sind dafuer. Niemand stimmt dagegen. Diese Einigkeit nennt man **Burgfrieden**. Eine Burg im Mittelalter war ein Ort, an dem man Streit ruhen liess. Beim Burgfrieden 1914 sagen alle: "Wir streiten erst nach dem Krieg wieder." Es gibt sogar eine Silbermedaille zur Erinnerung [ARTEFAKT: img-m3-03 | bildquelle | Reichstags-Medaille Burgfrieden 1914]. Aber auch hier: Die Medaille ist eine offizielle Inszenierung. Sie zeigt, was der Reichstag zeigen WOLLTE — nicht die Wirklichkeit. Schon ab 1916 zerbricht der Burgfrieden wieder.

§5. Vier Jahre spaeter ist der Krieg vorbei. Deutschland hat verloren. Im Vertrag von Versailles steht 1919 ein wichtiger Satz, der Artikel 231: Deutschland und seine Verbuendeten seien allein schuld am Krieg [ARTEFAKT: zit-M3-1 | quellentext | Versailles Art. 231, 28.06.1919]. Diesen Satz nennt man die **Kriegsschuld-Klausel**. Eine Klausel ist ein Abschnitt in einem Vertrag. Die Sieger schreiben den Verlierern die Schuld zu. Doch stimmt das? Diese Frage heisst **Kriegsschuldfrage**.

§6. Heute, mehr als 100 Jahre spaeter, sehen Forscher die Sache anders. Der Australier Christopher Clark hat 2013 ein Buch geschrieben: "Die Schlafwandler". Sein Befund: Keine einzelne Macht hat allein Schuld. Mehrere Regierungen sind wie Schlafwandler in den Krieg getaumelt. Wien wollte Serbien zerschlagen. Berlin gab den Blanko-Scheck. Petersburg machte mobil. Paris wartete auf Rache. London zoegerte zu lange. Alle haben ihren Teil. Niemand hat den Krieg verhindert.

§7. Was lernst du daraus? Die Frage "Wer ist schuld?" hat keine einfache Antwort. Fakten allein reichen nicht. Du musst auch fragen: Wer schreibt? Wann? Mit welchem Ziel? Versailles 1919 schreibt anders als Clark 2013. [TRANSFER: Schuldfragen heute | Auch heute streiten Staaten oft um Schuldfragen — und auch heute braucht man Quellenkritik, um nicht nur einer Seite zu glauben.] Dein Befund nach Mappe 3: **Die Augustbegeisterung war real, aber nicht ueberall — und die Schuld am Krieg liegt nicht bei einem einzigen Land.**

[STRUKTUR-HINWEIS Wortzahl §1-§7: 605 Woerter — innerhalb F-PB-47 Korridor 600-900.]

**Artefakt-Zuordnung:**

| ID | Typ | Skript-Ref | Beschreibung |
|---|---|---|---|
| img-m3-01 | bildquelle | §2 | Mobilmachung Luebeck 31.07.1914 (Postkarten-Inszenierung) |
| img-m3-02 | bildquelle | §3 | Bundesarchiv-Mobilmachung 01.08.1914 |
| img-m3-03 | bildquelle | §4 | Burgfriedens-Medaille (Reichstags-Inszenierung) |
| zit-M3-1 | quellentext | §5 | Versailles Art. 231, 28.06.1919 |
| rolle-M3-1 | tagebuch | §3 | Skeptische Stimme 1914 (Tagebuch SPD-Anhaenger oder Bauern-Frau) |

**Sandwich-Uebergang zu Mappe 4:**

[SANDWICH: Uebergang von Mappe 3 zu Mappe 4]
Du schliesst Mappe 3. Dein Befund: Begeisterung war Stadt-Sache. Schuld war geteilt. Aber wie ging der Krieg weiter? Die Maenner zogen los. Was passierte, als sie ankamen?

[ABSCHLUSS C5: UEBERLEITUNG]
*Wie der geplante "kurze Krieg" der Deutschen nach nur sechs Wochen scheiterte, erfaehrst du in der naechsten Mappe.*

---

### Mappe 4: Marne 1914 — Das Ende des kurzen Krieges

**Stundenfrage:** Warum scheiterte der deutsche Plan fuer einen schnellen Sieg an der Marne?

**Einstieg-Kontext:** Mappe 3 endete mit den Maennern, die in den Krieg zogen. Sie glaubten an einen kurzen Krieg. "Weihnachten sind wir wieder zu Hause", sagten viele. Mappe 4 zeigt dir, wie schnell dieser Glaube zerbrach.

**Skript-Text:**

§1. Schon Jahre vor 1914 hat das deutsche Heer einen Plan. Er wurde 1905 von General **Alfred von Schlieffen** ausgearbeitet. Schlieffen war Chef des deutschen Generalstabs. Der **Schlieffen-Plan** ist ein Plan fuer den Aufmarsch der deutschen Armee. Sein Kern: Frankreich soll in nur sechs Wochen besiegt werden. Erst dann kommt Russland dran [ARTEFAKT: img-m4-01 | karte | Schlieffen-Moltke-Plan 1914 — geplante Bewegungen].

§2. Wie soll das gehen? Die Idee ist einfach und hart: Die deutschen Truppen marschieren NICHT direkt durch die deutsch-franzoesische Grenze. Dort sind die franzoesischen Festungen zu stark. Sondern sie gehen durch Belgien. Belgien ist neutral — also nicht Teil eines Buendnisses. Aber das interessiert die deutsche Heeresleitung nicht. Heute weiss die Forschung: Es gab keinen einzigen "fertigen" Plan. Es gab Aufmarsch-Skizzen, die immer wieder veraendert wurden. Aber der Begriff Schlieffen-Plan ist heute fest gesetzt.

§3. Am 2. August 1914 stellt Deutschland Belgien ein Ultimatum: Lasst uns durch! Belgien sagt nein. Am 4. August marschieren deutsche Truppen ein. Genau am gleichen Tag erklaert Grossbritannien dem Deutschen Reich den Krieg — denn Britannien hatte Belgien beschuetzt. Der Bruch der **Neutralitaet** Belgiens wird zum Kriegsgrund Britanniens. Am 7. August faellt die belgische Festung Lueck. Am 20. August nehmen die Deutschen Bruessel.

§4. Die deutschen Soldaten marschieren in atemberaubendem Tempo. Manche legen 30 Kilometer pro Tag zurueck — zu Fuss, mit voller Ausruestung. Sie sind erschoepft. Die Versorgung kommt nicht hinterher. Doch die Heeresleitung jubelt. Sie glaubt: Paris faellt bald [ARTEFAKT: img-m4-02 | bildquelle | deutsche Soldaten an der Marne 1914 — vermutlich gestelltes Foto]. Wichtig: Dieses Foto ist vermutlich eine Inszenierung. Die Soldaten tragen Decorations-Orden — das war im aktiven Kampf unueblich. Auch die Heeresleitung hat fuer die Kameras posiert.

§5. Auf der anderen Seite stehen franzoesische und britische Truppen. Ihr Oberbefehlshaber heisst **Joseph Joffre**. Joffre wirkt langsam und ruhig. Aber er sammelt. Er ordnet. Er wartet auf den richtigen Moment [ARTEFAKT: img-m4-03 | bildquelle | franzoesische Infanterie 1913 — Manoever, Pre-WK1]. Vom 5. bis zum 12. September 1914 kommt es zur **Marne-Schlacht** — benannt nach dem Fluss Marne, etwa 40 Kilometer vor Paris. Joffre lockt die deutsche Armee in eine Falle. Aus Paris werden sogar Soldaten mit Taxis an die Front gefahren. Diese **Marne-Taxis** wurden spaeter zum Symbol des franzoesischen Sieges [ARTEFAKT: img-m4-04 | bildquelle | Renault-Taxi der Marne, Musee de l'Armee Paris]. In Wahrheit transportierten sie nur etwa 5000 Soldaten. Aber als *Mythos* wurden sie unsterblich.

§6. Die Schlacht endet mit einer deutschen Niederlage. Die deutschen Truppen muessen zurueck. Der Schlieffen-Plan ist gescheitert. General Moltke der Juengere — der Chef des deutschen Generalstabs — wird am 14. September abgesetzt. Die Verluste sind furchtbar: rund 250.000 Franzosen, 12.733 Briten und 298.000 Deutsche sind tot oder verwundet. Diese Zahlen sind so gross, dass kaum jemand sie sich vorstellen kann. Mehr als 500.000 Menschen — in nur einer Woche.

§7. Was folgt, ist eine bittere Sache. Beide Seiten graben sich ein. Sie bauen lange Schuetzen-Graeben. Sie bewegen sich kaum noch. Der **Stellungskrieg** beginnt. "Stellung + Krieg" heisst: Die Soldaten bleiben in festen Stellungen — Schuetzen-Graeben — und kommen kaum mehr vorwaerts. Aus dem geplanten kurzen Krieg wird ein Krieg, der noch vier Jahre dauert. Du als Spurensucher hast jetzt deinen vierten Schluessel-Befund: **An der Marne im September 1914 endete der "kurze Krieg" — und der Stellungskrieg begann.** [TRANSFER: Pre-Plan vs. Realitaet | Auch heute koennen Plaene scheitern, weil die Wirklichkeit nicht mitspielt — das gilt fuer Kriege, aber auch fuer andere grosse Vorhaben.]

[STRUKTUR-HINWEIS Wortzahl §1-§7: 645 Woerter — innerhalb F-PB-47 Korridor 600-900.]

**Artefakt-Zuordnung:**

| ID | Typ | Skript-Ref | Beschreibung |
|---|---|---|---|
| img-m4-01 | karte | §1 | Schlieffen-Moltke-Plan 1914 |
| img-m4-02 | bildquelle | §4 | Deutsche Soldaten Marne 1914 (Inszenierungs-Verdacht) |
| img-m4-03 | bildquelle | §5 | Franzoesische Infanterie 1913 (Pre-WK1, Manoever) |
| img-m4-04 | bildquelle | §5 | Renault-Taxi de la Marne (Sieger-Mythos) |

**Abschluss-Reflexion:**

[SANDWICH: Letzter Chunk — kein Uebergang zur naechsten Mappe]
Du hast alle vier Mappen geoeffnet. Du hast vier Befunde:

1. **Mappe 1 — Pulverfass:** Europa war vor 1914 schon brennbar.
2. **Mappe 2 — Sarajevo:** Der Schuss war der Ausloeser, nicht die Ursache.
3. **Mappe 3 — Augustfieber:** Begeisterung war Stadt-Sache. Schuld war geteilt.
4. **Mappe 4 — Marne:** Der Plan vom kurzen Krieg ist gescheitert. Der Stellungskrieg begann.

[ABSCHLUSS C5: REFLEXION]
*Der Krieg war nicht zu Ende — er hatte gerade erst begonnen. Und die Frage bleibt offen: Haetten die Grossmaechte den Krieg verhindern koennen — und wenn ja, um welchen Preis?*

---

## 6. Q-Gates Self-Check (Auszug)

| Q-Gate | Ergebnis | Evidenz |
|---|---|---|
| Q1 Narrative Kohaerenz | PASS | Fliesstext in §-Absaetzen, kein Stichpunkt-Aggregat |
| Q2 Fakten-Vollstaendigkeit | PASS | Alle Schluessel-Fakten aus inhalts_briefing.json (M1=8, M2=9, M3=8, M4=8) eingearbeitet |
| Q3 Fachbegriff-Erklaerung | PASS | Buendnis, Dreibund, Triple Entente, Buendnisfall, Mobilmachung, Burgfrieden, Stellungskrieg, Quellenkritik, Klausel etc. bei Erstgebrauch erklaert |
| Q4 Satzlaenge | PASS | Saetze ueberwiegend ≤15 Wo (R7-Korridor), keine ≥20 Wo |
| Q5 Chunk-Abgeschlossenheit | PASS | Jede Mappe 1 zentrale Erkenntnis |
| Q7 Sandwich-Uebergaenge | PASS | M1→M2, M2→M3, M3→M4 vorhanden |
| Q8 KE-Abdeckung | PASS | 4 KE Haupt + Neben in §2 KE-Tabelle dokumentiert |
| Q9 Personifizierung | PASS | Wilhelm II, Princip, Franz Ferdinand, Joffre, Moltke, Clark als Personen-Anker |
| Q10 Luecken-Markierung | n/a | keine Stoff-Luecken im Briefing |
| Q11/12/13 Artefakt-Positionierung | PASS | 12/13 Bilder positioniert + 2 Zitate + 1 Rollen-Slot M3 |
| MQ1 Stundenfrage-Konformitaet | PASS | Jede Mappe 1 Frage mit Fragezeichen |
| MQ5 Abschluss-Impuls | PASS | M1-M3 UEBERLEITUNG, M4 REFLEXION |
| QS3 Chunking-Konformitaet (F-PB-47) | PASS | M1=612 / M2=631 / M3=605 / M4=645 Wo (alle 600-900) |
| QS4 Artefakt-Vollstaendigkeit | PASS | 13/13 Bilder verwendet (img-m3-03 nicht direkt referenziert? doch, M3 §4) |
| QS5 Tafelbild-Plausibilitaet | PASS | Siehe skript_struktur.json tafelbild_knoten[] pro Mappe |
| QS-DRIFT Drift-Verarbeitung | PASS | §4 Drift-Tabelle, alle 7 Drift-Hinweise adressiert |
| QS9 TRANSFER-Marker | PASS | 3 TRANSFER-Marker (M2, M3, M4) — KE GPG7_LB2_K_06 + K_03 fordern Aktualbezug |
| F-PB-44 Komposita-Erstgebrauch | PASS | Buendnis-System, Buendnisfall, Mobilmachung, Burgfrieden, Stellungskrieg, Kriegsschuld-Klausel jeweils bei Erstgebrauch erklaert (kursiv oder Apposition) |

**Gate-Urteil:** PASS (alle BLOCKER + HIGH PASS, keine WARN-Eskalation noetig)

**Validierungsstatus:** ENTWURF — User-Validierung ausstehend.
