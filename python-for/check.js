// Vergleicht die Vorhersage mit der echten Ausgabe (Leerzeichen am Rand und Leerzeilen sind egal).
const normalize = (text) =>
  text
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " "))
    .filter((line) => line !== "")
    .join("\n");

for (const box of document.querySelectorAll(".check")) {
  const field = box.querySelector("textarea");
  const feedback = box.querySelector(".feedback");
  box.querySelector("button").addEventListener("click", () => {
    const given = normalize(field.value);
    const expected = normalize(box.dataset.answer);
    if (!given) {
      feedback.textContent = "Schreib zuerst deine Vorhersage ins Feld.";
      feedback.className = "feedback no";
    } else if (given === expected) {
      feedback.textContent = "✓ Richtig!";
      feedback.className = "feedback ok";
    } else {
      const lines = given.split("\n").length;
      const wanted = expected.split("\n").length;
      feedback.textContent =
        lines === wanted
          ? "Noch nicht ganz. Geh die Durchläufe einzeln durch oder öffne einen Hinweis."
          : `Noch nicht ganz. Du hast ${lines} Zeile(n), das Programm gibt ${wanted} aus.`;
      feedback.className = "feedback no";
    }
  });
}

for (const row of document.querySelectorAll(".choose-row")) {
  for (const button of row.querySelectorAll("button")) {
    button.addEventListener("click", () => {
      for (const other of row.querySelectorAll("button")) other.className = "";
      button.className = button.dataset.v === row.dataset.right ? "right" : "wrong";
      row.classList.add("done");
    });
  }
}
