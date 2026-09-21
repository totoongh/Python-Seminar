# Storyboard: Vom Computer zur Shell

## Grundlagen zu Computern, Programmen, Programmiersprachen, Terminal und PowerShell

### Zielgruppe

Komplette Anfänger ohne vorausgesetztes Informatikverständnis.

### Grundprinzip

Das Seminar arbeitet konsequent nach diesem Muster:

1. **Frage stellen**
2. **Vermutungen sammeln**
3. **etwas Sichtbares oder Konkretes zeigen**
4. **gemeinsam Begriff ableiten**
5. **Definition zeigen**
6. **Verbindung zum nächsten Thema herstellen**
7. **regelmäßig Verständnis testen**

Die Folien sollen deshalb bewusst nicht textlastig sein.

---

# Kapitel 1 – Was ist eigentlich ein Computer?

## Folie 1 – Einstieg

### Titel

**Was passiert eigentlich, wenn wir einem Computer etwas sagen?**

### Bild

Große einfache Illustration:

```text
Mensch → ? → ? → ? → Computer macht etwas
```

Die Fragezeichen bleiben bewusst offen.

### Sprechertext

„Wir benutzen jeden Tag Computer. Wir tippen etwas ein, klicken auf etwas und irgendwie passiert etwas. Aber was passiert zwischen unserer Eingabe und dem eigentlichen Rechnen?“

„Genau diese Kette bauen wir heute gemeinsam auf.“

### Interaktion

Frage:

**„Was glaubt ihr: Welche Stationen gibt es zwischen euch und der Hardware?“**

Noch nichts korrigieren.

---

# Kapitel 2 – Was ist ein Computer?

## Folie 2 – Computer oder nicht?

### Titel

**Was davon ist ein Computer?**

### Bild

Große Bilder nebeneinander:

* Desktop-PC
* Smartphone
* Spielekonsole
* Auto
* Waschmaschine
* Taschenrechner

### Interaktion

Handzeichen:

**„Computer oder kein Computer?“**

### Ziel

„Computer“ von der Vorstellung „PC mit Bildschirm“ lösen.

---

## Folie 3 – Gemeinsame Definition

### Titel

**Was haben diese Geräte gemeinsam?**

### Bild

Drei große Symbole:

```text
Daten → Verarbeitung → Ergebnis
```

Darunter:

```text
Anweisungen
```

### Definition erscheint erst nach Diskussion

> **Ein Computer ist eine Maschine, die Daten verarbeitet, indem sie Anweisungen ausführt.**

### Sprechertext

Die Wörter einzeln hervorheben:

**Maschine**

Etwas Physisches.

**Daten**

Zum Beispiel Zahlen, Texte, Bilder oder Messwerte.

**Anweisungen**

Was soll mit den Daten passieren?

---

## Folie 4 – Unser erstes „Programm“

### Titel

**Wie berechnet ein Computer 5 + 3?**

### Bild

Vier große Karten:

```text
5 speichern
↓
3 speichern
↓
addieren
↓
8 speichern
```

### Sprechertext

„Für uns ist 5 + 3 eine einzige gedankliche Operation.“

„Für einen Computer müssen daraus konkrete Arbeitsschritte werden.“

### Übergang

„Eine Folge solcher Arbeitsschritte nennen wir …?“

---

# Kapitel 3 – Was ist ein Programm?

## Folie 5 – Programm

### Titel

**Was ist ein Programm?**

### Frage

„Ist Chrome ein Programm? Ist eine App ein Programm? Ist ein kleines Skript auch ein Programm?“Ei

### Definition

> **Ein Programm ist eine Folge von Anweisungen, die ein Computer ausführen kann.**

### Visualisierung

```text
Anweisung 1
↓
Anweisung 2
↓
Anweisung 3
↓
...
```

---

## Folie 6 – Programm ≠ laufendes Programm

### Titel

**Wo liegt ein Programm, bevor wir es starten?**

### Bild

Links:

```text
SSD
📄 programm.exe
```

Rechts:

```text
RAM → CPU
```

Dazwischen Pfeil:

```text
Starten
```

### Sprechertext

„Eine Programmdatei liegt zunächst einfach auf einem Speichergerät.“

„Beim Start werden benötigte Teile in den Arbeitsspeicher geladen.“

„Dann beginnt die CPU, Anweisungen daraus auszuführen.“

Noch nicht den Begriff Prozess vertiefen.

---

## Verständnisübung 1

### Folie 7

### Titel

**Kurzer Check**

Zeige vier Aussagen:

A. Ein Programm ist immer eine grafische App.
B. Ein Programm besteht aus Anweisungen.
C. Die CPU führt Anweisungen aus.
D. Programme existieren nur, während sie laufen.

### Aufgabe

