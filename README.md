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