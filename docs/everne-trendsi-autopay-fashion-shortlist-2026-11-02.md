# EVERNE — Trendsi: AutoPay, Deutschlandversand und echte Fashion-SKU-Shortlist (02.11.2026)

**Status: internes Supplier-/SKU-Screening; 0/20 Artikel freigegeben.** Dies ist weder eine Produktfreigabe noch eine verifizierte End-to-End-Testbestellung. Kein Supplier-Account, keine App-Installation, keine Kartenhinterlegung, keine Bestellung, kein Import oder Live-Listing autorisiert/ausgeführt. Die 20 Konzepte in `src/womenswearCatalog.ts` und alle bestehenden Shopify-DRAFT-Artikel bleiben unverändert.

## Nachtrag: EU-Steuer-, Zoll- und Kennzeichnungsscreen (02.11.2026)

**Verschärfter Befund:** Auf den öffentlich zugänglichen Trendsi-Hilfe-/Produktseiten wurde **kein verbindlicher Nachweis einer Deutschland-DDP-Lieferung, einer IOSS-Abwicklung, des konkreten Importeurs oder der Übernahme von Einfuhr-USt/Zoll durch Trendsi** gefunden. „Shipping to Germany“ ist **kein** DDP-Nachweis. Dies ist kein Beweis, dass Trendsi niemals DDP liefern kann, aber unter EVERNEs striktem Gate ist es ein **BLOCKER**.

Amtliche/primäre Unterlagen:
- Shopify legt bei Dropshipping von außerhalb der EU die **möglichen abweichenden Umsatzsteuerpflichten** dar und weist darauf hin, dass ohne IOSS die Kund:innen bei Übergabe mit VAT/Zoll belastet werden könnten; die neue EU-Zollpauschale beträgt seit 01.07.2026 **3 € pro HS-Tarifklassifikation**, nicht pauschal pro Paket. https://help.shopify.com/de/manual/compliance/legal/dropshipping und https://help.shopify.com/de/manual/taxes/eu/eu-tax-migrate
- Deutsche Post/DHL: bei Zolleinzug durch den Paketdienst zusätzlich **7,50 € Auslagenpauschale** möglich, **nicht** zwingend bei DDP/IOSS. https://www.dhl.de/en/privatkunden/hilfe-kundenservice/themen/international/zoll/fragen-zu-kosten.html
- DPD: Einfuhr-USt-Bemessung grundsätzlich Warenpreis **zuzüglich Zoll und Beförderung/Provision/Versicherung** bis zum Bestimmungsort. https://www.dpd.com/de/de/faq/wie-wird-die-einfuhrumsatzsteuer-berechnet/
- Trendsi: die **Mehrheit der Overseas-White-Label-Artikel** soll laut eigener Hilfe nur generische **Größen- und Pflegeetiketten** haben. Das beweist keine deutschsprachige dauerhafte Faserzusammensetzungskennzeichnung. https://help.trendsi.com/hc/en-us/articles/8678486982939-Product-Brands-Suppliers-and-Sizing
- EU-TextilVO 1007/2011 verlangt korrekte dauerhafte **Faserkennzeichnung**, für den deutschen Verbrauchermarkt in der vorgegebenen Sprache. https://europa.eu/youreurope/business/product-rules-compliance/textiles-and-footwear/textile-label/index_en.htm und https://eur-lex.europa.eu/eli/reg/2011/1007/oj/eng
- GPSR Art. 19 verlangt im **Online-Angebot** Herstellername **und Post-/E-Mail-Adresse**; außerhalb der EU zusätzlich eine benannte, erreichbare **verantwortliche Person in der EU**. Ein Marken-Displayname allein genügt nicht. https://eur-lex.europa.eu/legal-content/DE-EN/TXT/?from=EN&uri=CELEX%3A32023R0988

### Strengerer Einzelpaket-Stresstest, wenn auch 19 % Einfuhr-USt tatsächlich zusätzlich anfällt

