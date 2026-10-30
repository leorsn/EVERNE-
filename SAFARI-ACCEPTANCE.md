# EVERNE WOMAN — Safari-Abnahmeprotokoll

**Stand:** 30. Oktober 2026  
**Version:** Unveröffentlichter `feat/everne-woman-editorial-preview`-Entwurf  
**Technische Voraussetzung:** `npm run build:offline` einschließlich `check:offline:package` bestanden  
**Gesamtstatus:** **OFFEN – echte Safari-/iPhone-Sichtprüfung nicht durchgeführt**

**Automatischer Browser-Stand:** GitHub-Actions-Lauf `41129444820`
hat die **Chromium-Offlinetests** erfolgreich bestanden: 20 Konzeptseiten,
fünf Filter, mobile Breiten 320/390 px, Navigation, FAQ, Style Notes,
lokale Rechtsseite sowie fehlende externe Netzwerkanfragen und Kaufwege.
Zusätzlich wurde V35 mit **echtem Playwright-WebKit 26.5 unter Linux**
geprüft: **78 PASS / 0 FAIL**, sieben Breiten (320/375/390/430/768/1024/1440 px)
und 140 direkte Konzeptseiten-Aufrufe. Die Prüfung erfasst unter anderem
Tastaturfokus, Browser-Zurück/Vorwärts, lokale Bilder, Rechtslinks und
fehlende externe Anfragen. Zwei nachgewiesene mobile Fokus-/Linknamenfehler
wurden behoben. Das ist **kein macOS-/iPhone-Safari-Gerätetest**. Sämtliche
manuellen Fälle S01–S20 bleiben ausdrücklich **UNGETESTET**.

Dieses Dokument gehört zur privaten Vorschau. Es ist kein Bericht über bereits bestandene Gerätetests, keine Verkaufsfreigabe und keine Prüfung realer Lieferantenartikel.

## 1. Start auf dem Mac

1. Den Quellcode der **aktuellen** Branch `feat/everne-woman-editorial-preview` aus GitHub laden (im Branch-Menü auswählen → **Code → Download ZIP**), lokal entpacken und den **Quellordner** im Terminal öffnen. Ein altes Archiv aus der ChatGPT Library entspricht nicht automatisch der aktuellen Version.
2. Auf dem Mac **Node.js 22 oder neuer** sowie npm, zip und unzip bereithalten. Dann im entpackten Quellordner ausführen:

   ```sh
   bash scripts/review-safari-mac.sh
   ```

   Der Befehl installiert ausschließlich die im `package-lock.json` fixierten Entwicklungsabhängigkeiten (`npm ci`, Netzwerkzugriff zu npm erforderlich), erzeugt die aktuelle Safari-ZIP, prüft sie auf Vollständigkeit und öffnet `index.html` automatisch in Safari. Er tätigt keine Bestellungen und aktiviert keinen Checkout. Das lokale Ergebnis liegt unter `offline-review/everne-woman-safari-preview.zip`; die SHA-256-Prüfsumme wird im Terminal ausgegeben.
3. Falls Safari die lokale `file://`-Ausführung einschränkt: Terminal im generierten Ordner `offline-review/everne-woman-safari-preview/` öffnen und ausschließlich für den eigenen Mac starten:

   ```sh
   python3 -m http.server 4173 --bind 127.0.0.1
   ```

   Danach `http://127.0.0.1:4173/` in Safari öffnen. Zum Beenden `Ctrl+C` eingeben.
4. **Nicht** eine ältere Library-ZIP mit dem aktuellen Branch-Stand verwechseln. GitHub CI erstellt und prüft das Paket, legt es bisher aber absichtlich nicht als öffentliches Artefakt ab. Das lokale Archiv ist die geprüfte, eigens gebaute Ausgabe des heruntergeladenen Quellstands. Für die dokumentierte Abnahme ZIP-Prüfsumme, Quellcommit (sofern vorhanden), Datum und Safari-Version festhalten.

