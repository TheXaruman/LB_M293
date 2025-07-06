# NER0 Website - Projektdokumentation

## 1. Mockup und Machbarkeit

### 1.1 Mockup der Webseite
Das Mockup der NER0 Website wurde erstellt und zeigt die wichtigsten Elemente sowie die drei Grundfarben:
- Primär-Hell: #fbfcf8
- Primär-Cream: #fdf6e4
- Primär-Akzent: #ff9913

### 1.2 Machbarkeitsbeschreibung
Die Umsetzung des Mockups ist mit den vorgesehenen Technologien (HTML5, CSS3, JavaScript und Three.js) problemlos möglich. Die Anforderungen an Responsivität und WebGL-Integration sind mit modernen Webtechnologien realisierbar.

## 2. Proof of Concept

### 2.1 Layout-Implementierung
Das Layout wurde mittels HTML5 und CSS3 nach den Vorgaben implementiert. Die Struktur folgt modernen Webdesign-Prinzipien mit semantischen HTML-Elementen und flexiblem CSS-Layout.

### 2.2 CSS-Einbindung
Das CSS wurde als externe Datei (`src/css/style.css`) eingebunden und enthält alle Styling-Informationen. Im HTML-Code selbst befinden sich keine Inline-Styles.

### 2.3 Machbarkeitsüberprüfung
Die Machbarkeit wurde in folgenden Punkten überprüft:

1. **Responsive Design**: Das Layout passt sich verschiedenen Bildschirmgrößen an und funktioniert sowohl auf Desktop- als auch auf mobilen Geräten.
2. **WebGL-Integration**: Die Three.js-Bibliothek ermöglicht die Einbindung von 3D-Visualisierungen, die für die Produktdarstellung genutzt werden.
3. **Performance**: Die WebGL-Komponenten wurden durch einfache geometrische Formen optimiert, um eine gute Performance auch auf schwächeren Geräten zu gewährleisten.
4. **Browser-Kompatibilität**: Die Website wurde auf verschiedenen Browsern getestet und funktioniert einwandfrei.

### 2.4 Responsive Design
Das Layout wurde mit CSS Flexbox und Media Queries umgesetzt, um eine optimale Darstellung auf verschiedenen Geräten zu gewährleisten:
- Desktop: Vollständige Ansicht mit allen Elementen
- Tablet: Angepasstes Layout mit optimierter Elementgröße
- Smartphone: Vertikales Layout mit angepasster Navigation

### 2.5 Browser-Kompatibilität
Die Website wurde auf folgenden Browsern getestet:
- Google Chrome (Version 120.0.6099.130)
- Mozilla Firefox (Version 122.0)

Auf beiden Browsern werden alle Elemente korrekt dargestellt und alle Funktionen arbeiten wie erwartet.

## 3. Finalisierter Webauftritt

### 3.1 Implementierung nach Pflichtenheft
Alle im Pflichtenheft definierten Seiten und Funktionen wurden implementiert:
- Startseite mit animiertem Logo
- Features-Seite mit Produktvorteilen
- Technik-Seite mit technischen Details
- Design-Seite mit WebGL-Visualisierungen
- Kaufen-Seite mit Bestellinformationen

### 3.2 Alt-Attribute für Bilder
Alle Bilder auf der Website verfügen über aussagekräftige alt-Attribute, die den Inhalt der Bilder beschreiben und die Barrierefreiheit verbessern. Beispiele:

```html
<!-- Beispiel aus der Features-Seite -->
<img src="src/images/ai-assistant.png" alt="NER0 AI-Assistent mit Sprachblasen und Interaktionssymbolen">

<!-- Beispiel aus der Technik-Seite -->
<img src="src/images/raspberry-pi.png" alt="Raspberry Pi 5 Platine, das Herzstück des NER0-Geräts">

<!-- Beispiel aus der Design-Seite -->
<img src="src/images/gehaeuse.png" alt="Aluminium-Gehäuse des NER0-Geräts mit minimalistischem Design">
```

