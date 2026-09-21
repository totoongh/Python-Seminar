const sections = [...document.querySelectorAll(".chapter-section")];
const navigationLinks = [...document.querySelectorAll("[data-nav]")];
const previousButton = document.querySelector("#previous-section");
const nextButton = document.querySelector("#next-section");
const announcement = document.querySelector("#announcement");
const totalSections = sections.length;
let currentSection = 1;

function sectionNumberFromHash() {
  const parsed = Number.parseInt(location.hash.replace("#", ""), 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= totalSections
    ? parsed
    : 1;
}

function showSection(number, shouldFocus = false) {
  currentSection = Math.min(totalSections, Math.max(1, number));

  for (const section of sections) {
    section.hidden = Number(section.dataset.section) !== currentSection;
  }

  for (const link of navigationLinks) {
    const active = Number(link.dataset.nav) === currentSection;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }

  previousButton.disabled = currentSection === 1;
  nextButton.disabled = currentSection === totalSections;

  const heading = document.querySelector(
    `.chapter-section[data-section="${currentSection}"] h1`,
  );
  document.title = `${heading.textContent.trim()} · Python-Seminar`;
  announcement.textContent = `Abschnitt ${currentSection} geöffnet: ${heading.textContent.trim()}`;

  if (shouldFocus) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

window.addEventListener("hashchange", () => {
  showSection(sectionNumberFromHash(), true);
});

previousButton.addEventListener("click", () => {
  if (currentSection > 1) location.hash = String(currentSection - 1);
});

nextButton.addEventListener("click", () => {
  if (currentSection < totalSections) location.hash = String(currentSection + 1);
});

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const temporary = document.createElement("textarea");
  temporary.value = value;
  temporary.setAttribute("readonly", "");
  temporary.style.position = "fixed";
  temporary.style.opacity = "0";
  document.body.append(temporary);
  temporary.select();
  document.execCommand("copy");
  temporary.remove();
}

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    try {
      await copyText(button.dataset.copy);
      button.textContent = "Kopiert";
      button.classList.add("copied");
      window.setTimeout(() => {
        button.textContent = "Kopieren";
        button.classList.remove("copied");
      }, 1400);
    } catch {
      button.textContent = "Nicht kopiert";
    }
  });
}

for (const button of document.querySelectorAll(".check-mini-quiz")) {
  button.addEventListener("click", () => {
    const quiz = button.closest(".mini-quiz");
    const selected = quiz.querySelector("input:checked");
    const result = quiz.querySelector(".question-result");
    const correct = selected?.value === quiz.dataset.answer;

    result.textContent = selected
      ? `${correct ? "Richtig." : "Noch nicht richtig."} ${quiz.dataset.explanation}`
      : "Wähle zuerst eine Antwort aus.";
    result.className = `question-result ${correct ? "success" : "try-again"}`;
  });
}

if (!location.hash) history.replaceState(null, "", "#1");
showSection(sectionNumberFromHash());
