// Lehrkraft-Modus: ?lehrer an die Adresse anhängen zeigt Lösungen und Hinweise.
if (new URLSearchParams(location.search).has("lehrer")) {
  document.documentElement.classList.add("lehrer");
}

document.addEventListener("DOMContentLoaded", () => {
  const base = "https://github.com/totoongh/Python-Seminar/blob/main/notebooks/";
  const colab = "https://colab.research.google.com/github/totoongh/Python-Seminar/blob/main/notebooks/";
  for (const box of document.querySelectorAll("[data-nb]")) {
    const file = `${box.dataset.nb}.ipynb`;
    box.innerHTML =
      `<a href="${colab}${file}" target="_blank" rel="noopener">In Colab öffnen ↗</a>` +
      `<a href="../notebooks/${file}" download>Notebook herunterladen</a>` +
      `<a href="${base}${file}" target="_blank" rel="noopener">Auf GitHub ansehen</a>`;
  }
});
