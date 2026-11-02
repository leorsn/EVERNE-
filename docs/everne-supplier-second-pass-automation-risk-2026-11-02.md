# EVERNE — Weitere Damenmode-Lieferanten: echte Automatik, Kosten und Risiko (02.11.2026)

**Status:** unveröffentlichte, rein öffentliche Anbieterprüfung. Ergänzt die bisherigen EVERNE-Fulfillment- und Kostenunterlagen im Draft-PR. **Kein neuer Lieferant, keine Marke und keine SKU freigegeben.** Keine Anmeldung, App-Installation, bezahlte Dienste, Testbestellung, Kontaktaufnahme oder Änderung am Shop.

## Kurzbeschluss

**Unter den neu geprüften Lieferanten kein vorbehaltloser Ersatz für FactoryPrice und kein bewiesener 0-€-Zusatzabo-/30-%-Nettogewinn-Autopilot.**

**Wichtige Neuentdeckung:** Matterhorn besitzt eine kostenlos verfügbare Shopify-App, eine konkret dokumentierte **Base-Connect-Lieferantenanbindung**, einen dokumentierten **REST-Endpunkt zur Bestellungserstellung inklusive Varianten und deutscher Empfängeradresse** sowie öffentlich sichtbare **eigene DE-Frachtraten**. Das löst zwei bisherige FactoryPrice-Probleme **teilweise**, aber **nicht die Zahlung**. Zudem erzeugen die aktuellen Shopify-App-Bewertungen ein erhebliches Abwicklungs-/Datenschutzrisiko. **Keine Aktivierung empfehlen.**

## Vergleich — strikt aus EVERNE-Sicht

| Anbieter | Damenmode/Integration | Kosten / Versand DE | Wie weit läuft die Automatik wirklich? | Hauptrisiko / Entscheidung |
|---|---|---|---|---|
| **Matterhorn** | 30.000+ Modelle, kostenloses B2B-Konto und Shopify-App, keine Mindestbestellmenge, eigenes REST API, deutschsprachige Base-Connect-Codes. | Shopify-App ohne Abo; offizieller GLOBAL-Versand nach Deutschland **5,90 € bis 1 kg** bzw. **6,90 € bis 3 kg** als auf der Supplier-Seite gelistete Rate, **Netto-/Steuerrechnung noch ungeprüft**. | **Katalog: ja. Orders: via Base Connect/API grundsätzlich möglich. Shopify-App: „Request fulfillment“ manuell je Auftrag. Zahlung: laut eigener API-Hilfe ausdrücklich nicht per API, sondern per Link/Panel. Tracking: Orders-GET kann Sendungsnummer/Tracking liefern.** | Shopify-App 1,5/5 aus 14 Bewertungen beim Abruf; mehrere Berichte über nicht erfüllte Aufträge, fehlerhafte Adressen, mangelhafte Kommunikation und vermuteten Händlerdatenabfluss in Dokumenten. Behauptungen Dritter nicht unabhängig verifiziert. **NO-GO für operative Aktivierung bis starke unabhängige Verifikation und Datenschutz-/Order-Testfreigabe.** |
| **LaBalancia** | Eigenproduktion in Polen, Damenmode, ca. 1.400 Katalogartikel. XML/CSV/Bestellübertragung via BaseLinker dokumentiert. | Laut Anbieter DE-Dropship-Label **ca. 6–7 € netto für 0–3 kg**, kein derzeitiges Dropship-Handlingentgelt (ausdrücklich Promotion). **Die beworbenen pauschalen 5 € gelten nur für B2B-Ware an die Firmenadresse, nicht für direkte Dropship-Sendungen!** | BaseLinker-Orderrouting beworben, Zahlung separat vorausbezahlt. Eigenes „LB Connect“ für Shopify **noch „demnächst“**, während PrestaShop bereits verfügbar ist; pauschale XML-Anbindung ist kein Nachweis für Shopify-End-to-End. | Händler-Einkaufspreise nur nach B2B-Freigabe, **keine normalen B2B-Retouren oder Umtausch**, deutscher B2C-Widerruf bleibt EVERNE-Risiko. **HOLD / potenzieller niedrigerer Versandsatz, aber Automations- und Retourengate offen.** |
| **Numoco** | Polnische Damenmode/-Kleider, kostenloser B2B-Zugang, XML/CSV, kein Mindestauftrag, neutral verpackter Direktversand. | Keine Gebühren für Packen/Dateien. Online nur polnische Inlandslieferung: **14,63 PLN netto Kurier** (kein zulässiger DE-Kalkulationswert). | Ablauf: Händler übermittelt Bestellung, bezahlt via Überweisung/Przelewy24, Lieferant versendet nach Zahlung. Integration via Megamo primär Produktdaten, kein belegter Shopify-Order+Payment-Flow. | Deutschlandporto offen; kein normaler B2B-Retourenweg, eher Kleider als fünf Basis-Styles. **HOLD / niedrige Priorität.** |
| **VAITTO** | Designer-Luxusware aus EU-Verteilung, kein MOQ, kein Monats- oder Auftragsserviceentgelt. | DE-Porto erst im Bestell-Checkout je Lager/Zone. | Händler muss die Order im VAITTO-Dashboard **manuell zur Auslieferung bestätigen**; Shop-Integration ungetestet. | Designerpreise womöglich unvereinbar mit EVERNE 34–59 €; **nicht vollautomatisch, derzeit nachrangig**. |
| **T.M. Textilhandels** | Deutscher Bestand und blindes Dropshipping, keine Monatsgebühr. | Inlandsversand potenziell attraktiv. | XML/CSV, Supplier Fulfillment vorhanden. | Hauptsortiment **Bettwäsche, Handtücher und Heimtextilien** – kein struktureller Fit für EVERNE Damenmode. **Ausschließen**. |
| **Hertwill (bestehende Referenz)** | Shopify-App: automatisierte Order-Erfüllung, Kartenabbuchung, Lagerbestand und Tracking dokumentiert. | Free bis 5 Produkte/10 Orders; DE Porto 6,99–15,99 € ex. VAT, konkrete SKU-Einkaufspreise vor Login ungeprüft. | **Technisch am umfassendsten dokumentierter Ablauf unter geprüften Kandidaten.** | Keine überzeugende Zuordnung zu allen fünf EVERNE-Stilen und keine realen 30-%-Gewinne belegt. **HOLD als Technikreferenz.** |

