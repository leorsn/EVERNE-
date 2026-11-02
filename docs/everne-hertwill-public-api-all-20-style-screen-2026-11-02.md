# EVERNE — Hertwill: Vollabgleich aller 20 Entwürfe per öffentlicher Produkt-API (02.11.2026)

**Status: ausschließlich öffentliche, lesende Prüfung; keine Produkt-, Lieferanten- oder Margenfreigabe.** Maßstab: zurückhaltende Damenmode, passende Schnitt-/Farb-/Größenvarianten, automatisierte Shopify-Order **inklusive B2B-Zahlung**, DE-Lieferung, möglichst 0 € Zusatzgrundgebühr und mindestens 30 % tatsächlicher Gewinn **nach allen Kosten einschließlich Einkommensteuer**. Die 20 EVERNE-Namen/Preise in `src/womenswearCatalog.ts` sind **redaktionelle Platzhalter, keine vorhandenen/bezogenen Waren**.

## 1. Reproduzierbare öffentliche Bestandsprüfung

Hertwill dokumentiert die lesenden Endpunkte `GET /v1/products`, `GET /v1/products/{id}`, `GET /v1/categories`, `GET /v1/brands` und `GET /v1/brands/{id}/shipping-price-lists` unter https://hertwill.com/docs ; öffentliche katalogbezogene Antworten wurden **ohne API-Schlüssel, Login oder Shopverknüpfung** abgerufen.

- Tatsächlich funktionierender Katalogaufruf: `https://api.hertwill.com/v1/products?category=apparel&ships_to=DE&per_page=100&page=N` für N = 1–8 (die API-Kategoriereferenz zeigt in der Kategorienhierarchie einen abweichenden Root-Slug `apparel-accessories`; die **geprüften Ergebnisse** stammen vom funktionierenden Filterwert `apparel`).
- API-Paginierung: **795 Produkte / 8 Seiten** im Apparel-Zweig, die laut `ships_to=DE` für den Verkauf nach Deutschland gefiltert werden. **586** Parent-Artikel `instock`, **209** `outofstock`. Dies ist **nicht** eine Anzahl passender Damenmodeartikel: Die Gesamtmenge umfasst u. a. Kopfbedeckungen, Accessoires, thematische Shirts, Kinder-/Sport-/Bademode und Herrenartikel.
- Alle 795 **Namen, IDs, Parent-Lagerstatus** wurden auf die 20 Schnittarten gescreent; plausibelere Treffer wurden mit einzelnem Product-Detail-Endpunkt auf Beschreibung, Material und Variantengrößen überprüft. **Kein voll qualifizierter 1:1-Match** für die 20 EVERNE-Entwürfe nachgewiesen. Das ist ein **Screening-Ergebnis**, keine Gewissheit, dass weltweit kein geeigneter Artikel existiert.
- Ausdrückliche API-Antwort `meta.pricing.authenticated=false`, `included=false`, `reason=authentication_required`: `price`, `sale_price`, `recommended_retail_price` und SKU-Preise sind ohne Händler-Authentifizierung **null**. Auch im öffentlichen Linen-Tales-Markenversand `GET /v1/brands/72/shipping-price-lists` ist der Betrag für **Litauen → Deutschland** **null**, obwohl das Zielland aufgeführt ist. **Keine Umgehung der Authentifizierung und kein Ersatz durch generische „24,90 €“ auf Katalogkacheln.**
- `instock` beim Parent ersetzt keine Größenprüfung. Einzelne Varianten können nur **1 Stück** führen oder ausverkauft sein. Zeitpunktbezogene Werte; keine dauerhafte Bestandszusage.

## 2. Abgleich aller 20 redaktionellen EVERNE-Artikel

