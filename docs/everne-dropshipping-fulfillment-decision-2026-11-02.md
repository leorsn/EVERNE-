# EVERNE — Entscheidungsvorlage Dropshipping-Automatisierung (Recherche 02.11.2026)

**Status:** interne, unveröffentlichte Lieferanten-/Integrationsrecherche. **Kein Lieferant, kein SKU und kein Verkauf freigegeben.** Die bestehenden 20 Einträge in `src/womenswearCatalog.ts` bleiben rein redaktionelle Konzepte; dieser Vermerk ersetzt weder Produktfreigaben noch Rechts-/Steuerberatung.

## Ergänzung: Shopify Collective für Deutschland (02.11.2026)

**Neue native Option, derzeit HOLD:** Shopify Collective ist für einen deutschen Shopify-Shop in EUR grundsätzlich erhältlich und für berechtigte Shops ohne separate App-Grundgebühr nutzbar. Bestellübertragung, Shopify-Payments-Lieferantenzahlung, Tracking und bestimmte Retourenabläufe sind auf Plattformebene dokumentiert. **Die Shops von EVERNE und Lieferant müssen aber im selben Land und derselben Shopwährung sein:** Ein polnischer Shopify-Collective-Lieferant wäre mit dem deutschen Shop nicht direkt kompatibel. Eligibility setzt u. a. Shopify Payments, eine kompatible Steuerkonfiguration und aktivierte Shopify Network Intelligence voraus. Keine dieser Konfigurationen wurde geändert.

Die von Shopify genannten typischen **20–50 % Händler-Produktmargen** sind keine 30 % Gewinn nach allen Kosten/Steuern. Unter dem strengeren 5-€/Retoure- und 3-€/Betriebskosten-Screening und bei 0 € zusätzlichem Lieferporto brauchen die fünf EVERNE-Prioritäten modellhaft **46,5–56,8 % Brutto-Produktmarge**, noch vor Einkommensteuer. Bei 6,90 € vollständig an Kunden durchgereichtem Versand **50,3–63,4 %**. **Kein deutscher Damenmode-Lieferant, kein tatsächlicher Preis und keine der fünf SKUs sind verifiziert.** Eine neue **Bruttorechnungs-Prüfung für deutsche Lieferanten** berücksichtigt den fehlenden Vorsteuerabzug des Kleinunternehmers: Bei 5 € Retourenreserve und 3 € Betriebskosten liegen die max. **tatsächlich zahlbaren Lieferantenrechnungen inklusive Ware, Porto und Umsatzsteuer** für die fünf Verkaufspreise nur bei **14,70 € / 18,07 € / 31,57 € / 24,82 € / 21,45 €** – jeweils **vor Einkommensteuer**. Diese strengere Rechnung ersetzt nicht den weiter unten dokumentierten älteren 2,50-€-Retouren-Orientierungsfall; beide sind Szenarien, keine belegten Lieferantenangebote.

[Vollständige Collective-Gates und Modellrechnung](everne-shopify-collective-germany-gate-2026-11-02.md). Collective hat Vorrang als **kostenfreie native Plattformoption für einen später autorisierten Eligibility-/Lieferantentest**, nicht als Produkt- oder Profitfreigabe. Hertwill bleibt die vertieft dokumentierte Drittanbieter-Alternative; beide Wege stehen auf HOLD.

## Neue Wirtschaftlichkeits-Hypothese: gemeinsamer Warenkorb statt Einzelversand