## Matterhorn — neu und technisch tatsächlich spezifisch

1. Shopify-Shop-Integration: Die offizielle Matterhorn-Hilfe sagt ausdrücklich **kostenlos**, Import, Stock/Preisaktualisierung, Bestellung nach **Klick „Request fulfillment“**, anschließend *gesonderte Zahlung* im „Fulfillment orders“-Bereich. Die kostenlose App ist kein Beleg für vollautomatisierte Zahlung.
2. Base-Connect-Partner: Auf der eigenen Seite werden **sprach-/währungsabhängige Connect-Codes** (auch Deutsch/EUR) angezeigt und die Weiterleitung von Shop-Orders zur Großhandelserfüllung als automatisch beschrieben. Damit im Gegensatz zu FactoryPrice ein öffentlich konkret beschriebener **Partner-Connect-Weg**.
3. REST API: dokumentierte Methoden **GET /B2BAPI/ITEMS/**, **PUT /B2BAPI/ACCOUNT/ORDERS/** mit `variant_uid`, `quantity`, `delivery_to` (u. a. `country: de`) und `delivery_method_id`, **GET /B2BAPI/ACCOUNT/ORDERS/{id}** mit Sendungsnummer und Tracking-URL.
4. **Harter Zahlungsblocker:** Matterhorn schreibt ausdrücklich, die Zahlung sei **nicht** über die REST-API möglich; Zahlung per Bestätigungs-E-Mail-Link oder Kundenpanel. Ein Base-Connect-Autoforwarding kann daher unbezahlte Ordern erzeugen, die noch **nicht** versendet werden. Kein Screen-Scraping oder Kauf-Workaround.
5. Versand: offizielle Shopify-Versandtabelle Deutschland „GLOBAL“ **5,90 € bis 1 kg**, **6,90 € bis 3 kg** mit **2–4 Tagen Transportzeit**, ohne vorgelagerte Kommissionierung. Lieferantenhilfe sagt, Preise seien **netto** und bei fehlender gültiger USt-IdNr. könne VAT für das Lieferland anfallen. Anwendbare tatsächliche Rechnungssteuer muss geprüft werden.
6. **Reputations-/Datenschutzrisiko:** Shopify App Store aktuell **1,5/5 bei 14 Rezensionen**. Einzelne Bewertungen vom August/Oktober 2026 behaupten irrtümliche Lieferadressen, ausbleibende Lieferungen, mangelnde Erreichbarkeit und Beilegung einer Rechnung mit Händlerpersonen-/Preis-/PayPal-Daten an die Endkundin. Das sind **nicht unabhängig bestätigte Nutzerberichte**, aber hochrelevante Warnungen. Kein Live-Pilot ohne nachweisbare Prozess- und Datenschutzkontrollen.
7. Wirtschaftlichkeit: 5,90 € statt des für FactoryPrice recherchierten **14,08-€-Fracht-Brokerbeispiels** könnte eine erhebliche Differenz sein. **Nicht** die FactoryPrice-Warenpreise als Matterhorn-Wareneinsatz einsetzen und daraus scheinbare 30-%-Gewinne ableiten. Matterhorn-Einkaufspreise, Qualitäts-/Bildrechte, VAT, Rückgaben sind separat.

## LaBalancia — wichtige Klärung der Preiskommunikation

- **5-€-Europa-Flatrate gilt für B2B-Bestellungen an eine eigene Geschäftsadresse, ausdrücklich nicht für Dropshipping**. Für direkte Empfänger in Deutschland nennt die Preisübersicht im Auftrag des Verkäufers **6–7 € netto** als ungefähren eigenen Labelpreis bis 3 kg; tatsächlich abhängig von Dimensionen/Carrier.
- LaBalancia erklärt *Bestellweiterleitung durch BaseLinker* und *Vorkasse an LaBalancia*; keine verifizierte automatische Lieferantenabbuchung.
- Die „LB Connect“-Seite nennt **Shopify „wkrótce“ (demnächst)**, während PrestaShop/WooCommerce als heute verfügbar gezeigt werden; Marketingbegriffe wie „Shopify-kompatibel“ müssen im Funktionsumfang getrennt bewertet werden.
- Aktuelle B2B-Bedingungen laut Lieferant **keine Rücknahme/keinen Umtausch**. Das ist ein erhebliches Risiko bei deutschem Frauenmode-Dropshipping, da EVERNE gegenüber Endkundinnen den gesetzlichen Widerrufs- und Gewährleistungsregeln unterliegt.
- Preise pro SKU nur nach freigegebenem Partnerkonto. Keine 30-%-Marge belegbar.

## Vor einer tatsächlichen Lieferantenfreigabe — harte Kriterien

- [ ] Nachweis **mindestens fünf passende, echt bestellbare** Damenmode-SKUs: neutraler Rib-Top, Basic-Body, Tailored Pant, ruhiger V-Neck-Strick, Fluid Midi Skirt; korrekte Größen, Material, Marke, Hersteller-/GPSR-/Textilinfos, Bildrechte.
- [ ] Nachweis **keines zusätzlichen monatlichen Abonnements** ohne explizite Zustimmung.
- [ ] Nachweis **automatischer** Zahlung an den Lieferanten **plus** sicherer Abbruch-/Fehlermechanismen (nicht nur automatische Auftragserstellung).
- [ ] Verifizierter, endgültig zahlbarer Deutschlandversand pro tatsächlichem SKU/Empfänger inklusive Steuern/Zuschlägen; keine Verwechslung von B2B- und Dropship-Preisen.
- [ ] Einhaltung deutscher B2C-Verbraucherpflichten, Rücksendeadresse, Anwendbarkeit der supplierseitigen Rückgaberegeln und belastbarer Retourenreserve.
- [ ] Reelle, nach *allen* Kosten einschließlich nicht abziehbarer VAT, Kosten von Plattform und Reklamationen/Retouren, Steuern und Betrieb **mindestens 30 % verbleibende Gewinnquote**, nicht bloß Deckungsbeitrag.
- [ ] Liefer-/Tracking-/Datenschutz- und Zuverlässigkeitstest **nach separater Freigabe**, besonders wegen Matterhorn-Bewertungen.
- [ ] Bis dahin weiterhin **alle fünf HOLD**, 20 redaktionelle Konzepte nicht als kaufbare bestätigte Artikel behandeln.

## Empfohlene Reihenfolge ohne zusätzliche Handlungsvollmacht

1. **Hertwill** als technischen Referenzstandard für echte Automatik belassen, erst exakte Produkt-Matches und reale Einkaufspreise prüfen.
2. **LaBalancia** als möglichen niedrigeren Frachtkostenweg merken, aber Shopify-Reife, Bezahlung, Rückgaben und konkrete B2B-SKU-Kosten bleiben gesperrt.
3. **Matterhorn** als dokumentierte technische Architektur *nur im Research* behalten. Wegen aktueller Warnsignale **keine App installieren und keine Endkundendaten senden**.
4. **FactoryPrice** als vorheriger Preis-/Stil-Benchmark erhalten, solange eigene Label-/Order-Automation ungeklärt.
5. **Numoco/VAITTO** nachrangig, T.M. Textil für die Womenswear-Capsule ausschließen.

## Originalquellen, Stand 02.11.2026

- Matterhorn Hauptseite (0 Abogebühr, EU-Mode, Shopify, API): https://matterhorn.pl/
- Matterhorn Shopify FAQ (Order-Klick und Bezahlung): https://matterhorn.pl/shopify/landing-page.html
- Matterhorn Base Connect (Partner-Codes, Auto-Orders): https://matterhorn.pl/?str=baselinker-help
- Matterhorn REST API inkl. **keine API-Zahlung**: https://matterhorn.pl/?str=api-help
- Matterhorn **offizielle Shopify-Frachttabelle Deutschland**: https://matterhorn-wholesale.com/ShopiMatterhorn/?region=Europe&type=shipping_costs
- Matterhorn VAT/Retouren/Bestellzeiten: https://matterhorn.pl/?str=dropshipping-help
- Matterhorn Shopify App und öffentliche Rezensionen: https://apps.shopify.com/matterhorn-wholesale
- LaBalancia Handels-/Versand-/Retourenleitfaden: https://labalancia.com/a/guide
- LaBalancia LB Connect Verfügbarkeit: https://labalancia.com/a/connect
- Numoco Dropshipping/Preise/Bestellablauf: https://www.numoco.com/i12,dropshipping.html
- VAITTO Dropshipping/Orderbestätigung: https://vaitto.com/dropshipping
- T.M. Textil Sortiment und Versand: https://www.tm-textil.de/en/dropshipping.html
- Hertwill Shopify-Prozess und Versand: https://hertwill.com/resources/how-to-start-selling-on-shopify | https://hertwill.com/resources/shipping
