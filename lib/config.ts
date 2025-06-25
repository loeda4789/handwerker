import { ContentData, ThemeConfig } from '@/types/content';
import contentData from '@/data/content.json';
import themeData from '@/data/theme.json';
import { extractUrlParams, mergeUrlDataWithContent, saveUrlParamsToStorage, hasUrlParams } from '@/lib/url-params';

// Funktion zum dynamischen Laden von Content-Dateien basierend auf Branche
async function loadContentByBranche(branche: string): Promise<ContentData | null> {
  try {
    // Versuche branchenspezifische Content-Datei zu laden
    const contentModule = await import(`@/data/${branche}_content.json`);
    return contentModule.default as ContentData;
  } catch (error) {
    console.warn(`Content-Datei für Branche "${branche}" nicht gefunden. Fallback zu Standard-Content.`);
    return null;
  }
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

// Neue asynchrone Funktion für branchenspezifisches Content-Laden
export async function getContentDataAsync(): Promise<ContentData> {
  // Standard Content-Daten laden
  const baseContent = contentData as ContentData;
  
  // URL-Parameter extrahieren (nur im Browser)
  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const branche = urlSearchParams.get('branche');
    
    // Wenn Branche-Parameter vorhanden ist, versuche branchenspezifische Content-Datei zu laden
    if (branche) {
      const branchenContent = await loadContentByBranche(branche);
      if (branchenContent) {
        console.log(`Content für Branche "${branche}" geladen`);
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