# Branchenspezifisches Content-System

Das Handwerker-Template unterstützt jetzt verschiedene Branchen über URL-Parameter und spezifische Content-Dateien.

## Funktionsweise

### URL-Parameter
Das System erkennt den URL-Parameter `branche` und lädt automatisch die entsprechende Content-Datei:

```
https://ihre-domain.de/?branche=dachdecker
https://ihre-domain.de/?branche=elektriker
https://ihre-domain.de/?branche=maler
```

### Content-Dateien
Für jede Branche wird eine separate JSON-Datei im `data/` Ordner erstellt:

- `data/content.json` - Standard-Content (Fliesenleger)
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
https://handwerker-template.de/
```

### Dachdecker
```
https://handwerker-template.de/?branche=dachdecker
```

### Zukünftige Branchen
```
https://handwerker-template.de/?branche=elektriker
https://handwerker-template.de/?branche=maler
https://handwerker-template.de/?branche=sanitaer
https://handwerker-template.de/?branche=heizung
```

## Fallback-Verhalten
- Wenn keine `branche` angegeben wird → Standard `content.json`
- Wenn `branche` nicht existiert → Fallback zu Standard `content.json`
- Console-Warnung bei fehlenden Content-Dateien

## SEO-Optimierung
Für bessere SEO können Sie später separate Routen implementieren:
```
/dachdecker
/elektriker
/maler
```
Diese würden intern die gleichen Content-Parameter setzen. 