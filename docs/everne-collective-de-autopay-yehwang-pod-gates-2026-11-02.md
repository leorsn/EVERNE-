# EVERNE — Shopify Collective, EU-Fashion-Anbieter und POD: Zweiter Zahlungs-/Produkt-Gate-Screen

Recherche: 02.11.2026 · Status: **Recherche, kein Launch, 0/20 GO** · unveränderte 20-Style-Liste in `src/womenswearCatalog.ts`.

## 1. Wichtigster neuer Weg: Shopify Collective — automatische Lieferantenzahlung ohne Zusatzgebühr

**Offiziell belegt:** Shopify Collective kann bei bezahlten Shopbestellungen den B2B-Einkaufspreis und Versand **automatisch aus dem Shopify-Payments-Guthaben** des Händlers abbuchen und nach Versand an den Lieferanten weiterleiten. Die AutoPay-Funktion kostet **keine zusätzliche Gebühr**. Die Lieferantenzahlung erfolgt dabei nicht per zusätzlich hinterlegter Lieferantenkarte; gerade das vermeidet manuelle Einzelzahlungsfreigabe und ein zwingendes Wallet-Prefund. Technischer AutoPay-Gate = **PASS unter Voraussetzungen**, nicht bereits im EVERNE-Shop nachgewiesen.

- Quelle: https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/payments
- **Beide Shops müssen in demselben Land ansässig sein, dieselbe Shop-Währung verwenden und jeweils korrekt konfiguriertes Shopify Payments haben.** Für EVERNE mit DE/EUR können damit nur **in Deutschland ansässige EUR-Collective-Lieferanten** die automatische Zahlung abbilden; niederländische oder polnische Anbieter sind keine beliebig auswechselbaren Collective-Partner.
- Der verbundene Shopify-Read-only-Check bestätigt **EVERNE, Shopify Basic, Deutschland und EUR**. **Aktive Shopify-Payments-Auszahlungen, Collective-Berechtigung, deutscher Partner und AutoPay-Aktivierung sind nicht verifiziert.**
- Für EU-Händler sind außerdem zulässige Shopify-Steuereinstellungen (Shopify Tax, Basic Tax oder externe Steuer-App statt Manual Tax), gegebenenfalls VAT-Status-Verifikation, aktiviertes Shopify Network Intelligence und ggf. Identitätsprüfung nötig. Unterhalb der VAT-Registrierungsschwelle sieht Shopify ausdrücklich den Status „I don't need to register or collect VAT“ vor; ob dies für den konkreten Kleinunternehmer-Status passt, muss separat mit den echten Kontodaten verifiziert werden.
- Quellen: https://help.shopify.com/en/manual/online-sales-channels/shopify-collective/retailers/requirements-and-considerations und https://help.shopify.com/en/manual/online-sales-channels/shopify-collective/retailers/taxes
- **Ausnahme bei Cashflow:** Wenn das Shopify-Payments-Guthaben nicht reicht (etwa wegen PayPal-Zahlung, Auszahlungen oder Rückerstattungen), wiederholt Collective den Zahlungsversuch automatisch; der Lieferant kann aber mit Versand warten. Diese Ausnahme verlangt Kontenüberwachung und ist keine Garantie ohne Kapitalbedarf.
- Die Discovery zeigt laut Shopify nur Lieferanten aus dem **gleichen Land**: https://help.shopify.com/en/manual/online-sales-channels/shopify-collective/retailers/discovery

**Privater read-only Produktscreen in der DE/EUR-Verbindung** (keine Importe): Drei unabhängige Suchläufe nach (a) schwarzem schlichtem Minikleid, (b) hellem Ribbed Tank und (c) braunem Satin-Midirock lieferten **keinen on-brief-Kandidaten**. Eine einmalige allgemeine Korrektursuche nach Damenkleidern lieferte Angebote, **aber 0 treue Produkt- und Margenmatches** für die 20 unveränderten Everne-Styles. Dies ist ein begrenzter Discovery-Screen, **kein Beweis, dass es in Deutschland keine passenden Collective-Marken gibt**. Keine Produkt-Shelf-Ausgabe, App-Installation, Einladung, Order oder Karteneinrichtung.

