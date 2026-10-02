"""Struktur-, Link- und Inhaltsprüfungen für das statische Portal."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import ast, json, re
ROOT=Path(__file__).resolve().parents[1]
class Scan(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=[];self.code=None;self.lang=None;self.blocks=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.append(a['id'])
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='pre':self.code='';self.lang=a.get('data-language')
 def handle_data(self,data):
  if self.code is not None:self.code+=data
 def handle_endtag(self,tag):
  if tag=='pre' and self.code is not None:self.blocks.append((self.lang,self.code));self.code=None
lessons=json.loads((ROOT/'content/grundlagen.json').read_text())
assert len(lessons)==20
assert len({x['slug'] for x in lessons})==len(lessons)
required={'cpu-ram-ssd','bits-bytes','maschinencode','compiler-interpreter','programm-prozess','terminal-shell','path','variablen','rechnen-strings','datentypen','eingabe-ausgabe','vergleiche','verzweigungen','logik','while','listen','for-range','funktionen','syntax-schreibtischtest'}
assert required <= {x['slug'] for x in lessons}
catalog=json.loads((ROOT/'uebungsbibliothek/aufgaben.json').read_text())
items=catalog['items'];assert len(items)>=140 and len({x['id'] for x in items})==len(items)
for x in items:
 assert set(x['tags'])<=set(catalog['topics']) and x['tags']
 assert x['level'] in ('Einstieg','Anwendung','Transfer')
 url=urlsplit(x['url']);source=(ROOT/'uebungsbibliothek'/unquote(url.path)).resolve()
 if source.is_dir():source=source/'index.html'
 scan=Scan();scan.feed(source.read_text());assert x['id'] in scan.ids,x['id']
 assert f'data-section="{url.fragment}"' in source.read_text() or f'data-exercise="{url.fragment}"' in source.read_text()
for f in [ROOT/'index.html',*ROOT.glob('grundlagen/*.html'),ROOT/'uebungsbibliothek/index.html',ROOT/'vertiefung/index.html',ROOT/'lehrkraft/index.html']:
 scan=Scan();scan.feed(f.read_text())
 assert len(scan.ids)==len(set(scan.ids)),f
 for lang,src in scan.blocks:
  if lang=='python':ast.parse(src)
 for href in scan.links:
  url=urlsplit(href)
  if url.scheme or url.netloc:continue
  target=(f.parent/unquote(url.path)).resolve() if url.path else f
  if target.is_dir():target=target/'index.html'
  assert target.exists(),(f,href)
  if url.fragment and not url.query:
   target_scan=Scan();target_scan.feed(target.read_text())
   target_source=target.read_text()
   assert url.fragment in target_scan.ids or re.search(r'^p-\d+$',url.fragment) or f'data-section="{url.fragment}"' in target_source or f'data-exercise="{url.fragment}"' in target_source,(f,href)
print(f'PASS: {len(lessons)} Lektionen, {len(items)} eindeutige Aufgaben, Klausurthemen, Python-Syntax und lokale Links/Ziele.')