Teilnehmende stimmen ab.

### Auflösung

B und C.

### Kurze Besprechung

Warum A und D nicht stimmen.

---

# Kapitel 4 – Was versteht die CPU?

## Folie 8 – Die CPU

### Titel

**Wer führt die Anweisungen eigentlich aus?**

### Bild

Stark vereinfachter Computer:

```text
RAM ↔ CPU
      ↓
    Ergebnis
```

### Definition

> **Die CPU führt Maschinenanweisungen aus.**

### Sprechertext

Noch keine Details über Kerne, Cache etc.

---

## Folie 9 – Versteht die CPU Java?

### Titel

**Was versteht eine CPU?**

### Bild

Sprechblasen zur CPU:

```text
"print('Hallo')" ❌
"System.out.println(...)" ❌
"MOV ..." ❌
```

Dann:

```text
Maschinenanweisungen ✅
```

### Sprechertext

„Die CPU versteht weder Deutsch noch Java noch Python.“

„Sie reagiert auf ganz bestimmte codierte Anweisungen.“

---

# Kapitel 5 – Bits und Maschinencode

## Folie 10 – Warum 0 und 1?

### Titel

**Warum reden Computer ständig von 0 und 1?**

### Bild

Sehr einfache elektrische Darstellung:

```text
Signal niedrig → 0
Signal hoch    → 1
```

Optional als Lichtschalter:

```text
AUS → 0
AN  → 1
```

### Sprechertext

„Das ist eine Vereinfachung. Reale Elektronik ist komplizierter.“

„Aber digitale Schaltungen unterscheiden zuverlässig zwischen Zuständen.“

---

## Folie 11 – Ein Bit

### Titel

**Ein Zustand = ein Bit**

### Visualisierung

```text
0
oder
1
```

Dann:

```text
8 Bits:
00000101
```

### Sprechertext

„Ein einzelner binärer Zustand heißt Bit.“

„Mehrere Bits können gemeinsam Informationen darstellen.“

---

## Folie 12 – Warum ist 00000101 die Zahl 5?

### Titel

**Wie können Bits Zahlen darstellen?**

### Bild

Binärstellen:

```text
128 64 32 16 8 4 2 1
 0   0  0  0 0 1 0 1
                ↑   ↑
                4 + 1 = 5
```

### Sprechertext

Nur kurz erklären.

Nicht zu Binärarithmetik abschweifen.

---

## Folie 13 – Aber Bits können auch Befehle sein

### Titel

**Woher weiß der Computer, ob Bits eine Zahl oder einen Befehl bedeuten?**

### Bild

```text
0101
```

darunter zwei Möglichkeiten:

```text
als Zahl → 5
als Teil einer Anweisung → andere Bedeutung
```

### Sprechertext

„Bits haben nicht von Natur aus eine Bedeutung.“

„Die Bedeutung entsteht aus dem Kontext und aus festen Regeln.“

---

## Folie 14 – Das Wörterbuch der CPU

### Titel

**Die CPU hat ein festes 'Wörterbuch'**

### Bild

Didaktisches Fantasie-Beispiel:

```text
0001 → LOAD
0010 → ADD
0011 → STORE
0100 → JUMP
```

Großer Hinweis:

**Nur Beispiel – nicht echter x86-Code**

### Sprechertext

„Die Architektur der CPU legt fest, welche Bitmuster welche Operationen bedeuten.“

---

## Folie 15 – Opcode

### Titel

**Operation Code**

### Bild

```text
0010 | 00000011
 ↑         ↑
ADD      Wert 3
```

### Definition

> **Opcode = der Teil einer Maschinenanweisung, der festlegt, welche Operation ausgeführt wird.**

### Sprechertext

„Ein Teil sagt also ungefähr WAS getan werden soll. Andere Teile sagen womit.“

---

# Kapitel 6 – Was macht die CPU mit der Anweisung?

## Folie 16 – Fetch, Decode, Execute

### Titel

**Was passiert mit einer Maschinenanweisung?**

### Bild

Großer Kreislauf:

```text
HOLEN
 ↓
VERSTEHEN
 ↓
AUSFÜHREN
 ↺
```

Darunter klein:

```text
Fetch → Decode → Execute
```

### Sprechertext

„Die CPU holt die nächste Anweisung aus dem Speicher.“

„Sie erkennt anhand des Bitmusters, welche Operation gemeint ist.“

„Dann führt sie diese Operation aus.“

„Danach kommt die nächste.“

---

## Folie 17 – Kleine CPU-Simulation

### Titel

**Wir spielen CPU**

### Bild

Register als Kästchen:

```text
Register A: 5
Register B: 3
```

Anweisung:

```text
ADD A, B
```

Danach:

```text
Register A: 8
```

### Interaktion

