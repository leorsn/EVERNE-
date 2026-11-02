# EVERNE — Acht weitere Damenmode-/EU-Supplier im End-to-End-Screen (02.11.2026)

**Nur öffentliches, lesendes Research.** Keine App-/Account-Installation, keine Bestellung/Zahlung, keine Kontaktaufnahme, keine Shopänderung. Die für EVERNE unabdingbaren Gates sind: ruhige minimalistische Damenmode, Deutschland/EU-Lieferung, **automatischer Shopify-Orderimport und automatische Lieferantenzahlung**, keine ungeprüfte neue Monatsgebühr, seriöser B2B-Retourenweg, nachgewiesene **30 % tatsächlicher Gewinn nach allen Kosten einschließlich Steuer**.

## 1. Ergebnis im Direktvergleich

| Dienst | Sortiment / Versand | Shopify / Bestellung / B2B-Zahlung | Preis-/Retouren-Gates | Bewertung für EVERNE |
|---|---|---|---|---|
| **Matterhorn Wholesale** (PL) | Mehr als 31.000 Damenmode-/Fashion-Modelle laut eigener Shopify-Seite; technisch/stilistisch wesentlich näher als Hertwill. | Shopify-App gratis, Bestands- und Preissync. Händler klickt für Order **Request Fulfillment**; danach muss er auf **separatem Link bezahlen**. REST API kann Order einstellen, laut eigener Dokumentation **nicht bezahlen**. | Kein neues monatliches App-Abo für Integration; genaue SKU-Preise/DE-Bruttokosten/Normalretouren nicht bewiesen. | **NO-GO Vollautomatik**, aber relevante spätere Stil-/Preisbenchmark. |
| **AW Dropship Europe / Ancient Wisdom** (SK) | Kleidung **Boho, Yoga/Festival, Sarongs, Printpants**, größtenteils kein EVERNE-Quiet-Luxury-Basic. EU-Versandlager. | **Nachweislich automatische Shopify-Order und Händlerabbuchung** aus Guthaben bzw. gespeicherter Karte; Tracking zurück. | **Keine Grundgebühr** laut Website. DE-Rate z. B. **5,85 € bis 1 kg**, **5,90 € für 1–2 kg** auf Lieferseite; Steuer- und Bruttopreis noch prüfen. B2B-Nichtgefallen nur freiwillig innerhalb **14 Tage nach Erhalt**, Händler trägt Rückfracht und verliert Hinfracht; manuelles Return-Reporting. | **TECHNISCH PASS / STIL NO-GO** für die fünf Kernartikel; kein Import. |
| **KakaClo** | Sehr großes Damenmodeangebot, überwiegend **China**- bzw. teilweise US-Lager. | Shopify App gratis, auto-order wird beworben; eigene Site beschreibt B2B-Belastung bei Bestätigung. | Shopify-App aktuell **1,9/5 bei 46 Bewertungen**; neuere Reviews enthalten schwere Ausführungs-/Supportvorwürfe (nicht als unabhängig bewiesene Insolvenzaussage behandeln). Chinalieferung, DE-Steuer/Retouren/Qualität offen. | **NO-GO unter EVERNE-Qualitäts- und EU-Retouren-Gate.** |
| **LaBalancia** (PL) | Damenmode-Dropshipping ohne MOQ, XML/CSV/BaseLinker/Shopify-Import. | Bestellung über B2B-Shop oder BaseLinker, **Prepayment**, keine belastbare Auto-Card-Strecke. | Kein normaler B2B-Rückversand: **„We do not accept returns“**, Händler wickelt B2C-Widerruf selbst ab. | **NO-GO** (Retouren + Pay-Gate). |
| **VAITTO** | Designer-Ready-to-wear aus EU-Distributoren, keine Grundgebühr. | Bestellungen müssen laut eigener Sequenz **im VAITTO-Dashboard bestätigt** und separat bezahlt werden. | Luxusdesigner sind zudem bei EVERNE-Endpreisen 34–59 € ohne konkretes EK nicht belegt. | **NO-GO Vollautomatik.** |
| **Sync2Fashion / B2B Griffati** | Große Designer-/Fashion-Auswahl, Shopify-Connector mit Orderrouting. | Automatische Ordersynchronisation genannt. | Offizielle Preis-Seite: **250 € pro Jahr Mitgliedschaft + 120 € pro Monat Dropship Sync**, beides zwingend, exkl. USt. | **NO-GO Null-Zusatzkosten.** |
| **Droppery** (NL) | EU-Supplier-Netz, auch Fashion, Shopify-Orderautomation wird beworben. | Automatische Orderweitergabe dokumentiert; Auto-B2B-Payment anhand der gesichteten Seiten nicht gesondert belegt. | Offizielle Preise: **39 €/Monat + 1,5 % Handlingfee** (Markets) bzw. **59 €/Monat** (Selective Optimal); Softwarelizenzen jährlich berechnet, exkl. USt. | **NO-GO** ohne Abo-Freigabe. |
| **Catwalk Dropship** (UK) | Fashion-Supplier-Plattform für britische Retailer. | Shopify-Orderflow und Stripe-/Wallet-B2B-Zahlungen; Lieferkette aus UK. | Free nur Katalogsichtung mit **0 verknüpften Produkten**, aktive Tarife kostenpflichtig. Händler verantwortet Verbraucherrückgaben. | **NO-GO** für DE/gebührenfrei. |

