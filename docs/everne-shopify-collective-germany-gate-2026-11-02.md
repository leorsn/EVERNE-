# EVERNE — Shopify Collective: Deutschland- und Margen-Gate (02.11.2026)

**Status: recherchierte Option, HOLD; keine Installation, keine Anmeldung, kein Lieferantenkontakt, kein Produktimport, keine Live-Shop-Änderung.** Shopify Collective ist ein technisch aussichtsreicherer nativer Shopify-Weg als viele bisher untersuchte Großhandels-Feeds, aber **kein verifizierter EVERNE-Lieferant und keine 30-%-Gewinnfreigabe**.

## 1. Harte technische Erkenntnis

Shopify dokumentiert für `Collective` (Retailer):

- **Deutschland und EUR sind grundsätzlich unterstützt**. Die Collective-App ist ohne separate App-Grundgebühr auf einem **aktiven bezahlten Shopify-Plan** nutzbar, sofern alle Teilnahmevoraussetzungen erfüllt werden.
- **Beide verbundenen Shops müssen im selben Land ansässig sein und dieselbe Shopwährung nutzen.** Für EVERNE in Deutschland mit EUR bedeutet das: **Lieferant ebenfalls in Deutschland mit EUR**. Ein polnischer Collective-Lieferanten-Shop ist **nicht direkt mit einem deutschen Händler-Shop verbindbar**, obwohl Polen separat als unterstütztes Land aufgeführt ist.
- **Shopify Payments** muss vollständig eingerichtet sein und aktive Auszahlungen aufweisen. Auch der Lieferant braucht für automatische Zahlungen das regionale Shopify-Payments-Konto. Für EU-Händler sind Shopify Tax, Basic Tax oder eine Steuer-App erforderlich; **manuelle Steuereinrichtung ist inkompatibel**. Den Steuerregistrierungsstatus zu bestätigen ist erforderlich; eine USt-IdNr.-Verifizierung ist laut Shopify nur für Unternehmen vorgesehen, die im Heimatland zur Erhebung der USt registriert sein müssen. Ob die konkrete EVERNE-Kleinunternehmerkonfiguration erfolgreich durch das Eligibility-Gate kommt, **ist noch nicht geprüft**.
- **Shopify Network Intelligence muss eingeschaltet sein**. Das ist eine getrennt zu prüfende Datenschutz-/Konfigurationsentscheidung, keine stillschweigende Freigabe.
- Bei **automatischer Kundenzahlungserfassung** wird nach Zahlungseingang die Fulfillment-Anfrage automatisch beim Lieferanten erstellt. Der Lieferant versendet; Tracking und Versandstatus werden zum EVERNE-Shop synchronisiert. Bei manueller Zahlungserfassung wäre auch die Fulfillment-Anforderung manuell — **also kein garantiert vollautomatischer Weg bei beliebiger Shop-Einstellung**.
- **Automatische Lieferantenzahlung** ist ohne separate Collective-Zahlungsgebühr möglich, wenn beide Shops berechtigt sind; Kostenpreis und Lieferantenversand werden aus dem Shopify-Payments-Guthaben belastet. Bei fehlendem Guthaben (z. B. PayPal-Umsatz außerhalb des Shopify-Payments-Saldos) entstehen unbezahlte Lieferantenaufträge und mögliche Verzögerungen; Shopify versucht automatisch erneut.
- Lieferantentarife können im Checkout durchgereicht werden. **Nicht** jede Versandoption ist automatisiert: Wenn ein Lieferant Versand manuell berechnet, braucht es einen separaten Zahlungs-/Versandprozess.
- Retourenrichtlinien können eine Rücksendeetikett-Anfrage an den Lieferanten, Labelversand und automatische Kundenerstattung nach Lieferantenrefund auslösen. Der Lieferant muss das Etikett tatsächlich bereitstellen, kann Retouren ablehnen, und **Teilretouren können manuelle Erstattungen auslösen**. Ein 100 % betreuungsfreies Verfahren ist damit nicht nachgewiesen.

**Einordnung:** Plattform **technisch prinzipiell kompatibel**, echter produktbezogener und operativer Eignungsnachweis **fehlt**. Die nicht öffentliche Discovery-Seite enthält Lieferanten, Preislisten, typische Händlermargen und Versandzonen; ohne berechtigten Shopzugang sind die konkreten DE-Damenmode-SKUs, Einstandspreise, Größen und Konditionen **nicht seriös zu verifizieren**. Keine Einladungen/Anfragen versendet.

