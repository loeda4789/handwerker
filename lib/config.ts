import { ContentData, ThemeConfig } from '@/types/content';
import contentData from '@/data/content.json';
import dachdeckerContent from '@/data/dachdecker_content.json';
import elektrikerContent from '@/data/elektriker_content.json';
import tischlerContent from '@/data/tischler_content.json';
import fliesenlegerContent from '@/data/fliesenleger_content.json';
import themeData from '@/data/theme.json';
import { getEffectiveUrlParams, mergeUrlDataWithContent, hasUrlParams } from '@/lib/url-params';

// Konstante für Branche-LocalStorage
const BRANCHE_STORAGE_KEY = 'handwerker-branche';

// Statische Content-Dateien für verschiedene Branchen
const contentMap: Record<string, ContentData> = {
  'dachdecker': dachdeckerContent as ContentData,
  'elektriker': elektrikerContent as ContentData,
  'tischler': tischlerContent as ContentData,
  'fliesenleger': fliesenlegerContent as ContentData,
  // Weitere Branchen können hier hinzugefügt werden:
  // 'maler': malerContent as ContentData,
  // 'sanitaer': sanitaerContent as ContentData,
  // 'heizung': heizungContent as ContentData,
};

// Funktion zum Laden von Content-Dateien basierend auf Branche
function loadContentByBranche(branche: string): ContentData | null {
  const content = contentMap[branche.toLowerCase()];
  if (content) {
    console.log(`📄 Content für Branche "${branche}" geladen`);
    return content;
  }
  
  console.warn(`⚠️ Content-Datei für Branche "${branche}" nicht gefunden. Verfügbare Branchen:`, Object.keys(contentMap));
  return null;
}

export function getContentData(): ContentData {
  // Standard Content-Daten laden
  const baseContent = contentData as ContentData;
  
  // URL-Parameter extrahieren (nur im Browser)
  if (typeof window !== 'undefined') {
    const urlParams = getEffectiveUrlParams();
    
    // URL-Daten mit Standard-Content zusammenführen wenn vorhanden
    if (hasUrlParams(urlParams)) {
      return mergeUrlDataWithContent(baseContent, urlParams);
    }
  }
  
  // Fallback zu Standard-Content
  return baseContent;
}

// Funktion für branchenspezifisches Content-Laden basierend auf Subdomain
export function getContentDataByBranche(): ContentData {
  // Standard Content-Daten laden
  const baseContent = contentData as ContentData;
  
  // Subdomain-Parameter extrahieren (nur im Browser)
  if (typeof window !== 'undefined') {
    console.log('🌐 Aktuelle URL:', window.location.href);
    console.log('🏠 Hostname:', window.location.hostname);
    
    // Verwende die Subdomain-Extraktion
    const urlParams = getEffectiveUrlParams();
    const branche = urlParams.branche;
    
    console.log('🔍 Extrahierte URL-Parameter:', urlParams);
    console.log('🏢 Erkannte Branche:', branche);
    
    // Wenn Branche aus Subdomain erkannt wurde, speichere sie in localStorage
    if (branche) {
      try {
        localStorage.setItem(BRANCHE_STORAGE_KEY, branche);
        console.log('💾 Branche aus Subdomain gespeichert:', branche);
      } catch (error) {
        console.warn('Fehler beim Speichern der Branche:', error);
      }
    } else {
      // Wenn keine Branche in Subdomain, versuche aus localStorage zu laden
      const storedBranche = localStorage.getItem(BRANCHE_STORAGE_KEY);
      if (storedBranche) {
        console.log('📦 Branche aus localStorage geladen:', storedBranche);
      } else {
        console.log('⚠️ Keine Branche erkannt, verwende Standard-Content');
      }
    }
    
    // Verwende Branche aus Subdomain oder localStorage
    const brancheToUse = branche || localStorage.getItem(BRANCHE_STORAGE_KEY);
    console.log('🎯 Zu verwendende Branche:', brancheToUse);
    
    // Wenn Branche erkannt wurde, versuche branchenspezifische Content-Datei zu laden
    let contentToUse = baseContent;
    if (brancheToUse) {
      const branchenContent = loadContentByBranche(brancheToUse);
      if (branchenContent) {
        console.log('✅ Branchenspezifischer Content geladen für:', brancheToUse);
        console.log('📄 Content-Details:', {
          companyName: branchenContent.company.name,
          tagline: branchenContent.company.tagline
        });
        contentToUse = branchenContent;
      } else {
        console.warn(`⚠️ Kein Content für Branche "${brancheToUse}" gefunden, verwende Standard-Content`);
      }
    }
    
    // Normale URL-Parameter verarbeiten (aus URL oder LocalStorage)
    if (hasUrlParams(urlParams)) {
      console.log('🔄 Wende URL-Parameter auf Content an');
      return mergeUrlDataWithContent(contentToUse, urlParams);
    }
    
    return contentToUse;
  }
  
  // Fallback zu Standard-Content
  console.log('🔄 Fallback zu Standard-Content (Server-Side)');
  return baseContent;
}

// Neue Funktion: Branche aus localStorage löschen
export function clearBrancheFromStorage(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(BRANCHE_STORAGE_KEY);
      console.log(' Branche aus localStorage gelöscht');
    } catch (error) {
      console.warn('Fehler beim Löschen der Branche:', error);
    }
  }
}

// Neue Funktion: Aktuelle Branche abrufen
export function getCurrentBranche(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(BRANCHE_STORAGE_KEY);
  }
  return null;
}

// Neue Funktion: Branche setzen
export function setBranche(branche: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(BRANCHE_STORAGE_KEY, branche);
      console.log(' Branche gesetzt:', branche);
      
      // Event dispatchen für andere Komponenten
      window.dispatchEvent(new CustomEvent('branche-changed', {
        detail: { branche }
      }));
    } catch (error) {
      console.warn('Fehler beim Setzen der Branche:', error);
    }
  }
}

// Neue Funktion: Verfügbare Branchen abrufen
export function getAvailableBranches(): string[] {
  return Object.keys(contentMap);
}

// Neue Funktion: Prüfen ob Branche verfügbar ist
export function isBrancheAvailable(branche: string): boolean {
  return Object.keys(contentMap).includes(branche.toLowerCase());
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

// Funktion zum Abrufen der Standard-Branche
export function getDefaultBranche(): string {
  return 'dachdecker'; // Standard-Branche
}