**Ergebnis:** Collective bleibt **erste priorisierte Architektur für künftige DE-Beschaffung**, jedoch **PRODUCT-/ELIGIBILITY-/PROFIT-HOLD**.

## 2. Weitere echte Modequellen und nachvollziehbare Ausschlüsse

| Anbieter | Automatisches Supplier-Payment | Kosten / Ware / Aufnahme | Gate |
| --- | --- | --- | --- |
| **Yehwang Dropshipping** (NL) | Shopify-Order-Sync belegt, **automatischer Karteneinzug im Dropshipping-Service nicht verifiziert**; Standard-Onlineshop nimmt Card-Zahlung an, das ist kein Beweis für unbegleitete Charge | Shopify-App nominell gratis; Versand aus NL; explizit **mind. sechs Monate aktive Dropshipping-Erfahrung** für Partneraufnahme, weitere Händlerprüfung; Style-/SKU-Preise nicht verifiziert | **HOLD**: AutoPay und Erfahrung/Onboarding ungeklärt, keine 1:1-SKU |
| **Tradelle** | Ja: Sammelabbuchung 1x täglich von gespeicherter Zahlungsmethode nach automatischer Übernahme bezahlter Orders | Bezahlte Pläne ab **$29.99/Monat** (angezeigter regulärer Lite-Preis); Testphase für $1 | **NO-GO: zusätzliche Pflichtgebühr** |
| **VAITTO** | Shop-Sync ja, aber Händler **bestätigt Order im Dashboard** | EU Designerlabels; kein monatliches Abo, aber teure Designermode und Versand | **NO-GO: manueller Fulfillment-Confirm** |
| **Toonies** | Shopify-Order-Sync ja, aber **Wallet-Topup und manuelles Bestätigen der Sourcing-Order** dokumentiert | Free App, Produkt + internationale Fracht + Karten-/PayPal-Zahlungsgebühr | **NO-GO: nicht vollständig unbegleitet** |
| **T.M. Textil** | Monatlich gebührenfrei, DE-Lager, B2B | Sortiment laut Anbieter vor allem **Bettwäsche, Handtücher, Heimtextilien** | **NO-GO: nicht EVERNE-Womenswear** |
| **LaBalancia** | Shop-kompatible CSV, Bestellung per Shop/BaseLinker, **Vorkasse** | Damenmode in Polen, keine normalen B2B-Rücknahmen | **NO-GO: keine gesicherte automatische Zahlung** |

Primärquellen:
- Yehwang: https://dropshipping.yehwang.com/ ; https://apps.shopify.com/yehwang-dropshipping ; https://www.yehwang.com/payment.html
- Tradelle AutoPay: https://help.tradelle.io/de/article/so-funktioniert-automatisiertes-fulfillment-dgzpz3/ ; Pricing: https://www.tradelle.io/pricing/
- VAITTO: https://vaitto.com/dropshipping
- Toonies: https://www.toonies.com/billing-info
- T.M. Textil: https://www.tm-textil.de/en/dropshipping.html
- LaBalancia: https://labalancia.com/en/pages/dropshipping-i-wspolpraca-biznesowa

## 3. Neue Kostengegenprobe: POD-Anbieter technisch passend, Artikel nicht