Eine Person ist „CPU“.

Eine Person ist „RAM“.

Eine Person hält Karten mit Anweisungen.

### Ziel

Abstraktes Konzept körperlich sichtbar machen.

---

## Verständnisübung 2

### Folie 18

### Frage

**„Die CPU liest das Wort ADD. Richtig oder falsch?“**

Antwort:

**Falsch.**

Die CPU erhält codierte Bits.

`ADD` ist eine menschenlesbare Darstellung.

### Anschlussfrage

„Warum schreiben Menschen dann ADD?“

Perfekter Übergang zu Assembly.

---

# Kapitel 7 – Assembly

## Folie 19 – Von Bits zu Wörtern

### Titel

**Maschinencode ist für Menschen unbequem**

### Bild

Links:

```text
10110000 00000101 ...
```

Rechts:

```asm
MOV AX, 5
```

### Frage

„Was würdet ihr lieber lesen?“

---

## Folie 20 – Warum heißt MOV MOV?

### Titel

**Assembly gibt Maschinenoperationen Namen**

### Visualisierung

```asm
MOV AX, 5
```

daneben:

```text
MOV = move
AX  = Register
5   = Wert
```

### Sprechertext

„MOV ist nur eine Abkürzung, auf die sich Menschen geeinigt haben.“

„Die CPU kennt das Wort MOV nicht.“

---

## Folie 21 – Register

### Titel

**Was ist AX?**

### Bild

CPU als Schreibtisch.

Auf dem Schreibtisch kleine Notizzettel:

```text
AX
BX
CX
...
```

Daneben großer Aktenschrank:

```text
RAM
```

### Definition

> **Register sind sehr kleine und sehr schnelle Speicherplätze direkt in der CPU.**

### Analogie

Register = Dinge auf dem Schreibtisch.

RAM = Dinge im Aktenschrank.

---

## Folie 22 – Beispiel Schritt für Schritt

### Titel

**5 + 3 in Assembly – vereinfacht**

### Animation / schrittweise Einblendung

```asm
MOV AX, 5
```

danach:

```text
AX = 5
```

Dann:

```asm
ADD AX, 3
```

danach:

```text
AX = 8
```

### Sprechertext

„Jetzt sehen wir zum ersten Mal eine menschenlesbare Beschreibung dessen, was die CPU tun soll.“

---

# Kapitel 8 – Der Assembler

## Folie 23 – Das Problem

### Titel

**Aber die CPU versteht MOV immer noch nicht**

### Bild

```text
MOV AX, 5
   ↓
   ?
   ↓
Maschinencode
```

### Frage

„Was fehlt?“

---

## Folie 24 – Assembler

### Titel

**Der Übersetzer: Assembler**

### Bild

```text
Assembly
MOV AX, 5
     ↓
Assembler
     ↓
Maschinencode
1011...
```

### Definition

> **Ein Assembler übersetzt Assembly in Maschinencode.**

### Sprechertext

„Der Assembler weiß, welches Bitmuster für die jeweilige CPU zu MOV usw. gehört.“

---

## Verständnisübung 3

### Folie 25

### Aufgabe

Ordnet zu:

```text
Assembler
Assembly
Maschinencode
CPU
```

zu:

```text
führt aus
menschenlesbare Maschinenbefehle
übersetzt
binäre CPU-Anweisungen
```

### Lösung

Gemeinsam besprechen.

---

# Kapitel 9 – Warum höhere Programmiersprachen?

## Folie 26 – Jetzt baut mal Amazon

### Titel

**Würdet ihr so eine große Anwendung schreiben?**

### Bild

Links:

200 Zeilen Assembly.

Rechts:
Amazon/Spotify/Banking-App-Symbol.

### Frage

„Was könnte daran schwierig werden?“

Antworten sammeln:

* riesig
* unübersichtlich
* fehleranfällig
* hardwarenah

---

## Folie 27 – Gleiche Idee, andere Ebene

### Titel

**Wir wollen näher an unserem Problem formulieren**

### Bild

Assembly:

```asm
MOV AX, 5
ADD AX, 3
```

Java:

```java
int result = 5 + 3;
```

Python:

```python
result = 5 + 3
```

### Frage

„Welche Version beschreibt besser, was wir eigentlich wollen?“

---

# Kapitel 10 – Abstraktion

## Folie 28 – Das Gaspedal

### Titel

**Abstraktion begegnet uns überall**

### Bild

Großes Gaspedal.

Darunter verborgen:

```text
Sensoren
Motorsteuerung
Einspritzung
Zündung
...
```

### Sprechertext

„Beim Autofahren wollen wir nicht jeden technischen Schritt kontrollieren.“

„Wir sagen nur: schneller.“

---

## Folie 29 – Abstraktion beim Programmieren

