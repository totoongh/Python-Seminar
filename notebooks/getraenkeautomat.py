getraenke = ["Wasser", "Cola", "Saft"]
preise = [1.0, 1.5, 2.0]

while True:
    print("--- Getränkeautomat ---")
    for i in range(len(getraenke)):
        print(i + 1, getraenke[i], preise[i], "€")
    print("0 Ende")

    auswahl = input("Auswahl: ")
    if auswahl == "0":
        print("Tschüss!")
        break
    if auswahl not in ["1", "2", "3"]:
        print("Ungültige Auswahl.")
        continue

    nummer = int(auswahl) - 1
    preis = preise[nummer]

    geld = float(input("Geld einwerfen: "))
    while geld < preis:
        print("Zu wenig! Es fehlen", round(preis - geld, 2), "€")
        geld = geld + float(input("Nachwerfen: "))

    rueckgeld = round(geld - preis, 2)
    print("Hier ist dein", getraenke[nummer])
    if rueckgeld > 0:
        print("Rückgeld:", rueckgeld, "€")
