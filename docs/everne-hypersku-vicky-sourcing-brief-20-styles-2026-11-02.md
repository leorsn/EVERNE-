# EVERNE — vorläufiges HyperSKU-Sourcing-Briefing (Vicky) / 20 Style-RFQ · 02.11.2026

**Nur interner, unversendeter Arbeitsentwurf.** Leonid hat auf WhatsApp bei einer sich als „HyperSKU Vicky“ vorstellenden Person **2** für „no orders now / need product sourcing“ gewählt. **Auf Antwort warten; kein Schreiben, keine Datenübermittlung, Zahlung, Konto- oder Shopänderung durch die Recherche.** Profil und +852-Nummer sind nicht offiziell authentifiziert; Vicky wird in HyperSKU-Bewertungen erwähnt, was keine Rufnummerverifikation ersetzt. Vor Kommunikation sensibler Daten den Kontakt **über den bestehenden offiziellen In-App-Support bestätigen**.

## Entscheidungskern

EVERNE ist ein **deutscher Kleinunternehmer-Shop in EUR (Shopify Basic)**, der 20 noch **nicht** authentisch beschaffte, redaktionell angelegte Damenmode-Konzepte (keine Schuhe) plant. Marke: hochwertig, dunkel, minimalistisch, moderne „quiet luxury“ / restrained ready-to-wear, keine auffälligen Print-on-Demand-Motive, keine verkleidungsartigen/out-of-style Artikel. Editorial-Farbwörter sind **visuelle Richtungen und keine Hersteller-Farbcodes**:
- chalk = gebrochenes Weiß / helle Kreide
- ink = Tiefschwarz bis Soft Black
- stone = kühles Stein-/Greige
- oat = warmes Hafer-Beige
- wine = dunkles Bordeaux
- cocoa = tiefes Kakaobraun

Verkaufspreise enden auf 4 oder 9, ohne Cent. Kein zusätzliches Monatsabo, möglichst keine Mindestabnahme. **Einzelstückversand direkt an deutsche Kunden.** Ziel: **≥30 % tatsächlich verbleibender Gewinn nach allen Kosten einschließlich Ertragsteuer**, keine bloße Bruttomarge. Endkundengesetzliche Gewährleistungs-/Widerrufsrechte bleiben bei EVERNE.

## Die 20 exakten EVERNE-Entwürfe und rechnerische Kostengrenzen

Grundlage: `src/womenswearCatalog.ts` aus Repository `leorsn/EVERNE-`. Keine Produktänderung, keine Preisänderung. Jedes Maximum ist für die **vollständige, von EVERNE tatsächlich zu tragende Supplier-Rechnung pro einzelner Kundenbestellung** inklusive **Ware + Transport bis Endkunde DE + nicht abzugsfähiger USt/Einfuhr-USt + Zoll + EU-Einfuhrgebühren + Dienstleistungs-/Paymentgebühren auf Supplier-Seite**.

Modellannahmen für erste Negativauslese: Kunde zahlt nur Artikelpreis (kein separat erhobenes Versandgeld); Shopify-Zahlung `2,5 % + 0,25 €` hypothetisch; Retouren-/Reklamationsreserve `5 € je Order` **nicht real validiert**, bei China-Ware möglicherweise deutlich zu niedrig; laufende Betriebskosten `3 € je Order` hypothetisch. **Vor Einkommensteuer:** max. Supplier-All-in `0,675 × Endpreis − 8,25 €`. **25-%-Ertragsteuer-Sensitivität, nur illustrativ:** `0,575 × Endpreis − 8,25 €`; das ist **nicht** der persönliche Grenzsteuersatz oder eine reale Profitzusicherung. Euro-Schranken konservativ auf Cent **abgerundet**. Niedrigere Supplier-Preise wären lediglich eine notwendige Bedingung; Retouren, Steuermodell, Fixkosten und Echteinkäufe müssen noch belegt werden.

