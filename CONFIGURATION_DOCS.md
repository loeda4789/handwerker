# Konfigurations-Dokumentation

## Übersicht
Diese Dokumentation beschreibt alle verfügbaren Konfigurationsmöglichkeiten im Website-Designer und deren Bedeutung.

## Hero-Typ Konfigurationen

### Aktuell aktiv
- **Single**: Vollbild mit Text überlagert
- **Split**: Bild links, Text rechts  
- **Carousel**: Mehrere Bilder im Wechsel

### Temporär deaktiviert
- **Video**: Hero-Bereich mit Video-Hintergrund (auskommentiert für vereinfachte Konfiguration)

### Code-Referenz
```typescript
// In components/config/ConfigSidebar.tsx
const heroTypes = [
  { key: 'single', label: 'Single', icon: MdImage },
  { key: 'split', label: 'Split', icon: MdViewQuilt },
  { key: 'carousel', label: 'Carousel', icon: MdViewCarousel },
  // { key: 'video', label: 'Video', icon: MdPlayArrow }, // AUSKOMMENTIERT
]
```

## Mobile Navigation Konfigurationen

### Verfügbare Typen
- **Vollbild**: Navigation übernimmt den gesamten Bildschirm
- **Seitenleiste**: Navigation schiebt sich von rechts ein
- **Dropdown**: Navigation erscheint von oben als Dropdown

### Code-Referenz
```typescript
// In components/config/ConfigSidebar.tsx
const mobileTypes = [
  { key: 'fullscreen', label: 'Vollbild', icon: MdViewQuilt },
  { key: 'sidebar', label: 'Seitenleiste', icon: MdSettings },
  { key: 'dropdown', label: 'Dropdown', icon: MdDescription }
]
```

## Varianten Konfigurationen

### Verfügbare Varianten
- **Starter**: One-Page Website für kleine Unternehmen (79€/Monat)
- **Professional**: One-Page mit erweiterten Features (119€/Monat)
- **Premium**: Multi-Page mit allen Unterseiten (159€/Monat)

### Code-Referenz
```typescript
// In components/config/ConfigSidebar.tsx
const bestellerVariants = [
  { id: 'starter', name: 'Starter', description: 'One-Page Website für kleine...', price: '79€ /Monat' },
  { id: 'professional', name: 'Professionell', description: 'One-Page mit Leistungssektor...', price: '119€ /Monat' },
  { id: 'premium', name: 'Premium', description: 'Multi-Page mit allen Unterseiten...', price: '159€ /Monat' }
]
```

## Stil-Pakete Konfigurationen (Vereinheitlicht)

### Verfügbare Pakete
- **Einfach**: Minimalistisches Design mit klaren Linien
- **Standard**: Ausgewogenes Design mit subtilen Akzenten
- **Modern**: Dynamisches Design mit Animationen und modernen Elementen

### Code-Referenz
```typescript
// In lib/config/unifiedStyles.ts
export const UNIFIED_STYLES: UnifiedStyle[] = [
  { id: 'einfach', name: 'Einfach', description: 'Minimalistisch und klar' },
  { id: 'standard', name: 'Standard', description: 'Ausgewogen und professionell' },
  { id: 'modern', name: 'Modern', description: 'Dynamisch und zeitgemäß' }
]
```

### Automatische Anpassungen
Bei der Auswahl eines Stils werden automatisch angepasst:
- **Typography**: Schriftart, Größen, Zeilenhöhen
- **Spacing**: Abstände zwischen Elementen
- **Design**: Border-Radius, Schatten, Rahmen
- **Interactive**: Badges, Unterstreichungen, Buttons, Hover-Effekte
- **Animations**: Übergänge, Scroll-Effekte, Mikro-Interaktionen

## Features Konfigurationen

### Desktop Features
- **Kontakt-Leiste**: Feste Leiste am oberen Bildschirmrand
- **Seiten-Kontakt**: Schwebender Kontakt-Button an der Seite

### Mobile Features
- **Mobile Navigation**: Verschiedene Navigationstypen für mobile Geräte

### Code-Referenz
```typescript
// In components/config/ConfigSidebar.tsx
const desktopFeatures = [
  { key: 'contactBar', label: 'Kontakt-Leiste', icon: MdCall },
  { key: 'sideContact', label: 'Seiten-Kontakt', icon: MdPhone }
]

const mobileFeatures = [
  // Zukünftig erweiterbar
]
```

## Temporär deaktivierte Konfigurationen

### Hero-Typ Video
- **Status**: Auskommentiert
- **Grund**: Vereinfachung der Konfiguration
- **Wiedereinblendung**: Einfach Kommentar entfernen in `ConfigSidebar.tsx`
- **Zeile**: ~178 in `heroTypes` Array

### Mobile Navigation
- **Status**: Aus ConfigSidebar entfernt, in ConfigCard verschoben
- **Grund**: Vereinfachung der Sidebar, mobile-spezifische Konfiguration
- **Aktueller Stand**: Nur in ConfigCard sichtbar (nur auf Mobile)
- **Design**: Gleiche Struktur wie andere Sektionen

### Stil-Pakete (Vereinheitlicht)
- **Status**: Vollständig auf unifiedStyles umgestellt
- **Grund**: Vereinfachung und bessere Wartbarkeit
- **Neue Struktur**: 3 Stile (Einfach/Standard/Modern) mit automatischen Anpassungen
- **Vorteile**: Einheitliches System, weniger Code-Duplikation, einfachere Wartung

### Wiedereinblendung
Um Video wieder zu aktivieren:
1. In `components/config/ConfigSidebar.tsx` suchen nach `heroTypes`
2. Kommentar `// { key: 'video', ... }` entfernen
3. Build testen

## Zukünftige Erweiterungen

### Geplante Features
- **Video Hero**: Video-Hintergrund für Hero-Bereich
- **Animationen**: Erweiterte Animationen für verschiedene Elemente
- **Themes**: Zusätzliche Farbthemen
- **Layouts**: Weitere Layout-Varianten

### Dokumentationspflege
- Bei Änderungen an Konfigurationen diese Datei aktualisieren
- Code-Referenzen aktuell halten
- Temporär deaktivierte Features dokumentieren
- Wiedereinblendungsanweisungen bereitstellen
