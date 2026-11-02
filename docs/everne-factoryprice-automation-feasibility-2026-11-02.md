# EVERNE — FactoryPrice: Machbarkeit der vollständigen Shopify-Automatisierung (02.11.2026)

**Status: Recherche-/Entscheidungsentwurf; nicht produktiv.** Ergänzt `everne-dropshipping-fulfillment-decision-2026-11-02.md` und `everne-five-style-supplier-fit-2026-11-02.md`. Keine Bestellung, Anmeldung, App-Installation, Zahlung, Händlerkontaktaufnahme, Änderung eines Live-Shops, Freigabe eines Produkts oder Vertragsbindung.

## Verbindliches Ergebnis

**Noch kein öffentlich belegter, zusätzlicher-abofreier End-to-End-Prozess „bezahlte Shopify-Bestellung → Lieferantenauftrag und Zahlung → gültiges, bezahltes PL→DE-Etikett → automatische Etikettübergabe an FactoryPrice → Versand mit Tracking“**. FactoryPrice bleibt ein wirtschaftlich interessanter Sourcing-Kandidat, aber **nicht** als vollständig automatisierter EVERNE-Fulfillment-Partner freigegeben.

Die öffentlich belegte XML-Anbindung betrifft vor allem **Katalog, Varianten, Preise und Bestände**. Sie ist nicht gleichbedeutend mit einem Bestell- oder Versandetikett-API.

## Durchgängige Prozesskette: Beweisstatus

| Prozessschritt | Gefundener technischer Ansatz | Nachweisstatus für FactoryPrice/EVERNE | Verbleibender Beleg |
|---|---|---|---|
| 1. Produktdaten & Größen nach Shopify | FactoryPrice bietet XML-Feed; ProXI hat eine explizite FactoryPrice-Anleitung; Base.com kann Lieferantenfeeds importieren. | **Öffentlich belegte Importmöglichkeit**, aber nicht im EVERNE-Store getestet. | Tatsächliche B2B-Feed-Struktur, echte Größe/SKU/Bestandswerte, Rechte an Bildern. |
| 2. Preis- und Bestands-Updates | ProXI: 1/3/8 Läufe pro Tag je Tarif; Base.com: je nach Integration ungefähr stündliche Lieferantendaten. | **Werkzeugfunktion dokumentiert**, konkrete FactoryPrice-Datenverfügbarkeit und Ausfallverhalten nicht getestet. | Stock-Puffer, Varianten-IDs, Deaktivierung bei Nullbestand, Preiswechsel nach Freigabe. |
| 3. Bezahlte Shopify-Order in Order-Hub | Base.com hat Shopify-Shop-Anbindung bzw. Shop-Ordersystem. | **Architektur plausibel**, kein echter Shop-Durchlauf getestet. | Shopify-Event, Zahlungsstatus, Dubletten- und Bestelländerungslogik. |
| 4. Auftrag automatisch an FactoryPrice | Base erlaubt automatisches Forwarding **nur** bei einem Lieferanten mit Bestell-API oder aktivierter Base-Connect-Order-Funktion. FactoryPrice bewirbt Base.com „nativ“, nennt aber weder freigeschaltete Order-API noch Connect-Code. | **Für diesen Lieferanten nicht nachgewiesen. Kritischer Blocker.** | Erfolgreicher Test mit genau dem FactoryPrice-Konto: Produktvariante, Empfängeradresse, Bestätigung, Fehlerantwort, Dublettenverhinderung. |
| 5. Warenrechnung automatisiert bezahlen | FactoryPrice nennt Überweisung, PayU und teilweise Nachnahme; Base Connect kann grundsätzlich Partner-Guthaben/Kreditlimits verwalten, aber nur falls beide Teilnehmer dies eingerichtet haben. | **Für FactoryPrice nicht nachgewiesen. Kritischer Blocker.** | Rechtlich zulässiger, vereinbarter Zahlungsmodus; tatsächlicher Abbuchungs- und Erstattungsablauf; Liquidität. |
| 6. Frankiertes Versandlabel PL→DE generieren | Base unterstützt Kurier-Accounts und Labeldruck mit gültigen Zugangsdaten; FactoryPrice akzeptiert vom Händler bereitgestellte DPD-/DHL-Label und erhebt laut Dropshipping-Seite 3 PLN Packstück-Handling. | **Einzelkomponenten belegt**, keine verifizierte PL→DE-Rate/Absender-Pickup-Konfiguration. | Gültige Sender-/Abholadresse in Nadarzyn, unterstützter Kurierdienst, EU-Auslandsprodukt, Bezahlung, echte Frachtkosten. |
| 7. Label **pro Bestellung** an FactoryPrice übertragen | Offizielles Base-Connect-Fallbeispiel **MultiStore** zeigt automatische Labelweitergabe zwischen Partnern. FactoryPrice beschreibt ein Hochladen in seinem B2B-Panel, ohne öffentlichen Transfer-Endpunkt. | **Für FactoryPrice nicht nachgewiesen. Kritischer Blocker.** | FactoryPrice unterstützt Connect mit Labelweitergabe oder dokumentiert einen maschinellen Label-Upload/API/Inbox-Prozess; korrekte Zuordnung zu genau einer Order. |
| 8. Lieferstatus/Tracking zurück an Shopify | FactoryPrice verspricht Tracknummer je Bestellung; Base Connect unterstützt Tracking-/Sendungsdatenaustausch in kompatiblen Partnerverbindungen. | **Rückkanal FactoryPrice → EVERNE nicht nachgewiesen.** | Ereignis-/Statuszuordnung, Shopify-Fulfillment-Rückmeldung, Umgang mit verlorenen Sendungen. |
| 9. Retouren, Fehler, Rückerstattungen | FactoryPrice verweist auf gesonderte bzw. enge B2B-Bedingungen; Verbraucheransprüche des deutschen Shops bleiben bei EVERNE. | **Keine vollständige Automation.** | Zulässige Retourenadresse, Kosten, 14-tägiger Verbraucherwiderruf, Reklamationsablauf, Rechnungs-/Steuerbelege und Korrekturen. |