### Bild

```text
print("Hallo")
```

darunter ein riesiger Stapel:

```text
Text codieren
Speicher verwalten
Ausgabe erzeugen
Betriebssystem ansprechen
Treiber
Hardware
...
```

### Definition

> **Abstraktion bedeutet, komplizierte Details hinter einfacheren Konzepten zu verstecken.**

---

## Verständnisübung 4

### Aufgabe

**Was ist jeweils die Abstraktion?**

Beispiele:

* Lichtschalter → Elektrik
* Gaspedal → Motorsteuerung
* `print()` → Bildschirmausgabe
* Datei öffnen → Speichergerät/Dateisystem

### Ziel

Begriff wirklich verankern.

---

# Kapitel 11 – Programmiersprache und Quellcode

## Folie 30 – Programmiersprache

### Titel

**Was ist eine Programmiersprache?**

### Definition

> Eine formale Sprache, mit der Menschen Programme beschreiben können.

### Bilder

Logos oder Namen:

```text
C
Java
Python
JavaScript
Rust
```

Nicht vertiefen.

---

## Folie 31 – Quellcode

### Titel

**Was wir schreiben, heißt Quellcode**

### Bild

```java
int result = 5 + 3;
```

Pfeil:

```text
Quellcode
```

### Sprechertext

„Source Code ist zunächst Text.“

„Eine CPU kann diesen Text nicht direkt ausführen.“

---

# Kapitel 12 – Compiler

## Folie 32 – Wie wird aus Quellcode Maschinencode?

### Bild

```text
Quellcode
   ↓
   ?
   ↓
Maschinencode
```

### Frage

„Wir hatten vorhin schon einmal einen Übersetzer. Welchen?“

Antwort:

Assembler.

„Für Hochsprachen brauchen wir etwas Ähnliches.“

---

## Folie 33 – Compiler

### Bild

```text
C-Code
int x = 5 + 3;
      ↓
Compiler
      ↓
Maschinencode
```

### Definition

> **Ein Compiler übersetzt Quellcode in eine andere ausführbare oder weiterverarbeitbare Form.**

---

## Folie 34 – Compiler ist kein Wörterbuch

### Titel

**Compiler übersetzt nicht Wort für Wort**

### Bild

```text
5 + 3
```

führt möglicherweise zu mehreren Maschinenoperationen.

### Sprechertext

„Ein Compiler analysiert die Struktur des Programms.“

„Er kann Berechnungen vereinfachen, Speicher organisieren und Code optimieren.“

---

# Kapitel 13 – Interpreter

## Folie 35 – Muss alles vorher übersetzt werden?

### Frage

**„Muss immer erst eine fertige ausführbare Datei entstehen?“**

---

## Folie 36 – Dolmetscher-Analogie

### Titel

**Compiler vs. Interpreter**

### Bild zweigeteilt

Links:

```text
Buch → komplett übersetzen → fertiges Buch
```

Rechts:

```text
Satz → Dolmetscher → Satz → Dolmetscher
```

### Sprechertext

Compiler = eher Übersetzer.

Interpreter = eher Dolmetscher.

Hinweis:

„Die reale Welt ist komplizierter, aber als erstes Modell hilft das.“

---

## Folie 37 – Python

### Bild

```python
print(5 + 3)
```

darunter:

```text
Python-Runtime
     ↓
Berechnung
     ↓
Ausgabe
```

### Sprechertext

Nicht zu tief in CPython-Bytecode.

---

# Kapitel 14 – Java und Bytecode optional

## Folie 38 – Ein Zwischenschritt

### Titel

**Java macht noch etwas dazwischen**

### Bild

```text
Java-Code
   ↓
Compiler
   ↓
Bytecode
   ↓
JVM
   ↓
Maschinencode
```

### Sprechertext

„Das zeigt uns: Die Realität muss nicht immer nur Compiler ODER Interpreter sein.“

---

## Folie 39 – Warum?

### Bild

```text
derselbe Bytecode
      ↓
Windows JVM
Linux JVM
macOS JVM
```

### Kernaussage

> Die zusätzliche Ebene kann Programme portabler machen.

---

# Kapitel 15 – Historische Entwicklung

## Folie 40 – Eine Treppe der Abstraktion

### Titel

**Programmiersprachen entfernen uns schrittweise von der Hardware**

### Bild als große Treppe:

```text
Python / Java
      ↑
höhere Sprachen
      ↑
Assembly
      ↑
Maschinencode
      ↑
Elektronik
```

### Sprechertext

„Je höher wir gehen, desto weniger technische Details müssen wir selbst kontrollieren.“

„Aber unten muss es weiterhin irgendwie passieren.“

---

## Folie 41 – Kleine Zeitleiste

### Inhalt

