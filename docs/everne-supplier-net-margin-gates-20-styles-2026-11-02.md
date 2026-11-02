# EVERNE — belastbare Lieferantenpreis-Gates für die bestehende 20er-Liste

**Recherche-/Rechenstand:** 02.11.2026  
**Status:** Kalkulationsfilter, nicht Bestands-, Angebots- oder Verkaufsfreigabe  
**Verbindliche Leitplanken:** bestehende 20 Modelle, keine Footwear, 0 € Zusatzbudget, keine ungeprüfte Live-Schaltung, echte vollautomatische Supplier-Zahlung (ohne Bestellung-für-Bestellung-Bezahlung, manuelle Wallet-Aufladung oder kostenpflichtiges Zusatzabo).

## 1. Neue Erkenntnis

Die bisher gefundenen ungefähren Shopify-Collective-Lieferantenrabatte von 15–35 % sind mit der strikten EVERNE-Gewinnvorgabe **unter den aktuellen Modellannahmen** nicht vereinbar. **30–35 % Handelsmarge ist nicht 30 % Gewinn nach Retouren, Zahlung, Versand und Steuern.**

**Rechenmodell für ein verkauftes Einzelstück**

- EVERNE-Zielverkaufspreis `P` (34/39/44/49/54/59 €).
- Zahlungsgebühren als **unverifizierte Modellannahme**: 2,5 % von `P` + 0,25 €.
- Durchschnittliche Retourenreserve: 5,00 € je verkauftem Artikel (modelliert; keine echte Quote).
- Sonstige Betriebskosten: 3,00 € je Artikel (modelliert; tatsächliche Fix-/Variable-Kosten können abweichen).
- Illustrative **persönliche effektive Einkommensteuer von 25 % auf positiven vorsteuerlichen operativen Gewinn**; keine verifizierte persönliche Steuerrate oder Einzelpostensteuer. Einkommensteuer entsteht nicht rechtlich isoliert je Artikel; rein ökonomische Sensitivität.
- Gewünschte Gewinnmarge **nach dieser modellierten Steuer**: mindestens 30 % des Verkaufspreises.

`Gewinn_vor_ESt = P - Lieferantengesamtkosten - (0,025 × P + 0,25) - 5 - 3`  
`Gewinn_nach_modellierter_ESt = Gewinn_vor_ESt × 0,75` (nur bei positivem Vorsteuer-Gewinn).  
Damit gilt `Lieferantengesamtkosten ≤ (1 - 0,30/0,75 - 0,025) × P - 8,25 = 0,575 × P - 8,25`.

**Lieferantengesamtkosten** = tatsächlich durch EVERNE zu zahlender Warenbetrag **einschließlich** Lieferanten-USt (falls anfallend/nicht abzugsfähig), Lieferanten-/Endkundenversand, Zoll/Einfuhrabgaben, Paketdienst-Auslagen und zwangsläufige Fulfillment-Zuschläge. Gemeinsame Warenkörbe, höhere Retouren und Kostenblöcke können Abweichungen erzeugen. Kosten als Obergrenze auf Cent **abgerundet**, damit kein mathematischer Grenzübertritt entsteht.

## 2. Preisstufen — Kostenlimits und Lieferantenrabattsensitivität

| EVERNE P | Max. Supplier-All-in | Davon max. Nettoware bei 4,90 € Brutto-Endkundenporto + 19 % Lieferanten-USt auf Ware | Mind. nomineller Lieferantenrabatt, ohne Versand/USt | Mind. nomineller Rabatt, mit Porto/USt-Szenario |
|---:|---:|---:|---:|---:|
| 34 € | 11,30 € | 5,37 € | 66,8 % | 84,2 % |
| 39 € | 14,17 € | 7,79 € | 63,7 % | 80,0 % |
| 44 € | 17,05 € | 10,21 € | 61,3 % | 76,8 % |
| 49 € | 19,92 € | 12,62 € | 59,3 % | 74,2 % |
| 54 € | 22,80 € | 15,04 € | 57,8 % | 72,1 % |
| 59 € | 25,67 € | 17,45 € | 56,5 % | 70,4 % |

