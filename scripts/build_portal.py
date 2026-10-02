"""Erzeugt Portal/Grundlagen und indexiert vorhandene Aufgaben ohne deren Inhalte zu kopieren.
Nach Inhaltsänderungen: python3 scripts/build_portal.py
"""
from pathlib import Path
from html.parser import HTMLParser
from html import escape, unescape
import hashlib, json, re
ROOT=Path(__file__).resolve().parents[1]
TOPICS={'maschinencode':'Maschinencode & Assembly','prozesse':'Programm & Prozess','path':'PATH','shell':'Terminal & Shell','system':'Computer & Ausführung','terminal':'Terminal & PATH','variablen':'Variablen','rechnen':'Rechnen','strings':'Strings','datentypen':'Datentypen & Umwandlung','eingabe':'Ein-/Ausgabe','bedingungen':'if / elif / else','wahrheitswerte':'Wahrheitswerte & Logik','while':'while','listen':'Listen','for':'for','range':'range','funktionen':'Funktionen','syntax':'Syntax & Einrückung','problemlosen':'Problemlösen','dictionaries':'Dictionaries','fehlerbehandlung':'Fehlerbehandlung','module':'Module'}
SOURCES={'uebungen':'Intro-Übungen','python-aufbau':'Python: Aufbau','python-for':'for-Schleife Schritt für Schritt','python-training':'Gemischtes Python-Training','python-problemloesen':'Systematisch Probleme lösen','klausurvorbereitung':'Klausurvorbereitung'}
LESSONS=json.loads((ROOT/'content/grundlagen.json').read_text())
BASE={tag:lesson['slug'] for lesson in reversed(LESSONS) for tag in lesson['tags']}
NAV=[('grundlagen/','Grundlagen'),('python-for/','for-Schleife'),('uebungsbibliothek/','Übungsbibliothek'),('klausurvorbereitung/','Klausurvorbereitung'),('vertiefung/','Vertiefung')]
def page(title,body,prefix='../',active='',script=''):
 nav=''.join(f'<a href="{prefix}{url}"'+(' aria-current="page"' if url==active else '')+'>'+name+'</a>' for url,name in NAV)
 return '<!doctype html>\n<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#15191b"><title>'+escape(title)+' · Python-Seminar</title><link rel="stylesheet" href="'+prefix+'assets/portal.css?v=1">'+script+'</head><body class="portal"><header class="portal-header"><a class="brand" href="'+prefix+'">[·] <span>PYTHON-SEMINAR</span></a><nav aria-label="Hauptnavigation">'+nav+'</nav></header><main>'+body+'</main><footer><a href="'+prefix+'lehrkraft/">Für Lehrkräfte</a><span>Python 3 · Schritt für Schritt lernen</span></footer></body></html>\n'
def tile(title,text,url,label=''):
 return f'<a class="portal-card" href="{escape(url)}">'+(f'<span class="eyebrow">{escape(label)}</span>' if label else '')+f'<h2>{escape(title)}</h2><p>{escape(text)}</p><strong>Öffnen →</strong></a>'
def write(path,text):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)
def plain(src):return ' '.join(unescape(re.sub('<[^>]*>',' ',src)).split())
class ArticleParser(HTMLParser):
 def __init__(self,source):
  super().__init__(convert_charrefs=False);self.source=source;self.lines=[0];self.cards=[];self.start=None;self.depth=0;self.section='1'
  for m in re.finditer('\n',source):self.lines.append(m.end())
 def pos(self):
  line,col=self.getpos();return self.lines[line-1]+col
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if tag=='section' and attrs.get('data-section'):self.section=attrs['data-section']
  if tag=='article':
   if self.start is None:
    self.start=self.pos();self.attrs=attrs;self.card_section=self.section
   self.depth+=1
 def handle_endtag(self,tag):
  if tag=='article' and self.start is not None:
   self.depth-=1
   if self.depth==0:
    self.cards.append(dict(start=self.start,end=self.pos()+len('</article>'),attrs=self.attrs,section=self.card_section,html=self.source[self.start:self.pos()+len('</article>')]))
    self.start=None