Nur wenige Stationen:

```text
1940er/50er → Maschinennah
1950er      → FORTRAN, Lisp
1970er      → C
1990er      → Java, Python, JavaScript
Heute       → viele spezialisierte Sprachen
```

### Hinweis

Keine Geschichtsvorlesung daraus machen.

---

## Verständnisübung 5

### Aufgabe

Sortieren:

```text
Java
Maschinencode
Assembly
CPU
Compiler
```

zu einem sinnvollen Ablauf.

Eine mögliche Lösung:

```text
Java
↓
Compiler
↓
Maschinencode
↓
CPU
```

Assembly als alternative Zwischenebene diskutieren.

---

# Kapitel 16 – Betriebssystem

## Folie 42 – Wer startet das Programm?

### Frage

„Wir haben jetzt eine ausführbare Datei. Wer kümmert sich darum, dass sie wirklich läuft?“

### Bild

```text
Programm
  ↓
 ?
  ↓
Hardware
```

---

## Folie 43 – Betriebssystem

### Bild

Drei Ebenen:

```text
Programme
──────────
Betriebssystem
──────────
Hardware
```

Beispiele:

```text
Windows
Linux
macOS
```

### Definition

> **Ein Betriebssystem verwaltet Computerressourcen und stellt Programmen grundlegende Dienste bereit.**

---

## Folie 44 – Was macht Windows beim Programmstart?

### Titel

**Doppelklick auf Notepad – was passiert?**

### Schrittweise Animation

```text
1. Programmdatei finden
2. Speicher bereitstellen
3. Code in den RAM laden
4. Prozess erzeugen
5. CPU führt Anweisungen aus
```

### Sprechertext

„Der Doppelklick selbst ist nicht die Magie.“

„Er löst eine ganze Kette aus.“

---

# Kapitel 17 – Programm und Prozess

## Folie 45

### Titel

**Programm oder Prozess?**

### Bild

Links:

```text
notepad.exe
Datei auf SSD
```

Rechts:

```text
Notepad läuft
RAM + CPU-Zeit
```

### Definition

> **Programm = gespeicherter Code**

> **Prozess = laufende Instanz dieses Programms**

---

## Verständnisübung 6

### Frage

„Wenn ich Notepad dreimal öffne – habe ich drei Programme oder drei Prozesse?“

### Antwort

Eine Programmdatei, mehrere laufende Prozesse.

---

# Kapitel 18 – Vom Doppelklick zur Texteingabe

## Folie 46 – Wie starten wir Programme?

### Bild

Links:

Maus + Icon.

Rechts:

Tastatur + Text.

### Frage

„Muss ich zum Starten eines Programms eigentlich klicken?“

---

# Kapitel 19 – Terminal

## Folie 47 – Historisches Terminal

### Bild

Foto/Illustration eines alten Bildschirmterminals oder Teletypes.

### Titel

**Ein Terminal war ursprünglich ein echtes Gerät**

### Sprechertext

„Das Terminal war nicht unbedingt selbst der Computer.“

„Es war die Ein- und Ausgabe für einen anderen Rechner.“

---

## Folie 48 – Heute

### Bild

```text
Windows Terminal
```

als modernes Fenster.

### Definition

> **Ein Terminal ist eine textbasierte Ein- und Ausgabeoberfläche.**

### Sprechertext

„Das Terminal nimmt Text entgegen und zeigt Text an.“

---

## Folie 49 – Ein wichtiger Irrtum

### Titel

**Versteht Windows Terminal `dir`?**

Groß:

```text
dir
```

Dann:

```text
Terminal: „Ich zeige nur Zeichen an.“
```

### Übergang

„Jemand anderes muss den Befehl verstehen.“

---

# Kapitel 20 – Shell

## Folie 50 – Shell

### Bild

```text
Mensch
 ↓
Terminal
 ↓
Shell
```

### Definition

> **Eine Shell ist ein Programm, das Befehle interpretiert und ausführt.**

### Beispiele

```text
PowerShell
cmd
bash
zsh
```

---

## Folie 51 – Terminal ≠ Shell

### Bild

```text
Windows Terminal
├─ PowerShell
├─ cmd
└─ WSL/bash
```

### Sprechertext

„Das gleiche Terminalfenster kann verschiedene Shells beherbergen.“

---

## Verständnisübung 7

### Folie

Ordnet zu:

```text
Windows Terminal
PowerShell
bash
cmd
```

Frage:

**Terminal oder Shell?**

### Auflösung

Windows Terminal = Terminal.

Rest = Shells.

---

# Kapitel 21 – Was passiert bei Get-Date?

## Folie 52 – Live-Demo

### Inhalt

```powershell
Get-Date
```

### Frage

„Was passiert zwischen Enter und der angezeigten Uhrzeit?“

