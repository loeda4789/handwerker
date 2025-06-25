# 📁 Bildordner-Struktur für Handwerker-Template

## Übersicht

Die Bildordner sind nach Branchen, Gerätetypen und Sektoren strukturiert, um eine optimale Organisation und einfache Wartung zu gewährleisten.

## 🏗️ Hauptstruktur

```
public/images/
├── branchen/           # Branchenspezifische Bilder
│   ├── fliesenleger/
│   ├── dachdecker/
│   ├── elektriker/
│   ├── maler/
│   ├── sanitaer/
│   └── heizung/
└── common/             # Gemeinsame Bilder (branchenübergreifend)
    ├── icons/
    ├── logos/
    ├── patterns/
    └── placeholder/
```

## 🎯 Branchenspezifische Struktur

Jede Branche hat folgende Unterordner:

### 📱 Hero-Bereich (Responsive)
```
branchen/[branche]/hero/
├── desktop/            # Desktop-Hintergrundbilder
└── mobile/             # Mobile-Hintergrundbilder
```

### 🛠️ Services (Nach Service-Typ)
```
branchen/[branche]/services/
├── [service-typ-1]/
├── [service-typ-2]/
└── [service-typ-n]/
```

### 🏆 Portfolio
```
branchen/[branche]/portfolio/
```

### 🔄 Vorher/Nachher
```
branchen/[branche]/before-after/
```

### 👋 Über uns
```
branchen/[branche]/about/
```

### 👥 Team
```
branchen/[branche]/team/
```

## 🔧 Service-Untertypen nach Branche

### 🔲 Fliesenleger
- `badezimmer/` - Badezimmer-Fliesenarbeiten
- `kueche/` - Küchen-Fliesenarbeiten
- `aussenbereiche/` - Terrassen, Balkone
- `reparaturen/` - Fugen, Reparaturen
- `mosaik/` - Mosaik-Designs

### 🏠 Dachdecker
- `sanierung/` - Dachsanierungen
- `neubau/` - Dachneubau
- `dachrinnen/` - Dachrinnen & Entwässerung
- `dachfenster/` - Dachfenster & Gauben
- `reparaturen/` - Sturmschäden & Reparaturen

### ⚡ Elektriker
- `installation/` - Elektroinstallationen
- `smarthome/` - Smart Home Systeme
- `photovoltaik/` - PV-Anlagen & Solar
- `beleuchtung/` - LED & Beleuchtung
- `notdienst/` - Elektro-Notdienst

### 🎨 Maler
- `innenanstrich/` - Innenanstriche
- `aussenanstrich/` - Außenanstriche
- `tapezieren/` - Tapezierarbeiten
- `fassade/` - Fassadengestaltung
- `renovation/` - Renovierungen

### 🚿 Sanitär
- `installation/` - Sanitärinstallationen
- `reparaturen/` - Reparaturen
- `badmodernisierung/` - Badmodernisierung
- `heizung/` - Heizungsinstallation
- `notdienst/` - Sanitär-Notdienst

### 🔥 Heizung
- `gasheizung/` - Gasheizungen
- `waermepumpe/` - Wärmepumpen
- `solar/` - Solarthermie
- `wartung/` - Wartung & Service
- `notdienst/` - Heizungs-Notdienst

## 🌐 Gemeinsame Bilder (Common)

### 🎨 Icons
```
common/icons/
```
- Allgemeine Icons für UI-Elemente
- Branchenübergreifende Service-Icons
- Navigationselemente

### 🏷️ Logos
```
common/logos/
```
- Haupt-Logo (verschiedene Varianten)
- Partner-Logos
- Zertifizierungs-Logos

### 🖼️ Patterns
```
common/patterns/
```
- Hintergrundmuster
- Texturen
- Dekorative Elemente

### 📷 Placeholder
```
common/placeholder/
```
- Platzhalter-Bilder für Development
- Standard-Fallback-Bilder

## 📝 Benennungskonventionen

### Dateinamen-Format:
```
[bereich]_[beschreibung]_[variante].[ext]
```

**Beispiele:**
- `hero_background_desktop.jpg`
- `hero_background_mobile.jpg`
- `service_badezimmer_projekt1.jpg`
- `portfolio_renovation_vorher.jpg`
- `portfolio_renovation_nachher.jpg`
- `team_meister_portrait.jpg`

### Responsive Varianten:
- `_desktop` - Desktop-Version (1920px+)
- `_tablet` - Tablet-Version (768px-1919px)
- `_mobile` - Mobile-Version (bis 767px)

### Before/After Kennzeichnung:
- `_vorher` - Vorher-Zustand
- `_nachher` - Nachher-Zustand

## 🔗 Integration in Content-Dateien

### Hero-Hintergründe:
```json
"hero": {
  "backgroundImages": {
    "desktop": "/images/branchen/elektriker/hero/desktop/hero_background_desktop.jpg",
    "mobile": "/images/branchen/elektriker/hero/mobile/hero_background_mobile.jpg"
  }
}
```

### Service-Bilder:
```json
"services": [
  {
    "title": "Smart Home",
    "image": "/images/branchen/elektriker/services/smarthome/service_smarthome_main.jpg"
  }
]
```

### Portfolio-Projekte:
```json
"portfolio": {
  "projects": [
    {
      "title": "KNX Installation",
      "image": "/images/branchen/elektriker/portfolio/portfolio_knx_projekt.jpg"
    }
  ]
}
```

## ⚙️ Automatische Erstellung

Die komplette Ordnerstruktur kann mit dem PowerShell-Skript `create_image_structure.ps1` automatisch erstellt werden:

```powershell
.\create_image_structure.ps1
```

## 💡 Vorteile dieser Struktur

1. **🎯 Branchenspezifisch** - Klare Trennung zwischen verschiedenen Handwerksbranchen
2. **📱 Responsive** - Separate Ordner für Desktop und Mobile
3. **🔧 Service-orientiert** - Bilder nach Dienstleistungstypen organisiert
4. **🔄 Skalierbar** - Einfaches Hinzufügen neuer Branchen
5. **🌐 Gemeinsame Ressourcen** - Wiederverwendbare Elemente in `common/`
6. **📝 Konsistent** - Einheitliche Namenskonventionen
7. **🔍 Übersichtlich** - Logische Hierarchie für einfache Navigation 