# Nachvollziehbare Beispiele

Diese Dateien sind kleine Beispiele beziehungsweise Codeausschnitte. Die Assembly-Dateien enthalten keine vollständige Anwendung, keinen Programmeinstieg für ein Betriebssystem, keine Ausgabe und keine Rückkehranweisung. Sie werden zum Prüfen der Codierung assembliert, nicht als fertige Anwendungen gestartet.

## Python

```sh
python3 rechnung.py
```

Erwartete Ausgabe: `8` plus Zeilenumbruch. `rechnung-ausgabe.txt` enthält die tatsächlich aufgezeichnete Ausgabe. Unter Windows kann bei entsprechend eingerichtetem Python `py rechnung.py` verwendet werden. Der Browser führt diese Datei nicht aus.

## Reale CPU-Architekturen

Am 19.09.2026 mit Apple Clang 17 und LLVM objdump geprüft. Die Zielangaben erzeugen ELF-Objektdateien unabhängig vom Mac als ausführendem System.

```sh
clang -target x86_64-unknown-linux-gnu -c x86_64.s -o /tmp/seminar-x86.o
clang -target aarch64-none-elf -c aarch64.s -o /tmp/seminar-arm.o
objdump -d /tmp/seminar-x86.o
objdump -d /tmp/seminar-arm.o
```

| Aufgabe         | x86-64 (Intel-Syntax) | Bytes im Speicher | AArch64 (A64-Syntax) | Bytes im Speicher |
| --------------- | --------------------- | ----------------- | -------------------- | ----------------- |
| 5 bereitstellen | `MOV EAX, 5`          | `B8 05 00 00 00`  | `MOV W0, #5`         | `A0 00 80 52`     |
| 3 dazuzählen    | `ADD EAX, 3`          | `83 C0 03`        | `ADD W0, W0, #3`     | `00 0C 00 11`     |

Beide Varianten liefern den Wert 8 im jeweiligen 32-Bit-Register. Das setzt voraus, dass sie in der angegebenen Reihenfolge ausgeführt werden. Die Beispiele sind nicht vollständig äquivalent bezüglich aller Nebeneffekte: x86 ADD verändert Statusflags, A64 ADD ohne S nicht. Es geht um die gleiche Rechenaufgabe und den resultierenden Registerwert.

Die Hexzahlen sind eine kompakte Schreibweise für Bits, kein zusätzliches Codierverfahren. Jede Zweiergruppe steht für ein Byte (acht Bits). Die Folien zeigen Binärdarstellungen; die Tabelle hier vereinfacht die Kontrolle.

Wichtig: `objdump` zeigt bei AArch64 gewöhnlich das gesamte 32-Bit-Instruktionswort (`528000a0`, `11000c00`), während die Tabelle die einzelnen Bytes in Little-Endian-Speicherreihenfolge zeigt. Beide Darstellungen bezeichnen dieselben Inhalte. Bei x86 zeigt der Disassembler einzelne Bytes. Die Folien verwenden einheitlich die Bytefolge im Speicher. `MOV W0, #5` ist hier ein Alias für `MOVZ W0, #5`.

Referenzen: [Intel SDM](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html), [Arm A64](https://developer.arm.com/documentation/ddi0602/latest/).

## Optimierung durch den Compiler

```sh
clang -target x86_64-unknown-linux-gnu -O2 -S -masm=intel constant.c -o /tmp/seminar-constant.s
```

Geprüfter relevanter Ausschnitt:

```asm
mov eax, 8
ret
```

Der Compiler hat die konstante Rechnung `5 + 3` bereits vereinfacht. Diese Ausgabe ist ein konkretes Werkzeug-/Konfigurationsbeispiel, keine Garantie für jeden Compiler.

## Das einfache 12-Bit-Befehlsformat

Anweisungsfolge des manuellen Beispiels (vier Opcode-Bits, acht Wert-/Adressbits):

```text
0001 | 00000101   LOAD 5
0010 | 00000011   ADD 3
0011 | 00000000   STORE 0
```

Die ersten zwei Anweisungen berechnen 8. Die dritte sichert 8 an Datenadresse 0. STORE 0 bedeutet **nicht**, die Zahl 0 zu speichern. Anweisungs- und Datenadressen gehören im Modell zu getrennten Bereichen. Die Simulation endet nach diesem gezeigten Ausschnitt; das Modell besitzt in diesen Folien keinen HALT-Befehl. Weitere Modellregeln stehen im Haupt-README.

## Größeres Beispiel: die Zahlen 1 bis 10

`summe.s` enthält MOV EAX,0 und die zehn Additionen von 1 bis 10. Nach der Folge steht 55 in EAX. Es ist der vollständige Rechenausschnitt der Folie 41, ohne Programmstart, Ausgabe oder Rückkehr. Auch Assembly könnte die Wiederholung mit einer Schleife ausdrücken. Hier wird sie für die Gegenüberstellung ausgeschrieben.

`summe.py` drückt dieselbe Rechnung durch eine Wiederholung aus. `range(1, 11)` liefert 1 bis 10; die anschließende Ausgabe ist 55.

```sh
clang -target x86_64-unknown-linux-gnu -c summe.s -o /tmp/seminar-summe.o
objdump -d /tmp/seminar-summe.o
python3 summe.py
```

## Alternative Assembly-Notation

`x86_64-att.s` verwendet AT&T-Syntax. Der Vergleich mit `x86_64.s` ergibt dieselben acht Codebytes: `B8 05 00 00 00 83 C0 03`. Die Operandenschreibweise verändert hier nicht die Maschinenanweisungen.

```sh
clang -target x86_64-unknown-linux-gnu -c x86_64-att.s -o /tmp/seminar-att.o
objdump -d /tmp/seminar-att.o
```

## Vollständige Codebytes der optimierten C-Funktion

```sh
clang -target x86_64-unknown-linux-gnu -O2 -c constant.c -o /tmp/seminar-constant.o
objdump -d /tmp/seminar-constant.o
```

Die sechs Bytes `B8 08 00 00 00 C3` entsprechen `MOV EAX,8; RET`. Folie 47 zeigt diese vollständige Folge binär. Sie ist der Code der Funktion und keine vollständige ausführbare Programmdatei.

Die Abschlussfolie zeigt Python → eine konkrete Assembly-Umsetzung der Rechnung → exakt passende Maschinenbytes. Nur die Verbindung zwischen Assembly und Bytes ist eine direkte, überprüfte Codierung. Die Verbindung ab Python ist ein vereinfachtes didaktisches Übersetzungsmodell.
