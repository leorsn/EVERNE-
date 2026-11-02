# EVERNE — Safari-Abnahme der bildfreien Vorschau

**Stand:** Bildfreie, nicht-öffentliche Designvorschau · `feat/everne-imagefree-editorial`  
**Gesamtstatus:** **OFFEN / UNGETESTET** — echte macOS- und iPhone-Safari-Abnahme ist noch erforderlich.  
**Shopfreigabe:** **NO-GO** — keine freigegebenen Produkte, keine freigegebenen Fotos, kein Checkout.

Dieses Protokoll ist eine Anleitung zur späteren Prüfung, kein erfundener Testbericht. Automatische React-/Build-Tests ersetzen keine Prüfung auf einem tatsächlichen Mac und iPhone.

## 1. Auf dem Mac testen

1. Im GitHub-Repository den Branch `feat/everne-imagefree-editorial` auswählen, über **Code → Download ZIP** herunterladen und entpacken.
2. Im entpackten Projektordner `bash scripts/review-safari-mac.sh` ausführen. Voraussetzungen: Node.js 22+, npm, zip, unzip. `npm ci` benötigt einmalig Netzwerkzugriff.
3. Der Befehl baut die bildfreie Version, prüft das Archiv und öffnet `offline-review/everne-woman-safari-preview/index.html` in Safari. Die ZIP unter `offline-review/everne-woman-safari-preview.zip` bleibt privat; die SHA-256-Prüfsumme wird ausgegeben.
4. Falls `file://` eingeschränkt ist, im generierten Vorschauordner `python3 -m http.server 4173 --bind 127.0.0.1` starten und `http://127.0.0.1:4173/` öffnen. Mit `Ctrl+C` beenden.

## 2. Auf dem iPhone testen

Mac und iPhone müssen in demselben **vertrauenswürdigen privaten WLAN** sein. Im extrahierten Vorschauordner lokal `python3 -m http.server 4173 --bind 0.0.0.0` starten; die private WLAN-IP des Mac ermitteln (z. B. `ipconfig getifaddr en0`) und `http://<MAC-WLAN-IP>:4173/` am iPhone öffnen. Danach den nicht authentifizierten Server mit `Ctrl+C` stoppen. Niemals in öffentlichem WLAN oder über das Internet freigeben.

## 3. Testprotokoll

| Feld | Ergebnis |
|---|---|
| Prüfer / Datum | Noch einzutragen |
| Git-Commit / ZIP-Prüfsumme | Noch einzutragen |
| macOS / Safari-Version | Noch einzutragen |
| iPhone / iOS-Version | Noch einzutragen |
| Gesamturteil | **UNGETESTET** |

Jeder Test wird mit PASS, FAIL oder N/A und, falls nötig, einem Screenshot dokumentiert. Folgende Erwartungen sind **keine** behaupteten Ergebnisse.

| ID | Prüfung | Soll-Ergebnis | Status |
|---|---|---|---|
| S01 | `index.html` lokal öffnen | EVERNE erscheint ohne leeren Bildschirm oder Laufzeitfehler | UNGETESTET |
| S02 | Ansicht bei 320 px Breite | Keine horizontale Verschiebung oder abgeschnittenen Textzeilen | UNGETESTET |
| S03 | Ansicht bei 375 px | Navigation und Hero-Typografie bleiben lesbar | UNGETESTET |
| S04 | Ansicht bei 390 px | Kategorienamen passen ohne Überlagerung | UNGETESTET |
| S05 | Ansicht bei 430 px | Abstände und Schriftgrößen bleiben konsistent | UNGETESTET |
| S06 | Ansicht bei 768 px | Tablet-Komposition bleibt ausbalanciert | UNGETESTET |
| S07 | Ansicht bei 1024 px | Zweispaltige Textabschnitte sind gut lesbar | UNGETESTET |
| S08 | Ansicht bei 1440 px | Keine übergroßen, abgeschnittenen Headlines | UNGETESTET |
| S09 | Navigation WOMENSWEAR anklicken | Der Abschnitt mit den fünf geplanten Kategorien erscheint | UNGETESTET |
| S10 | CARE aufrufen, dann WOMENSWEAR | Seitenwechsel und Rücksprung funktionieren ohne Reloadfehler | UNGETESTET |
| S11 | Kategorie-Index ansehen | Genau fünf Namen und Hinweis „IN DEVELOPMENT“ | UNGETESTET |
| S12 | Startseite und CARE durchsuchen | Keine künstlichen Models, Produktbilder, Kacheln oder Preisangebote | UNGETESTET |
| S13 | CARE-Seite aufrufen | Eigenständiger textlicher Care-Auftritt ohne Produkte zum Verkauf | UNGETESTET |
| S14 | THE STANDARD aufrufen | Externe Lieferanten und offene Freigaben sind transparent beschrieben | UNGETESTET |
| S15 | Alten `/edit/…`-Link direkt testen | Nur die bildfreie Startseite, keine alte Konzeptseite | UNGETESTET |
| S16 | Imprint, Privacy, Shipping/Returns und die deutsche Rechtsseite öffnen | Entwürfe erreichbar; auch bei 320 px keine abgeschnittenen Überschriften oder zu kleinen Navigationsflächen | UNGETESTET |
| S17 | Tastatur: Tab, Shift+Tab, Enter, Skip-Link | Logische Fokusreihenfolge auf Start- und Rechtsseiten; Überschriften nach Navigation fokussiert | UNGETESTET |
| S18 | „Bewegung reduzieren“ aktivieren | Kein erzwungenes weiches Scrollen; alle Links nutzbar | UNGETESTET |
| S19 | Safari-Zoom 200 %, VoiceOver, Hell-/Dunkelmodus | Kein abgeschnittener Kerninhalt, ausreichende Kontraste | UNGETESTET |
| S20 | Webinspektor: Netzwerk, HTML, Bilder, Kaufpfade | `noindex,nofollow`; null Bilddateien/Shopify-/Payment-Requests; kein Checkout | UNGETESTET |

## 4. Entscheidung

- **P0 / NO-GO:** Laufzeitfehler, Live-Kaufpfad, öffentliche unfreigegebene Fotos, Übertragung an Shopify/Supplier/Payment oder falsche Warenverfügbarkeit.
- **P1 / NO-GO:** Wesentliche mobile Textüberläufe, unbenutzbare Navigation, Fokusverlust oder defekte Rechtslinks.
- **P2:** Rein optische Verbesserung mit Screenshot und getesteter Fensterbreite dokumentieren.

Eine visuelle Freigabe ist erst nach dokumentierter realer Geräteprüfung möglich. Eine Verkaufsfreigabe bleibt davon vollständig getrennt: Lieferanten, Muster, Produktdaten, Bildrechte, Versand, Widerruf und rechtliche Angaben brauchen eigene Nachweise und ausdrückliche Zustimmung. **Dieses Protokoll erlaubt keine Veröffentlichung oder Bestellung.**
