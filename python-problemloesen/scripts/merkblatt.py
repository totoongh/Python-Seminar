from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pathlib import Path
base=Path(__file__).resolve().parents[1]
for name,file in [('Regular','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf')]: pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
W,H=A4
out=base/'Programmieren-mit-System-A4.pdf'
c=canvas.Canvas(str(out),pagesize=A4)
c.setTitle('Programmieren mit System | Acht Schritte, Methoden und Regeln')
c.setAuthor('Python-Seminar')
ink='#17323D'; muted='#536570'; teal='#087F82'; purple='#6852A3'; orange='#B65A21'
def rect(x,y,w,h,color,r=0):
 c.setFillColor(HexColor(color)); c.setStrokeColor(HexColor(color))
 if r:c.roundRect(x,H-y-h,w,h,r,fill=1,stroke=0)
 else:c.rect(x,H-y-h,w,h,fill=1,stroke=0)
def text(x,y,s,size=10,font='Regular',color=ink):
 c.setFillColor(HexColor(color));c.setFont(font,size);c.drawString(x,H-y-size*.82,s)
def para(x,y,w,s,size=10,leading=14,color=ink):
 st=ParagraphStyle('p',fontName='Regular',fontSize=size,leading=leading,textColor=HexColor(color))
 a=Paragraph(s,st);_,h=a.wrap(w,1000);a.drawOn(c,x,H-y-h);return h
def footer(page):
 rect(34,800,W-68,1,'#DDE6E9');text(34,813,'PYTHON-SEMINAR  /  DEIN WERKZEUG FÜR DEN NÄCHSTEN SCHRITT',7.5,color=muted);text(W-54,813,f'{page} / 2',8,font='Bold',color=teal)
def header(kicker,title,sub):
 rect(34,34,36,5,teal);text(34,51,kicker,9,'Bold',teal);text(34,75,title,27,'Bold');para(34,113,W-68,sub,10.5,15,muted)
