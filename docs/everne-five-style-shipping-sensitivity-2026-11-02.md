# EVERNE — Versand- und Gewinnsensitivität für fünf Start-Styles (Recherche 02.11.2026)

**Dokumentstatus:** unveröffentlichter Kosten-Stresstest für die Supplier-Entscheidung. Keine verbindliche Kalkulation, kein Händlerangebot, keine Preisänderung am Shop und **keine Produktfreigabe**. Ergänzt die anderen Dokumente im Draft-PR zur Lieferantenprüfung. Alle Beträge in EUR, wenn nicht ausdrücklich PLN; die Ergebnisse sind **simulierte Auftragsüberschüsse vor Ertragsteuern und vor noch unbekannten Sonderkosten**, **kein nachgewiesener Nettogewinn**.

## Neue öffentlich belegte Versandindizien

1. Der polnische Kuriervermittler **Furgonetka** führt für **DPD Polen → Deutschland, „Kurier → Kurier“ bis 3 kg** in der öffentlich angezeigten Preistabelle eine **Bruttopreisspalte von 62,02 PLN**, einschließlich des dort ausgewiesenen Treibstoffzuschlags. Dies ist ein **öffentlicher Preisanker**, kein für FactoryPrice buchbares Angebot, kein Vertragsnachweis und keine Garantie für die Abholung in Nadarzyn.
2. DPD selbst veröffentlicht für eine **internationale DPD-Pickup-Abgabe** nach Deutschland bis 3 kg **69 PLN**. **Achtung:** Pickup-Abgabe ist nicht mit Kurierabholung beim FactoryPrice-Lager gleichzusetzen; diese Zahl darf nicht als FactoryPrice-Prozesskosten eingetragen werden.
3. **FactoryPrice** nennt **3 PLN Handling pro Paket zusätzlich zur vom Händler bezahlten Versandmarke**; die Steuerbehandlung dieser 3 PLN und die Möglichkeit der automatisierten, individuellen Etikettübergabe sind ungeklärt.
4. **Base.com** hat eine dokumentierte Integration zum Broker **Furgonetka**, mit automatischer Paketerstellung/Etikettbezug. Die Kette endet jedoch technisch weiterhin vor dem **nicht verifizierten FactoryPrice-Order-/Label-Eingang**. Ein günstiges Label löst den Hauptblocker nicht.
5. Umrechnung für diesen Stresstest: **1 EUR = 4,4038 PLN**, EZB-Referenzkurs **30.10.2026**, letzter geprüfter Bankarbeitstag vor 02.11.; **kein garantierter Bank-/Broker-Abrechnungskurs**. Damit beträgt die exemplarische Furgonetka-Fracht **14,08 €** und das separat angenommene 3-PLN-Handling **0,68 €**, zusammen **14,76 € je Einzelpaket**.

## Einheitliche, bewusst prüfbare Annahmen

- **Ein Artikel pro Kundenbestellung**, kostenloser Versand für die Käuferin; keine Mengenbündelung und kein Zusatzumsatz.
- Fünf bisher öffentlich gesichtete FactoryPrice-*Netto-Warenpreise* (keine nach Login geprüfte, gültige Rechnung) aus dem bestehenden Supplier-Check.
- **Steuer-Szenario B (vorsichtiger Ansatz):** auf den öffentlich sichtbaren Netto-Warenpreis **23 % nicht wiedergewinnbarer Aufschlag**. Die frühere FactoryPrice-FAQ nennt 23 % polnische VAT auf öffentlich angegebene Netto-Preise. **Dies ist nicht automatisch die rechtlich geschuldete Steuer bei konkreter EU-B2B-Belieferung.** Eine Erwerbsbesteuerung in Deutschland, Rechnung ohne polnische VAT und abweichende Folgen des Kleinunternehmerstatus sind ausdrücklich separat zu klären.
- **Szenario A (günstiger Vergleich):** nur öffentlich gelisteter Netto-Warenpreis, **ohne** Zusatzsteuer. Eine echte 0-%-Steuerzahlung wird damit **nicht** behauptet.
- Auftragsgebühr **2,5 % vom EVERNE-Verkaufspreis + 0,25 €** (Modellannahme, kein verifiziertes Payment-Angebot).
- Erwartete Retouren-/Reklamationsbelastung **5 € je Order** (Modellreserve, bei Damenmode und grenzüberschreitender Retoure möglicherweise unzureichend).
- Plattform-/Fixkostenanteil **3 € je Order** (Modellreserve, nicht mit realem Absatz oder aktuellen Abos abgeglichen).
- Keine Werbekosten für bezahlte Reichweite angesetzt (organischer Plan). **Arbeitszeit, ertragsteuerliche Abgaben, wiederkehrende Retouren und Wechselkurs-/Kurier-Sondergebühren könnten den realen Gewinn weiter mindern.**