## 2. Der wichtigste negative Nachweis: Matterhorn auch per REST-API ohne Autopay

Auf der offiziellen Matterhorn-API-Seite steht unter **„Paying for the Order“**, dass eine über REST API platzierte Bestellung **nicht über die API bezahlt werden kann**. Zahlung nur über einen Link in der E-Mail oder über das Kundenpanel. Die eigene Shopify-Dokumentation erklärt ebenfalls, dass die Fulfillment-Anfrage zunächst einen Großhandelsauftrag erzeugt und erst nach einem gesonderten Zahlvorgang der Versand beginnt.

Das unterscheidet streng zwischen **automatischer Auftragserstellung** und **unbeaufsichtigter B2B-Zahlung**. Auch ein kostenloser Shopify-Connector und automatischer Bestandsabgleich schließen die zweite Lücke nicht. Eine neue selbst gebaute Shopify-App ohne dokumentierten AutoPay-Endpunkt wäre keine verantwortbare Null-Budget-Lösung; API-Schreiben würde unter realen Bedingungen zudem echte Aufträge erzeugen.

Quellen:
- https://matterhorn-wholesale.com/?str=api-help
- https://matterhorn-wholesale.com/shopify/?type=faq_full
- https://srv0.matterhorn-wholesale.com/shopify/landing-page.html

## 3. AW Dropship: der seltene kostengünstige technische Gegenbeweis

AW beschreibt unter **„Your Shopify orders and their status“** die vollständige Kette: Shopify sendet Fulfillment-Request, AW erzeugt Order, belastet Guthaben oder Saved Card **automatisch**, schiebt bezahlte Order ins Lager und meldet Tracking zurück. Anders als WaveGo/Matterhorn ist dieser operative Zahlungsschritt öffentlich und eindeutig dokumentiert.

Auch die nackten DE-Portokosten sind günstiger als die Hertwill-Portospanne; sie sind jedoch **keine vollständige Endkunden-Kalkulation**:

- Deutschland / Zone 6: **5,85 €** (0–1 kg), **5,90 €** (1–2 kg), **7,55 €** (2–3 kg), **7,85 €** (3–30 kg); laut Anbieter normalerweise 2–3 Werktage.
- AW listet generell Nettowarenpreise und kalkuliert Umsatzsteuer beim Checkout; ohne Steuerregistrierung/konkreten B2B-Rechnungsfall ist keine Brutto-Wirtschaftlichkeit verifiziert.
- Das öffentlich erklärte **Clothing-Sortiment** ist ausdrücklich „boho, ethnic, artisan-inspired“, Hauptfamilien u. a. Mandala Sarongs, Mushroom Pants, Yoga/Festival Pants, Nomad Sari Shirts. Ein EVERNE-konformes Rib Top, Second Skin Body, Tailored Pant, Soft V-Neck oder Fluid Midi Skirt ist auf diesen Seiten **nicht belegt**.
- B2B-Kulanzrückgabe: Meldung binnen 14 Tagen nach Erhalt, unbenutzt und in wiederverkaufsfähiger Originalverpackung. Rücksendekosten Händler; Hinfracht nicht rückerstattet. **Kein vollautomatischer Retourenprozess.**

Es wäre falsch, ein technisch passendes, günstiges Giftware-/Boho-Angebot als EVERNE-Quiet-Luxury-Lösung zu verkaufen. **AW daher nicht aktivieren.**

