# Vom Bit zur Shell

111 lokale HTML-Folien für IT-Anfänger entlang des Storyboards in `../plan.md`. Der Hauptpfad umfasst 103 Folien von Bits und Python über Betriebssystem und Prozesse bis zu Terminal, PowerShell, PATH und Objektpipelines. Danach folgen sechs optionale Architekturfolien sowie zwei optionale Java-/Bytecodefolien. Schrittweise Einblendungen, interaktive Bits und Verständnisfragen verbinden die Themen. Wegen des Umfangs sind mehrere Lernblöcke mit Pausen sinnvoll; die Diskussion bestimmt das Tempo.

## Start

`index.html` im Browser öffnen. Keine Installation, kein Build und keine Internetverbindung erforderlich. Den ganzen Ordner zusammenhalten.

Alternativ aus diesem Ordner:

```sh
python3 -m http.server 8793 --bind 127.0.0.1
```

Anschließend [lokale Präsentation](http://127.0.0.1:8793) öffnen. Mit `Strg+C` den Server beenden. Falls der Port belegt ist, eine andere Nummer verwenden.

## Steuerung

| Taste / Element                    | Wirkung                                         |
| ---------------------------------- | ----------------------------------------------- |
| Pfeil rechts, Leertaste, Page Down | Nächste Einblendung, anschließend nächste Folie |
| Pfeil links, Page Up               | Eine Einblendung zurück, dann vorherige Folie   |
| Home / End                         | Erste / letzte Folie                            |
| N                                  | Sprechernotizen ein-/ausblenden                 |
| O                                  | Folienübersicht mit direkter Auswahl            |
| F                                  | Vollbild, sofern der Browser es unterstützt     |
| ?                                  | Hilfe                                           |
| Esc                                | Dialog bzw. Notizen schließen                   |
| Horizontal wischen                 | Auf Mobilgeräten weiter/zurück                  |

Auf einem fokussierten Button aktiviert die Leertaste diesen Button. Die Pfeiltasten steuern weiter die Präsentation. Quiz-Auswahl markiert eine Vermutung; die Antwort erscheint erst mit **Aufdecken**. Bits lassen sich mit Maus, Touch oder per Tab und Leertaste umschalten. `#18/1` in der Adresse bezeichnet Folie 18, Einblendung 1. Beim Neuladen wird diese Position wiederhergestellt; Bit-Auswahl und Quiz-Markierungen werden zurückgesetzt. Beim Wechsel zwischen Folien bleiben diese Auswahlen bis zum Neuladen erhalten.

**Notizen erscheinen als Seitenfenster auf demselben Bildschirm.** Vor dem Teilen oder Projizieren schließen. Das ist keine separate private Referentenansicht. Alle Sprechernotizen sind außerdem in `notes.md` lesbar.

## Inhalt und didaktische Entscheidungen

| Folien  | Thema                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------- |
| 1–14    | Computer, Programm, CPU, Bits und Binärzahlen                                                  |
| 15–18   | Dieselben Bits als Zahl, ASCII-Buchstabe oder Pixelmuster; Wörterbuch und Konvention           |
| 19–21   | Register als Notizzettel; RAM-Adressen als Hausnummern; Registerinhalt an Adresse 0 schreiben  |
| 22–27   | Befehlssatz, Opcode und Operand                                                                |
| 28–31   | LOAD 5, ADD 3 und STORE 0 von Hand konstruieren                                                |
| 32–35   | Fetch–Decode–Execute, CPU-Simulation und Fehlercheck                                           |
| 36–40   | Assembly, EAX erklärt, Registerzustand und Assembler                                           |
| 41–46   | Zahlen 1 bis 10 summieren, höhere Sprachen, Gaspedal, Abstraktion und Quellcode                |
| 47–50   | Compiler mit vollständigen realen Maschinenbytes, Optimierung, Buchübersetzung und Dolmetscher |
| 51–55   | Python, vereinfachte Übersetzung, Erkennungsquiz, Ausgabe und Abschlusskette bis zu Bits       |
| 56–58   | Historische Abstraktionstreppe, Zeitleiste und Sortierübung                                    |
| 59–64   | Betriebssystem, Programmstart, Programm und Prozess                                            |
| 65–70   | Historisches und heutiges Terminal, Shell sowie Terminal-/Shell-Quiz                           |
| 71–78   | Get-Date, Befehlsarten, Cmdlets, Verb-Nomen und Aliase                                         |
| 79–84   | Externe Programme, Get-Command, PATH und Diagnose eines nicht gefundenen Befehls               |
| 85–90   | Aktuelles Verzeichnis, absolute und relative Pfade, Standardkanäle und Umleitung               |
| 91–98   | Textpipeline, PowerShell-Objekte, Sortieren nach Eigenschaften und Get-Member                  |
| 99–103  | Gesamtgeschichte für git status, Abschlussübung, Blitzrunde und Schichtenmodell                |
| 104–109 | Optionaler Architektur-Exkurs: x86-64, AArch64 sowie Intel- und AT&T-Syntax                    |
| 110–111 | Optionaler Java-Exkurs: Bytecode, JVM und Portabilität                                         |

Der wiederkehrende Merksatz lautet: **Zeichenfolge + passende Deutungsregeln → Bedeutung.** Der Kontext wählt die Regeln; Software und Hardware setzen sie um. Eine Konvention ist keine beliebige Änderung an einem vorhandenen Standard oder Prozessor.

Register und Adressen werden eingeführt, bevor der Befehlssatz sie voraussetzt. Die Hausnummer bleibt, während sich der Inhalt ändern kann. Das spätere STORE-Beispiel greift diese Darstellung wieder auf. EAX wird bei seiner ersten Verwendung als 32-Bit-Register und Erweiterung des historischen Registers AX erklärt.

Das einfache 12-Bit-Befehlsformat unterstützt das manuelle Konstruieren. Wiederholte Modellhinweise stehen nicht auf den Hauptfolien; die Abgrenzung zu realen Architekturen erfolgt im Exkurs und in den technischen Details unten. Die Architekturvergleiche folgen erst nach dem Abschluss. Links führen gezielt in den Exkurs und zurück zur Abschlussrechnung.

Die Illustrationen greifen die Bildideen des Plans auf: CPU als Schreibtisch, Register als Notizzettel, RAM als Aktenschrank, Gaspedal vor komplexer Technik sowie Buchübersetzung versus Dolmetscher. Adressen sind als beschriftete Häuser dargestellt. Die größere Rechenaufgabe zeigt elf vollständige Assembly-Anweisungen für die Summe 1 bis 10; Python drückt dieselbe Aufgabe mit einer Wiederholung aus. Der neue Abschnitt verwendet ein historisch plausibles, mit OpenAI ImageGen erzeugtes Terminalbild. Die übrigen technischen Abläufe bleiben als editierbare HTML-/CSS-Diagramme erhalten.

Die Python-Verarbeitung ist bewusst als vereinfachtes Übersetzungsmodell dargestellt: Quellcode → Maschinenanweisungen. Die Abschlusskette zeigt dieselbe Rechnung auf drei Ebenen; sie behauptet keine gemessene Übersetzung eines Python-Laufs. Die Bytes der gezeigten Assembly-Anweisungen sind exakt. Java und Bytecode erscheinen ausschließlich im optionalen Exkurs am Ende.

Der Systemabschnitt leitet jeden Begriff aus einer konkreten Frage ab: Wer startet Programme, was unterscheidet Datei und Prozess, wer versteht einen Textbefehl, wie findet PowerShell ein externes Programm, worauf beziehen sich relative Pfade und welche Daten fließen durch eine Pipeline? `git status` führt die Begriffe anschließend zu einer durchgehenden Geschichte zusammen.

## Dateien und Anpassungen

- `index.html`: Grundgerüst, Navigation und Dialoge; lädt die Inhalts- und Steuerungsskripte in Reihenfolge.
- `styles.css`: Farben, Typografie, Layouts, responsive Ansicht und einfache Druckansicht.
- `slides.js`: Inhalte und Hilfsfunktionen des ersten Abschnitts.
- `slides-python.js`: Ergänzungen zu Konventionen, Architekturen und die Fortsetzung; setzt die finale Folienreihenfolge zusammen.
- `slides-system.js`: Betriebssystem, Prozess, Terminal, Shell, PowerShell, PATH, Pipelines sowie die Java-Exkursfolien.
- `script.js`: Navigation, Einblendungen, interaktive Bits und Zustandsdarstellungen.
- `notes.md`: vollständige Lesefassung aller Sprechernotizen.
- `assets/`: eigene SVG-Illustrationen und das generierte historische Terminalbild; kleinere Symbole sind SVG-Pfade in `slides.js`.
- `examples/`: echte Python-, C- und Assembly-Dateien samt nachvollziehbaren Prüfschritten und Codierungstabelle.
- `scripts/export-notes.cjs`: optionales Wartungswerkzeug zum Erzeugen der Notizdatei.

Inhalte des ersten Hauptabschnitts liegen in `slides-python.js`, die Fortsetzung in `slides-system.js`. `frag(n, ...)` zeigt Inhalte mit dem n-ten Schritt. Jede Folie hat Ziel, Frage, erwartbare Antworten, Erklärung, Fehlvorstellungen, Übergang und Einblendungshinweise. `demo: 'cpu'` beziehungsweise `demo: 'assembly'` kennzeichnet Zustandsbeispiele. Ihre Zustände werden in `updateDemos()` in `script.js` aus dem aktuellen Einblendungsschritt abgeleitet; Zurückblättern setzt dadurch auch den Zustand zurück.

Nach Inhaltsänderungen optional aus diesem Ordner:

```sh
node scripts/export-notes.cjs
```

Das aktualisiert `notes.md` und prüft Notizfelder sowie Bilddateien. Node wird nur dafür benötigt, nicht zum Abspielen. Folienzahl, Übersicht und Fortschritt folgen automatisch der finalen Folienliste.

## Echte Beispiele

Die Maschinenanweisungen in `examples/x86_64.s` und `examples/aarch64.s` wurden mit Clang für beide Zielarchitekturen assembliert und disassembliert. `examples/README.md` dokumentiert die Bytes einschließlich der Unterscheidung zwischen Instruktionswort und Speicherreihenfolge. Die C-Konstantenrechnung wurde mit Optimierung kompiliert: Das Ergebnis wird direkt als 8 bereitgestellt.

`examples/rechnung.py` wurde tatsächlich mit Python ausgeführt. Die aufgezeichnete Ausgabe ist `8`. Die entsprechende Folie zeigt diese geprüfte Ausgabe; die Präsentation enthält keinen eingebetteten Python-Interpreter.

## Modellgrenzen und technische Details

Das frühe 12-Bit-Befehlsformat ist **kein echter x86- oder ARM-Maschinencode**. Es dient dazu, die Rollen einzelner Anweisungsteile zu verstehen. Es ist keine vollständige CPU-Emulation.

Für das einfache 12-Bit-Befehlsformat gelten diese Regeln:

- Eine Anweisung hat 12 Bits: 4 Bits Opcode, 8 Bits für Wert oder Adresse.
- Der Rechenstand ist eine vorzeichenlose 8-Bit-Zahl von 0 bis 255; ADD würde bei Überlauf modulo 256 rechnen. Überläufe sind nicht Gegenstand der Folien.
- `0001 | Wert` (LOAD): Rechenstand auf den angegebenen Wert setzen.
- `0010 | Wert` (ADD): den angegebenen Wert zum Rechenstand addieren.
- `0011 | Adresse` (STORE): Rechenstand an dieser Datenadresse speichern.
- `0100 | Adresse` (JUMP): mit der Anweisung an dieser Anweisungsadresse fortfahren.
- Daten- und Anweisungsspeicher sind getrennt, mit je 256 adressierbaren Plätzen. LOAD, ADD und STORE gehen danach zur nächsten Anweisungsadresse; an Adresse 255 würde diese wieder 0. JUMP setzt die nächste Adresse ausdrücklich. Andere Opcodes sind undefiniert.
- Der vorhandene Rechenstand ist bei ADD ein impliziter Operand und das implizite Ziel. Das blaue Feld enthält den ausdrücklich angegebenen Operanden.

Das vollständige manuelle Beispiel lautet `0001 | 00000101` (LOAD 5), `0010 | 00000011` (ADD 3), `0011 | 00000000` (STORE 0). Nach LOAD steht 5, nach ADD 8 im Register; STORE sichert 8 an Datenplatz 0. Die geführte Simulation zeigt je Anweisung Holen, Decodieren und Ausführen. Die Darstellung stoppt nach neun Phasen am Ende dieses Ausschnitts; sie modelliert keinen HALT-Befehl. Englische Namen sind Lesehilfen, die Anweisungen bestehen aus Bits.

Bei echten CPUs variieren Länge, Feldaufteilung und Anzahl beziehungsweise Art der Operanden. Eine Operation kann über mehrere Felder codiert sein. Die Bedeutung von Bits ergibt sich aus Format und Verwendung; es gibt kein universelles Erkennungsbit für „Zahl oder Befehl“. Betriebssystem, Prozess und Shell werden auf logischer Ebene erklärt; Caches, virtuelle Speicherverwaltung, Threads und Systemaufrufe bleiben ausgeblendet.

## Abhängigkeiten, Bilder und Fachquellen

Keine externen Bibliotheken, Webfonts, CDN-Aufrufe oder Tracking. Beim Abspielen werden ausschließlich die mitgelieferten lokalen Dateien geladen. Die Präsentationssteuerung ist bewusst in einfachem JavaScript umgesetzt. Native Browserfunktionen übernehmen Dialoge und Vollbild. Das historische Terminalbild wurde mit OpenAI ImageGen erstellt und lokal eingebunden. Die fachlichen Quellen werden nur als Links angeboten und beim Abspielen nicht geladen.

Fachlicher Abgleich am 20.09.2026:

- [Intel Software Developer’s Manuals](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html), insbesondere Volume 2: Anweisungsformate, Opcode und Operanden. Die Lern-Codierungen wurden daraus ausdrücklich **nicht** übernommen.
- [Texas Instruments: Understanding and Interpreting Standard-Logic Data Sheets](https://www.ti.com/lit/an/szza036c/szza036c.pdf): gültige logische Eingangspegel sind Spannungsbereiche; 0 und 1 sind nicht allgemein mit „kein Strom“ und „Strom“ gleichzusetzen.

- [ASCII in RFC 20](https://www.rfc-editor.org/rfc/rfc20.html): tatsächliche Zuordnung des Codes 65 zum Buchstaben A.
- [Arm A64 Instruction Set](https://developer.arm.com/documentation/ddi0602/latest/): reale AArch64-Anweisungen.
- [Python-Tutorial](https://docs.python.org/3/tutorial/introduction.html): Rechnen, Namenbindung und Ausgabe.
- [GNU as: Intel-/AT&T-Syntax](https://sourceware.org/binutils/docs/as/i386_002dVariations.html): unterschiedliche Notation derselben x86-Anweisungen.
- [Python range](https://docs.python.org/3/tutorial/controlflow.html#the-range-function): Wiederholung über die Zahlen 1 bis 10.
- [Arm A64 und Compiler](https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/the-a64-isa-and-compilers): feste Anweisungslänge und Entwurfsentscheidungen.
- [Windows Terminal](https://learn.microsoft.com/windows/terminal/) und [Terminal-/Shell-Abgrenzung](https://learn.microsoft.com/windows/terminal/faq): Terminal als Host für PowerShell, cmd und weitere Kommandozeilenprogramme.
- [PowerShell-Befehlsauflösung](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_command_precedence), [Aliase](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_aliases) und [PATH](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_environment_variables): Auflösung von Cmdlets und externen Programmen.
- [PowerShell-Umleitung](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_redirection) und [Get-Member](https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/get-member): Ausgabeströme und Objektstruktur.
- [Java Virtual Machine Specification](https://docs.oracle.com/javase/specs/jvms/se25/html/): Bytecode und JVM für den optionalen Java-Exkurs.

Die Quellen sind ebenfalls in den entsprechenden Sprechernotizen hinterlegt. Die übrige Inhaltsgrundlage ist das mitgegebene Storyboard.

## Prüfung dieses Ausschnitts

Im Codex-Browser über den lokalen HTTP-Server geprüft: alle 111 Folien bei 1280 × 720 und 390 × 844, Einblendungen, Quiz-Auflösungen, CPU-/Register-Zustandswechsel, interne Exkurslinks und responsive Layouts. Die PowerShell-Beispiele `Get-Date`, `Get-Command`, `Get-Alias`, `Get-Process` und `Get-Member` wurden zusätzlich mit lokalem PowerShell 7 auf Syntax und Befehlsart geprüft. Mobil können längere Folien vertikal gescrollt werden. Die direkte `file://`-Navigation ist in der Browser-Testumgebung gesperrt und wurde deshalb nicht praktisch verifiziert; die Dateien verwenden normale relative CSS-/JS-Verweise ohne Modul- oder Fetch-Abhängigkeit. Die Druckansicht ist eine einfache Zusatzansicht, kein separat geprüfter PDF-Export.