## 2. Test mit iPhone-Safari

Ein über AirDrop in „Dateien“ geöffnetes HTML-Dokument ist **keine zuverlässige vollständige Safari-Laufzeitprüfung**: JavaScript und verknüpfte lokale Ressourcen können sich anders verhalten. Stattdessen:

1. Mac und iPhone in **dasselbe vertrauenswürdige private WLAN** bringen; nicht in einem öffentlichen Netz testen.
2. Terminal im lokal entpackten Vorschau-Ordner öffnen und nur für den Test starten:

   ```sh
   python3 -m http.server 4173 --bind 0.0.0.0
   ```

3. Die lokale WLAN-Adresse des Mac bestimmen, z. B. `ipconfig getifaddr en0` (Schnittstellenname kann abweichen).
4. Im iPhone-Safari `http://<MAC-WLAN-IP>:4173/` öffnen, wobei `<MAC-WLAN-IP>` durch die tatsächliche **private** IP des Mac ersetzt wird.
5. Nach dem Test mit `Ctrl+C` stoppen. Der lokale Server ist **nicht authentifiziert** und darf weder im Internet freigegeben noch auf einem untrusted Netzwerk betrieben werden.

Die Seite sollte nur lokal vorhandene Bilder und Ressourcen laden. Kein echter Login, kein Einkauf, keine Verbindung zu Shopify, FactoryPrice oder einem Zahlungsdienst.

## 3. Protokollfelder

| Feld | Eintrag |
|---|---|
| Prüfer | Noch einzutragen |
| Datum/Uhrzeit | Noch einzutragen |
| GitHub-Commit | Noch einzutragen |
| Tatsächliche ZIP-Datei / Prüfsumme | Noch einzutragen |
| Safari macOS-Version | Noch einzutragen |
| Mac-Auflösung / Fensterbreite | Noch einzutragen |
| iPhone / iOS-Safari-Version | Noch einzutragen |
| Ergebnis | **NICHT GETESTET** |

Für jeden Test **PASS**, **FAIL** oder **N/A** mit Screenshot/kurzer Fundstelle eintragen. Die folgenden Soll-Ergebnisse sind **keine** behaupteten Testergebnisse.

## 4. Funktionale Prüffälle

