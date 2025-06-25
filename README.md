# Mustermann Handwerk GmbH - Website

Eine moderne, JSON-gesteuerte Website für Handwerksbetriebe mit Next.js, TypeScript und Tailwind CSS.

## 🚀 Features

- **JSON-gesteuerte Inhalte**: Alle Texte, Daten und Konfigurationen werden über JSON-Dateien verwaltet
- **Flexibles Farbschema**: Einfache Anpassung der Markenfarben über `data/theme.json`
- **Responsive Design**: Optimiert für alle Bildschirmgrößen
- **TypeScript**: Vollständig typisiert für bessere Entwicklererfahrung
- **Dark Mode**: Integrierte Dark Mode Unterstützung
- **Komponenten-basiert**: Modulare React-Komponenten für einfache Wartung

## 📁 Projekt Struktur

```
├── app/
│   ├── globals.css          # Globale Styles mit CSS-Variablen
│   ├── layout.tsx           # Root Layout
│   └── page.tsx             # Hauptseite
├── components/
│   ├── Header.tsx           # Navigation & Logo
│   ├── Hero.tsx             # Hero-Sektion
│   ├── About.tsx            # Über Uns-Sektion
│   ├── Services.tsx         # Leistungen
│   └── Contact.tsx          # Kontakt-Formular
├── data/
│   ├── content.json         # 📝 Alle Texte und Inhalte
│   └── theme.json           # 🎨 Farben und Styling
├── lib/
│   └── config.ts            # Konfigurations-Loader
├── types/
│   └── content.ts           # TypeScript Typen
└── public/
    └── images/              # Bilder
```

## ⚙️ Anpassung

### 1. Inhalte ändern

Bearbeiten Sie `data/content.json` um Texte, Firmenname, Services etc. anzupassen:

```json
{
  "company": {
    "name": "Ihr Firmenname",
    "tagline": "Ihr Slogan",
    "logo": "/images/logo.png"
  },
  "services": [
    {
      "title": "Ihre Leistung",
      "icon": "paintbrush",
      "description": "Beschreibung der Leistung"
    }
  ]
}
```

### 2. Farben anpassen

Bearbeiten Sie `data/theme.json` um die Markenfarben zu ändern:

```json
{
  "colors": {
    "primary": "#2563eb",    // Hauptfarbe
    "secondary": "#64748b",  // Sekundärfarbe  
    "accent": "#f59e0b",     // Akzentfarbe
    "background": "#ffffff", // Hintergrund
    // ...weitere Farben
  }
}
```

### 3. Bilder hinzufügen

Platzieren Sie Ihre Bilder in `public/images/`:
- `logo.png` - Firmenlogo
- `hero.jpg` - Hero-Hintergrundbild
- `about.jpg` - Über Uns Bild

## 🛠️ Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build für Produktion
npm run build