---

## Folie 53 – Ablauf

### Animation

```text
Tastatur
↓
Terminal
↓
PowerShell
↓
Get-Date wird erkannt
↓
Befehl läuft
↓
Ergebnis
↓
Terminal zeigt es
```

### Sprechertext

Hier ausdrücklich jede Ebene benennen.

---

# Kapitel 22 – Welche Arten von Befehlen gibt es?

## Folie 54

### Titel

**Ist jeder Befehl ein Programm?**

### Antwort

Nein.

### Karten:

```text
Cmdlet
Alias
Funktion
Script
externes Programm
```

### Sprechertext

„Diese Unterschiede lernen wir jetzt anhand konkreter Beispiele.“

---

# Kapitel 23 – Cmdlets

## Folie 55

### Inhalt

```powershell
Get-Date
Get-Process
Get-Service
```

### Definition

> **Cmdlets sind speziell für PowerShell entwickelte Befehle.**

---

## Folie 56 – Verb-Nomen

### Bild

```text
GET  + PROCESS
STOP + PROCESS

GET  + SERVICE
START+ SERVICE
```

### Übung

„Wenn `Get-Process` Prozesse anzeigt – wie könnte der Befehl zum Stoppen heißen?“

Antwort:

```powershell
Stop-Process
```

---

# Kapitel 24 – Alias

## Folie 57

### Live-Demo

```powershell
dir
```

Dann:

```powershell
Get-Command dir
```

### Ergebnis

Alias.

---

## Folie 58

### Visualisierung

```text
dir ─┐
     ├──→ Get-ChildItem
ls  ─┘
```

### Definition

> **Ein Alias ist ein alternativer Name für einen anderen Befehl.**

---

## Folie 59 – Gleiche Schreibweise, andere Technik

### Bild zweigeteilt

PowerShell:

```text
ls → Alias → Get-ChildItem
```

Linux:

```text
ls → /usr/bin/ls
```

### Kernaussage

„Gleich aussehende Befehle müssen technisch nicht dasselbe sein.“

---

# Kapitel 25 – Externe Programme

## Folie 60

### Titel

**Was passiert bei `git`?**

### Inhalt

```powershell
git
```

### Frage

„Ist Git Bestandteil von PowerShell?“

Nein.

Git ist ein eigenes Programm.

---

## Folie 61 – Wo liegt Git?

### Bild

```text
C:\
 └─ Program Files
     └─ Git
         └─ cmd
             └─ git.exe
```

### Sprechertext

„Programme sind letztlich auch Dateien irgendwo auf dem Computer.“

---

# Kapitel 26 – PATH

## Folie 62 – Das Problem

### Inhalt

Statt:

```powershell
git
```

müssten wir theoretisch schreiben:

```text
C:\Program Files\Git\cmd\git.exe
```

### Frage

„Das wäre ziemlich nervig. Wie kann die Shell Git trotzdem finden?“

---

## Folie 63 – PATH als Suchliste

### Bild

Mehrere Ordner wie Wegweiser:

```text
PATH
├─ C:\Windows\System32
├─ C:\Program Files\Git\cmd
└─ C:\Program Files\Java\bin
```

### Definition

> **PATH ist eine Liste von Verzeichnissen, in denen nach Programmen gesucht werden kann.**

---

## Folie 64 – `git` Schritt für Schritt

### Animation

```text
Eingabe: git
↓
PowerShell sucht passenden Befehl
↓
sucht nach Programm
↓
prüft PATH
↓
findet git.exe
↓
Windows startet git.exe
↓
neuer Prozess
```

---

## Verständnisübung 8

### Frage

„Python ist installiert, aber `python` funktioniert im Terminal nicht. Was könnte passiert sein?“

Antworten sammeln.

Eine mögliche Ursache:

> Python liegt nicht in einem Verzeichnis aus PATH.

---

# Kapitel 27 – Aktuelles Verzeichnis

## Folie 65

### Live-Demo

```powershell
Get-Location
```

### Bild

```text
Sie sind hier:
C:\Users\Thomas
```

### Definition

> **Die Shell arbeitet immer relativ zu einem aktuellen Arbeitsverzeichnis.**

---

## Folie 66 – Absolute und relative Pfade

### Bild als Stadtplan-Analogie

Absolute Adresse:

```text
Deutschland
→ Bayern
→ Nürnberg
→ Straße
→ Haus
```

Relativ:

```text
„eine Straße weiter“
```

Dann Dateipfade:

```text
C:\Users\Thomas\Documents\a.txt
```

gegen:

```text
Documents\a.txt
```

---

## Folie 67 – `..`

### Visualisierung

```text
C:\Users\Thomas\Documents
              ↑
             ..
```

### Live-Demo

```powershell
cd ..
```

