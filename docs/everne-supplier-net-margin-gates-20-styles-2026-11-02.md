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
