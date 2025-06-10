import { ContentData, ThemeConfig } from '@/types/content';
import contentData from '@/data/content.json';
import themeData from '@/data/theme.json';
import { extractUrlParams, mergeUrlDataWithContent, saveUrlParamsToStorage, hasUrlParams } from '@/lib/url-params';

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