---

# Kapitel 28 – stdin, stdout, stderr

## Folie 68 – Programme brauchen Kanäle

### Titel

**Wie kommen Daten in ein Programm und wieder heraus?**

### Bild

```text
Eingabe → PROGRAMM → Ausgabe
                    ↘ Fehler
```

---

## Folie 69 – Drei Standardkanäle

### Bild

```text
stdin  → Programm
stdout ← Programm
stderr ← Programm
```

### Übersetzung

```text
stdin  = normale Eingabe
stdout = normale Ausgabe
stderr = Fehlerausgabe
```

### Sprechertext

Nur das Prinzip erklären.

---

# Kapitel 29 – Umleitung

## Folie 70

### Inhalt

```powershell
"Hallo" > test.txt
```

### Frage

„Warum erscheint Hallo jetzt nicht im Terminal?“

### Visualisierung

Normal:

```text
Ausgabe → Terminal
```

Mit `>`:

```text
Ausgabe → Datei
```

---

# Kapitel 30 – Pipeline

## Folie 71 – Programme kombinieren

### Bild

Zwei Maschinen auf einem Förderband:

```text
Befehl A → Ergebnis → Befehl B
```

### Symbol

```text
|
```

### Definition

> **Eine Pipeline gibt Ergebnisse eines Befehls an einen weiteren Befehl weiter.**

---

## Folie 72 – Unix-Beispiel

### Inhalt

```bash
cat log.txt | grep ERROR
```

### Bild

```text
Datei
 ↓
cat
 ↓ Text
grep
 ↓
nur ERROR-Zeilen
```

---

# Kapitel 31 – PowerShell-Objekte

## Folie 73 – PowerShell macht etwas Besonderes

### Inhalt

```powershell
Get-Process
```

### Frage

„Ist das, was wir sehen, einfach nur Text?“

Antwort:
Auf dem Bildschirm ja – intern nicht unbedingt.

---

## Folie 74 – Objekt

### Bild

Eine Karte:

```text
PROCESS
────────────
Name: chrome
ID: 1234
CPU: 42.7
RAM: 350 MB
```

### Definition

> **Ein Objekt enthält strukturierte, zusammengehörige Informationen.**

---

## Folie 75 – Text vs. Objekt

### Links

Text:

```text
chrome 1234 42.7 350MB
```

### Rechts

Objekt:

```text
Name = chrome
Id = 1234
CPU = 42.7
RAM = ...
```

### Frage

„Was lässt sich leichter zuverlässig sortieren?“

---

## Folie 76 – Pipeline mit Objekten

### Inhalt

```powershell
Get-Process | Sort-Object CPU
```

### Bild

```text
Prozessobjekte
      ↓
Sort-Object
      ↓
nach CPU sortiert
```

### Sprechertext

„PowerShell muss nicht Textspalten auseinandernehmen.“

„Sie kennt die Eigenschaft CPU.“

---

## Verständnisübung 9

### Aufgabe

Gegeben:

```text
Person
Name = Anna
Alter = 25
Ort = Nürnberg
```

Frage:

„Wenn das ein Objekt wäre – nach welchen Eigenschaften könnten wir sortieren?“

Antwort:

* Name
* Alter
* Ort

Übertragung auf Prozesse.

---

# Kapitel 32 – Get-Member

## Folie 77

### Live-Demo

```powershell
Get-Process | Get-Member
```

### Frage

„Woher weiß ich überhaupt, welche Eigenschaften ein Objekt besitzt?“

### Kernaussage

`Get-Member` zeigt uns seine Struktur.

---

# Kapitel 33 – Alles zusammenführen

## Folie 78 – Die große Kette

### Titel

**Was passiert bei `git status`?**

### Bild über die ganze Folie:

```text
Mensch
 ↓
Tastatur
 ↓
Windows Terminal
 ↓
PowerShell
 ↓
Befehl analysieren
 ↓
PATH
 ↓
git.exe
 ↓
Windows startet Prozess
 ↓
CPU führt Maschinencode aus
 ↓
Git liest Dateien
 ↓
Ausgabe
 ↓
Terminal
 ↓
Mensch
```

Diese Folie sollte visuell sehr stark sein.

---

## Folie 79 – `git status` als Story

Schritt für Schritt einblenden:

### 1

Du tippst:

```powershell
git status
```

### 2

Terminal gibt den Text an PowerShell.

### 3

PowerShell erkennt:

```text
git = Befehl
status = Argument
```

### 4

PowerShell findet `git.exe`.

### 5

Windows startet einen Prozess.

### 6

CPU führt dessen Maschinenanweisungen aus.

### 7

Git schaut ins aktuelle Verzeichnis.

### 8

Git schreibt ein Ergebnis.

### 9