def eligible(source,c):
 cls=set(c['attrs'].get('class','').split());s=c['html']
 if source=='uebungen':return True
 if 'task-card' not in cls or 'lehrer-only' in cls:return False
 if source=='python-for':return 'exercise' in cls
 if source=='python-aufbau':return True
 if source=='python-problemloesen':return c['section']=='5' and bool(re.search('Übung [1-4]',s))
 if source=='klausurvorbereitung':return 'Selbst bearbeiten' in s
 if source=='python-training':
  if 'Selbst überprüfen' in s:return False
  if c['section']=='4':return 'Funktioniert, aber unübersichtlich' in s or 'Paararbeit: Zahlenraten' in s
  return bool(cls & {'stage','snippet','stepping-task','challenge-card'})
 return False

def classify(source,c,title):
 s=plain(c['html']).lower();tags=[]
 if source=='uebungen':
  tags={'1':['system','maschinencode'],'2':['system','terminal','prozesse'],'3':['system','terminal','prozesse'],'4':['system','prozesse'],'5':['system','terminal','shell','prozesse'],'6':['terminal','shell'],'7':['terminal','path','prozesse'],'8':['terminal','path','prozesse']}[c['section']]
  fmt={'1':'Code schreiben','2':'Zeilen ordnen','3':'Zeilen ordnen','4':'Zuordnen','5':'Zuordnen','6':'Terminal erkunden','7':'Terminal erkunden','8':'Terminal erkunden'}[c['section']]
  return tags,'Einstieg' if int(c['section'])<=5 else 'Anwendung',fmt
 matches={'while':r'\bwhile\b','for':r'\bfor\b','range':r'\brange\s*\(','listen':r'\[[^\]]*\]|\blist[en]*\b|\blen\s*\(|\bappend\s*\(|\bind(?:ex|izes)\b','funktionen':r'\bdef\b|\breturn\b|\bfunkti(?:on|onen)\b|parameter|argument','eingabe':r'\binput\b|frage .*ab|eingabe|abfrage','datentypen':r'\bint\b|\bfloat\b|\bstr\b|datentyp|umwand','strings':r'string|\btext\b|zeichen|name[n]*|begrüß','rechnen':r'summe|durchschnitt|addier|rechnen|preis|rückgeld|quadrat|mehrwert|vielfach','bedingungen':r'\bif\b|\belif\b|\belse\b|beding|volljähr|altersgruppe|gerade zahlen|versandkosten','wahrheitswerte':r'\band\b|\bor\b|\bnot\b|wahrheits|\bbool\b|\btrue\b|\bfalse\b','syntax':r'einrück|doppelpunkt|syntax','dictionaries':r'dictionar','fehlerbehandlung':r'\btry\b|\bexcept\b|fehlerbehandlung','module':r'\bimport\b|module'}
 for tag,pattern in matches.items():
  if re.search(pattern,s):tags.append(tag)
 if source=='python-problemloesen':tags.append('problemlosen')
 if source=='python-training' and c['section']=='2':tags=['problemlosen']
 if not tags:tags=['variablen']
 cls=c['attrs'].get('class','')
 if 'leicht' in s[:120] or 'warm' in s[:120] or 'stage' in cls or 'direct-exercise' in cls or 'Einstieg' in title:level='Einstieg'
 elif 'knifflig' in s[:120] or 'anspruchsvoll' in s[:120] or 'buffer-task' in cls or 'project-card' in cls:level='Transfer'
 else:level='Anwendung'
 if source=='python-training' and c['section']=='5' and 'snippet' in cls:fmt='Fehler finden'
 elif source=='python-training' and c['section']=='4':fmt='Projekt' if 'Paararbeit' in title else 'Code umwandeln'
 elif 'snippet' in cls or re.search('ausgabe vorhersagen|was wird ausgegeben|vorhersage|output',title.lower()+' '+s[:160]):fmt='Ausgabe bestimmen'
 elif re.search('bug|fehler',title.lower()+' '+cls):fmt='Fehler finden'
 elif re.search('ablauftabelle|schreibtischtest',title.lower()):fmt='Schreibtischtest'
 elif re.search('puzz|reihenfolge|ordne.*zeilen|zeilen.*sortier',title.lower()+' '+s[:260]):fmt='Zeilen ordnen'
 elif re.search('lücke',title.lower()+' '+s[:160]):fmt='Lückencode'
 elif re.search('von while zu for|von for zu while|umwand|refactoring|aufteilung',title.lower()):fmt='Code umwandeln'
 elif 'project-card' in cls:fmt='Projekt'
 elif source=='klausurvorbereitung' and c['section']=='1':fmt='Wahrheitstafel'
 else:fmt='Code schreiben'
 return tags,level,fmt