## 2. Kritischer Unterschied: Händlermarge ≠ tatsächlich verbleibender Gewinn

Shopify bezeichnet **20–50 % als typische Spanne** der *Brutto-Produktmarge* je Collective-Lieferant. Sie ist **kein** Gewinn nach Zahlungsgebühren, Retouren, Fixkosten, Kundenversand, Steuer oder Einkommensteuer. Ferner definiert der Lieferant die Prozentmarge bezogen auf **seinen Listenverkaufspreis**; EVERNE darf einen eigenen Verkaufspreis festlegen, aber der Lieferanten-Einstandspreis wird nicht entsprechend automatisch neu berechnet. Das folgende Modell setzt rein für den Screening-Fall **Lieferantenlistenpreis = EVERNE-Konzeptpreis** voraus.

**Modellannahmen ausschließlich für die Vorprüfung:** deutscher Kleinunternehmer, in der Rechnung berücksichtigter **tatsächlich zahlbarer Brutto-Wareneinstand** gleich `P × (1 − m)`; Zahlungsentgelt **2,5 % des gesamten Kundenumsatzes + 0,25 €**; erwartete Retouren-/Problemkosten **5 € je Bestellung**; zugerechnete Betriebs-/Plattformkosten **3 € je Bestellung**; ein Artikel pro Bestellung; keine Rabatte; kein zusätzlicher Lieferantenposten außer dem genannten Versand. Kein persönlicher Einkommensteuerabzug und keine unbekannte Beschaffungs-USt — deshalb sind die Resultate **nur notwendige Vorsteuer-/Vorertragsteuer-Screening-Schwellen**, niemals ein Beweis für 30 % nach allen Steuern.

`P` = EVERNE-Artikelpreis, `S` = vom Kunden zusätzlich bezahlter Versand, der identisch an Lieferant geht, `m` = tatsächlicher Wareneinstandsrabatt auf P.

`Modellgewinn = m × P − 0,025 × (P + S) − 0,25 − 5 − 3`

Bei einer verlangten **30-%-Gewinnquote bezogen auf die gesamte Kundenzahlung `P + S`** gilt als notwendige Marge:

`m >= 0,325 × (1 + S/P) + 8,25/P`.

| Editorial-Konzept (nicht freigegeben) | P | Mind. Brutto-Produktmarge bei S = 0 € | Mind. Marge bei S = 6,90 € voll durchgereicht |
|---|---:|---:|---:|
| Essential Rib Top | 34 € | **56,8 %** | **63,4 %** |
| Second Skin Body | 39 € | **53,7 %** | **59,4 %** |
| Tailored Everyday Pant | 59 € | **46,5 %** | **50,3 %** |
| Soft V-Neck | 49 € | **49,3 %** | **53,9 %** |
| Fluid Midi Skirt | 44 € | **51,3 %** | **56,3 %** |

**6,90 € ist ein reiner Szenariowert, kein von Collective oder einem Lieferanten angebotenes DE-Porto.** Versandweitergabe eliminiert zwar den direkten Lieferanten-Portobetrag, lässt aber zusätzliche Zahlungsgebühren auf den Versandumsatz entstehen und erhöht die Bezugsbasis für die echte 30-%-Quote. Bei eigener Gratisversand-Subvention oder tatsächlich höherem, nicht abzugsfähigem Wareneinkaufssteuerbetrag steigt die erforderliche Marge zusätzlich. **Die reale 30-%-Hürde nach Einkommensteuer liegt oberhalb dieser Zahlen**, sofern entsprechende Steuerbelastung entsteht.

**Folgerung:** Selbst bei kostenfreier Versandabwicklung der Top, des Bodys und des Rocks wären unter diesen Annahmen **mehr als 50 % Brutto-Produktmarge** erforderlich. Die typische Collective-Spanne bis 50 % genügt also für diese Preise nicht. Die Hose bei 59 € ist als einzige bei 0 € Versand unter 50 % im Modell; mit 6,90 € an den Kunden durchgereichtem Porto steigt die Schwelle schon auf 50,3 % — weiterhin **vor** Einkommensteuer und möglichen Steuereffekten beim Einkauf.

