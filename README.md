# NER0 Portfolio Website

## Projektbeschreibung

Diese Website präsentiert das fiktive Produkt "NER0" - ein AI-Companion-Gerät basierend auf Raspberry Pi 5 mit E-Ink Display. Die Website wurde im Rahmen des Moduls 293 "Webauftritt erstellen und veröffentlichen" entwickelt.

## Funktionen

- Responsive Design für Desktop und Mobile
- WebGL-Integration mit einfachen, symbolischen Produktvisualisierungen
- Minimale Animationen für bessere Performance
- W3C-validiertes HTML5 und CSS3

## Projektstruktur

```
website-lb/
│
├── index.html              # Startseite
├── features.html           # Features-Seite
├── technik.html            # Technik-Seite
├── design.html             # Design-Seite mit WebGL-Visualisierungen
├── kaufen.html             # Bestellen-Seite
│
├── src/
│   ├── css/
│   │   └── style.css       # Hauptstylesheet
│   │
│   ├── js/
│   │   ├── main.js         # Hauptjavascript
│   │   ├── three.min.js    # Three.js Bibliothek für WebGL
│   │   └── webgl-components.js # WebGL-Visualisierungen und Animationen
│   │
│   └── images/             # Bilder und Icons
│       ├── nero-logo.svg
│       ├── nero-device.png
│       └── ...
│
├── LB_M293_V1.md          # Anforderungen und Bewertungskriterien für Modul 293
├── LitscherAlwin_LB_M293_V1.md # Pflichtenheft
└── README.md               # Projektübersicht
```

## Verwendete Technologien

- HTML5
- CSS3
- JavaScript
- Three.js für WebGL-Integration

## WebGL-Visualisierungen

Die Website verwendet einfache geometrische Formen für die WebGL-Visualisierungen:
- Gehäuse: Einfaches Quadrat mit minimaler Schwebeanimation
- Portabilität: Einfaches Dreieck mit minimaler Schwebeanimation
- PC-Anbindung: Einfacher Kreis mit minimaler Schwebeanimation

Diese vereinfachten Symbole ersetzen die ursprünglich komplexeren 3D-Modelle, um die Performance zu verbessern und die visuelle Klarheit zu erhöhen.

## Farben

Die Website verwendet folgende Primärfarben:
- Primär-Hell: #fbfcf8
- Primär-Cream: #fdf6e4
- Primär-Akzent: #ff9913

## Browser-Kompatibilität

Die Website wurde für folgende Browser optimiert:
- Google Chrome
- Mozilla Firefox

## Autor

Erstellt von Alwin Litscher