Die 19 % werden **nur als Sensitivität** auf `(Ware + DE-Porto + 1,50 USD Saisonzuschlag) × 0,8924 + 3 EUR Zoll` angesetzt. Das ist keine verbindliche Steuerbemessung, keine Verifikation des tatsächlichen Warenwerts und bei im Supplier-Preis enthaltenen Steuern **nicht nochmals zu addieren**. Daneben gilt weiterhin die rein illustrative **25 % persönliche Einkommensteuer auf den Rechengewinn**.

| Produkt | EUR vor 19 % EUSt im Stressfall | + illustr. 19 % EUSt | Modell-Deckungsbetrag nach 25 % Ertragsteuer | Modellmarge auf EVERNE-Preis | 30%-Ziel erreicht? | Falls zusätzlich 7,50 € Post-Auslage |
|---|---:|---:|---:|---:|---|---:|
| Black Mini / She Wild Halter, VK 49 € | 17,33 | **20,63 €** | 14,17 € | **28,9 %** | **NEIN** | Supplier-All-in ca. 28,13 € |
| Second Skin Body / Perfee, VK 39 € | 13,88 | **16,52 €** | 9,94 € | **25,5 %** | **NEIN** | ca. 24,02 € |
| Black Mini / Real Sara Halter, VK 49 € | 18,35 | **21,84 €** | 13,27 € | **27,1 %** | **NEIN** | ca. 29,34 € |

Unter diesem plausiblen Einfuhr-Szenario verfehlen **alle drei** getesteten stilnahen Kandidaten die zuvor nur knapp erfüllte Modellvorgabe. Bei einer Retourenreserve von **10 € statt 5 €** sinkt die nachsteuerliche zulässige All-in-Lieferantenkostengrenze für das 49-€-Kleid auf **14,92 €**, für den 39-€-Body auf **9,17 €**; auch ohne separate EUSt erreicht keiner das konservative Ziel im Zoll-/Saisonstresstest.

**Deshalb vorläufig kein Realgewinn-PASS, keine Produktfreigabe.** Selbst ein künftig bestätigter inklusiver DDP-Preis löst die Textil-/GPSR-Pflichten und das wirtschaftlich ungedeckte DE-Retourenrisiko **nicht** automatisch.

**Neue Drittanbieter-Gegenprobe:** Chance2Brand dokumentiert kostenlose Shopify-Saved-Card-Autopay aus einem deutschen Lager, bietet jedoch **Nahrungsergänzungsmittel und keine Damenmode** (PRODUCT-NO-GO); Shewin führt Shopify-Orders laut eigener Anleitung erst nach **manuellem Zahlungsschritt in der App** aus (AUTOPAY-NO-GO). Quellen: https://www.chancetobrand.de/en/pages/documentation und https://www.shewin.com/New-User-Guide-for-Dropshipping-i42895.html

**Billig-SKU-Gegenprobe:** In der öffentlichen Trendsi-Bodysuit-Kategorie tauchen rabattierte „Zenana Microfiber Notched Sleeveless Bodysuit“-Varianten mit **5,87–6,00 USD** auf. Die geöffneten Detailseiten markieren diese SKU aber als **Shipping to United States / Shipping From USA**, nicht als für Deutschland freigegeben, und zeigen nur **2 bzw. 10 Stück** an. Sie dürfen deshalb **nicht** als billigere DE-Alternative für EVERNEs Body mitgerechnet werden. Primärquelle: https://www.trendsi.com/products/detail?id=71015&name=Zenana+Microfiber+Notched+Sleeveless+Bodysuit&skuId=579636 und https://www.trendsi.com/products/detail?id=71017&name=Zenana+Microfiber+Notched+Sleeveless+Bodysuit&skuId=579643 . Zusätzlich bezeichnet die offizielle Trendsi-Produktseitenhilfe den angezeigten Versandpreis ausdrücklich als **ungefähre Gewichtsabschätzung**; finale Order-Gesamtrechnung fehlt weiterhin: https://help.trendsi.com/hc/en-us/articles/8337026321947-Product-Detail-Page .

## 1. Weshalb Trendsi neu auf die technische Shortlist kommt