| ID | Handlung | Erwartetes Ergebnis | Status |
|---|---|---|---|
| S01 | Startseite als `file://` oder lokales HTTP öffnen | EVERNE WOMAN lädt; keine leere Ansicht oder Konsolenfehler | UNGETESTET |
| S02 | Fensterbreiten ca. 320, 375/390, 768 und 1440 px prüfen | Keine abgeschnittenen Titel, übereinanderliegenden Aktionen oder horizontales Scrollen | UNGETESTET |
| S03 | Mobiles Menü öffnen, Einträge „Collection“, „Our World“, „Style Notes“, „The Edit“ anklicken | Zielabschnitt erreichbar, Menü schließt | UNGETESTET |
| S04 | Menü öffnen, außerhalb tippen und danach erneut öffnen; auf Mac Escape drücken | Menü schließt zuverlässig; nach Escape kehrt Fokus zur Menütaste zurück | UNGETESTET |
| S05 | „View all 20 concepts“ und danach „Show fewer concepts“ auslösen | Exakt 20 bzw. 8 Konzepte; keine Duplikate | UNGETESTET |
| S06 | Alle fünf Kategoriefilter auswählen | Kategorien korrekt, Zähler passend, Auswahl wird angezeigt/angesagt | UNGETESTET |
| S07 | `/edit/essential-rib-top` über die Vorschau öffnen | Konzeptdetail lädt, Preisziel €34, keine Kaufaktion | UNGETESTET |
| S08 | Nach einem Filter ein Konzept öffnen und „Back to collection“ wählen | Gleicher Filter/Ansicht und `#edit` werden wiederhergestellt | UNGETESTET |
| S09 | Alle 20 Konzepte nacheinander öffnen; ggf. direkte Hash-Links testen | Jede Konzeptseite lädt mit eigenem Titel; unbekannte Route zeigt Pending-Seite | UNGETESTET |
| S10 | Die drei Style-Notes-Moods wechseln | Passende textliche Kombination und eindeutiger aktiver Zustand | UNGETESTET |
| S11 | FAQ öffnen/schließen | Verdeckte Antworten bleiben geschlossen und Bedienung ist per Tastatur möglich | UNGETESTET |
| S12 | Englischsprachige Legal-Seite, „Imprint“, „Privacy“, „Returns“, „Shipping“ öffnen und zurückkehren | Unterseiten funktionieren lokal; Rücklink führt zur Vorschau | UNGETESTET |
| S13 | Einen alten `/products/*`-Link aufrufen | „Coming soon“ statt eines alten aktiven Produkts/Checkouts | UNGETESTET |
| S14 | Im Safari-Webinspektor oder Netzwerkmitschnitt prüfen | Keine Shopify-, Checkout-, Zahlungs-, Analytics- oder externen Font-Requests aus dem aktiven Preview | UNGETESTET |
| S15 | Seitenquelltext und sichtbare Hinweise prüfen | `noindex,nofollow` und „Shopping not yet available“; Preise als *geplante* Ziele, keine angeblich verfügbaren Größen | UNGETESTET |
| S16 | Drei redaktionelle Bilder, Credits und Galerie-Erscheinungsbild ansehen | Bilder vollständig, nicht unscharf/überdehnt; Bildnachweise vorhanden | UNGETESTET |
| S17 | Navigation nur per Tab/Shift+Tab/Enter und Mac VoiceOver prüfen | Sinnvolle Fokusreihenfolge, Skip-Link, Fokus auf Seitenüberschriften, keine unsichtbaren interaktiven Elemente | UNGETESTET |
| S18 | „Bewegung reduzieren“ in macOS/iOS aktivieren und Filter/Anker erneut prüfen | Kein erzwungenes Smooth-Scrolling; Navigation funktioniert | UNGETESTET |
| S19 | Textvergrößerung/Zoom und Hell-/Dunkelmodus prüfen | Lesbare Kontraste, keine abgeschnittenen wichtigen Inhalte, kein Layoutbruch | UNGETESTET |
| S20 | Checkout-/Warenkorb-Verfügbarkeit gezielt suchen | **Keine** realen Kaufbuttons, Bezahlseiten, aktiven Warenkörbe, Produktangebote oder Bestellübermittlung | UNGETESTET |

## 5. Abnahmeentscheidung

**P0:** Leere Seite, kaputte Navigation, unlesbare kritische Inhalte, Live-Kaufmöglichkeit oder unbeabsichtigte Übertragung an Shop-/Supplier-APIs. **Sofort NO-GO.**

**P1:** Wesentliche Mobil-/Touch-Probleme, reproduzierbarer Fokusverlust, fehlende Produktdetailseiten, unvollständige Rechtsnavigation. **NO-GO bis behoben.**

**P2:** Rein optische Abweichungen ohne wesentliche Funktionsbeeinträchtigung. Mit Screenshot, Bildschirmbreite und Reproduktionsweg dokumentieren.

**Visuelle Freigabe:** Erst nach tatsächlich durchgeführten Tests S01–S20 und dokumentierten P0/P1-Befunden. **Produkt- und Verkaufsfreigabe bleibt unabhängig davon NO-GO**, bis Lieferantenvertrag, Varianten, Versand, Widerruf, gesetzliche Kennzeichnung, Fotos, Wirtschaftlichkeit, End-to-End-Probe und ausdrückliche Gründerentscheidung vorliegen.

**Keine Änderung dieses Protokolls ist eine Erlaubnis**, Shopify zu bearbeiten, Produkte zu veröffentlichen, eine Bestellung anzulegen oder einen Carrier-Auftrag auszulösen.