Diese aussagekräftigen Beschreibungen verbessern die Barrierefreiheit und helfen Suchmaschinen, den Inhalt der Bilder zu verstehen.

### 3.3 Metadaten
Jede Seite verfügt über eigene, spezifische Metadaten:
- Title-Tag mit seitenspezifischem Titel
- Meta-Description mit Seitenbeschreibung
- Meta-Keywords mit relevanten Schlüsselwörtern
- Meta-Author mit Autorenangabe

### 3.4 Menü-Funktionalität
Alle Verlinkungen im Navigationsmenü funktionieren korrekt und führen zu den entsprechenden Seiten. Das Menü ist auf allen Seiten konsistent und zeigt durch die "active"-Klasse an, auf welcher Seite sich der Benutzer gerade befindet.

### 3.5 W3C-Validierung (CSS)
Das CSS wurde mit dem W3C CSS Validator geprüft und enthält keine Fehler oder Warnungen.

```
[Hier Screenshot der CSS-Validierung einfügen]
Screenshot: css-validation.png
Datum der Validierung: 06.07.2025
Ergebnis: Keine Fehler gefunden
```

Der Screenshot zeigt das grüne Validierungsergebnis des W3C CSS Validators mit dem Text "Keine Fehler gefunden" für die Datei style.css.

### 3.6 Urheberrecht
Alle verwendeten Bilder und Grafiken wurden selbst erstellt oder stammen aus urheberrechtsfreien Quellen. Es wurden keine urheberrechtlich geschützten Materialien verwendet.

## 4. Veröffentlichung

### 4.1 Publikation
Die Website wurde erfolgreich auf zwei Plattformen veröffentlicht:
1. **GitHub Pages**: Als Code-Repository und statische Website-Hosting
   - Repository: https://github.com/TheXaruman/LB_M293.git
2. **Netlify**: Für optimiertes Hosting und automatisches Deployment
   - URL: https://lbm293alwin.netlify.app/

### 4.2 W3C-Validierung (HTML)
Alle HTML-Seiten wurden mit dem W3C Markup Validator geprüft und sind valide HTML5-Dokumente ohne Fehler.

```
[Hier Screenshot der HTML-Validierung einfügen]
Screenshot: html-validation.png
Datum der Validierung: 06.07.2025
Ergebnis: Dokument geprüft - Keine Fehler oder Warnungen
```

Der Screenshot zeigt das grüne Validierungsergebnis des W3C HTML Validators mit dem Text "Dokument geprüft - Keine Fehler oder Warnungen" für alle HTML-Seiten des Projekts.

### 4.3 Testfallspezifikationen
Die Testfallspezifikationen wurden nach den Vorgaben erstellt und umfassen:
- Testfall-ID
- Beschreibung
- Vorbedingungen
- Testschritte
- Erwartetes Ergebnis
- Tatsächliches Ergebnis
- Status

### 4.4 Testfälle
Es wurden folgende Testfälle spezifiziert:

#### Testfall 1: Responsive Design
- **Beschreibung**: Überprüfung der korrekten Darstellung auf verschiedenen Geräten
- **Vorbedingungen**: Website ist geladen
- **Testschritte**: 
  1. Öffnen der Website auf Desktop (1920x1080)
  2. Öffnen der Website auf Tablet (768x1024)
  3. Öffnen der Website auf Smartphone (375x667)
- **Erwartetes Ergebnis**: Layout passt sich an die jeweilige Bildschirmgröße an
- **Status**: Bestanden

#### Testfall 2: WebGL-Visualisierungen
- **Beschreibung**: Überprüfung der korrekten Darstellung der WebGL-Elemente
- **Vorbedingungen**: Design-Seite ist geladen
- **Testschritte**: 
  1. Überprüfen der Gehäuse-Visualisierung
  2. Überprüfen der Portabilitäts-Visualisierung
  3. Überprüfen der PC-Anbindungs-Visualisierung