- **Zahlung:** Die offizielle Anleitung „Customer Orders – Auto Checkout“ beschreibt bezahlte Shopify-Bestellungen, Synchronisation zu Trendsi und den opt-in-Schalter „Auto Checkout“ unter Account → Settings → Order Management. **Werkseinstellung ist manuelle Zahlung**; der Schalter ist im EVERNE-Konto nicht nachweislich aktiv. Quelle: https://help.trendsi.com/hc/en-us/articles/8784088667291-Customer-Orders-Auto-Checkout
- **Kein zwingendes vorfinanziertes Wallet:** Laut „Trendsi Wallet“ wird bei aktivem Auto Checkout die **hinterlegte Standard-Kreditkarte** verwendet, wenn Wallet-Guthaben nicht reicht. Wallet ist somit nicht als zwingende Vorabaufladung für den dokumentierten AutoPay-Pfad anzusetzen; eine belastbare Karten-Testtransaktion wurde nicht durchgeführt. Quelle: https://help.trendsi.com/hc/en-us/articles/17119651362715-Trendsi-Wallet
- **Tarif:** Shopify App Store: Free bis 500 Listings, unbegrenzte Orderabwicklung; Pro 29,90 USD/Monat ist optional. Produkt-, Porto- und ggf. externe Kosten fallen pro Bestellung an; Free bedeutet nicht kostenloses Fulfillment. Quelle: https://apps.shopify.com/trendsi
- **Deutschland:** offizieller DE-Dropship-Portotarif bis 0,6 lb 1,99 USD; bis 1 lb 3,99 USD; bis 5 lb 7,99 USD; über 5 lb 12,99 USD. 8–14 Werktage laut Tarif, einzelne öffentlichen Produktseiten derzeit 11–14 Werktage. Bei Saisonspitzen gewöhnlich Oktober–Januar **möglicher Aufschlag bis 1,50 USD pro Sendung**. Quellen: https://help.trendsi.com/hc/en-us/articles/8678195060123-Shipping-Information und https://help.trendsi.com/hc/en-us/articles/30553089548059-Shipping-Surcharge-Information
- **Deutsche Händler:** Trendsi fordert für Nicht-US-Händler Nachweis der Geschäftstätigkeit (z. B. Gewerberegistrierung bzw. steuerliche Registrierungsnachweise). Annahme des konkreten EVERNE-Kleinunternehmerprofils nicht überprüft. Quelle: https://help.trendsi.com/hc/en-us/articles/8278482313243-Seller-Requirements

**Technikstatus:** `TECH-DOC-PASS / ACCOUNT-NOT-VERIFIED`. Ein dokumentierter Saved-Card-Pfad besteht ohne neues Pflichtabo oder Wallet-Prefund. Dies ist noch **kein** Beweis, dass er mit einem deutschen Händlerkonto, der tatsächlichen Zahlungsart und konkreten Orders fehlerfrei läuft.

## 2. Unveränderte EVERNE-Liste: echte Lieferantenprodukte und Screening

Alle URL-Einträge sind öffentlicher, für `Germany` betrachteter Dropship-Artikel, keine importierten EVERNE-SKUs. Bestand ist **momentanes SKU-seitiges Anzeige-Signal**, nicht gesicherter Größen-/Farb-Vollbestand. Preise USD, keine Zusage für Endpreis am Bestelltag.

