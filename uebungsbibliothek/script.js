(async () => {
  const byId = id => document.getElementById(id);
  const controls = {search:byId('search'),level:byId('level'),format:byId('format'),source:byId('source'),sort:byId('sort')};
  const results = byId('results');
  const count = byId('result-count');
  try {
    const response = await fetch('aufgaben.json');
    if (!response.ok) throw new Error('Aufgaben konnten nicht geladen werden.');
    const {topics,bases,items} = await response.json();
    const normalize = text => text.toLocaleLowerCase('de').normalize('NFD').replace(/\p{Diacritic}/gu,'');
    const params = new URLSearchParams(location.search);
    const option = (select, values) => {
      for (const value of values) select.add(new Option(value,value));
    };
    option(controls.format,[...new Set(items.map(x=>x.format))].sort((a,b)=>a.localeCompare(b,'de')));
    for (const source of [...new Set(items.map(x=>x.source))]) {
      controls.source.add(new Option(items.find(x=>x.source===source).sourceLabel,source));
    }
    const filters=[];
    for (const [tag,name] of Object.entries(topics)) {
      const label=document.createElement('label');
      const input=document.createElement('input');
      input.type='checkbox';input.value=tag;input.checked=params.getAll('thema').includes(tag);
      label.append(input,document.createTextNode(name));byId('topics').append(label);filters.push(input);
    }
    for (const [key,urlKey] of Object.entries({search:'q',level:'niveau',format:'format',source:'lernweg',sort:'sortieren'})) {
      if (params.has(urlKey)) controls[key].value=params.get(urlKey);
    }
    if (!controls.sort.value) controls.sort.value='order';
    const levels={Einstieg:0,Anwendung:1,Transfer:2};
    const tagOrder=['system','maschinencode','prozesse','terminal','shell','path','variablen','datentypen','eingabe','rechnen','strings','bedingungen','wahrheitswerte','while','listen','for','range','funktionen','syntax','problemlosen','dictionaries','fehlerbehandlung','module'];
    const rank=item=>Math.min(...item.tags.map(tag=>tagOrder.indexOf(tag)).filter(x=>x>=0));
    function render() {
      const selected=filters.filter(x=>x.checked).map(x=>x.value);
      const query=normalize(controls.search.value.trim());
      const filtered=items.filter(item =>
        selected.every(tag=>item.tags.includes(tag)) &&
        (!controls.level.value || item.level===controls.level.value) &&
        (!controls.format.value || item.format===controls.format.value) &&
        (!controls.source.value || item.source===controls.source.value) &&
        (!query || normalize([item.title,item.description,item.searchText,item.sourceLabel,item.format,...item.tags.map(t=>topics[t])].join(' ')).includes(query))
      );
      filtered.sort((a,b)=>controls.sort.value==='title' ? a.title.localeCompare(b.title,'de',{numeric:true}) || a.order-b.order : controls.sort.value==='level' ? levels[a.level]-levels[b.level] || a.order-b.order : rank(a)-rank(b) || levels[a.level]-levels[b.level] || a.order-b.order);
      results.replaceChildren();
      for (const item of filtered) {
        const card=document.createElement('article');card.className='exercise-card';card.dataset.id=item.id;
        const meta=document.createElement('span');meta.className='meta';meta.textContent=`${item.level} · ${item.format}`;
        const title=document.createElement('h2');title.textContent=item.title;
        const desc=document.createElement('p');desc.textContent=item.description;
        const tags=document.createElement('div');tags.className='tags';
        for (const tag of item.tags) {const chip=document.createElement('span');chip.textContent=topics[tag];tags.append(chip);}
        const link=document.createElement('a');link.href=item.url;link.className='task-link';link.textContent='Zur Aufgabe →';
        card.append(meta,title,desc,tags,link);
        const basisTag=selected.find(t=>bases[t] && item.tags.includes(t)) || item.tags.find(t=>bases[t]);
        if (basisTag) {const basis=document.createElement('a');basis.className='basis';basis.href=`../grundlagen/${bases[basisTag]}.html`;basis.textContent=`Grundlage: ${topics[basisTag]}`;card.append(basis);}
        const source=document.createElement('p');source.className='source';source.textContent=`Lernweg: ${item.sourceLabel}`;card.append(source);
        results.append(card);
      }
      count.textContent=`${filtered.length} von ${items.length} Aufgaben${selected.length ? ` · Inhalte: ${selected.map(t=>topics[t]).join(', ')}` : ''}`;
      byId('empty').hidden=filtered.length!==0;
      const next=new URLSearchParams();
      for (const tag of selected)next.append('thema',tag);
      for (const [key,urlKey] of Object.entries({search:'q',level:'niveau',format:'format',source:'lernweg'})) if (controls[key].value)next.set(urlKey,controls[key].value);
      if (controls.sort.value!=='order')next.set('sortieren',controls.sort.value);
      history.replaceState(null,'',location.pathname+(next.size?'?'+next:'')+location.hash);
    }
    for (const filter of filters)filter.addEventListener('change',render);
    for (const control of Object.values(controls))control.addEventListener(control===controls.search?'input':'change',render);
    byId('reset').addEventListener('click',()=>{
      for (const filter of filters)filter.checked=false;
      for (const control of Object.values(controls))control.value='';controls.sort.value='order';render();
    });
    render();
  } catch(error) {
    count.textContent='Die Bibliothek konnte nicht geladen werden. Bitte lade die Seite erneut oder öffne einen geführten Übungsweg weiter unten.';
    console.error(error);
  }
})();
