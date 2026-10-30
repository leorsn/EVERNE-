# EVERNE WOMAN — Aufnahme echter Lieferantenangebote

**Stand: 30. Oktober 2026**  
**Status: NO-GO / RESEARCH ONLY**  
**Keine Lieferantenanfrage wurde verschickt. Keine Bestellung, neue Gebühr, Live-Shop-Änderung oder Checkout-Freigabe.**

## Zweck

Bisher modellieren wir Versandetiketten von 5,00 €, 7,50 € und 10,00 € **nur hypothetisch**. Dass FactoryPrice die eigene Paketetikette verlangt und eine Bearbeitungsgebühr je Paket nennt, ist **keine bestätigte deutsche Dropshipping-Versandquote**. Ebenso bedeutet ein kostenloses Lieferantenkonto **nicht**, dass die Shopify-Synchronisation dauerhaft kostenlos ist.

Damit wir ein echtes schriftliches Angebot später einpflegen können, ohne Tests zu deaktivieren, wurden die Prüfungen angepasst. Ein tatsächlicher Preis wird erst mit passender Quelle, Prüfdatum und Prüfer in mehreren unabhängigen Datensätzen aufgenommen. **Annahme eines Angebots ist niemals eine Verkaufsfreigabe.**

## 1. Versandangebot für Deutschland aufnehmen

Erforderliche Unterlagen: PDF/E-Mail/Angebot eines autorisierten Lieferanten bzw. Versenders mit Gültigkeitsdatum, Nettobetrag, Währung, versendender polnischer Lageradresse, deutschem Empfängergebiet, Paketgewicht/Format, Retourenoption, ggf. Mehr-SKU-Regelung und dem exakten Dienst, für den das Etikett gilt.

Nach unabhängiger Prüfung aktualisieren:

- `sourcing/capsule-order-economics.json` → `realGermanCustomerCourierLabelNetEur` mit dem tatsächlich schriftlich bestätigten **Netto-EUR-Preis** (größer als null).
- `sourcing/first-drop-readiness.json` → `knownTerms.confirmedGermanyDropshipLabelNetEur` **identisch**, außerdem `globalGates.ownLabelGermanyCourierQuote.status = "VERIFIED"` und `evidence` als Objekt mit `reference`, `verifiedAt` (ISO-Datum YYYY-MM-DD) und `reviewedBy`.
- `sourcing/priority-mixed-cart-scenarios.json` → `courierLabelQuoted = true` und `routeGates.actualMerchantGermanLabelPriceNetEur` identisch.

**Nicht** den veröffentlichten DHL-Standardlagerpreis als Händleretikett ausgeben. Beispielbeträge aus Tests sind *erfunden* und dürfen nicht als echte Angebote in die ursprünglichen Dateien übernommen werden. Die vorhandenen Szenarien (€5/€7,50/€10) bleiben als historische Sensitivitätsannahmen erhalten.

## 2. Shopify-Anbindung und etwaige Abonnements aufnehmen

Schriftlich bestätigen lassen, ob direkte API/XML-Anbindung oder das Anbinden über BaseLinker bzw. eine kostenpflichtige App möglich ist. Benötigt werden vollständige monatliche/jährliche Preise, Stufenlimits, automatischer Lagerbestand, Bestellübertragung, Rücksendeabwicklung, Tracking und Datenschutzkonzept.

- `sourcing/capsule-order-economics.json` → `realShopifyIntegrationSubscriptionEur` mit bestätigtem **monatlichem EUR-Betrag**. Der Zahlenwert `0` ist nur bei belastbar bestätigter dauerhaft kostenfreier Nutzung zulässig.
- `sourcing/first-drop-readiness.json` → `globalGates.shopifyIntegrationRecurringCost.status = "VERIFIED"` sowie überprüfte Quelle, Datum und Reviewer.
- `sourcing/priority-mixed-cart-scenarios.json` → `shopifyIntegrationCostQuoted = true`.

Nur `null` steht für **unbekannt**. **0 €** ist nicht gleich „keine Information“. Für Kosten abweichender Währung sind Währungsumrechnung und Steuern separat zu belegen.

## 3. Mehrere Artikel pro Paket

Die Szenarien für `rib-body`, `rib-pant` und `body-pant` rechnen **getrennt** mit einem und zwei Paketen. Der Lieferant muss schriftlich bestätigen, ob mehrere SKU/Größen im gleichen Karton unter einem Etikett und einer Bearbeitungsgebühr versandt werden, wann geteilt wird und wie die Rückabwicklung funktioniert. Erst danach darf `globalGates.dropshipMultiSkuPackaging` mit Datum und Quelle als verifiziert gelten. Ein einziger gemeldeter Paketpreis beweist **keine** zuverlässige Bündelung.

## 4. Verbraucherretouren sind ein eigener Freigabeschritt

Eine übliche 14-tägige Widerrufsmöglichkeit gegenüber Verbrauchern ist nicht mit den separat genannten sieben Tagen des Lieferanten für Großhandelsretouren gleichzusetzen. Ein Kaufmann braucht einen dokumentierten Prozess für Rücksendeadresse, Versandkosten, Rückzahlungsfrist, mögliche Ausnahmen, Reklamationen und Warenprüfung. Lieferantenbedingungen sind erst nach schriftlicher Prüfung unter `globalGates.dropshipMerchantReturnContract` zu belegen. Die notwendige Verbraucherabwicklung wird unter `globalGates.consumerWithdrawalWorkflow` separat bestätigt.

## 5. Prüfung nach Aufnahme

```bash
npm run check:sourcing
npm run build
npm run build:offline
```

Die folgenden vier Scripts kontrollieren unter anderem **Übereinstimmung der Angebotswerte, zulässige Nachweise und weiterhin gesperrte Freigaben**:

- `scripts/validate-first-drop.mjs`
- `scripts/validate-first-drop-readiness.mjs`
- `scripts/validate-courier-ceilings.mjs`
- `scripts/validate-priority-mixed-carts.mjs`

Die positive Testsimulation mit 7,95 € Versand und 0 € Integration ist **kein echtes Angebot**. Der Test mit diesen rein fiktiven Beträgen bestätigt nur, dass die Prüfungen dokumentierte Daten aufnehmen können, ohne automatisch Verkäufe zu aktivieren. Fehlende Quellen werden abgelehnt.

**Freigaberegel:** Auch wenn diese technischen Tests bestanden werden, dürfen keine Produkte veröffentlicht oder Bestellungen angenommen werden, bevor individuelle Muster, Varianten, gesetzliche Angaben, Retouren, tatsächliche Kosten, Shop-Integrationsabnahme und eine **separate ausdrückliche Gründerfreigabe** vorliegen.