| # | Priorität | EVERNE-Bezeichnung | Kategorie | Farbton | Ziel-VK | Max. Supplier-All-in für 30 % **vor** ESt | Max. Supplier-All-in für 30 % **nach** beispielhaften 25 % ESt |
|---:|---|---|---|---|---:|---:|---:|
| 01 | **P1** | Essential Rib Top | Tops | chalk | 34 € | 14,70 € | 11,30 € |
| 02 | **P1** | Second Skin Body | Tops | ink | 39 € | 18,07 € | 14,17 € |
| 03 | P2 | Soft Line Longsleeve | Tops | stone | 39 € | 18,07 € | 14,17 € |
| 04 | P2 | Everyday Tank | Tops | oat | 34 € | 14,70 € | 11,30 € |
| 05 | P2 | Fine Knit Top | Tops | wine | 39 € | 18,07 € | 14,17 € |
| 06 | P2 | Relaxed Crew Knit | Knitwear | oat | 49 € | 24,82 € | 19,92 € |
| 07 | P2 | Wrap Knit Cardigan | Knitwear | cocoa | 54 € | 28,20 € | 22,80 € |
| 08 | P2 | Ribbed Turtleneck | Knitwear | ink | 44 € | 21,45 € | 17,05 € |
| 09 | **P1** | Soft V-Neck | Knitwear | chalk | 49 € | 24,82 € | 19,92 € |
| 10 | P2 | Off-Shoulder Knit | Knitwear | wine | 59 € | 31,57 € | 25,67 € |
| 11 | P2 | Wide Leg Trouser | Trousers / Denim | stone | 54 € | 28,20 € | 22,80 € |
| 12 | P2 | Straight Leg Denim | Trousers / Denim | ink | 59 € | 31,57 € | 25,67 € |
| 13 | **P1** | Tailored Everyday Pant | Trousers / Denim | cocoa | 59 € | 31,57 € | 25,67 € |
| 14 | P2 | Relaxed Denim | Trousers / Denim | oat | 54 € | 28,20 € | 22,80 € |
| 15 | P2 | The Black Mini | Dresses | ink | 49 € | 24,82 € | 19,92 € |
| 16 | P2 | Soft Midi Dress | Dresses | stone | 59 € | 31,57 € | 25,67 € |
| 17 | P2 | Easy Slip Dress | Dresses | wine | 44 € | 21,45 € | 17,05 € |
| 18 | **P1** | Fluid Midi Skirt | Skirts | cocoa | 44 € | 21,45 € | 17,05 € |
| 19 | P2 | Tailored Mini Skirt | Skirts | chalk | 39 € | 18,07 € | 14,17 € |
| 20 | P2 | Denim Midi Skirt | Skirts | oat | 54 € | 28,20 € | 22,80 € |

**Batch-Strategie:** Zuerst die fünf **P1**-Stile (Rib Top, Body, Tailored Pant, Soft V-Neck, Fluid Midi Skirt) mit identischen Schnitt- und Farbmustern screenen. **Nicht** ersetzen durch Sport-BH statt Body, Jersey-T-Shirt statt Strick, Lounge-Jogger statt Tailored Pants, Kostüm- oder florale Druckware statt Minimal-Basics. Erst wenn P1 realistische Chancen hat, P2. Jede SKU einzeln bewerten; kein Mix aus sehr billigen und teuren Artikeln zu einem künstlich profitablen Durchschnitt.

## Strikter Supplier-RFQ-Antwortstandard (je SKU und je Variante)

1. **Artikelidentität:** tatsächlicher Hersteller, Supplier SKU, Materialanteile, Fotos des **wirklichen** Artikels (nicht KI/Mockup), Schnitt, Größe/Größentabelle, Farben, Hersteller- und Herkunftsland, Marken-/Foto-Nutzungsrechte, GPSR-/Textilkennzeichnung und EAN/GTIN falls vorhanden.
2. **Verfügbarkeit:** Echtbestand je Größe/Farbe mit Aktualisierungsfrequenz; Single-piece-Dropship ohne MOQ; Preisbindung und Storno bei Stockout.
3. **Gesamtpreis an DE-Endkundenadresse:** Retailer-EK in EUR **einschließlich USt-/EinfuhrUSt-/IOSS-Behandlung**, Importabgaben, **3-€-Zoll-** und **2-€-Union-Handling-fee** nur soweit für die **konkrete Route/SKU** anwendbar, Supplier-Abwicklungsgebühr, B2B-Zahlungsgebühr, Tracking, Versand. Echte **DDP-Gesamtzahlung** an EVERNE oder verbindlicher EU-Inlandsversand; keine späteren Überraschungskosten beim Käufer. Separate Zeilen je Position und **kostenpflichtige Zahlungsart** angeben.
4. **Zeit bis Kundenankunft:** konkrete Route Lager→DE, Bearbeitungs- und Carrierzeit, Trackingfrequenz, eventuelle Zustellgebietszuschläge, **ein Artikel** vs. konsolidierter Mehrartikel-Warenkorb. Ausdrücklich klären, ob ein EU-Lager **ohne Vorabbevorratung** möglich ist; HyperSKU beschreibt EU-/Overseas-Warehouses als selektives Volumenmodell, nicht Standard für Einsteiger.
5. **Automatisierung:** Shopify-Paid-Order automatisch anlegen, **Supplier-Rechnung automatisch aus gespeicherter Karte/Lastschrift abbuchen** statt manuellem `Pay Together` oder manuellem Wallet-Top-Up; Ausnahmen dokumentieren (Saldo, Betrug, fehlende Adresse, Inventar), Tracking zurück ins Shopify-System. Falls nicht möglich: **NO-GO für geforderte End-to-End-Hands-free-Automatisierung**, selbst bei guter Ware.
6. **Rückgabe/Reklamation:** konkreter DE-Kunden-Rückgabeort, Normalwiderruf/falsche Größe (auch nicht defekt), Wer trägt Rückporto und Warenwert?, Zeitlimit, Foto-Pflichten, Erstattungs-/Ersatzteil-Workflow, Vertragspartner. HyperSKU-ToS sagen ausdrücklich **keine Rücknahme bei China-Warehouse-Orders**; Hilfeseite nennt teils 7 Tage und ToS teils 5 Tage für After-Sales-Reklamation. Kein stillschweigendes B2B-Refundversprechen.
7. **Qualität & Muster:** QC-Prüfkriterien, Chargenkonstanz, Nähte/Material/Gebrauchstauglichkeit, echte Sample-Kosten und Zoll-/Porto-Kosten, Samples nur nach gesonderter Freigabe. Optionales Branding erst nach Prüfung der dafür nötigen Mengen-/Kostenstaffeln.
8. **Vertrauen:** Unternehmensbezeichnung auf Rechnung und unabhängige Verifizierung der Kontaktperson; **keine Zahlungsdaten/Shop-Admin-Zugangsdaten per WhatsApp**.

