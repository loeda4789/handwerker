import { ContentData, ThemeConfig } from '@/types/content';
import contentData from '@/data/content.json';
import dachdeckerContent from '@/data/dachdecker_content.json';
import elektrikerContent from '@/data/elektriker_content.json';
import themeData from '@/data/theme.json';
import { extractUrlParams, mergeUrlDataWithContent, saveUrlParamsToStorage, hasUrlParams } from '@/lib/url-params';

// Statische Content-Dateien für verschiedene Branchen
const contentMap: Record<string, ContentData> = {
  'dachdecker': dachdeckerContent as ContentData,
  'elektriker': elektrikerContent as ContentData,
  // Weitere Branchen können hier hinzugefügt werden:
  // 'maler': malerContent as ContentData,
};

// Funktion zum Laden von Content-Dateien basierend auf Branche
function loadContentByBranche(branche: string): ContentData | null {
  const content = contentMap[branche.toLowerCase()];
  if (content) {
    console.log(`Content für Branche "${branche}" geladen`);
    return content;
  }
  
  console.warn(`Content-Datei für Branche "${branche}" nicht gefunden. Fallback zu Standard-Content.`);
  return null;
}

export function getContentData(): ContentData {
  // Standard Content-Daten laden
  const baseContent = contentData as ContentData;
  
  // URL-Parameter extrahieren (nur im Browser)
  if (typeof window !== 'undefined') {
    const urlParams = extractUrlParams();
    
    // URL-Parameter speichern wenn vorhanden (für Debugging)
    if (hasUrlParams(urlParams)) {
      saveUrlParamsToStorage(urlParams);
      
      // URL-Daten mit Standard-Content zusammenführen
      return mergeUrlDataWithContent(baseContent, urlParams);
    }
  }
  
  // Fallback zu Standard-Content
  return baseContent;
}

// Funktion für branchenspezifisches Content-Laden (synchron)
export function getContentDataByBranche(): ContentData {
  // Standard Content-Daten laden
  const baseContent = contentData as ContentData;
  
  // URL-Parameter extrahieren (nur im Browser)
  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const branche = urlSearchParams.get('branche');
    
    // Wenn Branche-Parameter vorhanden ist, versuche branchenspezifische Content-Datei zu laden
    if (branche) {
      const branchenContent = loadContentByBranche(branche);
      if (branchenContent) {
        return branchenContent;
      }
    }
    
    // Normale URL-Parameter verarbeiten
    const urlParams = extractUrlParams();
    if (hasUrlParams(urlParams)) {
      saveUrlParamsToStorage(urlParams);
      return mergeUrlDataWithContent(baseContent, urlParams);
    }
  }
  
  // Fallback zu Standard-Content
  return baseContent;
}

export function getThemeConfig(): ThemeConfig {
  return themeData as ThemeConfig;
}

export function applyThemeToCSS(theme: ThemeConfig) {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    // Farben als CSS Custom Properties setzen
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--color-${cssVar}`, value);
    });
  }
}

// Hook für Client-Side Nutzung
export function useContent() {
  return getContentData();
}

export function useTheme() {
  return getThemeConfig();
} 