overrides_path=ROOT/'content/aufgaben-meta.json'
overrides=json.loads(overrides_path.read_text()) if overrides_path.exists() else {}
catalog=[]
for source,label in SOURCES.items():
 path=ROOT/source/'index.html';src=path.read_text();parser=ArticleParser(src);parser.feed(src);patches=[];seen={}
 if source=='uebungen':
  parser.cards=[dict(start=m.start(),end=m.end(),attrs={'class':'exercise',**({'id':re.search(r' id="([^"]+)"',m[0].split('>',1)[0])[1]} if re.search(r' id="([^"]+)"',m[0].split('>',1)[0]) else {})},section=re.search(r'data-exercise="(\d+)"',m[0])[1],html=m[0]) for m in re.finditer(r'<section\b[^>]*data-exercise="\d+"[^>]*>.*?</section>',src,re.S)]
 for c in parser.cards:
  if not eligible(source,c):continue
  h=re.search(r'<h1[^>]*>(.*?)</h1>' if source=='uebungen' else r'<h2[^>]*>(.*?)</h2>',c['html'],re.S)
  span=re.search(r'<span[^>]*>(.*?)</span>',c['html'],re.S)
  title=plain(h[1] if h else span[1] if span else 'Übung')
  if 'stage' in c['attrs'].get('class',''):title=plain(span[1])+' · '+title
  key=source+'/'+c['section']+'/'+title;seen[key]=seen.get(key,0)+1
  ident=c['attrs'].get('id') or 'aufgabe-'+hashlib.sha1((key+str(seen[key])).encode()).hexdigest()[:10]
  if not c['attrs'].get('id'):
   tagend=src.index('>',c['start']);patches.append((tagend,f' id="{ident}"'))
  before_solution=re.split(r'<details\b|<div[^>]*class="[^"]*(?:solution|lehrer-only)',c['html'],maxsplit=1)[0]
  paragraph=re.search(r'<p(?:\s[^>]*)?>(.*?)</p>',before_solution,re.S)
  desc=plain(paragraph[1]) if paragraph else 'Löse die Aufgabe im ursprünglichen Lernweg. Hinweise und die dort vorhandene Selbstkontrolle bleiben erhalten.'
  if 'snippet' in c['attrs'].get('class','') and c['section']=='3' and source=='python-training':desc='Bestimme die vollständige Ausgabe des gezeigten Python-Codes, bevor du ihn ausführst.'
  tags,level,fmt=classify(source,c,title)
  if source=='python-training' and c['section']=='5' and 'snippet' in c['attrs'].get('class',''):desc='Finde und korrigiere den Fehler im gezeigten Code. Begründe, warum die Änderung zum gewünschten Verhalten führt.'
  catalog.append(dict(id=ident,title=title,description=desc,searchText=plain(before_solution),tags=tags,level=level,format=fmt,source=source,sourceLabel=label,url=f'../{source}/?aufgabe={ident}#{c["section"]}',order=len(catalog)+1))
 for pos,addition in sorted(patches,reverse=True):src=src[:pos]+addition+src[pos:]
 marker='<script src="../assets/aufgabe-ziel.js?v=1" defer></script>'
 if marker not in src:src=src.replace('</head>',marker+'\n</head>',1)
 path.write_text(src)
for item in catalog:
 if item['id'] in overrides:
  for field in ('tags','level','format'):
   if field in overrides[item['id']]:item[field]=overrides[item['id']][field]