**Vorsicht bei „auf deinem Etikett“:** Die FactoryPrice-Seite beschreibt den Upload im Dropshipping-Panel. Öffentlich ist nicht erklärt, ob ein wiederverwendbares Kurierprofil, ein fertig frankiertes Label je Paket oder beides hochgeladen wird. Die Automatisierungsfreigabe verlangt den konkreten Übergabeprozess **pro Sendung**, keine Annahme.

## Drei mögliche Architekturen – keine davon ist heute freigegeben

### A — ProXI direkt in Shopify: nur Katalog-Synchronisierung

- ProXI dokumentiert explizit die FactoryPrice-Katalog- und Bestands-XML, Varianten und selektive SKU-Imports.
- **Preis des notwendigen Live-Sync:** aktuell **29,99 USD/Monat** für Basic mit einer Preis-/Bestandsaktualisierung pro Tag; 39,99 USD/Monat für drei; 59,99 USD/Monat für acht. Die **kostenlose Stufe dient laut Shopify App Store nur der Beratung**; Starter 19,99 USD/Monat importiert einmalig **ohne geplante Updates**.
- **Kein Nachweis** für Lieferantenauftrag, PayU-Abbuchung, Versandlabel oder Tracking. Daher kein „Dropshipping-Autopilot“ und gemäß EVERNEs Regel **kein zusätzliches Abo ohne gesonderte Freigabe**.

### B — Shopify ↔ Base.com ↔ FactoryPrice: wirtschaftlich interessant, technisch gesperrt

- Base.com DE bietet eine Freemium-Stufe (Grenzen und Leistungsumfang tarifabhängig); erste normale Lieferantenanbindung ist im Tarif enthalten. Base Connect selbst verursacht laut Base keine zusätzliche Integrationsgebühr.
- Base-Hilfe stellt klar: Aufträge gehen an einen Großhändler **nicht allein durch dessen XML-Feed** automatisch weiter. Nötig ist eine echte Bestell-API oder ein von FactoryPrice freigegebener Base-Connect-Code mit Order-Empfang.
- Das **MultiStore**-Beispiel beweist, dass Base Connect bei *einem anderen* Lieferanten sogar vom Händler erzeugte Kurieretiketten automatisch austauschen kann. Diese Erfolgsgeschichte ist **kein Beleg**, dass FactoryPrice diese Funktion aktiviert hat.
- Auch bei funktionierendem Label-Routing bleiben **Warenzahlung, Kurierkonto/Porto, Bestellbestätigung, Return-Prozess und fehlertolerante Shopify-Synchronisierung** separat zu testen.
- **Bis dahin keine automatische oder „hands-free“ Lösung behaupten.** Keine produktive Einrichtung.

### C — Direkte Custom-Schnittstelle: derzeit ohne dokumentierte Grundlage

Ein eigener Connector wäre nur vertretbar, wenn FactoryPrice verifizierte, nutzbare, autorisierte Schnittstellen für Bestellungen, Status, Zahlungen/Abrechnung und Labelannahme bietet. Öffentliche Marketingformeln wie „XML/API“ ersetzen kein Endpoint-Schema und keine Berechtigung. Keine Implementierung auf Verdacht, kein Scraping eines geschützten B2B-Panels, kein Browser-RPA als stillschweigender Ersatz.

## Anbieteraussagen, die vor einer Verkaufskalkulation aufgelöst werden müssen