Der dokumentierte erste PL→DE-Kurieranker wurde bei einer erneuten öffentlichen Furgonetka-Abfrage auf **65,32 PLN brutto (DPD Kurier→Kurier bis 3 kg)** aktualisiert; mit 3 PLN FactoryPrice-Handling, unverändertem historischen EZB-Kurs sind das **15,51 € pro Paket** als **Szenario**, kein Lieferanten-Vertragspreis. Mit den fünf öffentlich sichtbaren FactoryPrice-Netto-Artikeln und dem konservativen illustrativen **+23-%-Wareneinkaufsszenario**, 5 € Retourenreserve **pro Stück**, 2,5 % + 0,25 € Payment und 3 € Betriebsanteil **pro Auftrag** ergeben sich für die **zehn unterschiedlichen Zweierkombinationen** der unveränderten EVERNE-Preise **36,0–43,4 % simuliert vor Einkommensteuer**, für **Dreierkombinationen 44,7–48,9 %**. Bei angenommenen 10 € Retourenreserve **pro Stück** fallen von zehn Zweierkombinationen bereits sieben unter 30 % **vor** Einkommensteuer.

**Wichtige Bedingung:** Diese Margen setzen voraus, dass alle Artikel tatsächlich zusammen in **einer** frankierten Sendung vom selben Lager bis 3 kg verschickt werden. Beispiel Body + V-Neck: **41,2 %** bei einem Paket, nur **23,6 %** bei zwei angenommenen Paketen. Eine verifizierte FactoryPrice-Order-/Zahlungs-/Labelautomation fehlt weiterhin. **Keine echte 30-%-Gewinnzusage nach Einkommensteuer, kein Bundle-/Preis-/Shop-Eingriff.** Siehe [vollständige 10-Paar-Tabelle und Belastungstests](everne-five-style-shipping-sensitivity-2026-11-02.md).

## Ausgangspunkt und harte Leitplanken

- Deutschland als Zielmarkt, Damenmode unter EVERNE, organische Vermarktung, kein zusätzlicher laufender Dienstleistungsaufwand ohne Freigabe.
- Preisziele der Konzepte enden auf **4/9**. Für Verkauf verlangt: **mindestens 30 % tatsächlich verbleibender Gewinn** nach Wareneinsatz einschließlich nicht abzugsfähiger Steuer, Versand, Transaktionskosten, Retouren, Fixkosten und ggf. Abgaben. Ein rechnerischer Deckungsbeitrag ist noch kein Nettogewinn.
- Unternehmerstatus gemäß Projektvorgabe: **deutscher Kleinunternehmer**; kein pauschaler Vorsteuerabzug und keine frei erfundene 0-%-Beschaffung.
- Kein Live-Shop-Import, keine Kontoeröffnung, keine Lieferantenkommunikation, keine Abonnements, keine echte Zahlung/Bestellung auf Grundlage dieses Dokuments.

## Ergebnis auf einen Blick

| Kriterium | FactoryPrice + eventuell Base.com | Hertwill + Shopify |
|---|---|---|
| Warenangebot | Viele öffentlich sichtbare Basic-Damenmode-SKUs; bisher 3 priorisierte und 17 weitere Konzepte untersucht | EU/US-Marken, auch Bekleidung, doch viele Kinder-, Accessoire- oder thematisch unpassende Artikel |
| Direkte Shopify-Automatisierung | **Nicht belegt**. FactoryPrice nennt Shopify über BaseLinker/dedizierte App | **Herstellerseitig dokumentiert**, sofern Shopify auf automatische Abwicklung gestellt und Zahlungsweg bei Hertwill hinterlegt ist |
| Versandlabel | EVERNE muss eigenes Kurierlabel erzeugen und im Lieferantenprozess bereitstellen; 3 PLN/Packstück Abwicklung (laut Lieferant) | Hertwill organisiert Fracht/Label; verfolgbare Versanddaten gehen nach Shopify |
| Softwarekosten | FactoryPrice-B2B kostenlos; Base.com Freemium 0 €/Monat bis 100 Bestellungen und 1000 Artikel, mit Einschränkungen | Hertwill Free 0 €/Monat bis **5 Produkte und 10 Bestellungen**; danach Standard aktuell **24,99 €/Monat** bei monatlicher Zahlweise oder 19,99 €/Monat bei Jahreszahlung (239,88 € im Voraus). Shopify-Verkauf selbst verlangt einen bezahlten Shopify-Tarif |
| Produkt- und Versandkosten | Warenpreise teilweise öffentlich, PL→DE-Lieferantenlabelpreis und Steuerwirkung fehlen | Artikelpreise und exakte Porto-/Steuerposten je SKU noch nicht verlässlich verifizierbar |
| DE-Versand | Verkäufer stellt DPD/DHL etc. selbst | Hertwill veröffentlicht **6,99–15,99 €** für reguläre DE-Pakete, **ohne USt.**, abhängig von Marke/Artikel; 3–8 Werktage EU als Richtwert |
| Retouren | B2B-Rückgabe laut öffentlichen FactoryPrice-Bedingungen äußerst eng; Verbraucherrisiko beim Händler | B2B-Rückgabe regulär 30 Tage ab Bestellung, aber Einschränkungen/Artikel-Ausnahmen; oft Retourenlabel im Panel, Rückfracht typischerweise erneut in Höhe der Hinfracht |
| 30 % realer Gewinn belegbar? | **Nein** | **Nein** |
| Heutige Empfehlung | Als günstige sourcingseitige Vergleichsbasis behalten, nicht als vollautomatisch bezeichnen | **Technik-Priorität für einen höchstens 5-SKU-Pilot**, *erst wenn* passende Varianten, All-in-Kosten und Rechtlichkeit nachgewiesen sind |