write('content/aufgaben.json',json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
write('uebungsbibliothek/aufgaben.json',json.dumps(dict(topics=TOPICS,bases=BASE,items=catalog),ensure_ascii=False,indent=2)+'\n')
body='<p class="eyebrow">Dein Lernweg</p><h1>Grundlagen</h1><p class="lead">Der vollständige Theoriepfad zum Klausurstoff: Computer und Arbeitsumgebung verstehen, dann Python sicher lesen und schreiben. Jeder Abschnitt hat ein Beispiel und eine kurze Selbstkontrolle.</p>'
for group in dict.fromkeys(x['group'] for x in LESSONS):
 body+='<section class="portal-section"><h2>'+group+'</h2><div class="lesson-grid">'
 for i,l in enumerate(LESSONS):
  if l['group']==group:body+=tile(l['title'],l['goal'],l['slug']+'.html',f'{i+1:02d} · Grundlagen')
 body+='</div></section>'
body+='<aside class="notice">Die Basisübungen der ursprünglichen Präsentation bleiben <a href="../praesentation/">in der Präsentation</a>. Zusätzliche Aufgaben findest du in der <a href="../uebungsbibliothek/">Übungsbibliothek</a>. Der <a href="../python-for/">ausführliche for-Lernweg</a> bleibt eigenständig.</aside>'
write('grundlagen/index.html',page('Grundlagen',body,active='grundlagen/'))
for i,l in enumerate(LESSONS):
 body='<nav class="breadcrumbs" aria-label="Pfad"><a href="./">Grundlagen</a><span> / '+l['group']+'</span></nav><p class="eyebrow">'+f'{i+1:02d} / {len(LESSONS):02d}'+'</p><h1>'+l['title']+'</h1><p class="lead">'+l['goal']+'</p><article class="lesson-text">'+l['body']+'</article><section class="self-check"><h2>Selbstkontrolle</h2><p>'+l['check']+'</p><details><summary>Antwort vergleichen</summary><p>'+l['answer']+'</p></details></section><section class="related"><h2>Weiter üben</h2><p><a href="../uebungsbibliothek/?thema='+l['tags'][0]+'">Passende Aufgaben in der Übungsbibliothek →</a></p></section><nav class="lesson-pagination" aria-label="Im Themenpfad wechseln">'
 if i:body+='<a href="'+LESSONS[i-1]['slug']+'.html">← '+LESSONS[i-1]['title']+'</a>'
 if i+1<len(LESSONS):body+='<a href="'+LESSONS[i+1]['slug']+'.html">'+LESSONS[i+1]['title']+' →</a>'
 body+='</nav>'
 write('grundlagen/'+l['slug']+'.html',page(l['title'],body,active='grundlagen/'))
body='<p class="eyebrow">Zusätzliche Aufgaben finden</p><h1>Übungsbibliothek</h1><p class="lead">Suche nach Aufgaben oder wähle Inhalte, Niveau und Aufgabentyp. Jede Übung führt direkt zur Aufgabe im ursprünglichen Lernweg.</p><section class="filter-panel" aria-label="Aufgaben filtern"><label>Suche<input id="search" type="search" placeholder="Zum Beispiel: Summe, Countdown, Parameter …"></label><div class="filter-row"><label>Niveau<select id="level"><option value="">Alle Niveaus</option><option>Einstieg</option><option>Anwendung</option><option>Transfer</option></select></label><label>Aufgabentyp<select id="format"><option value="">Alle Aufgabentypen</option></select></label><label>Lernweg<select id="source"><option value="">Alle Lernwege</option></select></label><label>Sortieren<select id="sort"><option value="order">Empfohlene Lernreihenfolge</option><option value="level">Schwierigkeit</option><option value="title">Titel A–Z</option></select></label></div><details class="topic-picker" open><summary>Behandelte Inhalte auswählen</summary><p>Bei mehreren ausgewählten Inhalten muss eine Aufgabe <strong>alle</strong> davon behandeln.</p><fieldset id="topics"><legend class="sr-only">Inhalte</legend></fieldset></details><button id="reset" type="button">Alle Filter zurücksetzen</button></section><p id="result-count" role="status" aria-live="polite">Aufgaben werden geladen …</p><div id="results" class="exercise-grid"></div><p id="empty" class="notice" hidden>Keine passende Aufgabe. Entferne einen Inhaltsfilter oder ändere den Suchbegriff.</p><section class="portal-section"><h2>Geführte Übungswege</h2><div class="lesson-grid">'+tile('Systematisch Probleme lösen','Ein Problem verstehen, zerlegen, planen und schrittweise testen.','../python-problemloesen/')+tile('Gemischtes Python-Training','Standortbestimmung, Ausgabevorhersagen, Bug-Suche und Papier-Coding.','../python-training/')+'</div><h2>Kleine Projekte</h2><p><a href="?format=Projekt">Projektaufgaben in der Bibliothek →</a></p></section><noscript><p>Für die Suche bitte JavaScript aktivieren. Die <a href="../python-aufbau/#7">Übungen im Aufbaukapitel</a> bleiben direkt zugänglich.</p></noscript>'
write('uebungsbibliothek/index.html',page('Übungsbibliothek',body,active='uebungsbibliothek/',script='<script src="script.js?v=1" defer></script>'))
body='<p class="eyebrow">Nach den Grundlagen</p><h1>Vertiefung</h1><p class="lead">Weitere Konzepte für größere Programme. Diese Inhalte liegen außerhalb des hier zusammengestellten Klausur-Grundlagenpfads.</p><div class="lesson-grid">'
for slug,title,desc in [('01_strings','Strings vertieft','Text bearbeiten und gezielt auswerten.'),('02_fehlerbehandlung','Fehlerbehandlung','Fehler abfangen und Eingaben robuster verarbeiten.'),('03_dictionaries','Dictionaries','Werte über Schlüssel zuordnen.'),('04_module','Module','Code aufteilen und wiederverwenden.')]:
 body+=tile(title,desc,'https://colab.research.google.com/github/totoongh/Python-Seminar/blob/main/notebooks/'+slug+'.ipynb','Notebook')
body+='</div><aside class="notice"><strong>Voraussetzungen:</strong> Variablen, Bedingungen, Schleifen, Listen und Funktionen. <a href="../python-training/#7">Zu den Aufgabenbeschreibungen und Notebook-Downloads</a>.</aside>'
write('vertiefung/index.html',page('Vertiefung',body,active='vertiefung/'))
body='<p class="eyebrow">Seminar Programmieren · in Python</p><h1>Verstehen. Üben.<br>Sicher anwenden.</h1><p class="lead">Ein klarer Theoriepfad, passende Übungen und gezielte Klausurvorbereitung. Wähle deinen Einstieg.</p><div class="home-grid">'+tile('Grundlagen','Der vollständige Theoriepfad zum Klausurstoff, mit Beispielen und kurzen Selbstkontrollen.','grundlagen/','Lernen')+tile('for-Schleife Schritt für Schritt','Der eigenständige ausführliche Lernweg: Aufbau, range, Summieren, Zählen und Anwenden.','python-for/','Eigener Lernweg')+tile('Übungsbibliothek','Zusätzliche Aufgaben nach Inhalt, Niveau und Aufgabentyp suchen, filtern und sortieren.','uebungsbibliothek/','Üben')+tile('Klausurvorbereitung','Wahrheitstafeln, Schleifenumwandlungen sowie Rechen- und Zählfunktionen gezielt üben.','klausurvorbereitung/','Wiederholen')+tile('Vertiefung','Strings, Fehlerbehandlung, Dictionaries und Module mit Notebooks.','vertiefung/','Weiterlernen')+'</div><section class="portal-section"><h2>Geführte Wege und Präsentation</h2><div class="quick-links"><a href="praesentation/">Grundlagenpräsentation und Basisübungen →</a><a href="python-problemloesen/">Systematisch Probleme lösen →</a><a href="python-training/">Gemischtes Python-Training →</a></div></section>'
write('index.html',page('Python-Seminar',body,prefix='./'))
write('lehrkraft/index.html',page('Für Lehrkräfte','<p class="eyebrow">Unterricht planen</p><h1>Für Lehrkräfte</h1><p class="lead">Ablaufpläne, ursprüngliche Lernwege und Materialien bleiben hier erreichbar.</p><div class="quick-links"><a href="https://github.com/totoongh/Python-Seminar/blob/main/LEHRKRAFT.md">Ablaufplan und Lehrkrafthinweise auf GitHub →</a><a href="../python-training/?lehrer">Training mit Lehrkraft-Lösungen →</a><a href="../python-problemloesen/Programmieren-mit-System-A4.pdf">A4-Merkblatt: Programmieren mit System →</a><a href="../uebungen/">Intro-Übungen →</a><a href="../python/">Bisheriger Python-Einstieg →</a><a href="../python-aufbau/">Bisheriges Aufbaukapitel →</a></div>'))
print(f'Portal gebaut: {len(LESSONS)} Grundlagenlektionen, {len(catalog)} Aufgaben aus {len(SOURCES)} Lernwegen.')