# Produktions-Server starten  
npm start
```

## 📱 Komponenten

### Header
- Responsive Navigation
- Logo aus JSON-Konfiguration
- Dark Mode Toggle
- Mobile Menu

### Hero
- Vollbild-Hintergrundbild
- Firmenname und Tagline aus JSON
- CTA-Button
- Scroll-Indikator

### About
- Über Uns Text aus JSON
- Feature-Liste mit Icons
- Responsive Layout

### Services
- Service-Grid
- Icons basierend auf JSON-Konfiguration
- Hover-Effekte

### Contact
- Kontaktinformationen aus JSON
- Kontaktformular
- Responsive Layout

## 🎨 Styling

Das Template nutzt:
- **Tailwind CSS** für Utility-first Styling
- **CSS Custom Properties** für dynamische Farben
- **Responsive Design** mit Mobile-First Ansatz
- **Dark Mode** mit Tailwind's dark: Prefix

## 📄 Lizenz

Dieses Template ist open source und frei verfügbar.

# Handwerker Template

Ein modernes und responsive Website-Template für Handwerksbetriebe mit Multi-Branchen-Support.

## Features

- ✅ **Multi-Branchen-System**: Über URL-Parameter zwischen verschiedenen Handwerksbranchen wechseln
- ✅ **Responsive Design**: Optimiert für alle Gerätegrößen
- ✅ **Modern UI**: Aktuelle Design-Trends und Benutzerfreundlichkeit
- ✅ **Performance**: Optimierte Bilder und schnelle Ladezeiten
- ✅ **Theme-System**: Anpassbare Farben und Stile
- ✅ **Hero-Varianten**: 4 verschiedene Hero-Stile verfügbar

## Hero-Varianten

Das Template unterstützt 4 verschiedene Hero-Varianten, die über die `hero.type` Eigenschaft in der `content.json` konfiguriert werden können:

### 1. Single (Standard)
```json
"hero": {
  "type": "single"
}
```
- **Beschreibung**: Klassischer Hero mit einem Hintergrundbild
- **Features**: 
  - Ken Burns Animation für das Hintergrundbild
  - Linksbündiger Content auf Desktop, zentriert auf Mobile
  - Fadeup-Animationen für Text und Button
  - Scroll-Indikator am unteren Rand
- **Ideal für**: Traditionelle Handwerksbetriebe, erste Eindrücke

### 2. Slider
```json
"hero": {
  "type": "slider"
}
```
- **Beschreibung**: Slideshow mit mehreren Inhalten
- **Features**:
  - Automatischer Wechsel alle 5 Sekunden
  - 2 Slides: Firmenname + Meisterqualität
  - Slide-Indikatoren am unteren Rand
  - Klickbare Navigation zwischen Slides
- **Ideal für**: Betriebe mit mehreren Kernbotschaften

### 3. 3D
```json
"hero": {
  "type": "3d"
}
```
- **Beschreibung**: Moderner 3D-Effekt mit Animationen
- **Features**:
  - 3D-Perspektive und Transform-Animationen
  - Floating Elemente im Hintergrund
  - Gradient-Overlays für bessere Lesbarkeit
  - Zwei CTA-Buttons (Primär + Sekundär)
  - GPU-beschleunigte Animationen
- **Ideal für**: Moderne, tech-affine Betriebe

### 4. Split
```json
"hero": {
  "type": "split"
}
```
- **Beschreibung**: Geteiltes Layout mit Content links und Bild rechts
- **Features**:
  - 50/50 Split auf Desktop
  - Content-Liste mit Benefits
  - Helles Theme mit Dark Mode Support
  - Zwei CTA-Buttons
  - Vollbild auf Mobile mit transparentem Overlay
- **Ideal für**: Detailorientierte Betriebe, die Features hervorheben möchten

## Konfiguration

Die Hero-Variante wird in der jeweiligen Content-Datei konfiguriert:

- `data/content.json` (Standard/Fliesenleger)
- `data/dachdecker_content.json`
- `data/elektriker_content.json`

### Beispiel-Konfiguration:
```json
{
  "hero": {
    "type": "slider",  // "single", "slider", "3d", "split"
    "backgroundImages": {
      "desktop": "/images/branchen/fliesenleger/hero/desktop/hero_background_desktop_alt.png",
      "mobile": "/images/branchen/fliesenleger/hero/mobile/hero_background_mobile.png",
      "desktopAlt": "/images/branchen/fliesenleger/hero/desktop/hero_background_desktop.png",
      "mobileAlt": "/images/branchen/fliesenleger/hero/mobile/hero_background_mobile_alt.png"
    }
  }
}
```

## Mobile Optimierung

Alle Hero-Varianten sind vollständig für Mobile optimiert:
- Responsive Schriftgrößen
- Touch-freundliche Buttons
- Angepasste Layouts für kleine Bildschirme
- Optimierte Bildgrößen

## Technische Details

- **Framework**: Next.js 15.3.3 mit TypeScript
- **Styling**: Tailwind CSS
- **Animationen**: CSS-basiert mit GPU-Beschleunigung
- **Bilder**: Next.js Image-Optimierung
- **Performance**: Preloading für Hero-Bilder

## Branchen-System

Das Template unterstützt verschiedene Handwerksbranchen über URL-Parameter:

### Verfügbare Branchen:
- **Fliesenleger** (Standard): `/?branche=fliesenleger`
- **Dachdecker**: `/?branche=dachdecker`
- **Elektriker**: `/?branche=elektriker`

### Bildstruktur:
```
public/images/branchen/[branche]/
├── about/
├── before-after/
├── hero/
│   ├── desktop/
│   └── mobile/
├── portfolio/
├── services/
└── team/
```

## Installation & Setup

1. **Dependencies installieren:**
```bash
npm install
```

2. **Entwicklungsserver starten:**
```bash
npm run dev
```

3. **Build für Produktion:**
```bash
npm run build
npm start
```

## Anpassungen

- **Farben**: Über CSS-Variablen in `app/globals.css`
- **Content**: JSON-Dateien in `data/`
- **Bilder**: Ordnerstruktur in `public/images/branchen/`
- **Komponenten**: React-Komponenten in `components/`

## Browser-Support

- Chrome/Edge (moderne Versionen)
- Firefox (moderne Versionen)
- Safari (moderne Versionen)
- Mobile Browser (iOS Safari, Chrome Mobile)

---

**Entwickelt für professionelle Handwerksbetriebe** ⚡ 