**Wichtige Unterscheidung:** Die beiden letzten Spalten sind **nur theoretische Vergleichswerte**, falls der angezeigte Lieferantenrabatt sich exakt auf `P` bezieht. Die Shopify-Collective-Rabattbasis kann der Verkaufspreis des jeweiligen Lieferantenshops sein, der von unserem EVERNE-Zielpreis abweicht; daher muss stets der **konkrete Kostenpreis + Versand + ausgewiesene B2B-Steuern** einer realen DE-SKU/Variante geprüft werden. Die 19 % in der Szenariospalte gelten **nicht** pauschal für jeden Lieferanten; 4,90 € ist **kein echtes Angebot**.

Beispiel `P = 49 €`, 35 % Rabatt auf exakt 49 € ohne Porto und Lieferanten-USt: angenommene Warenkosten 31,85 €; Gebühren 1,475 €, Reserve 5 €, Betrieb 3 €, Vorsteuer-Deckung 7,675 €; nach modellierten 25 % Einkommensteuer = **5,756 € = 11,7 %** des Umsatzes. Mit realen Lieferkosten wäre es weniger.

## 3. Einzelprüfung sämtlicher 20 weiterhin unveränderter Designkonzepte

| Nr. | EVERNE-Modell | Verkaufspreis | Max. **All-in-Lieferant** | Max. **Netto-Ware bei Beispiel** 4,90 € Porto + 19 % B2B-Waren-USt | Verkaufs-Gate |
|---:|---|---:|---:|---:|---|
| 01 | Essential Rib Top | 34 € | 11,30 € | 5,37 € | HOLD |
| 02 | Second Skin Body | 39 € | 14,17 € | 7,79 € | HOLD |
| 03 | Soft Line Longsleeve | 39 € | 14,17 € | 7,79 € | HOLD |
| 04 | Everyday Tank | 34 € | 11,30 € | 5,37 € | HOLD |
| 05 | Fine Knit Top | 39 € | 14,17 € | 7,79 € | HOLD |
| 06 | Relaxed Crew Knit | 49 € | 19,92 € | 12,62 € | HOLD |
| 07 | Wrap Knit Cardigan | 54 € | 22,80 € | 15,04 € | HOLD |
| 08 | Ribbed Turtleneck | 44 € | 17,05 € | 10,21 € | HOLD |
| 09 | Soft V-Neck | 49 € | 19,92 € | 12,62 € | HOLD |
| 10 | Off-Shoulder Knit | 59 € | 25,67 € | 17,45 € | HOLD |
| 11 | Wide Leg Trouser | 54 € | 22,80 € | 15,04 € | HOLD |
| 12 | Straight Leg Denim | 59 € | 25,67 € | 17,45 € | HOLD |
| 13 | Tailored Everyday Pant | 59 € | 25,67 € | 17,45 € | HOLD |
| 14 | Relaxed Denim | 54 € | 22,80 € | 15,04 € | HOLD |
| 15 | The Black Mini | 49 € | 19,92 € | 12,62 € | HOLD |
| 16 | Soft Midi Dress | 59 € | 25,67 € | 17,45 € | HOLD |
| 17 | Easy Slip Dress | 44 € | 17,05 € | 10,21 € | HOLD |
| 18 | Fluid Midi Skirt | 44 € | 17,05 € | 10,21 € | HOLD |
| 19 | Tailored Mini Skirt | 39 € | 14,17 € | 7,79 € | HOLD |
| 20 | Denim Midi Skirt | 54 € | 22,80 € | 15,04 € | HOLD |

**Zusatz zur fünften Spalte:** `(All-in-Obergrenze – 4,90 €)/1,19`. Rechnerische Beispielgrenze, **kein Lieferantenpreis**. Niedrigere Versand-/Steuerbelastung erlaubt höhere Nettowarenpreise; umgekehrt niedrigere. Die veröffentlichten 20 Namen, die vorgegebenen Farbtöne und Preise aus `src/womenswearCatalog.ts` werden nicht verändert.