## Vorbereitete englische Fragen an Vicky (NICHT VERSENDET)

> Hello Vicky, thanks for reaching out. We are currently sourcing products for EVERNE, a Germany-based Shopify womenswear brand; we don't have orders to fulfill yet. We have 20 specific minimalist ready-to-wear concepts (no footwear), with five priority styles to source first. Do you support single-item dropshipping to customers in Germany without a minimum order quantity, additional monthly subscription, or upfront inventory purchase?
>
> Could you provide real manufacturer SKUs and item photos, full EUR landed DDP price per single unit including all shipping, VAT, customs duties, EU handling fees and any payment/processing fees, live variants/stock, delivery times, and your return process for buyer remorse or incorrect size? We are a German small-business VAT-exempt retailer without input-VAT deduction.
>
> Please also confirm whether Shopify orders **and your supplier charges** can be fully automated without manually selecting or paying each order or pre-funding a wallet. If auto-payment is not available, please state so explicitly. We can share a five-style reference list and strict total-cost limits after confirming the account contact through HyperSKU's official support channel. No purchase or paid service is authorized at this stage.

*Der Text ist ein interner möglicher Entwurf, keine beauftragte oder versendete Kommunikation.* Wenn die gewünschten Artikel **auf Basis von Referenzfotos** gesucht werden, sicherstellen, dass tatsächliche Markenkatalogbilder dem Anbieter nur im nötigen Umfang mit korrekten Nutzungsrechten vorgelegt werden.

## Technische und rechtliche Recherchebelege (Originalquellen)

- HyperSKU 3 kostenlose Sourcing-Requests täglich für neue Nutzer; Quote i. d. R. in 2 Werktagen; Single-SKU-B2B-Preis & DE-Porto pro Quote: https://support.hypersku.com/en/articles/3161590-how-can-i-submit-a-sourcing-request-and-get-a-quote-on-hypersku
- HyperSKU manual `Pending Payment` → `Pay Together` → Zahlung → Fulfillment (keine verifizierte normale AutoPay-Funktion): https://support.hypersku.com/en/articles/2941706-fulfill-order-once-make-a-sale
- HyperSKU Zahlungsgebühren (Reevol 1 % bei Zahlungen ab 20 USD, 3 % darunter; Wallet 0 %, aber USD-Top-Up): https://support.hypersku.com/en/articles/3161658-payment-methods-we-accept
- HyperSKU EU-Lager nur ausgewählte/volumenabhängige Fälle: https://support.hypersku.com/en/overseas-warehousing
- HyperSKU normale B2B-China-Lager-Rücknahmen ausgeschlossen: https://www.hypersku.com/terms-of-service/
- HyperSKU After-Sales (u. a. 7 Tage bei Schäden) und ToS teils 5 Tage: https://support.hypersku.com/en/articles/6765770-hypersku-aftersales-policy-can-i-refund-reship-or-return-hypersku-orders
- HyperSKU erneute EU-Abfertigungsgebühr 2 € je deklariertem Artikel laut Anbieter seit 26.10.2026, Zoll separat: https://support.hypersku.com/en/articles/8154328-latest-shipping-adjustment
- EU-Kommission €3 Kleinwaren-Zoll seit Juli 2026 & Union Handling Fee €2 ab 01.11.2026, Anwendbarkeit nach Warenart/Route zu überprüfen: https://taxation-customs.ec.europa.eu/customs/eu-customs-reform_en
- Deutsches Verbraucherrecht: https://www.gesetze-im-internet.de/bgb/__312g.html und https://www.gesetze-im-internet.de/bgb/__355.html
- HyperSKU Custom Apparel ist **Techpack/Sample/Mass Production**, nicht automatisch MOQ-freies Standard-Fashion-Dropship: https://support.hypersku.com/en/hypersku-product-line-workflow

## Status für Rückmeldung

**Warten auf Vicky; keine externe Aktion.** Nach ihrer Antwort in WhatsApp ist das neue Originalangebot gegen diese Liste zu prüfen. Fortschrittsmaßstab **nicht** „20 gefunden“, sondern **20 konkret verifizierte supplier SKUs**, zuerst 5 P1; aktuell weiterhin **0/20 freigegebene verkaufbare SKUs**.