## 3. Freigabe-Gates, ohne operative Vorwegnahme

| Gate | Erforderlicher Nachweis | Status |
|---|---|---|
| Shop-Berechtigung | Aktiver Plan; DE/EUR; Shopify Payments; Tax-Konfiguration korrekt für Kleinunternehmer; erforderliche ID-/Steuerverifikation; Network Intelligence bewusst gebilligt | **Ungeprüft; keine Änderung autorisiert** |
| Geeigneter Lieferant | Shopify-Lieferant **DE/EUR**; konkrete ruhige, hochwertige Damenmode-SKUs samt Varianten; Erlaubnis zum Verkauf unter EVERNE-Editorial | **Kein Kandidat verifiziert** |
| Kein neues Abo | Keine Lieferanten-/App-Grundgebühr, über bestehenden Shopify-Kosten hinaus | **App laut Shopify kostenlos; individuelle Supplier-Konditionen unbekannt** |
| Automatik | Automatische Kundenzahlungserfassung → Supplier-Auftrag → Supplier-Zahlung → Versand/Tracking; ausreichendes Payments-Guthaben | **Plattform dokumentiert; EVERNE-/Supplier-Test offen** |
| Versand | Der Supplier bietet automatischen DE-Versandtarif; Pack-/Beileger-/Lieferschein-Branding geklärt | **Unbekannt** |
| Widerruf und Rücksendung | Praktikabler Retourenweg in Deutschland; tatsächliche Supplier-Akzeptanz und Label-/Erstattungskosten | **Unbekannt** |
| Realgewinn | SKU-genaue Brutto-Einkaufsrechnung, Porto, Payment, Retouren, Fixkosten und **konkrete Steuerwirkung**; mindestens 30 % nach allen Kosten/Abgaben | **Nicht erfüllt** |

**Entscheidung:** `SHOPIFY COLLECTIVE = HOLD / TECHNISCHE PRIORITÄT FÜR EINE SPÄTER FREIGEGEBENE SHOP-PRÜFUNG`. Keine Aufnahme der fünf Editorial-Konzepte als echte SKUs, keine Preisanpassung, keine App-Installation, keine Geschäftspartner-Kontaktaufnahme. Der frühere Hertwill-Pilot bleibt ebenfalls unfreigegeben; Collective ist nun die erste **native und app-kostenfreie Alternative für Prüfung**, nicht der gewählte Produktlieferant.

## 4. Öffentlicher Deutschland-Pre-Screen von vier Modeanbietern (keine Collective-Freigabe)

**Methodik:** Ein Shopify-Blog vom 13.10.2026 nennt allgemeine Damenmode-Großhändler und empfiehlt Shopify Collective **in einem getrennten allgemeinen Fazit**. Daraus folgt **nicht**, dass einer der genannten Großhändler tatsächlich über Collective Produkte anbietet. Ob ein Unternehmen einen für Collective berechtigten **Shop in Deutschland/EUR** betreibt, lässt sich nur anhand einer echten Lieferantenverbindung bzw. der Discovery-Daten belegen. Die folgenden eigenen Anbieterquellen sind nur ein **Negativ-/Kandidaten-Screening**, kein Lieferantenverzeichnis von Collective.