**Printify Free** dokumentiert automatischen Shopify-Orderimport und automatische Abbuchung von Lieferantenwaren/Porto vom hinterlegten Kredit-/Debitkartenkonto ohne Pflicht-Prefund; **Printful** sowie **Gelato** dokumentieren analog automatische Verarbeitung bzw. direkte Kartenzahlung. **Technischer PASS nur bei eingerichteter und funktionsfähiger Karten-/Order-Konfiguration; im EVERNE-Shop nicht eingerichtet.** Primärquellen: https://help.printify.com/hc/en-us/articles/4483626302609-How-will-Printify-charge-me ; https://help.printify.com/hc/en-us/articles/4483644218769-How-do-I-set-up-payments-in-Printify ; https://help.printful.com/hc/en-us/articles/50262313219985-How-does-Printful-charge-for-Shopify-orders ; https://support.gelato.com/en/articles/8996161-how-can-i-set-up-my-credit-card-to-be-charged-instead-of-gelato-wallet

**Konkrete unveränderte EVERNE-Katalog-Preisgates** bei beispielhaft **25 % effektivem ESt-Abzug auf positiven operativen Stückgewinn**, Payment 2,5 % + 0,25 €, Rücklagen für Standardretouren 5 € und Betrieb 3 €, ≥30 % Nachsteuer-Rest des Endkundenpreises; persönliche ESt real **unbekannt**:

| EVERNE-Stil | Beispielprodukt | Belegbarer Kostenunterrand | Szenario-Maximalbudget für gesamten Lieferanten-All-in | Ergebnis |
| --- | --- | --- | ---: | --- |
| **Soft Midi Dress 59 €** (Schnitte nicht exakt) | Printful All-Over-Print Bodycon Dress | **29,49 € inkl. USt. + ab 4,49 € DE-Versand = mindestens 33,98 €**; regional/variantenabhängig | **25,67 €** | Mindestens **8,31 € zu teuer**, ehe weitere Abwicklung/Retourenrisiken geklärt sind |
| **Fluid Midi Skirt 44 €** (Pencil statt Fluid Midi) | Printify Women's Pencil Skirt AOP, US-Provider MWW | **$17.06 Ware + $15.49 Versand „European Countries“ = $32.55**, vor Einfuhrabgaben (bei 0,8924 **29,05 €**) | **17,05 €** | Mindestens **12,00 € zu teuer**, falscher Stil, Nicht-EU-Risiken |
| **Essential Rib Top 34 €** (Racerback statt Chalk Rib) | Printify Women's Ideal Racerback Tank ab **10,54 €**, Versand zusätzlich, Material-/Farb-/EU-Produktion offen | **10,54 € vor Versand**, je nach Provider teure EU-Lieferung | **11,30 €** | **Maximal 0,76 € für kompletten Versand/Steuern** → im üblichen Einzelversand praktisch nicht erreichbar; nicht freigeben |
| **Soft V-Neck 49 €** | Printify Women's Relaxed Jersey Short Sleeve V-Neck Tee ab **14,22 €**, Porto/DE-Provider unbestätigt | **14,22 € vor Versand** | **19,92 €** | Finanzgate *theoretisch* näher, aber **T-Shirt statt Everne-V-Neck-Pullover**, konkreter DE-Landed Cost nicht verifiziert |

Produkt- und Kostenbelege:
- Printful Dresses inkl. VAT: https://www.printful.com/custom/womens/dresses und https://www.printful.com/custom/womens/dresses/all-over-print-bodycon-dress
- Printify Skirt: https://printify.com/app/products/285/generic-brand/womens-pencil-skirt ; EU-Fracht: https://printify.com/shipping-rates/mww-on-demand/
- Printify Tanks: https://printify.com/app/products/womens-clothing/tank-tops ; V-Neck: https://printify.com/app/products/3042/bellacanvas/tiktok

**Zusätzlich:** POD benötigt ein Design und liefert oft digitale Mockups statt freigegebener, echter Fotos des konkreten verkaufsfertigen Stücks. Diese Bilder dürfen nicht als nachgewiesene tatsächliche EVERNE-Produkt-/Passformfotos ausgegeben werden. Verbraucherwiderruf und die B2B-Verweigerung gewöhnlicher Rücknahmen können den €5-Retourenpuffer übersteigen.