## FactoryPrice — nach offizieller Gegenprüfung kein Hands-free-Go

Die zweite Prüfung der [FactoryPrice-Prozessbeschreibung](https://factoryprice.eu/pl/cms/hurtownia-dropshipping-odziezy-damskiej-nadajemy-na-twojej-etykiecie-783.html) und der [Base.com-Händlerhilfe](https://www.base.com/pl-PL/pomoc/wiedza/hurtownie/) schließt das entscheidende Technik-Gate derzeit **negativ**: FactoryPrice benennt automatische Produkt-/Bestandssynchronisierung, aber keinen überprüfbaren durchgängigen Prozess von der Shopify-Bestellung über die **Lieferantenzahlung und die je Sendung gültige Labelübergabe** bis zum Tracking. Base.com verlangt bei Standard-Großhändlern grundsätzlich eine eigene Auftragsweitergabe; Automatik gibt es nur für ausdrücklich entsprechend unterstützte Lieferanten, und die Händler-Lieferanten-Abrechnung erfolgt laut Base außerhalb des Systems. Dass FactoryPrice unter seinen unterstützten Plattformen „Base.com nativ“ aufführt, beweist diese individuellen Funktionen nicht. Ein [allgemeiner FactoryPrice-Leitfaden](https://factoryprice.eu/pl/cms/dropshipping-co-to-jest-i-jak-dziala-781.html) bewirbt zwar auch automatische Auftragsweitergabe, veröffentlicht aber kein nutzbares FactoryPrice-spezifisches Order-/Payment-/Label-Protokoll.

**Präziser Status:** **NO-GO für EVERNEs zwingend vollautomatische Fulfillment-Anforderung auf Basis der heutigen Belege**; **HOLD nur als Vergleichsquelle für Stil/Preise und bedingte Warenkorb-Szenarien**. Keine Behauptung, der Anbieter sei grundsätzlich technisch dazu unfähig; eine verifizierte FactoryPrice-API oder aktivierte Base-Connect-Order-/Label-Strecke könnte den Befund ändern. Bis dahin weder Shop-Import noch Live-Bundle oder Testbestellung. [Details, Nachweistabelle und klare Wiederaufnahmekriterien](everne-factoryprice-automation-feasibility-2026-11-02.md).

## FactoryPrice: identifizierte Lücke in der Automatisierung

Offizielle FactoryPrice-Dropshipping-Seite: kostenloses B2B-Konto, kein Mindestabnahmevolumen, 3 PLN Handling je Paket, eigene DPD-/DHL-Label des Verkäufers, Versandkosten und Versandverantwortung beim Verkäufer. Für Shopify wird BaseLinker beziehungsweise eine spezialisierte App genannt. Der öffentliche XML-Feed belegt Produkt-/Preis-/Bestandsdaten; **nicht** bewiesenes automatisches Bestell- und Labelrouting.

Base.com stellt in Deutschland Freemium mit bis zu 100 Aufträgen/Monat, 1000 Produkten und stündlicher Synchronisation dar. Die Base-Hilfe sagt aber: automatische Übermittlung an einen Großhändler setzt **Bestell-API des Großhändlers oder passende Base-Connect-Funktion** voraus. Die erste Standard-Großhändleranbindung ist ohne Aufpreis, jede weitere 50 PLN netto monatlich; Base Connect gesondert ohne Integrationsentgelt. Für FactoryPrice ist öffentlich nicht belegt, dass ein hinreichender Bestell-API-Endpunkt, eine Base-Connect-Anbindung *und* eine automatische Verkäuferetikett-Erzeugung/-Übergabe für DE-Lieferungen verfügbar sind. Die Base-Hilfe enthält sogar einen FAQ-Hinweis, dass Großhandelsware nicht ohne Weiteres direkt in einem eigenen Onlineshop ausgespielt werden kann. Eine Namensnennung „Shopify“ auf der Lieferantenseite löst diese offenen Punkte nicht.

**Freigabefragen (ohne Kontaktaufnahme):**
1. Ist FactoryPrice tatsächlich Base-Connect-Partner oder ein Standard-XML-Lieferant?
2. Gibt es verifizierte Bestellungserstellung an FactoryPrice per API inklusive Lieferadresse, Varianten und Rückmeldungen?
3. Welcher Prozess erstellt das echte, frankierte PL→DE-Kurieretikett und übergibt es pro Bestellung? Wer bezahlt es und mit welcher verifizierten DE-Rate?
4. Ist bei Fehlbestand/Adresskorrektur/Retoure ein reversibler Ausnahmeprozess vorhanden?
5. Wie werden polnische Rechnungsstellung, innergemeinschaftlicher Einkauf und deutscher Kleinunternehmerstatus im konkreten Fall verbucht?

Antworten stehen aus. **Kein End-to-End-Versprechen.**

## Hertwill: technisch plausiblerer, nicht wirtschaftlich geprüfter Pilot

Hertwill dokumentiert den Ablauf: Shopify-App, Produkte als Shop-Entwürfe importieren, eigenen Verkaufspreis setzen, *automatische Bestellabwicklung* in Shopify aktivieren, Lieferländer/Versandprofile prüfen, Händlerkarte bei Hertwill für automatische Abbuchung von Ware + Versand + anwendbarer Steuer hinterlegen. Danach sollen Bestellungen, Bestand und Tracking automatisch weiterlaufen. Karte und ausreichende Liquidität sind bei erster Bestellung erforderlich, selbst wenn der Kunde bezahlt hat; Zahlungsfreigabe beim Endkunden kann später erfolgen.

**Kosten-/Kapazitätsgrenzen:**
- Free: fünf einzigartige Produkte, maximal zehn Orders/Monat, Lieferantenautomation laut Tarif enthalten.
- Standard: 100 Produkte, unbegrenzte Orders, 24,99 € monatlich bei Monatszahlung. Jahreszahlung 239,88 € (19,99 € monatlicher Äquivalentwert). Kein Upgrade autorisiert.
- Separate bezahlte Shopify-Stufe zum öffentlichen Verkauf erforderlich; Hertwill Free ist **nicht** „vollständig kostenloser Shop“.
- DE-Standardpakete aktuell 6,99–15,99 € exkl. USt.; jedes eigenständige Markenlager kann einen gesonderten Versandposten verursachen.
- Retouren: grundsätzlich 30 Tage auf B2B-Ebene, aber marken-/produktabhängige Ausschlüsse; Retourenlabel vielfach im Panel, nicht ausnahmslos automatisch. Laut Hertwill Rückversand oft gleich teuer wie Hinversand.
- Verkäufer bleibt rechtlich für Kundenzahlung, Widerruf, Reklamationen, Kennzeichnung, Produktsicherheit und Kundenservice zuständig. **Technisch automatisiert heißt nicht betreuungsfrei.**

**Eignung des Sortiments bislang unbestätigt:** Public-Katalog „Apparel“ 798 Treffer, Filter „Women“ 307 (Momentaufnahme); Kategorie „Dresses“ 37 Treffer inklusive Kinder- und Fremdstile. Zum Beispiel `Linen Fugue Dress - Black`, `linen-tales-fugue-black-{S,M,L,XL,XS}` laut öffentlicher Seite in stock, XXL out of stock, 100 % Leinen, locker, große Taschen. Ein weiteres Beispiel `LINEN DRESS “WHITE NIGHTS”` mit S/M/L laut Seite in stock, XL out. Beide sind **nur Stilprüfungs-Kandidaten**, keine EVERNE-Freigabe; das gewünschte ruhige Editorial kann trotz Stoffqualität ästhetisch abweichen.

**Preis-Datenqualität:** Hertwill erklärt, Preise seien vor Login nicht verfügbar. Aktuelle öffentlich ausgelesene Seiten zeigen teils ein identisches `24,90 €` für offenkundig sehr unterschiedliche Artikel, während frühere öffentliche Indizierung `Login to see prices` anzeigt. Deshalb **keine dieser €24,90 als belastbares Einzelpreisangebot verwenden**. Auf den Produktseiten war die exakte Portoabfrage beim Recherchezugriff teilweise nicht verfügbar.

## Freigaberechnung: Was wäre für 30 % überhaupt zulässig?

Für einen **konservativen Screening-Test**, nicht als Gewinnzusage:

`Nettoergebnis je Order = Kundenumsatz (bei KUR typischerweise Endpreis) - tatsächlich gezahlte Ware/Versand/Steuern - Payment-Gebühr - erwartete Retouren-/Reklamationskosten - auf Order umgelegte Plattform-/Betriebskosten - weitere Kosten und Abgaben.`

Für eine rein illustrative Rechengrenze:
- Payment-Annahme **2,5 % vom Preis + 0,25 €**.
- Retouren-/Reklamationsreserve **2,50 €**/Bestellung (bei Damenmode nicht validiert und womöglich deutlich zu gering).
- Auftragsbezogener Fixkosten-/Betriebskostenansatz **3,00 €** (vorbehaltlich echtem Absatz und periodengerechter Verteilung).
- Bei Hertwill kein separat angesetztes internes Pack-Handling, da dessen Preis bereits Verpackung/Abwicklung enthalten soll; ggf. ergänzen.
- Verkauf ohne separat erhobenes Versandentgelt angenommen. Sonstige Steuern und persönliche Ertragsbesteuerung müssen vor endgültigem „realem Gewinn“ zusätzlich erfasst werden.

Damit ist der **maximale gesamte, tatsächlich bezahlte Lieferantenrechnungsbetrag (Ware + Fracht + ggf. Steuer)** für *modellhaft mindestens 30 % Rest*:

| EVERNE Endpreis | Screening-Obergrenze für Ware + DE-Fracht + nicht rückholbare USt. |
|---:|---:|
| 34 € | **17,20 €** |
| 39 € | **20,58 €** |
| 44 € | **23,95 €** |
| 49 € | **27,33 €** |
| 54 € | **30,70 €** |
| 59 € | **34,08 €** |

Diese Werte sind **notwendige Prüfgrenzen unter Annahmen**, kein Nachweis realer 30-%-Gewinne. Bei 49 € und 15,99 € Lieferporto verbleiben unter diesem Modell nur ca. 11,34 € für *Wareneinsatz inklusive anfallender Steuer*; bei 6,99 € Porto ca. 20,34 €. Schon die konkrete Versandrate kann die Produktauswahl ändern. Ein tatsächlicher 24,90-€-Wareneinsatz wäre bei einem 49-€-Preis mit irgendeiner zusätzlichen Versandrechnung über 2,43 € bereits oberhalb dieser Prüfgrenze; **der sichtbare Platzhalterbetrag ist aber kein verifizierter Wareneinsatz**.

Zusätzlich prüfen: Mehrmarken-Bestellungen, Retourenquote für Damenmode (nicht Taschen!), Erstattungen des Warenwertes, Zahlungsgebühr-Erstattung, Größenfehler, Verpackung, Shopify-Abo, App-Abo bei Überschreiten des Limits, USt. auf grenzüberschreitende Leistungen/Waren, Liquiditätsversatz und ertragsteuerliche Betrachtung.

## Empfehlung / nächste Schritte, bewusst ohne operative Änderung

1. **Hertwill als vertieft dokumentierte Drittanbieter-Option** erst in einem freigegebenen, nicht öffentlichen Testshop prüfen: höchstens fünf **wirklich passende** Damenmodeprodukte, je mit deutschen Versandkosten, eindeutiger Größen- und Bestandstabelle und dokumentierter Steuerbehandlung. Noch keine echten Bestellungen. Die fünf vorhandenen EVERNE-Prioritäten müssen nicht gewaltsam auf Hertwill-Fremdprodukte gemappt werden.
2. **FactoryPrice als Preis-/Stil-Benchmark** behalten; drei priorisierte Quellen aus Draft-PR #7 und siebzehn Konzepte aus Draft-PR #9 unverändert. Automatik-Status: „offen“, bis Order-API und Labelrouter nachgewiesen sind.
3. **Keine Produktfreigabe**, solange keine SKU die überprüfte reale Gewinnhürde (inklusive Fixkosten und belastbarer Retourenreserve) erfüllt. Insbesondere keine aus vorläufigen Beitragsmargen abgeleitete 30-%-Nettogewinnbehauptung.
4. Nach expliziter Zustimmung zum Konto-/Systemtest: Hertwill/Shopify-Testkonfiguration prüfen; vollständig belegte Produkt- und Lieferkalkulation je Größenvariante erstellen; Rückgabe- und rechtliche Pflichtinformationen prüfen; erst danach gesonderte Entscheidung über Aktivschaltung.
5. Keine Lieferantenanschreiben erforderlich, solange der öffentliche Datenstand noch so viel Erkenntnis bietet. Unvermeidbare Authentifizierung und Zahlungs-/Steuerdaten sind **Freigabegrenze**, kein automatischer nächster Schritt.

## Primärquellen (abgerufen 02.11.2026)

- FactoryPrice: https://factoryprice.eu/pl/cms/hurtownia-dropshipping-odziezy-damskiej-nadajemy-na-twojej-etykiecie-783.html
- FactoryPrice B2B-Retouren: https://factoryprice.eu/de/terms/ruckgabebestimmungen-772.html
- Base.com Freemium DE: https://base.com/de-DE/preise/
- Base.com Großhändler-/Order-API-Hilfe: https://www.base.com/pl-PL/pomoc/wiedza/hurtownie/
- Hertwill Preise: https://hertwill.com/pricing
- Hertwill Shopify-Prozess: https://hertwill.com/resources/how-to-start-selling-on-shopify
- Hertwill Versand: https://hertwill.com/resources/shipping
- Hertwill Retouren: https://hertwill.com/resources/returns-refunds
- Hertwill Vertragsbedingungen (insbesondere §§ 4, 7–11): https://hertwill.com/resources/terms-of-service
- Hertwill Apparel: https://hertwill.com/category/apparel-accessories
- Hertwill Dresses: https://hertwill.com/category/dresses
- Hertwill exemplarischer Stil: https://hertwill.com/product/linen-fugue-dress-black
- Hertwill exemplarischer Stil: https://hertwill.com/product/linen-dress-white-nights-karlkorsar