| Anbieter | Öffentlich belegtes Sortiment und Lieferweg | Konkreter Blocker für EVERNE | Status |
|---|---|---|---|
| **Christmann-Jacoby Textilien (Hamburg)** | Rund 6.000 Damenmode-Markenrestposten, Einzelstücke ohne Mindestwert; eigene Website wirbt mit neutraler **Streckenlieferung „bald verfügbar“**. FAQ: Standard-DE-Versand **7,50 € netto** je Lieferung, Händlerzahlung **Nachnahme oder Vorkasse**, Einkaufspreise **netto zzgl. USt.** | **Kein Shopify-Collective- oder automatischer Bestell-/Zahlungsprozess belegt**; Restposten kaum dauerhafte Hero-SKU-Basis. Fremdmarken-Bildrechte teils beschränkt (Heine/APART-Bilder dürfen nach FAQ nicht verändert werden; teils zusätzliche Motivvorgaben/Vertragsstrafen). Lieferweg **aktuell nicht als aktiv markiert**. | **HOLD; als späterer Sortimentsvergleich, nicht Automation** |
| **MW-Großhandel / Passion (Ilmenau)** | Deutscher Direktversand überwiegend Dessous, Nachtwäsche, Reizwäsche; **6,99 € netto** Versand bei 0–40 € Warenwert bzw. **8,49 € netto** bis 300 €; neutrale Verpackung | Laut Anbieter: separate Zahlung (Vorkasse, PayPal, Karte oder gesondert genehmigte Lastschrift), Rechnung optional als PDF an Lieferant, **nimmt Endkundenretouren nicht an, keine Gutschrift/Rückerstattung**; nicht das ruhige EVERNE-Daywear-Sortiment. Kein Collective-Nachweis. | **AUSSORTIEREN für die ersten fünf** |
| **Sitara Fashion (Versand aus Neuss)** | Damenmode, DHL/UPS in DE 2–3 Werktage, Großhandelspreise nach Händlerfreigabe | **200 € Mindestbestellwert**, komplette Größenserien, **Vorkasse per Banküberweisung** statt Verkauf einzelner Stücke mit automatischer Supplier-Belastung; keine Collective-Integration dokumentiert. | **AUSSORTIEREN für Einzelstück-Dropshipping** |
| **ORSAY / orsay.de** | Damenmode und B2B-Kooperation in generischem Shopify-Blog erwähnt | Die **aktuellen eigenen B2C-AGB nennen eine verkaufende Gesellschaft mit Sitz in Prag/Tschechien**. Ursprünglich deutsche Markenherkunft und eine **.de-Domain beweisen keinen DE/EUR-Collective-Lieferanten-Shop**. Keine Collective-Teilnahme oder eine DE-B2B-Lieferanten-Entity belegt. | **KEIN verifizierter deutscher Collective-Kandidat** |

**Neue Schlussfolgerung:** Aus dieser öffentlichen Liste ist **0 von 4** als passender, aktiver, automatischer DE/EUR-Collective-Lieferant mit belegtem 30-%-Restgewinn qualifiziert. Das bedeutet ausdrücklich **nicht**, dass die gesamte deutsche Collective-Discovery keine passenden Lieferanten hat — nur, dass die geprüften veröffentlichten Informationen keinen belegen. Keine Anbieter wurden kontaktiert oder registriert.

### Direktquellen für den Pre-Screen (02.11.2026)

- Shopify-Blog: https://www.shopify.com/de/blog/grosshandel-fuer-kleidung-deutschland
- Christmann-Jacoby (Streckenlieferung „bald verfügbar“): https://christmann-jacoby.de/
- Christmann-Jacoby FAQ (Zahlung, Versand, Bestandsart, Bilderrechte): https://christmann-jacoby.de/faq
- MW-Großhandel/PASSION (Dropshipping-Regeln und Versand): https://www.passion-deutschland.de/de/dropshipping-dessous
- Sitara Fashion (Mindestwert und Vorkasse): https://sitarafashion.de/wholesale/
- ORSAY AGB (Verkäufer-Entity mit tschechischem Sitz): https://www.orsay.de/allgemeine-geschaftsbedingungen

## Primärquellen (02.11.2026)

- Shopify: Collective-App/Berechtigung https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/requirements-and-considerations
- Shopify: Collective kostenlos https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/installation
- Shopify: Fulfillment und Tracking https://help.shopify.com/en/manual/online-sales-channels/shopify-collective/retailers/managing-collective-orders
- Shopify: Zahlungen/ungedecktes Guthaben https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/payments
- Shopify: Discovery, Produkte, Margen https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/discovery
- Shopify: Retailer-Überblick (typische 20–50 %) https://help.shopify.com/en/manual/online-sales-channels/shopify-collective/retailers
- Shopify: Preisdefinition https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/importing-products
- Shopify: Versandtarife https://help.shopify.com/de/manual/online-sales-channels/shopify-collective/retailers/shipping
- Shopify: Retourenrichtlinien https://help.shopify.com/en/manual/online-sales-channels/shopify-collective/retailers/policies/returns
- Shopify: Steuern für Collective https://help.shopify.com/en/manual/online-sales-channels/shopify-collective/retailers/taxes
