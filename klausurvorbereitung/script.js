const truthForm = document.querySelector('#truth-exercise');
const truthFeedback = document.querySelector('#truth-feedback');
const combinations = [];
for (const a of [false, true]) {
  for (const b of [false, true]) {
    for (const c of [false, true]) combinations.push([a, b, c]);
  }
}
truthForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let correct = 0;
  let missing = 0;
  combinations.forEach(([a, b, c], index) => {
    const expected = { inner: b || c, result: a && (b || c) };
    for (const part of ['inner', 'result']) {
      const field = truthForm.elements.namedItem(`r${index + 1}-${part}`);
      const right = field.value === (expected[part] ? 'True' : 'False');
      if (!field.value) missing++;
      if (right) correct++;
      field.classList.toggle('correct', right);
      field.setAttribute('aria-invalid', String(!right));
    }
  });
  truthFeedback.className = `feedback ${correct === 16 ? 'ok' : 'no'}`;
  truthFeedback.textContent = correct === 16
    ? 'Alle 16 Einträge stimmen. Erkläre jetzt, warum die ersten vier Gesamtergebnisse False sind.'
    : `${correct} von 16 Einträgen richtig.${missing ? ` ${missing} Auswahl(en) fehlen noch.` : ''} Prüfe die markierten Felder: erst B or C, dann A and Teilwert.`;
});
truthForm.addEventListener('reset', () => {
  for (const field of truthForm.querySelectorAll('select')) {
    field.classList.remove('correct');
    field.removeAttribute('aria-invalid');
  }
  truthFeedback.textContent = '';
  truthFeedback.className = 'feedback';
});