## 4. Geschäftliche und technische Gates vor einer einzigen GO-Entscheidung

1. **AUTO-PAY** — Echtes Supplier-Autopay muss mit Shopify-Order im tatsächlich verwendeten Konto funktionieren, keine manuelle Order-Freigabe, keine manuelle Rechnung / pro Order Pay-Now, kein vorausbezahltes Wallet, keine zusätzlichen Abogebühren. Bei Shopify Collective: DE/DE, EUR/EUR, beide mit passenden Shopify-Payments-Konten; Automatikeinzug **pro konkretem Lieferanten** aktiviert und Guthaben-/Auszahlungsablauf dokumentiert.
2. **SKU-IDENTITÄT** — Exaktes Kleidungsstück, Stil, Farbe, Größen, Materialzusammensetzung und aussagefähige echte Produktbilder; kein semantisches Umetikettieren von Shapewear, Maxi-Skirt, Sport-/Festivalfashion zu quiet-luxury Produkten.
3. **LANDED COST** — Verifizierbares schriftliches **Einzelstück**-Kostenangebot nach Deutschland mit Versand, B2B-USt, Einfuhrsteuer/Zoll, Spesen und eventuellen Zuschlägen; 20er-Tabellenlimit muss eingehalten werden.
4. **EU COMPLIANCE** — GPSR-Verantwortlicher/Hersteller, erforderliche Waren-/Faserkennzeichnung, korrekte Fernabsatz-/Widerrufs- und Retourenprozesse; keine unbewiesene Behauptung von EU-Warenlager oder DDP.
5. **OPERATIONS** — Realistische Lieferzeit, Bestands-/Varianten-Synchronisation, Status- und Tracking-Übertragung, Ausfälle/Erstattungen und Supplier-Zahlungsabdeckung bei Nicht-Shopify-Payments-Zahlungsarten.
6. **FREIGABE** — Erst nach vollständig grüner technischer, kommerzieller, rechtlicher und Qualitätsprüfung darf Leonid eine **separate Live-Freigabe** erteilen. Bis dahin DRAFT und 0 Bestand ohne aktiven Checkout.

## 5. Belegte AutoPay- und Steuergrundlage

- [Shopify, Lieferanten in Collective bezahlen](https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/payments): Automatischer Einzug von Shopify-Payments-Guthaben; keine zusätzliche Funktionalitätsgebühr; gleiche unterstützte Länder/Währung und Shopify Payments für beide.
- [Shopify, Steuerbehandlung bei Collective](https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/taxes): Im EU-Kontext kann Supplier-B2B-USt anfallen; Steuerregistrierungsstatus prüfen, die Erstattung ist rechtsordnungsabhängig.
- [BMF, Vorsteuerabzug und Kleinunternehmerregelung, 10.11.2025](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/Umsatzsteuer-Anwendungserlass/2025-11-10-kleinunternehmerregelung.pdf?__blob=publicationFile&v=3): Kein regulärer Vorsteuerabzug bei Anwendung der Kleinunternehmerregelung (§ 19 UStG). Nicht mit fiktiv abzugsfähiger Steuer kalkulieren.
- Interne Vorläufer: [DE-Collective, Yehwang und POD](everne-collective-de-autopay-yehwang-pod-gates-2026-11-02.md), [AutoPay-Kostengates P2](everne-autopay-landed-cost-ceilings-p2-scout-2026-11-02.md), [Trendsi nach Steuerstress](everne-trendsi-autopay-fashion-shortlist-2026-11-02.md).

## 6. Entscheidung 02.11.2026

**0/20 VERKAUFS-GO.** Bisher kein einziger zu den 20 EVERNE-Konzepten passender Lieferantenartikel mit nachgewiesener *gleichzeitiger* Erfüllung von automatischer Zahlung, verbindlichem deutschem Vollkostenpreis, mindestens 30 % modellierter Nachsteuergewinnmarge, passender Ausführung und EU-Retouren/Compliance. Die neue Preisstufenmatrix verhindert nun, dass scheinbar attraktive nominelle „30–35 % Supplier-Margins“ als wirtschaftlich freigegeben missverstanden werden. Nächste Arbeit: nur echte SKU-Angebote unter diesen Obergrenzen durch dieselben Gates führen. **Keine Supplier-Kontaktaufnahme, Bestellung, App-Installation, Karteneingabe, Shop-Publikation oder zusätzliche Ausgabe ausgelöst.**