Du siehst es im Terminal.

---

# Kapitel 34 – Abschlussübung

## Folie 80 – Baut die Kette selbst

### Aufgabe

Teilnehmende bekommen Begriffe:

```text
CPU
Shell
Terminal
PATH
Programm
Betriebssystem
Tastatur
Prozess
```

### Aufgabe

Ordnet sie zu einem Ablauf für:

```text
python test.py
```

### Ziel

Nicht auf exakt eine perfekte Antwort bestehen.

Sie sollen verbal erklären können, was ungefähr passiert.

---

# Kapitel 35 – Begriffe erklären

## Folie 81 – Blitzrunde

Je eine Person erklärt in einem Satz:

* Computer
* Programm
* CPU
* Maschinencode
* Assembly
* Compiler
* Betriebssystem
* Prozess
* Terminal
* Shell
* PATH
* Pipeline

### Regel

Keine Definition ablesen.

„Erklär es, als würdest du es jemandem zuhause erzählen.“

---

# Kapitel 36 – Abschluss

## Folie 82 – Vom Menschen bis zum Strom

### Visualisierung

```text
Menschliche Idee
      ↓
Programmiersprache / Befehl
      ↓
Compiler / Interpreter / Shell
      ↓
Betriebssystem
      ↓
Maschinenanweisungen
      ↓
CPU
      ↓
elektronische Zustände
```

### Abschlussbotschaft

> **Alles, was auf einem Computer passiert, besteht letztlich aus vielen Schichten von Abstraktion.**

> Jede Schicht macht die darunterliegende Komplexität für uns einfacher nutzbar.

---

# Didaktische Leitlinien für die Präsentation

## Neue Begriffe sparsam einführen

Nie mehrere neue Fachwörter gleichzeitig erklären.

Nicht:

> „Der Kernel startet einen Prozess über System Calls und lädt Pages in virtuellen Speicher.“

Sondern zunächst:

> „Windows startet das Programm.“

Die genauere Ebene kann später kommen.

---

## Jede Folie sollte möglichst nur eine neue Frage beantworten

Beispiele:

**Was ist ein Computer?**

Dann erst:

**Was ist ein Programm?**

Dann:

**Wer führt ein Programm aus?**

Dann:

**Was versteht die CPU?**

Nicht alle vier gleichzeitig.

---

## Erst Beobachtung, dann Begriff

Nicht mit:

> „Heute lernen wir Opcode.“

Sondern:

> „Ein Teil dieser Bits muss der CPU sagen, was sie tun soll. Wie könnten wir diesen Teil nennen?“

Dann:

> „Dafür gibt es den Begriff Opcode.“

---

## Immer sichtbar machen, was sich verändert

Zum Beispiel bei:

```asm
MOV AX, 5
ADD AX, 3
```

nicht nur Code zeigen.

Daneben immer Zustand:

```text
vorher:
AX = ?

MOV AX, 5

danach:
AX = 5

ADD AX, 3

danach:
AX = 8
```

---

## Gute Verständnisübungen sind keine Wissensabfragen

Schlecht:

> „Definiere Assembly.“

Besser:

> „Die CPU bekommt `MOV AX, 5` zu sehen – stimmt das?“

Oder:

> „Warum kann `git` funktionieren, obwohl wir nicht den vollständigen Pfad zu git.exe eingeben?“

Oder:

> „Warum ist Windows Terminal nicht dasselbe wie PowerShell?“

Damit prüfst du das mentale Modell statt auswendig gelernter Definitionen.

---

# Wiederkehrende visuelle Sprache

Die Präsentation sollte immer dieselben Symbole benutzen:

**Mensch**
👤

**Terminal**
Fenster mit `>_`

**Shell**
Sprech-/Übersetzersymbol

**Programm**
Datei oder Zahnrad

**RAM**
Regal

**CPU**
Chip

**Betriebssystem**
Ebene zwischen Programmen und Hardware

**Datenfluss**
Pfeile

Dadurch erkennen Anfänger später sofort:

```text
Ah – jetzt sind wir wieder auf der Shell-Ebene.
```

---

# Wichtigste Gesamtgeschichte

Wenn die Teilnehmenden am Ende nur eine Sache behalten, sollte es diese sein:

```text
Ich gebe etwas ein.
↓
Eine Software interpretiert meine Eingabe.
↓
Andere Software wird ausgeführt.
↓
Das Betriebssystem organisiert die Ausführung.
↓
Die CPU führt codierte Maschinenanweisungen aus.
↓
Das Ergebnis wandert durch die Schichten wieder zu mir zurück.
```

Das ist das mentale Grundmodell, auf dem danach Java, Git, Maven, IDEs, Server, Netzwerke und praktisch alle weiteren IT-Themen aufbauen können.