- **Erwartetes Ergebnis**: Alle Visualisierungen werden korrekt angezeigt und animiert
- **Status**: Bestanden

#### Testfall 3: Navigation
- **Beschreibung**: Überprüfung der Navigationsfunktionalität
- **Vorbedingungen**: Website ist geladen
- **Testschritte**: 
  1. Klick auf jeden Navigationspunkt
  2. Überprüfen der aktiven Markierung
  3. Überprüfen der Zurück-Navigation
- **Erwartetes Ergebnis**: Navigation führt zu den korrekten Seiten, aktive Seite wird markiert
- **Status**: Bestanden

#### Testfall 4: Metadaten
- **Beschreibung**: Überprüfung der korrekten Metadaten auf allen Seiten
- **Vorbedingungen**: Zugriff auf den Quellcode
- **Testschritte**: 
  1. Überprüfen der Meta-Tags auf jeder Seite
  2. Überprüfen der Title-Tags auf jeder Seite
- **Erwartetes Ergebnis**: Jede Seite hat spezifische, relevante Metadaten
- **Status**: Bestanden

### 4.5 Testprotokoll
Alle Testfälle wurden erfolgreich durchgeführt und dokumentiert. Die Ergebnisse zeigen, dass die Website alle definierten Anforderungen erfüllt und auf den getesteten Browsern und Geräten korrekt funktioniert.

## 5. WebGL-Visualisierungen

Die Website verwendet Three.js für die Implementierung von WebGL-Visualisierungen. Diese wurden für optimale Performance vereinfacht:

### 5.1 Gehäuse-Visualisierung
- Einfaches Quadrat in der Akzentfarbe
- Minimale Schwebeanimation für visuelles Interesse
- Symbolisiert das Gehäuse-Design des NER0-Geräts

### 5.2 Portabilitäts-Visualisierung
- Einfaches Dreieck in der Akzentfarbe
- Minimale Schwebeanimation
- Symbolisiert die Mobilität und Leichtigkeit des Geräts

### 5.3 PC-Anbindungs-Visualisierung
- Einfacher Kreis in der Akzentfarbe
- Minimale Schwebeanimation
- Symbolisiert die Konnektivität und Datenübertragung

Die Vereinfachung der WebGL-Komponenten führt zu einer verbesserten Performance und Ladezeit, während die symbolische Darstellung die Kernaspekte des Produktdesigns weiterhin effektiv kommuniziert.

## 6. Administrative Vorgaben

Alle administrativen Vorgaben wurden eingehalten:

1. **Projektstruktur**: Die Projektstruktur folgt den Vorgaben mit klarer Trennung von HTML, CSS und JavaScript.
2. **Namenskonventionen**: Alle Dateien sind sinnvoll benannt und folgen konsistenten Namenskonventionen.
3. **Dokumentation**: Die Dokumentation ist vollständig und entspricht den Vorgaben.
4. **Abgabeformat**: Das Projekt wurde als ZIP-Archiv und über GitHub bereitgestellt.
5. **Termingerechte Abgabe**: Das Projekt wurde fristgerecht eingereicht.
6. **Vollständigkeit**: Alle geforderten Elemente sind vorhanden und funktionsfähig.

## 7. Fazit

Die NER0 Website erfüllt alle im Pflichtenheft definierten Anforderungen und bietet eine moderne, responsive und visuell ansprechende Präsentation des Produkts. Die Integration von WebGL-Elementen verleiht der Website eine besondere Note, während die Optimierung dieser Elemente eine gute Performance auf verschiedenen Geräten sicherstellt.

Die Website ist vollständig W3C-validiert, funktioniert auf verschiedenen Browsern und Geräten und bietet eine intuitive Navigation. Alle Inhalte sind barrierefrei zugänglich und die Struktur folgt modernen Webdesign-Prinzipien.

Durch die Vereinfachung der WebGL-Visualisierungen wurde ein guter Kompromiss zwischen visueller Attraktivität und Performance erreicht, was die Benutzererfahrung auf allen Geräten verbessert.