## Nachtrag — Yehwang-Payment-Flow und zweiter Collective-Modelldurchlauf (02.11.2026)

**Yehwang klarer ausgeschlossen, solange keine neuere belastbare Zusage vorliegt:** In der eigenen bebilderten Anbieteranleitung *Dropshipping order process* ist nach dem Shopify-Orderimport ein eigener Händler-Checkout mit **„PAY NOW“**, Wahl einer Zahlungsmethode und Hinweis auf **automatische Bestellstornierung, wenn nicht innerhalb von 2880 Minuten (= 48 Stunden) bezahlt** wird, dokumentiert. Das ist **kein Nachweis eines Saved-Card-Auto-Charge**, sondern belegt den publizierten manuellen Zahlungsschritt. Beispiel aus dem Niederlande-Screenshotszenario: Warenwert 20,85 €, Portokosten 7,15 €, Servicekosten 1,50 €, 21 % niederländische Umsatzsteuer 6,20 € → 35,70 € B2B-Gesamtausgabe; **kein Deutschlandpreis**. Weiteres Beispiel „Game on“ Grafik-Sweater 14,95 € Ware + 1,50 € Service + 5,19 € NL-Versand + 4,23 € NL-VAT = **25,87 €**. Diese Produkte sind auch stilistisch kein EVERNE-Match.

Primärquelle (Original-PDF, Abschnitte „Pay & Ship“ / „Order detail“): https://cfcdn.yehwang.com/image/www/auto_202601/d21c25b8-504e-44ef-9a61-9d663f09a87a.pdf ; die öffentliche Marketing-App-Beschreibung „Automatic fulfillment“ darf nicht mit **automatischer Lieferantenzahlung** gleichgesetzt werden. Die PDF-Abbildungen sind ein dokumentierter Workflow, nicht Live-Zugriff auf ein Händlerkonto im November 2026. **Payment-Gate für EVERNE: NO-GO bis zu belastbarer Neubelegung**.

**Neuer privater deutscher Shopify-Collective-Screen:** Drei neue strikte on-brief-Nennungen (schwarzer ärmelloser Body, Cocoa/braune weite Tailored-Hose, heller V-Neck-Pullover) lieferten **0 on-brief-Produkte**. Die einmal zulässige breitere Korrektur nach Damenhosen lieferte ausschließlich nicht passende Kategorien/Stile oder zu schwache Margen; **keine SKU freigeben und nichts importieren**. Bei den oben verifizierten DE/EUR-Collective-Bedingungen bleibt die Suche technisch interessant, aber ohne freizugebendes Produkt. Die Aussage beschränkt sich auf die abgefragte Discovery, **nicht auf den gesamten deutschen Modehandel**.

## 4. Unveränderte Sperren / nächste Schritte

1. **0/20 GO**. Bestehende Shopify-Entwürfe bleiben DRAFT/0 Bestand, ohne Supplier-IDs, ohne Veröffentlichung.
2. Kein neues Konto, keine App installiert, keine Karte/Wallet konfiguriert, kein Lieferant angeschrieben, keine Order/Kosten ausgelöst.
3. **Collective nur bei expliziter Freigabe** für die kostenlose Installation/Eligibility-Prüfung im Shop; auch danach **keine Produktimporte oder Live-Schaltungen ohne zusätzliche, individuelle Freigabe**. Vorher deutsche Lieferanten und geeignete tatsächliche Stil-/Farb-/Größen-SKUs suchen.
4. Für jedes neue SKU: tatsächliche DE-End-to-End-Fracht/Steuern, Supplier-Widerrufs-/B2B-Retoure, GPSR-Herstellerdaten, Faserkennzeichnung, echte Fotos, Bestandsdaten, Karten-/AutoPay-Beleg und **≥30 % nach allen eigenen Steuern** einzeln nachweisen.

Diese Notiz ist ein dokumentierter Gate-Screen, keine Einkaufsempfehlung, Steuerprognose oder Rechtsberatung.