| Kategorie | EVERNE-Entwurf, Zielpreis, Zielfarbe | Bestes Katalogsignal / Abweichung | Status |
|---|---|---|---|
| Top | Essential Rib Top · 34 € · Chalk | Bedruckte Shirts und Sportartikel; kein belegtes schlichtes Ripp-Top | **kein Match** |
| Top | Second Skin Body · 39 € · Ink | „Body Harness“ ist nicht ein minimalistischer Bodysuit | **kein Match** |
| Top | Soft Line Longsleeve · 39 € · Stone | Thematisch bedruckte/unisex Longsleeves; kein passender feiner Basic-Schnitt | **kein Match** |
| Top | Everyday Tank · 34 € · Oat | Kein neutraler separater Tank mit passender Variante belegt | **kein Match** |
| Top | Fine Knit Top · 39 € · Wine | Kein schlichtes Strick-Top belegt | **kein Match** |
| Knitwear | Relaxed Crew Knit · 49 € · Oat | Keine entsprechende Damen-Crew-Knitwear belegt | **kein Match** |
| Knitwear | Wrap Knit Cardigan · 54 € · Cocoa | Keine passende Wickel-Strickjacke belegt | **kein Match** |
| Knitwear | Ribbed Turtleneck · 44 € · Ink | Kein passender Damen-Rollkragen belegt | **kein Match** |
| Knitwear | Soft V-Neck · 49 € · Chalk | „Primrose“: V-Neck nur als Leinen-Loungewear-**Set mit Hose**, nicht als Einzel-Top | **kein Match** |
| Knitwear | Off-Shoulder Knit · 59 € · Wine | Kein entsprechender schlichter Off-Shoulder-Strick belegt | **kein Match** |
| Trouser | Wide Leg Trouser · 54 € · Stone | „Trousers Lavendar“ wide-leg aus Viskose, aber bedruckt/variierendes Muster und nicht Stone | **kein Match** |
| Trouser | Straight Leg Denim · 59 € · Ink | „Denim“ vor allem in Kappen; keine Straight-Leg-Damenjeans | **kein Match** |
| Trouser | Tailored Everyday Pant · 59 € · Cocoa | Leggings/Bikershorts/bedruckte weite Hose; kein Tailoring-Match | **kein Match** |
| Trouser | Relaxed Denim · 54 € · Oat | Keine entsprechende neutrale Jeans belegt | **kein Match** |
| Dress | The Black Mini · 49 € · Ink | Schwarze Linen-Fugue/Rhapsody-**lange** Kleider; kein Black Mini | **kein Match** |
| Dress | Soft Midi Dress · 59 € · Stone | Linen Fugue **Melange** schlichter, aber **lang**, andere Farbe/Passform; XL ausverkauft | **nur alternative Designrichtung** |
| Dress | Easy Slip Dress · 44 € · Wine | Linen Ballade mit Trägern, aber **lang** und in Flowers-Print; keine schlichte Wine-Slip | **kein Match** |
| Skirt | Fluid Midi Skirt · 44 € · Cocoa | „Skirt Mindfruit“: Midi/Satin, aber auffälliger Print statt Cocoa, XL ausverkauft | **kein Match** |
| Skirt | Tailored Mini Skirt · 39 € · Chalk | Kein entsprechender maßgeschneiderter Minirock | **kein Match** |
| Skirt | Denim Midi Skirt · 54 € · Oat | Kein entsprechender Denim-Midirock | **kein Match** |

**Ergebnis:** **0/20** echte, bisher nachweisbare Modellzuordnungen unter den unveränderten EVERNE-Konzepten; zwei Leinenkleider könnten **nur nach ausdrücklicher Sortiments-/Konzeptänderung** als unabhängige Alternativen näher geprüft werden. Kein Rebranding fremder Marken als Eigenware ohne Rechteklärung.

## 3. Drei konkrete Leinen-Alternativen und harte Größen- / Preisgates

| Hertwill-ID / öffentliche Produktseite | Material/Schnitt | Varianten-Lager bei API-Abruf | EVERNE-Fit |
|---|---|---|---|
| **5583 – Linen Fugue Dress Black** https://hertwill.com/product/linen-fugue-dress-black/ | 100 % Leinen, in Litauen gefertigt, **langes** A-Line-Kleid, breite Träger, eckiger Ausschnitt, Taschen | XS/S/M/L/XL jeweils **20**, XXL **0** | Visuell ruhig, **weder „Black Mini“ noch „Soft Midi Stone“** |
| **6043 – Linen Rhapsody Dress Black** https://hertwill.com/product/linen-rhapsody-dress-black/ | 100 % Leinen, langes **Hemdblusenkleid** mit Knopfleiste, Gürtel, Ärmeln | XS/S/M **20**; L/XL/XXL je **1** | Ruhige Farbe, **andere Kleiderform**; fragile Randgrößen |
| **5586 – Linen Fugue Dress Melange** https://hertwill.com/product/linen-fugue-dress-lemon-melange/ | 100 % Leinen, langes A-Line, meliert | XS/S/XXL **20**; M/L je **1**; XL **0** | Nächster visueller Ansatz zu „Stone“, aber **kein exakter Match**, Lücke XL |

Weiter ausgeschlossene verwandte Artikel:
- **6045 Rhapsody Bronze**: XS und S **0**, XL/XXL je **1**; langes Hemdblusenkleid statt EVERNE-Kernform.
- **6417 Ballade Porcelain Flowers**: S–M und L–XL je **20**, aber **Blumenprint** statt ruhigem monochromen Modell.
- **3899 Trousers Lavendar**: S/M je **20**, L/XL **0**; weite bedruckte Viskosehose statt Cocoa-Tailoring.
- **3895 Skirt Mindfruit**: S/M/L je **20**, XL **0**; gemusterter Midirock statt Cocoa-Minimalismus.
- **3894 Jumper Midnight Sky**: S/M/L/XL je **20**, aber **bedrucktes Stretch-Jersey**, kein schlichter Rib/Knit.
- **3081/3082/3083 Primrose**: Leinen-**Shirt-und-Hosen-Set**; laut Beschreibung „made to order“ mit **fünf Werktagen Versandvorlauf**, nicht als V-Neck-Einzelartikel vermarkten.

