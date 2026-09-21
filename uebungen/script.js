const exerciseSections = [...document.querySelectorAll(".exercise")];
const exerciseLinks = [...document.querySelectorAll("[data-nav]")];
const previousButton = document.querySelector("#previous-exercise");
const nextButton = document.querySelector("#next-exercise");
const announcement = document.querySelector("#announcement");
const totalExercises = exerciseSections.length;
let currentExercise = 1;

function exerciseNumberFromHash() {
  const parsed = Number.parseInt(location.hash.replace("#", ""), 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= totalExercises
    ? parsed
    : 1;
}

function showExercise(number, shouldFocus = false) {
  currentExercise = Math.min(totalExercises, Math.max(1, number));

  for (const section of exerciseSections) {
    section.hidden = Number(section.dataset.exercise) !== currentExercise;
  }

  for (const link of exerciseLinks) {
    const active = Number(link.dataset.nav) === currentExercise;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }

  previousButton.disabled = currentExercise === 1;
  nextButton.disabled = currentExercise === totalExercises;

  const heading = document.querySelector(
    `.exercise[data-exercise="${currentExercise}"] h1`,
  );
  document.title = `Übung ${currentExercise}: ${heading.textContent.trim()} · Computer verstehen`;
  announcement.textContent = `Übung ${currentExercise} geöffnet: ${heading.textContent.trim()}`;

  if (shouldFocus) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

window.addEventListener("hashchange", () => {
  showExercise(exerciseNumberFromHash(), true);
});

previousButton.addEventListener("click", () => {
  if (currentExercise > 1) location.hash = String(currentExercise - 1);
});

nextButton.addEventListener("click", () => {
  if (currentExercise < totalExercises) location.hash = String(currentExercise + 1);
});

function initializeBitInputs() {
  for (const input of document.querySelectorAll(".bit-input")) {
    const label = input.dataset.label;
    for (let index = 0; index < input.dataset.answer.length; index += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "bit-button";
      button.textContent = "0";
      button.dataset.value = "0";
      button.setAttribute(
        "aria-label",
        `${label}: Bit ${index + 1} von 12, aktuell 0`,
      );
      button.addEventListener("click", () => {
        const nextValue = button.dataset.value === "0" ? "1" : "0";
        button.dataset.value = nextValue;
        button.textContent = nextValue;
        button.classList.toggle("is-one", nextValue === "1");
        button.setAttribute(
          "aria-label",
          `${label}: Bit ${index + 1} von 12, aktuell ${nextValue}`,
        );
        document.querySelector("#bit-success").hidden = true;
      });
      input.append(button);
    }
  }
}

document.querySelector("#check-bits").addEventListener("click", () => {
  const allCorrect = [...document.querySelectorAll(".bit-input")].every(
    (input) =>
      [...input.querySelectorAll(".bit-button")]
        .map((button) => button.dataset.value)
        .join("") === input.dataset.answer,
  );

  if (!allCorrect) return;

  const success = document.querySelector("#bit-success");
  success.hidden = false;
  success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  announcement.textContent = "Du hast das Maschinenprogramm richtig gebaut.";
});

document.querySelector("#reset-bits").addEventListener("click", () => {
  for (const button of document.querySelectorAll(".bit-button")) {
    button.dataset.value = "0";
    button.textContent = "0";
    button.classList.remove("is-one");
    const input = button.closest(".bit-input");
    const index = [...input.children].indexOf(button);
    button.setAttribute(
      "aria-label",
      `${input.dataset.label}: Bit ${index + 1} von 12, aktuell 0`,
    );
  }
  document.querySelector("#bit-success").hidden = true;
});

function clearOrderResult(list) {
  const result = list.parentElement.querySelector("[data-order-result]");
  result.textContent = "";
  result.className = "task-result";
}

function initializeOrderLists() {
  for (const list of document.querySelectorAll("[data-order-list]")) {
    for (const item of list.children) {
      const controls = item.querySelector(".move-controls");
      const up = document.createElement("button");
      const down = document.createElement("button");
      up.type = "button";
      down.type = "button";
      up.textContent = "↑";
      down.textContent = "↓";
      up.setAttribute("aria-label", "Karte nach oben verschieben");
      down.setAttribute("aria-label", "Karte nach unten verschieben");
      up.addEventListener("click", () => {
        if (item.previousElementSibling) {
          list.insertBefore(item, item.previousElementSibling);
          clearOrderResult(list);
        }
      });
      down.addEventListener("click", () => {
        if (item.nextElementSibling) {
          list.insertBefore(item.nextElementSibling, item);
          clearOrderResult(list);
        }
      });
      controls.append(up, down);

      item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        clearOrderResult(list);
      });
    }

    list.addEventListener("dragover", (event) => {
      event.preventDefault();
      const dragging = list.querySelector(".dragging");
      const target = event.target.closest("li");
      if (!dragging || !target || dragging === target) return;
      const rectangle = target.getBoundingClientRect();
      const after = event.clientY > rectangle.top + rectangle.height / 2;
      list.insertBefore(dragging, after ? target.nextSibling : target);
    });
  }
}

for (const button of document.querySelectorAll(".check-order")) {
  button.addEventListener("click", () => {
    const section = button.closest(".exercise");
    const list = section.querySelector("[data-order-list]");
    const result = section.querySelector("[data-order-result]");
    const current = [...list.children].map((item) => item.dataset.id).join(",");
    const correct = current === list.dataset.answer;
    result.textContent = correct
      ? "✓ Du hast die Befehlskette richtig geordnet."
      : "Die Reihenfolge stimmt noch nicht.";
    result.className = `task-result ${correct ? "success" : "try-again"}`;
  });
}

function selectedValues(question) {
  return [...question.querySelectorAll("input:checked")]
    .map((input) => input.value)
    .sort();
}

for (const button of document.querySelectorAll(".check-quiz")) {
  button.addEventListener("click", () => {
    const quiz = button.closest(".quiz");
    for (const question of quiz.querySelectorAll(".quiz-question")) {
      const selected = selectedValues(question);
      const expected = question.dataset.answer.split(",").sort();
      const correct =
        selected.length === expected.length &&
        selected.every((value, index) => value === expected[index]);
      question.classList.toggle("correct", correct);
      question.classList.toggle("wrong", !correct);
      question.querySelector(".question-result").textContent = `${
        correct ? "Richtig." : "Noch nicht richtig."
      } ${question.dataset.explanation}`;
    }
  });
}

for (const button of document.querySelectorAll(".reset-quiz")) {
  button.addEventListener("click", () => {
    const quiz = button.closest(".quiz");
    for (const input of quiz.querySelectorAll("input")) input.checked = false;
    for (const question of quiz.querySelectorAll(".quiz-question")) {
      question.classList.remove("correct", "wrong");
      question.querySelector(".question-result").textContent = "";
    }
  });
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporary = document.createElement("textarea");
  temporary.value = text;
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

initializeBitInputs();
initializeOrderLists();

if (!location.hash) history.replaceState(null, "", "#1");
showExercise(exerciseNumberFromHash());
