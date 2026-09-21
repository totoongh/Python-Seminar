const deck = document.querySelector("#deck");
const escapeText = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
deck.innerHTML = slides
  .map(
    (s, i) =>
      `<section class="slide ${s.class || ""}" data-index="${i}" aria-label="Folie ${i + 1}: ${escapeText(s.title)}" hidden><div class="eyebrow">${s.eyebrow}</div><${i === 0 ? "h1" : "h2"}>${s.heading}</${i === 0 ? "h1" : "h2"}>${s.lead ? `<p class="lead">${s.lead}</p>` : ""}<div class="content">${s.html}</div><div class="bottomline">${s.bottom}</div></section>`,
  )
  .join("");
const sections = [...deck.querySelectorAll(".slide")];
const maxSteps = sections.map((s) =>
  Math.max(
    0,
    ...[...s.querySelectorAll("[data-step]")].map((e) =>
      Number(e.dataset.step),
    ),
  ),
);
let current = 0,
  step = 0;
const overview = document.querySelector("#overview"),
  help = document.querySelector("#help"),
  notes = document.querySelector("#notes");
const noteLabels = {
  goal: "Ziel",
  question: "Frage an die Gruppe",
  expected: "Erwartbare Antworten",
  explain: "Erklärung",
  misconception: "Mögliche Fehlvorstellungen",
  transition: "Übergang",
  steps: "Einblendungen & Interaktion",
  source: "Fachlicher Abgleich",
};
function renderNotes() {
  const s = slides[current];
  document.querySelector("#notes-body").innerHTML =
    `<div class="note-step">Folie ${current + 1} / ${slides.length} · Einblendung ${step} / ${maxSteps[current]}</div><h3>${escapeText(s.title)}</h3><dl>${Object.entries(
      s.notes,
    )
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<dt>${noteLabels[k]}</dt><dd>${escapeText(v).replace(/https:\/\/[^\s]+/g, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)}</dd>`,
      )
      .join("")}</dl>`;
}
function updateDemos(section, reveal) {
  const cpu = section.querySelector(".cpu-demo");
  if (cpu) {
    const rows = ["0001 | 00000101", "0010 | 00000011", "0011 | 00000000"];
    const meanings = [
      "Wert 5 in das Register übernehmen.",
      "Wert 3 zum Register addieren.",
      "Registerwert an Datenplatz 0 ablegen.",
    ];
    const line = Math.min(2, Math.max(0, Math.floor((reveal - 1) / 3)));
    const phase = reveal ? ((reveal - 1) % 3) + 1 : 0;
    cpu
      .querySelectorAll(".program-row")
      .forEach((e, i) =>
        e.classList.toggle("active", reveal > 0 && i === line),
      );
    cpu
      .querySelectorAll("[data-phase]")
      .forEach((e) =>
        e.classList.toggle("active", Number(e.dataset.phase) === phase),
      );
    cpu.querySelector("[data-sim-word]").textContent = reveal
      ? rows[line]
      : "–";
    cpu.querySelector("[data-sim-meaning]").textContent = reveal
      ? phase === 1
        ? "Anweisung geholt. Noch nicht decodiert."
        : meanings[line]
      : "Noch keine Anweisung geholt.";
    cpu.querySelector("[data-cpu-register]").textContent =
      reveal >= 6 ? "8" : reveal >= 3 ? "5" : "?";
    cpu.querySelector("[data-cpu-memory]").textContent =
      reveal >= 9 ? "8" : "?";
  }
  const assembly = section.querySelector(".asm-demo");
  if (assembly) {
    assembly.querySelector("[data-asm-value]").textContent =
      reveal >= 2 ? "8" : reveal >= 1 ? "5" : "?";
    assembly
      .querySelectorAll("[data-asm-line]")
      .forEach((e) =>
        e.classList.toggle("active", Number(e.dataset.asmLine) === reveal),
      );
  }
}
function render() {
  sections.forEach((s, i) => {
    s.hidden = i !== current;
    if (i === current) updateDemos(s, step);
    s.setAttribute("aria-hidden", String(i !== current));
    s.querySelectorAll("[data-step]").forEach((el) => {
      const visible = Number(el.dataset.step) <= step;
      el.classList.toggle("visible", visible);
      el.setAttribute("aria-hidden", String(!visible));
    });
  });
  document.querySelector("#counter").textContent =
    `${String(current + 1).padStart(2, "0")} / ${slides.length}`;
  document.querySelector("#chapter").textContent = slides[current].chapter;
  document.querySelector("#step-label").textContent = maxSteps[current]
    ? `Einblendung ${step} / ${maxSteps[current]}`
    : "Zum Einstieg";
  document.querySelector("#previous").disabled = current === 0 && step === 0;
  document.querySelector("#next").disabled =
    current === slides.length - 1 && step === maxSteps[current];
  document.querySelector("#next").innerHTML =
    `${step < maxSteps[current] ? "Aufdecken" : current === slides.length - 1 ? "Ende" : "Weiter"} <span>→</span>`;
  document.querySelector("#progress-fill").style.width =
    `${((current + (maxSteps[current] ? step / maxSteps[current] : 1)) / slides.length) * 100}%`;
  document
    .querySelectorAll(".overview-item")
    .forEach((el, i) => el.setAttribute("aria-current", String(i === current)));
  renderNotes();
  document.querySelector("#announcement").textContent =
    `Folie ${current + 1}: ${slides[current].title}. ${step ? "Einblendung " + step + " von " + maxSteps[current] : ""}`;
  const hash = `#${current + 1}/${step}`;
  if (location.hash !== hash) location.replace(hash);
}
function go(index, reveal = 0) {
  const previous = current;
  current = Math.max(0, Math.min(slides.length - 1, index));
  step = Math.max(0, Math.min(maxSteps[current], reveal));
  render();
  if (previous !== current) {
    deck.scrollTop = 0;
    notes.scrollTop = 0;
  }
}
function next() {
  if (step < maxSteps[current]) go(current, step + 1);
  else if (current < slides.length - 1) go(current + 1);
}
function previous() {
  if (step > 0) go(current, step - 1);
  else if (current > 0) go(current - 1, maxSteps[current - 1]);
}
function fromHash() {
  const match = location.hash.match(/^#(\d+)(?:\/(\d+))?$/);
  if (match) go(Number(match[1]) - 1, Number(match[2] || 0));
  else go(0);
}
function toggleNotes(force) {
  notes.hidden = typeof force === "boolean" ? !force : !notes.hidden;
  document
    .querySelector("#notes-open")
    .setAttribute("aria-expanded", String(!notes.hidden));
}
function showDialog(dialog) {
  dialog.showModal();
}
async function fullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen)
      await document.documentElement.requestFullscreen();
    else showDialog(help);
  } catch {
    document.querySelector("#announcement").textContent =
      "Vollbild ist in diesem Browser nicht verfügbar.";
  }
}
document.querySelector("#next").addEventListener("click", next);
document.querySelector("#previous").addEventListener("click", previous);
document
  .querySelector("#notes-open")
  .addEventListener("click", () => toggleNotes());