| EVERNE-Konzept | Trendsi-Produkt / Hersteller | Farbe / Material | Ware / DE-Porto (USD) | Angez. Bestand | Ergebnis |
|---|---|---|---|---:|---|
| **The Black Mini, Ink, 49 €** | [Halter Neck Mini Dress, She Wild](https://www.trendsi.com/products/detail?id=406872&name=Halter+Neck+Mini+Dress&skuId=2792730), Style 10100103590 | Black; 100 % Polyester; haltergebunden, ungefüttert | 12,57 / 1,99 | 20 | **P1+ Stoff-/Fit-HOLD**: schwarzes Minikleid plausibel; Qualität, Länge, VAT/DDP und Retouren ungeklärt |
| **Second Skin Body, Ink, 39 €** | [Scoop Neck Spaghetti Strap Bodysuit, Perfee](https://www.trendsi.com/products/detail?id=178576&name=Scoop+Neck+Spaghetti+Strap+Bodysuit&skuId=1263522), Style 10010099569 | Black; 95 % Polyester, 5 % Elastan; dünne Träger | 8,70 / 1,99 | 25 | **P1+ Fit-/Profit-HOLD**: Body-Typ/Kolorierung passt bedingt; geringe Nettomargenreserve, Body-Retouren |
| **The Black Mini, Ink, 49 €** | [Halter Neck Sleeveless Mini Dress, Real Sara](https://www.trendsi.com/products/detail?id=384869), Style 10010022015 | Black; 95 % Polyester, 5 % Spandex; rückenfrei | 11,71 / 3,99 | 14 | **P2**: Alternative, eher auffälliger Rücken / niedriger Bestand |
| **Soft V-Neck, Chalk, 49 €** | [V-Neck Cap Sleeve Tank, Summer Dora](https://www.trendsi.com/products/detail?id=73205&name=V-Neck+Cap+Sleeve+Tank&skuId=601152), Style 10010087841 | Beige; 65 % Rayon, 30 % Polyester, 5 % Spandex; ca. 65–69 cm Länge | 11,74 / 1,99 | 150 | **STYLE-NO-GO fürs bestehende SKU**: Jersey-Top mit Kappenärmeln, **kein** Chalk-Strick-V-Neck; allenfalls neues Konzept nach Freigabe |
| **Soft Midi Dress, Stone, 59 €** | [Surplice Tie Waist Long Sleeve Midi Dress, Sara Roman](https://www.trendsi.com/products/detail?id=133462), Style 10010079592 | Gray; 95 % Polyester, 5 % Spandex, Wickel-/Bindeschnitt | 15,62 / **7,99** | 18 | **STYLE-/PROFIT-HOLD**: Stone/Gray nicht 1:1; externe Suchauszüge zeigen „Free Shipping“, aber **direkte Deutschlandseite sagt 7,99 USD** |
| **Fluid Midi Skirt, Cocoa, 44 €** | [Satin Midi Skirt, Belle Rive](https://www.trendsi.com/products/detail?id=261469&name=Satin+Midi+Skirt&skuId=2152242), Style 10010071269 | Brown; 100 % Polyester, Drawstring, ungefüttert | 18,58 / 3,99 | 19 | **PROFIT-NO-GO** schon im konservativen Zoll-/Zuschlagsfall vor Einkommensteuer |
| **Tailored Everyday Pant, Cocoa, 59 €** | [Tie-Waist Wide Leg Pants, Rogue Theory](https://www.trendsi.com/products/detail?id=390345&name=Tie-Waist+Wide+Leg+Pants&skuId=2576999), Style 10010048652 | Dark Brown; 100 % Polyester, Kordelzug/Schlitz | 18,55 / 7,99 | 20 | **STYLE-NO-GO**: nicht zugeschnitten/tailliert; nachsteuerlicher Stresstest über Kostengrenze |
| **Essential Rib Top, Chalk, 34 €** | [Ribbed Round Neck Tank, LA Miere](https://www.trendsi.com/products/detail?id=188226&name=Ribbed+Round+Neck+Tank&skuId=1317140), Style 10010067224 | **Burnt Coral statt Chalk**, 95 % Rayon, 5 % Spandex, **Toplänge nur 34–38 cm** | 8,01 / 1,99 | 18 | **STYLE-NO-GO**: Farbe und stark verkürzter Schnitt |
| **Second Skin Body, Ink, 39 €** | [Full Size Scoop Neck Long Sleeve Bodysuit, R.T.S.C](https://www.trendsi.com/products/detail?id=108033&showProductType=dropship&skuId=752243), Style 10010066831 | Black; ungewöhnliche Materialangabe **65 % Polyester, 35 % Elastan** | 11,62 / 1,99 | 24 | **QA-/PROFIT-HOLD**: Stoffangabe verifizieren; teurer als Perfee |

**Vorläufiger Stilrang:** Halter Neck Mini Dress und Perfee Scoop Neck Bodysuit **zuerst** vertieft untersuchen. Die Tabelle listet keine „verkaufsfähigen“ Produkte im juristischen/kaufmännischen Sinn. Das Marketingbild darf nicht mehr behaupten als die Lieferantenspezifikation zeigt.

## 3. Konservativer Geldtest, ohne Schein-Netto-Garantie

Berechnungsannahmen aus EVERNEs bisherigem Screening, **nicht** als individuelle Steuerberechnung: 1 USD ≈ 0,8924 EUR Referenzkurs; keine eigene Versandgebühr beim Kunden; Zahlungsgebühr 2,5 % des EVERNE-Preises + 0,25 €; Retourenreserve **nur** 5,00 €/Order (für nicht refundierbare DE-Retouren vermutlich zu niedrig); 3,00 € zurechenbare Betriebskosten. Mindestziel: 30 % tatsächlicher Gewinn nach Kosten und **auch persönlicher Ertragsteuer**, deren echter Satz unbekannt ist. Zu Vergleichszwecken die frühere **25-%-ESt-Sensitivität** auf Gewinn vor ESt, was eine 40-%-Marge vor ESt verlangt.

**Neue EU-Regel:** Seit 01.07.2026 gilt in der Regel ein temporärer **3-€-Zoll je tariflicher Warenposition in einem Niedrigwertpaket bis 150 €** aus Nicht-EU-Ländern; das ist **nicht** pauschal 3 € pro physischem Kleidungsstück, und kann bei bereits DDP-verzollter Ware im Supplier-Endpreis enthalten sein. Die Kommission verlangt seit 01.11.2026 Produktidentifikatoren für entsprechende Einfuhrdeklarationen. Die Zoll-Schuld trifft grundsätzlich den deklarierenden Unternehmer/Importeur; tatsächlicher Lieferweg, IOSS, VAT, DDP und Kostenträger bei Trendsi sind **nicht nachgewiesen**. Quelle: https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en

**Stressformel je Ein-Artikelsendung:** `(Trendsi-Ware + ausgewiesenes DE-Porto + 1,50 USD saisonaler Aufschlag) × 0,8924 EUR/USD + 3,00 EUR möglicher Zoll`. Der 3-€-Zoll ist **nur ein zusätzliches Szenario**; falls bereits enthalten, nicht nochmals addieren. **Einfuhrumsatzsteuer, Broker-/Carrier-Gebühren, Wechselgebühren und tatsächliche Retourenmehrkosten sind darin noch NICHT enthalten.**

| EVERNE-Konzept / Kandidat | Preis € | Ware + DE-Porto, in € vor Zuschlägen | Stress-Landed € (zzgl. Import-VAT etc.) | Max Supplier-All-in 30 % **vor** ESt € | Max Supplier-All-in bei illustr. 25 % ESt € | Rest zur 25-%-ESt-Grenze € |
|---|---:|---:|---:|---:|---:|---:|
| Black Mini / She Wild Halter | 49 | 12,99 | **17,33** | 24,82 | 19,92 | **+2,59** |
| Second Skin Body / Perfee | 39 | 9,54 | **13,88** | 18,07 | 14,17 | **+0,30** |
| Black Mini / Real Sara Halter | 49 | 14,01 | **18,35** | 24,82 | 19,92 | **+1,58** |
| Soft V-Neck / Summer Dora (**Style-Mismatch**) | 49 | 12,25 | **16,59** | 24,82 | 19,92 | +3,33 |
| Soft Midi / Sara Roman Gray (**Style-Mismatch**) | 59 | 21,07 | **25,41** | 31,57 | 25,67 | +0,27 |
| Fluid Midi Skirt / Belle Rive Satin | 44 | 20,14 | **24,48** | 21,45 | 17,05 | **−7,43** |
| Tailored Pant / Rogue Theory (**Style-Mismatch**) | 59 | 23,68 | **28,02** | 31,57 | 25,67 | **−2,35** |
| Essential Rib Top / LA Miere (**Style-Mismatch**) | 34 | 8,92 | **13,26** | 14,70 | 11,30 | **−1,96** |

Der Preis von **49 € für ein Halter-Minikleid** ist lediglich EVERNEs Konzeptziel; ob deutsche Kundinnen diesen Preis für Qualität/Marke akzeptieren, ist **nicht validiert**. Mit fehlender Einfuhr-USt, Gebühren und realistischen Retouren kann auch der erste Kandidat die geforderte 30-%-Nettomarge **verfehlen**. Keine Marge unter realen Bedingungen bewiesen.

## 4. Harte Ausschluss-/Freigabegates

1. **Echtes AutoPay pro deutschem Merchant/Order:** Trendsi-Händlerberechtigung, Default Card, aktivierbares Auto Checkout, Shopify-paid-order-Sync, automatischer Fulfillment-/Tracking-Rücklauf, fehlende manuelle Aktionen. Kein Test mit echter Karte/Bestellung ohne Leonids explizite Freigabe.
2. **DDP/IOSS/Einfuhr-USt/3-€-Zoll:** rechtlich/vertraglich bindende **Einzelpositionen** für DE-Endkundensendungen mit Nachweis, dass der Kunde **keine unerwartete Nachnahme von Steuer, Zoll oder Carrierhandling** bezahlen muss. Zuschläge/Wechselkurse und Sonderkosten pro Paket klären.
3. **Retouren:** Offizielle Trendsi-Aussage: **keine normalen Rücknahmen für Lieferungen außerhalb der USA**. EVERNE als deutscher Händler schuldet Verbraucher:innen grundsätzlich 14-tägigen Widerruf und Mängelrechte. Reales DE-Retourenlager, Annahme-/Prüfprozess, Wiederverkaufswert, Rückporto und Verlustrechnung. Die 5-€-Reserve ist ausdrücklich **nicht belastbar**. Quellen: https://help.trendsi.com/hc/en-us/articles/29711330613531-Trendsi-Expands-Services-to-26-Countries ; https://help.trendsi.com/hc/en-us/articles/8362114469275-Trendsi-Return-Policy ; https://europa.eu/youreurope/business/selling-in-eu/consumer-contracts-guarantees/consumer-guarantees/index_de.htm
4. **Produkte & EU-Compliance:** Produktbild-/Fotorechte, genaue Länge und Maße **je Größe und Farbe**, identische Materialien, Waschkennzeichnung, Textilkennzeichnung, stabile Variante, Rückverfolgbarkeit und **GPSR**-Pflichtangaben für EU-Hersteller/verantwortliche Person. Quelle: https://eur-lex.europa.eu/eli/reg/2023/988/oj/deu
5. **Bestand / Preisstabilität:** Verbindliche DE-variantenweise Verfügbarkeit und Totalpreis vor Verkauf; `20 available` ist keine Garantie, und unbezahlte Trendsi-Orders reservieren Bestand nicht. Versand realistisch mit 11–14 Werktagen kommunizieren, falls rechtlich zulässig.
6. **Wirtschaftlichkeit:** Echte persönliche Ertragsteuer, Status Kleinunternehmer/Importeur, Liquidität bis Kundenzahlung ausgezahlt, konservative Retoure/Defektquote, Retourenfracht und Zahlungsabwicklungsgebühr. **Erst nach diesen Zahlen** 30 % nach allen Kosten bestätigen.

## 5. Entscheidung / nächster Schritt

**Technikpotenzial vorhanden, Verkauf GO weiterhin 0/20.** Die **beste erste Prüf-Reihenfolge** ist `The Black Mini / She Wild Halter` → `Second Skin Body / Perfee` → `The Black Mini / Real Sara`. Alle übrigen bleiben Style- oder Profit-HOLD/NO-GO. Bei jedem Kandidaten EU-GPSR-Verantwortlichen, DDP/Steuer/Importabwicklung und realen deutschen Retourenverlust vor Import oder Marketing zuerst klären.

**Schreib-/Kostenprotokoll:** Nur internes Dokument im bestehenden **Draft-PR-Branch**. Keine neuen Shopify-Produkte, keine Änderungen an vorhandenen DRAFTs, keine Publication, keine Apps, keine Accounts, keine Zahlungen, keine Lieferantenkontaktaufnahme, kein Werbepost.
