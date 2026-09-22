const sections = [...document.querySelectorAll(".chapter-section")];
const navigationLinks = [...document.querySelectorAll("[data-nav]")];
const previousButton = document.querySelector("#previous-section");
const nextButton = document.querySelector("#next-section");
const announcement = document.querySelector("#announcement");
const viewToggle = document.querySelector("#view-toggle");
const viewToggleMode = viewToggle.querySelector("small");
const overviewLink = document.querySelector(".overview-link");
const presentationPosition = document.querySelector(".presentation-position");
const slideCounter = document.querySelector("#slide-counter");
const slideChapter = document.querySelector("#slide-chapter");
const totalSections = sections.length;
let currentSection = 1;
let currentSlide = 0;
let presentationMode = false;

const sectionNames = navigationLinks.map((link) =>
  link.textContent.trim().replace(/^\d+\s*/, ""),
);

function buildPresentationSlides() {
  const slides = [];

  sections.forEach((section, sectionIndex) => {
    const children = [...section.children];
    const groups = [];

    if (children.length >= 3) groups.push(children.slice(0, 3));

    for (const child of children.slice(3)) {
      const previousChild = groups.at(-1)?.at(-1);
      const joinsPrevious =
        child.matches(".hint, .prompts") ||
        (child.matches(".command") && previousChild?.matches(".command"));

      if (joinsPrevious && groups.length) groups.at(-1).push(child);
      else groups.push([child]);
    }

    groups.forEach((nodes, groupIndex) => {
      nodes.forEach((node) => node.classList.add("presentation-node"));
      const localHeading = nodes
        .flatMap((node) => [node, ...node.querySelectorAll("h1, h2, legend")])
        .find((node) => node.matches?.("h1, h2, legend"));

      slides.push({
        section,
        sectionIndex,
        groupIndex,
        nodes,
        label:
          localHeading?.textContent.trim() ||
          `${sectionNames[sectionIndex]} · Teil ${groupIndex + 1}`,
      });
    });
  });

  return slides;
}

const presentationSlides = buildPresentationSlides();

function sectionNumberFromHash() {
  const parsed = Number.parseInt(location.hash.replace("#", ""), 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= totalSections
    ? parsed
    : 1;
}

function slideNumberFromHash() {
  const match = location.hash.match(/^#p-(\d+)$/);
  if (!match) return null;
  const parsed = Number.parseInt(match[1], 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= presentationSlides.length
    ? parsed
    : 1;
}

function updateSectionNavigation(activeSection) {
  for (const link of navigationLinks) {
    const active = Number(link.dataset.nav) === activeSection;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}

function setViewControls(isPresentation) {
  presentationMode = isPresentation;
  document.body.classList.toggle("presentation-mode", isPresentation);
  viewToggle.setAttribute("aria-pressed", String(isPresentation));
  viewToggleMode.textContent = isPresentation ? "Kapitelansicht" : "Präsentation";
  viewToggle.title = isPresentation
    ? "Zur Kapitelansicht wechseln"
    : "Zur Präsentationsansicht wechseln";
  overviewLink.hidden = isPresentation;
  presentationPosition.hidden = !isPresentation;
  previousButton.textContent = isPresentation
    ? "← Vorherige Folie"
    : "← Vorheriger Abschnitt";
  nextButton.textContent = isPresentation
    ? "Nächste Folie →"
    : "Nächster Abschnitt →";
}

function showSection(number, shouldFocus = false) {
  currentSection = Math.min(totalSections, Math.max(1, number));
  setViewControls(false);

  for (const section of sections) {
    section.hidden = Number(section.dataset.section) !== currentSection;
    section.scrollTop = 0;
  }

  for (const slide of presentationSlides) {
    slide.nodes.forEach((node) => node.classList.remove("presentation-current"));
  }

  updateSectionNavigation(currentSection);

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

function showPresentationSlide(number, shouldFocus = false) {
  currentSlide = Math.min(
    presentationSlides.length - 1,
    Math.max(0, number),
  );
  const activeSlide = presentationSlides[currentSlide];
  currentSection = activeSlide.sectionIndex + 1;
  setViewControls(true);

  for (const section of sections) {
    section.hidden = section !== activeSlide.section;
    section.scrollTop = 0;
  }

  presentationSlides.forEach((slide, index) => {
    slide.nodes.forEach((node) =>
      node.classList.toggle("presentation-current", index === currentSlide),
    );
  });

  updateSectionNavigation(currentSection);
  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === presentationSlides.length - 1;
  slideCounter.textContent = `Folie ${String(currentSlide + 1).padStart(2, "0")} / ${String(presentationSlides.length).padStart(2, "0")}`;
  slideChapter.textContent = `${String(currentSection).padStart(2, "0")} · ${sectionNames[activeSlide.sectionIndex]}`;
  document.title = `Folie ${currentSlide + 1}: ${activeSlide.label} · Python-Seminar`;
  announcement.textContent = `Folie ${currentSlide + 1} von ${presentationSlides.length}: ${activeSlide.label}`;

  if (shouldFocus) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const focusTarget = activeSlide.nodes
      .flatMap((node) => [node, ...node.querySelectorAll("h1, h2, legend")])
      .find((node) => node.matches?.("h1, h2, legend"));
    if (focusTarget) {
      focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus({ preventScroll: true });
    }
  }
}

function updateFromHash(shouldFocus = false) {
  const slideNumber = slideNumberFromHash();
  if (slideNumber !== null) showPresentationSlide(slideNumber - 1, shouldFocus);
  else showSection(sectionNumberFromHash(), shouldFocus);
}

function navigateToHash(value, callback) {
  if (location.hash === value) callback();
  else location.hash = value;
}

window.addEventListener("hashchange", () => updateFromHash(true));

viewToggle.addEventListener("click", () => {
  if (presentationMode) {
    navigateToHash(`#${currentSection}`, () => showSection(currentSection, true));
    return;
  }

  const firstSlideInSection = presentationSlides.findIndex(
    (slide) => slide.sectionIndex === currentSection - 1,
  );
  navigateToHash(
    `#p-${firstSlideInSection + 1}`,
    () => showPresentationSlide(firstSlideInSection, true),
  );
});

previousButton.addEventListener("click", () => {
  if (presentationMode) {
    if (currentSlide > 0) location.hash = `p-${currentSlide}`;
    return;
  }
  if (currentSection > 1) location.hash = String(currentSection - 1);
});

nextButton.addEventListener("click", () => {
  if (presentationMode) {
    if (currentSlide < presentationSlides.length - 1) {
      location.hash = `p-${currentSlide + 2}`;
    }
    return;
  }
  if (currentSection < totalSections) location.hash = String(currentSection + 1);
});

document.addEventListener("keydown", (event) => {
  if (!presentationMode) return;
  if (
    event.target.closest(
      "button, a, input, textarea, select, [contenteditable='true']",
    )
  ) {
    return;
  }

  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    if (currentSlide < presentationSlides.length - 1) {
      location.hash = `p-${currentSlide + 2}`;
    }
  } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    if (currentSlide > 0) location.hash = `p-${currentSlide}`;
  } else if (event.key === "Escape") {
    location.hash = String(currentSection);
  }
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
updateFromHash();