**Formel Szenario B:** `Ergebnis = Preis - (Waren-Netto × 1,23) - (62,02 PLN / 4,4038) - (3 PLN / 4,4038) - (Preis × 0,025 + 0,25) - 5 - 3`.

## Einzelartikel-Kalkulation

| Editorial-Konzept | EVERNE Preis | Waren-Netto öffentlich | Modellkosten Ware +23 % | Fracht + Handling | Ergebnis B vor Ertragsteuer | Quote B | Ergebnis A (kein Zusatzsteuerbetrag) | Quote A |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Essential Rib Top | 34 € | 5,89 € | 7,24 € | 14,76 € | **2,89 €** | **8,5 %** | 4,25 € | 12,5 % |
| Second Skin Body | 39 € | 7,20 € | 8,86 € | 14,76 € | **6,15 €** | **15,8 %** | 7,81 € | 20,0 % |
| Tailored Everyday Pant | 59 € | 16,11 € | 19,82 € | 14,76 € | **14,70 €** | **24,9 %** | 18,40 € | 31,2 % |
| Soft V-Neck | 49 € | 9,67 € | 11,89 € | 14,76 € | **12,87 €** | **26,3 %** | 15,09 € | 30,8 % |
| Fluid Midi Skirt | 44 € | 7,86 € | 9,67 € | 14,76 € | **10,22 €** | **23,2 %** | 12,03 € | 27,3 % |

Rundungen auf Cent/0,1 Prozentpunkt; intern ungerundete Werte verwendet. **Alle fünf unter 30 % im vorsichtigen Szenario B.** Die knapp positiven >30-%-Werte in A sind **nur Auftragsüberschüsse vor Ertragsteuer**, also **keine** Zulassung des geforderten realen 30-%-Gewinns.

## Versandbudget, das in Szenario B gerade noch 30 % vor Ertragsteuer ließe

Hier wird die maximale **reine Kurierfracht** berechnet (3-PLN-Handling, Zahlungsgebühr und alle Rücklagen bleiben separat eingepreist); die Spalte muss mit einem künftig echten **brutto zahlbaren PL→DE-Etikett** verglichen werden.

| Konzept | Höchstens zulässiger *brutto bezahlter* Kurierpreis | Gegenüber dem öffentlichen Brokerbeispiel von 14,08 € |
|---|---:|---|
| Essential Rib Top | **6,77 €** | darüber |
| Second Skin Body | **8,54 €** | darüber |
| Tailored Everyday Pant | **11,08 €** | darüber |
| Soft V-Neck | **12,25 €** | darüber |
| Fluid Midi Skirt | **11,10 €** | darüber |

Wenn **alle anderen Modellwerte** gleich blieben, ergäben sich allein für **30 % Vor-Ertragsteuer-Auftragsüberschuss** diese theoretischen Mindestpreise:
- Essential Rib Top: rechnerisch ab **44,83 €**, nächster EVERNE-Preis auf 4/9 **49 €**;
- Second Skin Body: ab **47,22 €**, nächster passender Preis **49 €**;
- Tailored Everyday Pant: ab **63,45 €**, nächster passender Preis **64 €**;
- Soft V-Neck: ab **51,72 €**, nächster passender Preis **54 €**;
- Fluid Midi Skirt: ab **48,42 €**, nächster passender Preis **49 €**.

**Keine Empfehlung zur sofortigen Preisanhebung:** Selbst diese Schwellen sind kein tatsächlicher 30-%-Nettogewinn nach Einkommensteuer oder nach beliebigen Fehlern/Retouren. Die Attraktivität dieser Preise und Konkurrenzfähigkeit wurden nicht getestet. **Keine Store-Preisänderung autorisiert.**

## Rechtlicher Prüfvorbehalt: deutscher Kleinunternehmer mit polnischem Warenbezug