Quellen:
- https://www.aw-dropship.eu/docs/shopify-order-status
- https://www.aw-dropship.eu/docs/payment-cards-and-options
- https://www.aw-dropship.eu/
- https://www.aw-dropship.eu/clothing
- https://www.aw-dropship.eu/shipping
- https://www.aw-dropship.eu/returns

## 4. Shopify Collective: präzisierte Nullkosten- und Eligibility-Regeln

Shopify stellt aktuell ausdrücklich klar:

- **Kein Mindestumsatz**, um Shopify Collective grundsätzlich nutzen zu können (nicht mit der für **Auszahlungen** erforderlichen PSP-Freischaltung verwechseln).
- **Automatische Supplier-Zahlung ist ohne Zusatzgebühr**, wenn sowohl Retailer als auch Supplier eligible sind und in **gleichem Land / gleicher Shopwährung / passender Shopify-Payments-Region** geführt werden.
- Für einen deutschen Shopify-Store ist deshalb ein **deutscher Supplier-Store in EUR** mit passender Payments-Einrichtung nötig; das liegt weiterhin nur als mögliche Suchstrategie, nicht als konkrete Supplier-Beziehung, vor.
- **Auszahlungen müssen aktiv sein**. Shopify sagt, dass bei neuen Händlern Auszahlungen **bis zu 21 Tage nach der ersten Belastung** pausieren können; bis zur Freischaltung kann Collective trotz eingerichtetem Shopify Payments als nicht eligible erscheinen.
- EU-Stores müssen eine von Shopify akzeptierte Steuerkonfiguration verwenden und den jeweiligen Steuerregistrierungsstatus verifizieren. Die Pflicht zur Hinterlegung einer USt-IdNr. gilt laut Shopify nur für Betriebe, die im Heimatland zur Steuererhebung registriert sein müssen; als deutscher Kleinunternehmer ist die **individuelle Behandlung erst gesondert zu prüfen**, nicht fälschlich pauschal eine USt-ID zu erfinden.

Der verbundene EVERNE-Shop hat Shopify Basic, Deutschland und EUR, und Collective ist bereits installiert, **aber das konkrete Payments-/Auszahlungs-/Eligibility-Gate kann mit den bisher verfügbaren Berechtigungen nicht bestätigt werden**. Kein Umgehen der verweigerten Store-Read-Scopes.

Quellen:
- https://help.shopify.com/de/manual/online-sales-channels/shopify-collective
- https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/payments
- https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/requirements-and-considerations
- https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/installation

## 5. Andere Primärquellen

- KakaClo Shopify App, aktueller Review-Stand: https://apps.shopify.com/order-6
- KakaClo FAQ zum überwiegenden China-Versand: https://www.kakaclo.com/login
- LaBalancia Bestell-/Retourenbedingungen: https://labalancia.com/en/pages/dropshipping-i-wspolpraca-biznesowa
- VAITTO Prozess mit Dashboard-Bestätigung: https://vaitto.com/dropshipping
- Sync2Fashion zwingende Doppelgebühr: https://www.sync2fashion.com/plugins/?lang=en
- Droppery Markets Preis: https://droppery.io/en/packages-webshops/
- Droppery Selective Preis: https://droppery.io/de/preisgestaltung-von-online-handlern/
- Catwalk AGB Free ohne verknüpfte Produkte: https://catwalkdropship.com/terms

## 6. Unveränderte Entscheidung

- **Kein zusätzlicher Anbieter freigegeben.** Die technische Anbieter-Knappheit ist nach acht weiteren offiziellen Gegenprüfungen nachvollziehbarer, aber noch keine allgemeine Unmöglichkeitsbehauptung.
- **Hertwill** bleibt der stärkste externe **Autopay-Fashion-Anbieter**, ohne freigegebene 5-Kernartikel. **AW** ist ein technisch verifiziertes, kostenfreies Autopay-Beispiel mit **Sortimentskonflikt**. **Matterhorn** ist eine relevante stilistische/SKU-Quelle, aber **nicht automatisch bezahlbar**.
- **Shopify Collective** bleibt als bereits installierte, grundsätzlich kostenfreie native DE/EUR-Option prioritär für eine später autorisierte Eligibility-/Supplier-Prüfung, solange kein konkreter Fashion-Supplier mit echtem EK und verifizierter 30-%-Nettogewinnrate vorliegt.
- Kein Import, keine Livepreise, keine Zahlungsautorisation, keine echte Testbestellung, keine Nachrichten an Anbieter.