header('01  /  VOM PROBLEM ZUR LÖSUNG','Programmieren mit System','Wenn du feststeckst, hilft ein klarer Ablauf. Jeder Schritt liefert etwas, mit dem du weiterarbeiten kannst.')
steps=[
('VERSTEHEN','Was soll passieren?','Formuliere die Aufgabe in eigenen Worten. Kläre Eingabe, gewünschte Ausgabe und offene Fragen.','Notenliste gegeben. Gesucht: der Durchschnitt.'),
('KONKRETISIEREN','Wie sieht ein Beispiel aus?','Lege konkrete Eingaben und erwartete Ergebnisse fest, bevor du Code schreibst.','[2, 3, 1, 4]: Summe 10, Anzahl 4, Ergebnis 2.5.'),
('ZERLEGEN','Welche kleinen Teile gibt es?','Teile das Ziel in überschaubare Teilprobleme. Benenne, welcher Teil noch unklar ist.','Liste prüfen, addieren, zählen, teilen, ausgeben.'),
('PLANEN','Wie löse ich es auf Papier?','Rechne von Hand. Schreibe den Ablauf in Alltagssprache oder Pseudocode auf.','Summe bei 0 starten. Jede Note dazuzählen.'),
('IMPLEMENTIEREN','Was ist der kleinste nächste Schritt?','Programmiere einen Teil, den du bereits erklären kannst. Erweitere ihn anschließend.','Erst eine Note addieren, dann alle in einer Schleife.'),
('TESTEN','Stimmen Soll und Ist überein?','Sage das Ergebnis voraus, führe den Code aus und prüfe auch einen Randfall.','[3] ergibt 3.0. [] soll „Keine Noten“ ergeben.'),
('FEHLER EINGRENZEN','Welche Vermutung kann ich prüfen?','Teste eine Hypothese gezielt, etwa mit print() oder dem Debugger. Ändere eine Sache auf einmal.','Stimmt die Anzahl? Prüfe zuerst len(noten).'),
('REFLEKTIEREN','Welcher Gedanke hat geholfen?','Erkläre deinen Lösungsweg. Halte fest, was du beim nächsten Problem wieder anwenden kannst.','„Die Zwischensummen haben den Fehler gezeigt.“')]
col=(W-82)/2
for i,(title,q,body,ex) in enumerate(steps):
 x=34+(i%2)*(col+14);y=155+(i//2)*119
 rect(x,y,col,107,'#F0F6F6',9)
 rect(x+12,y+12,26,26,teal,7);text(x+19,y+18,str(i+1),13,'Bold','#FFFFFF')
 text(x+48,y+12,title,9,'Bold',teal);text(x+48,y+27,q,8.6,'Bold')
 para(x+12,y+47,col-24,body,8.9,12)
 para(x+12,y+81,col-24,ex,8,10,muted)
para(34,639,W-68,'<b>Du darfst zurückgehen:</b> Ein Test kann zeigen, dass du die Aufgabe neu verstehen oder deinen Plan ändern musst.',9.2,13,muted)
rect(34,681,W-68,98,'#EDE9F5',10)
text(49,695,'SO BITTEST DU KONKRET UM HILFE',9,'Bold',purple)
para(49,718,W-98,'„Ich möchte <b>X erreichen</b>. Ich habe bisher <b>Y versucht</b>. Ich erwarte <b>A</b>, bekomme aber <b>B</b>. Ich vermute, dass es an <b>C</b> liegt. Bei <b>D</b> komme ich nicht weiter.“',11,16)
footer(1);c.showPage()
header('02  /  WENN DU NICHT WEITERWEISST','Dein Werkzeugkasten','Wähle die Methode, die zu deiner aktuellen Frage passt. Dein Ziel ist ein kleiner Schritt, der dir neue Klarheit gibt.')
methods=[('Pseudocode','Vor dem Programmieren','Beschreibe die Logik in Alltagssprache. So klärst du den Ablauf, bevor du Python-Syntax brauchst.','„Für jede Note: zur bisherigen Summe addieren.“'),('Rubber Duck Debugging','Wenn du den Fehler nicht siehst','Erkläre deinen Code einer Person oder einem Gegenstand laut, Zeile für Zeile. Was erwartest du jeweils?','„Hier setze ich die Summe wieder auf 0. Warum?“'),('Minimal Reproducible Example','Wenn das Problem unübersichtlich ist','Verkleinere Daten und Code, bis nur ein kleines Beispiel übrig bleibt, das denselben Fehler zeigt.','Statt einer ganzen Anwendung: zwei Zahlen und eine Schleife.'),('Hypothesengetriebenes Debugging','Bei unerwartetem Verhalten','Formuliere eine Vermutung. Plane einen gezielten Test und vergleiche die Beobachtung mit deiner Vorhersage.','„Die Anzahl ist falsch.“ Test: print(len(noten)).'),('Testgetriebenes Denken','Vor und während der Umsetzung','Lege vorher fest, woran du eine korrekte Lösung erkennst. Prüfe Normalfälle und Grenzen.','[1, 6] soll 3.5 ergeben. Für [] klären wir die Ausgabe.')]
for i,(title,when,body,ex) in enumerate(methods):
 y=155+i*80
 rect(34,y,4,68,teal if i%2==0 else purple,2)
 text(48,y+1,title,12,'Bold');text(48,y+20,when,8.8,'Bold',teal)
 para(48,y+35,W-96,body,9.2,12)
 para(48,y+61,W-96,ex,8.3,10,muted)
text(34,567,'DREI REGELN FÜR JEDES PROGRAMMIERPROBLEM',9,'Bold',orange)
rules=[('Mach das Problem kleiner.','Suche einen Teil, den du schon lösen oder gezielt ausprobieren kannst.'),('Vermute nicht nur. Experimentiere.','Prüfe deine Hypothese mit möglichst wenig Code und einer klaren Vorhersage.'),('Stelle konkrete Fragen.','Beschreibe, was du erreichen willst, was du beobachtest und welche Stelle unklar ist.')]
for i,(title,body) in enumerate(rules):
 y=588+i*59
 rect(34,y,W-68,51,'#FCF1E7',8);text(47,y+12,f'0{i+1}',12,'Bold',orange);text(79,y+10,title,11.5,'Bold');para(79,y+28,W-127,body,8.8,11)
para(34,775,W-68,'<b>Du musst die Lösung noch nicht kennen, um den nächsten Schritt zu finden.</b>',9,12,teal)
footer(2);c.save();print(out)