## 7. Ergänzung — erneuter technischer AutoPay-Ausschluss drei weiterer Anbieter (02.11.2026)

| Anbieter | Recherchierte offizielle Ausführungs-/Zahlungsweise | EVERNE-Entscheid |
|---|---|---|
| **Syncee** | Shopify-Aufträge werden zum Retailer-Syncee synchronisiert, dann **aktiv per Syncee-Checkout/PayPal/Karte bezahlt**; erst danach an Supplier weitergeleitet. „Auto Order“ in der Supplier-Dokumentation bedeutet **automatische Weiterleitung nach Händlerzahlung**. Free-Browsing ändert das nicht. | **NO-GO AUTO-PAY** (manueller Zahlvorgang). |
| **WaveGo** | Im ausdrücklich dokumentierten Ablauf steht Bestellung zuerst auf **„Awaiting supplier payment“**; Händler öffnet Order und klickt **„Pay now“** bei Lieferanten-Stripe. Auch Free-Tarif (10 Varianten/1 Supplier) beseitigt diesen Schritt nicht. | **NO-GO AUTO-PAY** (manueller Zahlvorgang). |
| **Doba** | Eigenes Tutorial nennt **„Auto-Pay“ bei Karte oder Guthaben** als mögliche Funktion; auf der aktuellen offiziellen Tarifseite startet der eingeschränkte Shop-/Listing-Tarif jedoch bei **28,67 USD/Monat bei Quartalszahlung** (andere Tarife höher), und die Lieferanten-/DE-Gesamtkosten sind unbekannt. | **NO-GO BUDGET** (weitere laufende Kosten; keine Produkte geprüft). |

