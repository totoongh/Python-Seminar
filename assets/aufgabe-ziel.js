// Ein Kataloglink öffnet das vorhandene Kapitel und scrollt zur unveränderten Aufgabe.
(() => {
  const id = new URLSearchParams(location.search).get('aufgabe');
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  const section = target.closest('[data-section], [data-exercise]');
  const number = section?.dataset.section || section?.dataset.exercise;
  if (section && location.hash !== `#${number}`) {
    location.hash = number;
  }
  let attempts = 0;
  function focusTask() {
    if (target.getClientRects().length) {
      target.style.scrollMarginTop = '210px';
      target.scrollIntoView({block:'start'});
      target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
      const link = document.createElement('a');
      link.href = '../uebungsbibliothek/';
      if (document.referrer) {
        const previous = new URL(document.referrer);
        if (previous.origin === location.origin && previous.pathname.endsWith('/uebungsbibliothek/')) link.href = previous.href;
      }
      link.textContent = '← Zur Übungsbibliothek';
      link.style.cssText = 'display:block;margin-bottom:16px;font-size:14px';
      target.prepend(link);
    } else if (++attempts < 60) requestAnimationFrame(focusTask);
  }
  requestAnimationFrame(focusTask);
})();
