# Python-Seminar

Statische Lernseite für Fachinformatiker*innen im ersten Ausbildungsjahr.

## Navigation

- **Grundlagen** (`grundlagen/`): 20 Lektionen zum vollständigen Klausurstoff, jeweils mit Erklärung, Beispielen und Selbstkontrolle.
- **for-Schleife Schritt für Schritt** (`python-for/`): eigenständiger ausführlicher Lern- und Übungsweg.
- **Übungsbibliothek** (`uebungsbibliothek/`): zusätzliche Aufgaben nach Inhalt, Niveau, Format und Lernweg suchen und filtern; Sortierung nach Lernreihenfolge, Schwierigkeit oder Titel. Mehrere Inhaltsfilter werden mit UND kombiniert.
- **Klausurvorbereitung** (`klausurvorbereitung/`): Wahrheitstafeln, Schleifenumwandlungen sowie Rechen- und Zählfunktionen.
- **Vertiefung** (`vertiefung/`): Strings, Fehlerbehandlung, Dictionaries und Module mit Notebooks.
- **Für Lehrkräfte** (`lehrkraft/`): Ablaufpläne, Materialien und bisherige Lernwege.

Die Grundlagenpräsentation mit ihren Basisübungen, die geführten Wege „Systematisch Probleme lösen“ und „Gemischtes Python-Training“ sind von der Startseite verlinkt. Alle bisherigen Verzeichnisse und Kapitel-/Präsentationsanker bleiben erhalten.

## Inhalte pflegen

- `content/grundlagen.json`: Hauptquelle für die Grundlagenlektionen.
- Die zusätzlichen Aufgaben bleiben in ihren bisherigen HTML-Seiten (`uebungen/`, `python-aufbau/`, `python-for/`, `python-training/`, `python-problemloesen/`, `klausurvorbereitung/`). Die Bibliothek kopiert keine Aufgabenseiten: Sie indexiert sie und öffnet sie über stabile Aufgaben-IDs direkt im richtigen Kapitel.
- `content/aufgaben-meta.json`: redaktionelle Korrekturen für Inhaltstags, Niveau und Format anhand der Aufgaben-ID. Das Buildskript erzeugt zunächst Vorschläge aus dem Aufgabentext; explizite Metadaten haben Vorrang.
- `scripts/build_portal.py`: erzeugt Startseite, Grundlagen, Übersichten und Suchindex. Fügt bestehenden Aufgaben nur IDs und ein Skript zur Zielnavigation hinzu.
- `content/aufgaben.json` und `uebungsbibliothek/aufgaben.json`: erzeugte Katalogdateien; nicht direkt bearbeiten.
- `assets/portal.css`: gemeinsamer Stil der neuen Bereiche.

Nach Änderungen:

```sh
python3 scripts/build_portal.py
python3 scripts/verify_portal.py
```

Die bestehende Präsentations- und Kapitelansicht der Lernwege bleibt erhalten. Lösungen und Hinweise werden weiterhin am jeweiligen Originalort angezeigt. Die Grundlagen und Bibliotheksseiten dienen als Lese- und Suchansicht.

## Lokal starten

```sh
python3 -m http.server 8793 --bind 127.0.0.1
```

Danach `http://127.0.0.1:8793/` öffnen. Für die Bibliothek ist ein HTTP-Server erforderlich, da der Browser den Suchindex lädt.

## Öffentlich

GitHub Pages veröffentlicht den `main`-Branch:
https://totoongh.github.io/Python-Seminar/

Die Browserübungen speichern keinen Fortschritt. Codefelder der Klausurvorbereitung sind Schreibplätze ohne Ausführung. Vorhandene interaktive Übungen behalten ihre bisherige Funktionsweise.