**Hersteller-Einzelhandelspreise als Plausibilitätscheck, ausdrücklich keine Hertwill-B2B-EKs:** Die deutsche Originalseite von **Linen Tales** nennt unter https://linentales.de/collections/damen-leinenkleider **139 €** für „Fugue, Black“ und **174 €** für „Rhapsody, Black“. EVERNEs Kleiderkonzepte liegen bei **44/49/59 €**. Das ist eine erhebliche Produkt-/Preispositions-Differenz; ein günstiger Hertwill-EK kann aus diesen Endkundenpreisen **nicht** abgeleitet werden. Auch ein rechtlich/kommerziell zulässiger Wiederverkauf zu EVERNE-Endpreisen ist nicht verifiziert.

## 4. Wirtschaftlichkeits- und Automationsurteil

- Für einen EVERNE-Endpreis von **59 €** beträgt das vorhandene, bereits dokumentierte **maximale Gesamtbudget** für Lieferantenrechnung aus Ware, Fracht und nicht abzugsfähiger Steuer nur **31,57 €**, **noch vor Einkommensteuer** (modellhaft 30 % Rest vor ESt, 2,5 % + 0,25 € Zahlungsgebühr, 5 € Retourenreserve, 3 € Betriebskosten). Für **49 €** sind es **24,82 €**, für **44 €** **21,45 €**. Das sind Budgetgrenzen, **keine** tatsächlichen EK-Angebote.
- Hertwill-Deutschlandfracht im offiziellen allgemeinen Korridor **6,99–15,99 € exkl. USt.**, doch die **exakten Linen-Tales-EK-/Portobeträge** sind öffentlich **nicht verfügbar**. Deshalb **keine 30-%-Nachsteuer-Freigabe**, unabhängig vom passenden Stil.
- Die Hertwill-Automatik für bezahlte Shopify-Orders inklusive gespeicherter Kartenbelastung ist dokumentiert. Aber **Free bedeutet maximal 5 verschiedene Produkte und 10 Orders/Monat**; 20 bestehende EVERNE-Konzepte können somit **nicht gleichzeitig** vollständig im kostenfreien Hertwill-Tarif betrieben werden.
- Markenverantwortung, GPSR-Informationen, erlaubte Produktbilder, Retourenprozess und Zahlungs-/Bestandsausnahmen bleiben vor einer Freigabe separat zu klären. Kein Händlerkonto, keine API-Key-Nutzung, keine Markenfreigabe, keine Zahlkarte und kein Testkauf wurden ausgelöst.

**Entscheidung:** **Hertwill bleibt TECH-PASS / PRODUCT-AND-PROFIT-HOLD.** Der vollständige öffentliche Apparel-Screen schließt Hertwill **für die unveränderte 20er-EVERNE-Kollektion als derzeit belegbar lieferfähige Lösung aus**. Eine spätere Pilotprüfung von höchstens fünf **anders spezifizierten** Artikeln braucht explizite Zustimmung, echten SKU-EK/Versand/Steuer, Markenfreigaben, nachprüfbaren Ertrag *nach* ESt und geschlossene Retouren-/Monitoringregeln.

## Öffentliche Primärquellen

1. Hertwill API-Dokumentation: https://hertwill.com/docs
2. Hertwill Katalog mit DE-Filter (8 Seiten): https://api.hertwill.com/v1/products?category=apparel&ships_to=DE&per_page=100&page=1
3. Öffentliche Variantenbelege exemplarisch: https://api.hertwill.com/v1/products/5583 , https://api.hertwill.com/v1/products/6043 , https://api.hertwill.com/v1/products/5586
4. Hertwill Marken-ID und Versandpreisliste (DE-Preis nicht öffentlich): https://api.hertwill.com/v1/brands , https://api.hertwill.com/v1/brands/72/shipping-price-lists
5. Hersteller-Liste der Endkundenpreise: https://linentales.de/collections/damen-leinenkleider
6. Hertwill Offizielle Prozess-/Preis-/Retourenbedingungen: https://hertwill.com/resources/how-to-start-selling-on-shopify , https://hertwill.com/pricing , https://hertwill.com/resources/shipping , https://hertwill.com/resources/returns-refunds

**Nur Recherche auf dem bestehenden Dokumentationszweig; keine Änderung an Live-Shop, Preisen, Kollektion, Produkten, Accounts, Zahlungsmitteln oder Bestellungen.**