1. **Mindestauftrag:** Die spezielle Dropshipping-Seite sagt „1 Stück, keine Mindestbestellung“; die ebenfalls aktuelle allgemeine B2B-Seite nennt **keine Mindeststückzahl**, aber einen ggf. im Warenkorb definierten **Mindestbestellwert**. Die ältere FactoryPrice-FAQ auf einer Legacy-Subdomain verneint sogar Dropshipping und nennt Mindestbeträge bei Auslandslieferung. Das können unterschiedliche Programme bzw. veraltete Texte sein; **für das konkrete B2B-Konto und PL→DE ist nichts verbindlich bestätigt**.
2. **Versandzeit vs. Lieferzeit:** „Versand in 24 h“ ist die Lieferanten-Bearbeitung, **keine** garantierte Zustellung in Deutschland binnen 24 h. FactoryPrice nennt an anderer Stelle als Anhaltspunkt 3–7 Werktage für EU-Auslandslieferungen.
3. **Kosten:** 3 PLN Handling kommt **zusätzlich** zum noch unbekannten echten PL→DE-Kurierlabelpreis. Dazu kommen Warenrechnung mit tatsächlicher Steuerbehandlung, Zahlungsgebühren, Retouren-/Fehlerreserve, Plattformkosten, Abgaben. Unter Kleinunternehmerbehandlung Vorsteuer **nicht pauschal abziehen**.
4. **Shop-Katalog:** Die fünf FactoryPrice-Codes für Essential Rib Top, Second Skin Body, Tailored Everyday Pant, Soft V-Neck und Fluid Midi Skirt sind **nur Recherchekandidaten**. Die 20 EVERNE-Einträge sind redaktionell; keine Bestellung, kein Bestand und keine Qualität wurden zugesagt.
5. **Händlerpflicht:** Selbst technisch automatisierter Versand beseitigt weder Verbraucherkundenrechte noch Konformitäts-, Produktkennzeichnungs-, Retouren- und Kundenservicepflichten.

## Konkrete Stop-/Go-Kriterien für einen späteren *autorisierten* Sandbox-Test

**STOP bleibt aktiv**, solange nur eine der folgenden Informationen fehlt:

- [ ] FactoryPrice bestätigt für das konkrete Händlerkonto **Bestell-API oder Base Connect** mit wirksamer Auftragsübertragung und Auftragsbestätigung.
- [ ] Lieferantenfälligkeit/Zahlungsweg ist automatisierbar, finanzierbar und autorisiert (keine implizite Kreditkarten- oder Konto-Freigabe).
- [ ] PL→DE-DPD-/DHL-Label von der tatsächlichen polnischen Versandadresse kann gültig zum **verifizierten Endpreis** erzeugt werden.
- [ ] FactoryPrice kann das **richtige Label ohne manuelles Panel-Upload** für jede Bestellung entgegennehmen.
- [ ] Tracking, Ausnahmen (Storno, Fehlbestand, Dublette, Adressfehler), Rechnungen und Retouren sind dokumentiert.
- [ ] Jede Variante erfüllt nach **allen** Kosten/Steuern und realistischen Rücklaufquoten das EVERNE-Ziel von **mindestens 30 % tatsächlich verbleibendem Gewinn**.
- [ ] Bild-/Textrechte, Material- und Herstellerkennzeichnung sowie deutsche B2C-Pflichten sind kontrolliert.
- [ ] Eine **gesonderte Zustimmung** zur eventuellen Anmeldung, zum Testshop, zur App-Installation und spätestens vor jeder tatsächlichen Bestellung/Abbuchung liegt vor.

**Nächster zulässiger Schritt im aktuellen Auftrag:** Dokumentiert liegenlassen, bei Bedarf nur öffentliche Anbieterangaben vergleichen; kein Anschreiben, keine Konten und keine Softwarekosten auslösen. Der Freigabestatus bleibt für **alle fünf** genannten Anfangsstyles **HOLD**.

## Primärquellen und Integrationsunterlagen (gesichtet 02.11.2026)

- FactoryPrice Dropshipping-Prozess, eigener Label-Upload, 3 PLN: https://factoryprice.eu/pl/cms/hurtownia-dropshipping-odziezy-damskiej-nadajemy-na-twojej-etykiecie-783.html
- FactoryPrice FAQ, Zahlung und Versand: https://factoryprice.eu/pl/terms/faq-771.html
- FactoryPrice allgemeines Großhandelsprogramm (Mindestbestellwert-Vorbehalt): https://factoryprice.eu/pl/cms/sprzedaz-hurtowa-dla-sklepow-internetowych-596.html
- Ältere widersprüchliche FAQ: https://hurtownia.factoryprice.eu/faq/
- ProXI FactoryPrice-Anleitung: https://productxmlimport.com/integrations/factoryprice
- ProXI Preise: https://productxmlimport.com/pricing
- Shopify App Store, ProXI-Pricing: https://apps.shopify.com/product-xml-import-by-proxi
- Base.com Lieferantenintegration/Order-Automation: https://www.base.com/en-EN/help/knowledgebase/wholesalers/
- Base Connect: https://base.com/en-EN/help/knowledgebase/base-connect/
- Base.com Fallstudie **MultiStore** für automatische Etikettübertragung: https://base.com/pl-PL/blog/?p=18435
- Base.com Kurierkonten/Etiketten: https://base.com/pl-PL/pomoc/wiedza/konta-kurierow-i-drukowanie/
- Base.com DE Tarife: https://base.com/de-DE/preise/
- Sellasist Shopify+FactoryPrice-Kataloganbindung (kein verifizierter Order-/Label-Proof): https://sellasist.pl/integracje/shopify/factoryprice/
- Sellasist Furgonetka+FactoryPrice (Labelerstellung im Sellasist-System, kein nachgewiesener Transfer ins FactoryPrice-Panel): https://sellasist.pl/integracje/furgonetka/factoryprice/