Originalquellen: [Syncee Retailer Order Management](https://help.syncee.com/en/articles/8929528-order-management), [Syncee Auto Order für Supplier](https://help.syncee.com/en/articles/4430204-what-is-auto-order), [WaveGo tatsächlicher Zahlungsablauf](https://www.wavego.eu/how-to-start), [WaveGo Free-Plan](https://www.wavego.eu/), [Doba Auto-Pay-Tutorial](https://www.doba.com/blog/doba-guides-and-tools/doba-tutorials/master-advanced-doba-usage-automate--scale-in-3-steps-39123), [Doba aktuelle Tarife](https://www.doba.com/pricing). Es wurden **keine Accounts, Apps oder Käufe** ausgelöst; auch diese Prüfung lässt alle 20 Modelle unverändert auf HOLD.

## 8. Live-Nachrecherche — Produkt- und AutoPay-Benchmark 02.11.2026

**Dritter privater DE-Collective-Screen (abgrenzbar von den früheren zwei Runden):** Drei konkret getrennte Kategorien (neutrale gerippte Damen-Tanktops, langärmelige fitted Tops, schwarze Minikleider) sowie **eine zulässige** breitere Korrektursuche nach Damen-Basics ergaben **keinen einzigen** wirtschaftlich freigabefähigen Kandidaten. Über alle neuen vier Abfragen lag die **maximale angezeigte nominelle Supplier-Marge bei 30 %**; keine neue Supplier-Auswahl, kein Shelf/Import. Ein Händler-Vorpreis von nur 30 % gegenüber dem jeweiligen Supplier-Retailpreis kann unter den oben dokumentierten 30%-Nachsteuer-Gates nicht genügen. Zur Beurteilung einer konkreten Artikelmarge wären dennoch die individuellen Einkaufspreise, Steuer-/Versandprofile und die Abweichung zwischen Supplier-Retail und EVERNE-P nötig. Der verbundene EVERNE-Shop ist weiterhin als **Deutschland / EUR / Basic** read-only bestätigt. Bestehende Ausschlussgründe (DE/DE-Collective-AutoPay-Eignung nicht freigeprüft) bleiben.

**Tapstitch:** Offizielle Hilfe vom 07.10.2026 bestätigt zwei **getrennte** Schalter: automatische bezahlte Shopify-Ordersynchronisation und **Auto Order Submission** (stündlicher Lauf oder festgelegte Uhrzeit). In Kombination mit **Auto Payments** belastet Tapstitch ohne ausreichend Wallet-Guthaben die hinterlegte Kredit-/Debitkarte automatisch; bei Kartenfehler bleibt die Bestellung stehen. Technisch bedeutet das ein potenzielles YES ohne Pflicht-Prepaid-Wallet; **nicht** aber, dass eine Karte oder automatische Einreichung in EVERNE bereits aktiviert wäre. Die echte Damen-Ware `WT0196-C001-V2` (`Women's Crewneck Tank Top`) kostet öffentlich **5,99 USD** und besteht aus **92 % Baumwolle / 8 % Elasthan**, ist aber nur ein **Stilprüf-Kandidat** für das 34-€-Konzept `Everyday Tank`: **keine verbindlichen Chalk-/Oat-Größen-/Produktfoto- und DE-Checkout-Nachweise**. Lieferant nennt Versandpreise vom konkreten Warenkorb abhängig und kündigt **ab 03.11.2026 neue EU-Handlings-/Frachtanpassungen** an. Weder Produkt- noch Zoll-/Steuer-All-in noch Nachsteuer-Freigabe. Der öffentliche Versandratgeber beschreibt eine grundsätzlich DDP-orientierte Dienstleistung, schränkt aber für bestimmte internationale Remote-Adressen weitere Gebühren ein. Das genügt für deutsche Endkunden nicht als verbindlicher Nachweis.

**Trendsi-Stressprüfung:** Ein als „Ribbed Mock Neck Sleeveless Tank Top“ gelistetes schwarzes Modell kostet **6,66 USD + 1,99 USD** für auf der deutschen Ansicht angezeigten Versand, Material **100 % Polyester**, und hat einen **Cutout/Mock-Neck-Schnitt**. Damit ist es trotz optisch verwandter Bezeichnung **kein sauberer neutraler EVERNE Everyday Tank/Rib Top**. Auch bei Warenpreisen solcher Größenordnung können Import-VAT, Juli-Zoll und saisonaler Zuschlag die enge 34-€-All-in-Obergrenze von **11,30 €** übersteigen. Die vorhandene `Second Skin Body`-Trendsi-Shortlist bleibt unter EUSt-Stresstest ökonomisch unter 30 % und nicht freigabefähig. **Keine** neue passende 20er-SKU.

Offizielle Primärquellen: [Tapstitch Auto Submission](https://www.tapstitch.com/help-center/faq/detail/How-to-set-up-Auto-Order-Submission), [Tapstitch Auto Payments](https://www.tapstitch.com/help-center/faq/detail/How-to-set-up-auto-payments), [Tapstitch WT0196](https://www.tapstitch.com/custom/1516838565127065600), [Tapstitch EU-Anpassung ab 03.11.](https://www.tapstitch.com/help-center/notifications/detail/Shipping-Fee-Adjustment-for-EU-Orders-Nov), [Tapstitch Versandrechner/DDP-Hinweise](https://www.tapstitch.com/shipping), [Trendsi Mock-Neck Tank](https://www.trendsi.com/products/detail?id=211208&name=Ribbed+Mock+Neck+Sleeveless+Tank+Top&skuId=1492175).

**Entscheid:** **0/20 GO**, aber `WT0196` bleibt für eine **rein lesende** zukünftige finale DE-Quote bei Lieferanten-Checkout priorisiert; diese muss nach dem **03.11.-Tarifwechsel** die exakte Farb-/Größenvariante, DDP, deutschen Checkout-Gesamtpreis, Lieferanten-/Importsteuer und Rücknahmebedingungen ausweisen. Bis dahin keine App-Installation, Kartenhinterlegung, Bestellung, Zahlung oder Aktivierung.
