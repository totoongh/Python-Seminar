// Optionales Wartungswerkzeug. Zum Start der Präsentation nicht erforderlich.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const context = vm.createContext({});
for (const file of ["slides.js", "slides-python.js", "slides-system.js"])
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, {
    filename: file,
  });
const slides = vm.runInContext("slides", context);
const labels = {
  goal: "Ziel",
  question: "Frage an die Gruppe",
  expected: "Erwartbare Antworten",
  explain: "Erklärung",
  misconception: "Mögliche Fehlvorstellungen",
  transition: "Übergang",
  steps: "Einblendungen und Interaktion",
  source: "Fachlicher Abgleich",
};
fs.writeFileSync(
  path.join(root, "notes.md"),
  "# Sprechernotizen – Von Bits zu Python\n\n" +
    slides
      .map(
        (s, i) =>
          "## " +
          (i + 1) +
          ". " +
          s.title +
          "\n\n" +
          Object.entries(s.notes)
            .filter(([, v]) => v)
            .map(([k, v]) => "**" + labels[k] + "**\n\n" + v + "\n")
            .join("\n"),
      )
      .join("\n"),
);
for (const [i, s] of slides.entries()) {
  if (
    Object.keys(labels)
      .filter((k) => k !== "source")
      .some((k) => !s.notes[k])
  )
    throw Error("Fehlende Notizen auf Folie " + (i + 1));
  for (const [, asset] of s.html.matchAll(/src="(assets\/[^"]+)"/g))
    if (!fs.existsSync(path.join(root, asset)))
      throw Error("Fehlendes Bild " + asset);
}
console.log(slides.map((s, i) => `${i + 1}: ${s.title}`).join("\n"));