- § 19 UStG: Kleinunternehmer-Umsätze sind bei Einhaltung der gesetzlichen Voraussetzungen steuerfrei; **kein pauschaler Vorsteuerabzug** aus dem Wareneinkauf.
- § 1a Abs. 3 UStG enthält für bestimmte Erwerber – einschließlich bestimmter Kleinunternehmer – eine **Erwerbsschwelle von 12.500 €**, deren Voraussetzungen und mögliche Option gesondert geprüft werden müssen.
- Laut aktueller IHK-Erläuterung kann schon die **Verwendung der USt-IdNr.** gegenüber dem Lieferanten als Verzicht auf die Erwerbsschwelle gewertet werden. Solche Fragen sind im konkreten Rechnungs-/Warenfluss und bei direkten Lieferungen PL→DE an die Endkundin **steuerlich zu verifizieren**. Kein Lieferanten-VAT-Satz wird hier verbindlich festgelegt.
- Rechtlich und finanziell gefährlich wäre, den sichtbaren *Netto*-Artikelpreis unmittelbar als tatsächlich bezahlbaren deutschen Kleinunternehmer-Einstandspreis zu verwenden.

## Beschlussvorschlag / nächster zulässiger Schritt

**Alle fünf Start-Styles weiter HOLD.** Der Wirtschaftlichkeitstest scheitert unter einem öffentlich plausiblen, aber noch unverifizierten Einzelpaketpreis bereits vor Ertragsteuer an der 30-%-Hürde. Der technische Hauptblocker bleibt die nicht nachgewiesene FactoryPrice-Order-, Zahlungs- und Etikett-Übernahme.

**Für einen späteren autorisierten Test exakt benötigt:**
1. B2B-Rechnung bzw. Vertragsregel zur Steuerbehandlung **für genau EVERNEs konkreten grenzüberschreitenden Bestell-/Lieferprozess**.
2. **Verbindlicher Kurierpreis** ab dem tatsächlichen FactoryPrice-Lager inklusive Brennstoff-/Maut-/Remote-/USt.-Komponenten und Retourenpreis.
3. Nachweis, dass das Label mit dieser Absenderadresse von Base/Furgonetka erstellt **und ohne manuelle Zwischenschritte** an FactoryPrice übergeben werden kann.
4. Pro-SKU Material, Größen, echte Verfügbarkeit, realer Wareneinkauf und von EVERNE akzeptierte Bildrechte.
5. Umsatz-/Fixkosten-/Retouren- und Ertragsteuerplanung für mindestens 30 % real verbleibenden Gewinn.
6. Nutzerfreigabe **vor** jeder Kontoeröffnung, App-Kosten, Testbestellung, Live-Aktivierung oder Händlerkontaktaufnahme.

## Quellen (Abruf 02.11.2026)

- Furgonetka, DPD-Kurier Polen→Deutschland, sichtbare Bruttopreis-/Treibstoffspalten: https://furgonetka.pl/cennik/miedzynarodowy/dpd/export/DE/Niemcy?lang=pl_PL
- DPD offizielle Punkt-zu-Ausland-Preisliste: https://www.dpd.com/pl/pl/cennik-przesylek-miedzynarodowych/
- Base.com, offizielle Brokerintegration Furgonetka: https://base.com/pl-PL/integracje/furgonetka/
- FactoryPrice Versand/Handling/Label: https://factoryprice.eu/pl/cms/hurtownia-dropshipping-odziezy-damskiej-nadajemy-na-twojej-etykiecie-783.html
- FactoryPrice ältere Netto/VAT-FAQ (veraltete Aussagen zu anderer Dropshipping-Leistung; nur eingeschränkt belastbar): https://hurtownia.factoryprice.eu/faq/
- EZB EUR/PLN 30.10.2026: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.hr.html
- UStG § 19 (amtlicher Gesetzestext): https://www.gesetze-im-internet.de/ustg_1980/__19.html
- UStG § 1a (amtlicher Gesetzestext): https://www.gesetze-im-internet.de/ustg_1980/__1a.html
- IHK Hagen Kleinunternehmer und EU-Warenbezug: https://www.ihk.de/hagen/standortpolitik/steuer-und-finanzpolitik/umsatzsteuer/kreinunternehmerregelung-5996550