document.querySelector("#notes-close").addEventListener("click", () => {
  toggleNotes(false);
  document.querySelector("#notes-open").focus();
});
document.querySelector("#fullscreen").addEventListener("click", fullscreen);
document
  .querySelector("#help-open")
  .addEventListener("click", () => showDialog(help));
document
  .querySelector("#overview-open")
  .addEventListener("click", () => showDialog(overview));
document
  .querySelectorAll("[data-close]")
  .forEach((b) =>
    b.addEventListener("click", () => b.closest("dialog").close()),
  );
document.querySelector("#overview-grid").innerHTML = slides
  .map(
    (s, i) =>
      `<button class="overview-item" data-slide="${i}" aria-current="false"><span>${String(i + 1).padStart(2, "0")} / ${escapeText(s.chapter)}</span><strong>${escapeText(s.title)}</strong></button>`,
  )
  .join("");
document.querySelectorAll("[data-slide]").forEach((b) =>
  b.addEventListener("click", () => {
    go(Number(b.dataset.slide));
    overview.close();
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const key = event.key.toLowerCase();
  if (overview.open || help.open) return;
  if (key === "escape") {
    toggleNotes(false);
    return;
  }
  if (
    event.target.closest("button,a,input,select,textarea") &&
    (key === " " || key === "enter")
  )
    return;
  switch (key) {
    case "arrowright":
    case "arrowdown":
    case " ":
    case "pagedown":
      event.preventDefault();
      next();
      break;
    case "arrowleft":
    case "arrowup":
    case "pageup":
      event.preventDefault();
      previous();
      break;
    case "home":
      event.preventDefault();
      go(0);
      break;
    case "end":
      event.preventDefault();
      go(slides.length - 1);
      break;
    case "n":
      toggleNotes();
      break;
    case "o":
      showDialog(overview);
      break;
    case "f":
      fullscreen();
      break;
    case "?":
      showDialog(help);
      break;
  }
});
window.addEventListener("hashchange", () => {
  const expected = `#${current + 1}/${step}`;
  if (location.hash !== expected) fromHash();
});
document.querySelectorAll("[data-choice]").forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    button
      .closest(".slide")
      .querySelectorAll("[data-choice]")
      .forEach((other) => {
        other.classList.toggle("selected", other === button);
        other.setAttribute("aria-pressed", String(other === button));
      });
  });
});
const singleBit = document.querySelector("#single-bit");
singleBit.addEventListener("click", () => {
  const next = singleBit.getAttribute("aria-pressed") !== "true";
  singleBit.setAttribute("aria-pressed", String(next));
  singleBit.textContent = next ? "1" : "0";
});
function updateBoard(board) {
  const weights = [...board.querySelectorAll(".bit[aria-pressed=true]")].map(
    (b) => Number(b.dataset.weight),
  );
  const value = weights.reduce((sum, v) => sum + v, 0);
  board.querySelector(".sum").textContent = weights.length
    ? `${weights.join(" + ")} = ${value}`
    : "0 = 0";
}
document.querySelectorAll(".bit-board").forEach((board) => {
  board.querySelectorAll(".bit").forEach((bit) =>
    bit.addEventListener("click", () => {
      const on = bit.getAttribute("aria-pressed") !== "true";
      bit.setAttribute("aria-pressed", String(on));
      bit.textContent = on ? "1" : "0";
      updateBoard(board);
    }),
  );
  updateBoard(board);
});
document.querySelectorAll("[data-reset]").forEach((button) =>
  button.addEventListener("click", () => {
    const board = document.querySelector(
      `[data-board="${button.dataset.reset}"]`,
    );
    board.querySelectorAll(".bit").forEach((bit) => {
      const on = !!(Number(button.dataset.value) & Number(bit.dataset.weight));
      bit.setAttribute("aria-pressed", String(on));
      bit.textContent = on ? "1" : "0";
    });
    updateBoard(board);
  }),
);
let touchStart = null;
deck.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest("button,a")) return;
    touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
  },
  { passive: true },
);
deck.addEventListener(
  "touchend",
  (e) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x,
      dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.7) {
      dx < 0 ? next() : previous();
    }
    touchStart = null;
  },
  { passive: true },
);
fromHash();
