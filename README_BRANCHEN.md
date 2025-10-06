# Branchenspezifisches Content-System

Das Handwerker-Template unterstützt jetzt verschiedene Branchen über Subdomains und spezifische Content-Dateien.

## Funktionsweise

### Subdomains
Das System erkennt die Subdomain und lädt automatisch die entsprechende Content-Datei:

```
https://dachdecker.ml-websolutions.de
https://elektriker.ml-websolutions.de
https://tischler.ml-websolutions.de
https://fliesenleger.ml-websolutions.de
```

### Content-Dateien
Für jede Branche wird eine separate JSON-Datei im `data/` Ordner erstellt:

- `data/content.json` - Standard-Content (Elektriker)
- `data/dachdecker_content.json` - Dachdecker-spezifischer Content
- `data/elektriker_content.json` - Elektriker-spezifischer Content
- `data/maler_content.json` - Maler-spezifischer Content

## Verfügbare Branchen

### 🏠 Dachdecker (`?branche=dachdecker`)
**Firma:** Mustermann Dachbau GmbH
**Spezialisierung:** Dachsanierung, Dachneubau, Dachrinnen & Entwässerung, Dachfenster & Gauben, Sturmschäden & Reparaturen

**Services:**
- Dachsanierung
- Dachneubau  
- Dachrinnen & Entwässerung
- Dachfenster & Gauben
- Sturmschäden & Reparaturen

### ⚡ Elektriker (`?branche=elektriker`)
**Firma:** Mustermann Elektrotechnik GmbH
**Spezialisierung:** Elektroinstallation, Smart Home, Photovoltaik & Solar, Beleuchtung & LED, Elektro-Notdienst

**Services:**
- Elektroinstallation
- Smart Home
- Photovoltaik & Solar
- Beleuchtung & LED
- Elektro-Notdienst

## Neue Branche hinzufügen

### 1. Content-Datei erstellen
Erstellen Sie eine neue JSON-Datei: `data/[branche]_content.json`

```json
{
  "company": {
    "name": "Mustermann [Branche] GmbH",
    "tagline": "Ihr zuverlässiger [Branche]-Partner",
    "logo": "/images/logo.png"
  },
  // ... weitere Inhalte
}
```

### 2. Branchenspezifische Anpassungen
- **Services:** Angepasste Leistungen für die Branche
- **Team:** Branchenspezifische Teammitglieder und Spezialisierungen
- **Portfolio:** Relevante Projekte und Referenzen
- **Testimonials:** Passende Kundenbewertungen
- **Stats:** Branchenspezifische Statistiken
- **Hero-Bilder:** Passende Hintergrundbilder

### 3. Bilder hinzufügen
Erstellen Sie branchenspezifische Bilder in:
- `/public/images/services/[branche]-*.png`
- `/public/images/portfolio/[branche]-*.jpg`
- `/public/images/hero-background-[branche].png`

## Technische Implementierung

### Automatisches Content-Laden
```typescript
// In lib/config.ts
export async function getContentDataAsync(): Promise<ContentData> {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const branche = urlSearchParams.get('branche');
  
  if (branche) {
    const branchenContent = await loadContentByBranche(branche);
    if (branchenContent) {
      return branchenContent;
    }
  }
  
  return baseContent;
}
```

### Hook für React-Komponenten
```typescript
// In components
export default function Home() {
  const baseContent = getContentData()
  const { content, loading } = useContentWithBranche(baseContent)
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return <MainContent content={content} />
}
```

## Beispiel-URLs

### Standard (Fliesenleger)
```
https://ml-websolutions.de/
```

### Dachdecker
```
https://dachdecker.ml-websolutions.de
```

### Elektriker
```
https://elektriker.ml-websolutions.de
```

### Tischler
```
https://tischler.ml-websolutions.de
```

### Fliesenleger
```
https://fliesenleger.ml-websolutions.de
```

### Zukünftige Branchen
```
https://maler.ml-websolutions.de
https://sanitaer.ml-websolutions.de
https://heizung.ml-websolutions.de
```

## Fallback-Verhalten
- Wenn keine Subdomain erkannt wird → Standard `content.json`
- Wenn Subdomain nicht existiert → Fallback zu Standard `content.json`
- Console-Warnung bei fehlenden Content-Dateien
- LocalStorage speichert die letzte erkannte Branche für bessere Performance

## Subdomain-Konfiguration

### DNS-Einstellungen
Jede Subdomain muss auf die gleiche IP-Adresse zeigen:
```
dachdecker.ml-websolutions.de → 76.76.21.21
elektriker.ml-websolutions.de → 76.76.21.21
tischler.ml-websolutions.de → 76.76.21.21
fliesenleger.ml-websolutions.de → 76.76.21.21
```

### Next.js Konfiguration
Die `next.config.js` muss für Subdomains konfiguriert werden:
```javascript
module.exports = {
  // ... andere Konfigurationen
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
};
``` 