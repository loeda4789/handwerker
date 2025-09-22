import { ContentData } from '@/types/content';
import urlData from '@/data/url-data.json';

export interface UrlParams {
  firmenname?: string;
  strasse?: string;
  plz?: string;
  ort?: string;
  email?: string;
  telefon?: string;
  branche?: string;
}

export interface ExtractedUrlData {
  url_params: UrlParams;
  extracted_data: {
    timestamp: string;
    source_url: string;
  };
}

// Konstante für LocalStorage-Key
const URL_PARAMS_STORAGE_KEY = 'handwerker-url-params';

// Funktion zum Extrahieren der URL-Parameter
export function extractUrlParams(): UrlParams {
  if (typeof window === 'undefined') {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);
  
  const params = {
    firmenname: searchParams.get('firmenname') || undefined,
    strasse: searchParams.get('strasse') || undefined,
    plz: searchParams.get('plz') || undefined,
    ort: searchParams.get('ort') || undefined,
    email: searchParams.get('email') || undefined,
    telefon: searchParams.get('telefon') || undefined,
    branche: searchParams.get('branche') || undefined,
  };
  
  console.log('🔍 URL-Parameter extrahiert:', params);
  return params;
}

// Funktion zum URL-Dekodieren der Parameter
export function decodeUrlParams(params: UrlParams): UrlParams {
  const decoded: UrlParams = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      try {
        decoded[key as keyof UrlParams] = decodeURIComponent(value);
      } catch (error) {
        console.warn(`Fehler beim Dekodieren von ${key}:`, error);
        decoded[key as keyof UrlParams] = value;
      }
    }
  });
  
  return decoded;
}

// Funktion zur Überprüfung ob URL-Parameter vorhanden sind
export function hasUrlParams(params: UrlParams): boolean {
  return Object.values(params).some(value => value && value.trim() !== '');
}

// Funktion zum Speichern der URL-Parameter in LocalStorage
export function saveUrlParamsToLocalStorage(params: UrlParams): void {
  if (typeof window === 'undefined') return;
  
  const extractedData: ExtractedUrlData = {
    url_params: params,
    extracted_data: {
      timestamp: new Date().toISOString(),
      source_url: window.location.href
    }
  };
  
  try {
    localStorage.setItem(URL_PARAMS_STORAGE_KEY, JSON.stringify(extractedData));
    console.log('URL-Parameter in LocalStorage gespeichert:', extractedData);
  } catch (error) {
    console.warn('Fehler beim Speichern der URL-Parameter:', error);
  }
}

// Funktion zum Laden der URL-Parameter aus LocalStorage
export function loadUrlParamsFromLocalStorage(): UrlParams {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(URL_PARAMS_STORAGE_KEY);
    if (stored) {
      const data: ExtractedUrlData = JSON.parse(stored);
      return data.url_params || {};
    }
  } catch (error) {
    console.warn('Fehler beim Laden der URL-Parameter aus LocalStorage:', error);
  }
  
  return {};
}

// Funktion zum Löschen der URL-Parameter aus LocalStorage
export function clearUrlParamsFromLocalStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(URL_PARAMS_STORAGE_KEY);
    console.log('URL-Parameter aus LocalStorage gelöscht');
  } catch (error) {
    console.warn('Fehler beim Löschen der URL-Parameter:', error);
  }
}

// Hauptfunktion: Kombiniert URL-Parameter mit gespeicherten Parametern
export function getEffectiveUrlParams(): UrlParams {
  if (typeof window === 'undefined') return {};
  
  // 1. Erst URL-Parameter versuchen
  const urlParams = extractUrlParams();
  
  // 2. Wenn URL-Parameter vorhanden sind, diese speichern und verwenden
  if (hasUrlParams(urlParams)) {
    saveUrlParamsToLocalStorage(urlParams);
    return urlParams;
  }
  
  // 3. Sonst gespeicherte Parameter aus LocalStorage laden
  const storedParams = loadUrlParamsFromLocalStorage();
  if (hasUrlParams(storedParams)) {
    console.log('Verwende gespeicherte URL-Parameter aus LocalStorage:', storedParams);
    return storedParams;
  }
  
  // 4. Fallback: keine Parameter
  return {};
}

// Funktion zum Zusammenführen der URL-Daten mit Content-Daten
export function mergeUrlDataWithContent(contentData: ContentData, urlParams: UrlParams): ContentData {
  if (!hasUrlParams(urlParams)) {
    return contentData;
  }

  const decodedParams = decodeUrlParams(urlParams);
  
  // Erstelle eine Kopie der Content-Daten
  const mergedData = JSON.parse(JSON.stringify(contentData)) as ContentData;
  
  // Firmenname übernehmen
  if (decodedParams.firmenname) {
    mergedData.company.name = decodedParams.firmenname;
    mergedData.welcome.headline = `Willkommen bei\n${decodedParams.firmenname}`;
  }
  
  // Kontaktdaten übernehmen
  if (decodedParams.email) {
    mergedData.contact.email = decodedParams.email;
  }
  
  if (decodedParams.telefon) {
    mergedData.contact.phone = decodedParams.telefon;
    console.log('📞 Telefonnummer aus URL-Parametern geladen:', decodedParams.telefon);
  }
  
  // Ort im About-Text dynamisch ersetzen
  if (decodedParams.ort && mergedData.about && mergedData.about.text) {
    // Suche nach Mustern wie "in [Stadt] und Umgebung" und ersetze [Stadt] durch den URL-Parameter
    const ortPattern = /in\s+[A-Za-zäöüß\s-]+\s+und\s+Umgebung/g;
    mergedData.about.text = mergedData.about.text.replace(ortPattern, `in ${decodedParams.ort} und Umgebung`);
    
    // Falls kein "in [Stadt] und Umgebung" Muster gefunden wird, füge es direkt nach dem ersten Satz hinzu
    if (!ortPattern.test(mergedData.about.text)) {
      // Ersetze den ersten Punkt durch ", in [Ort] und Umgebung" (ohne Punkt)
      mergedData.about.text = mergedData.about.text.replace(/^([^.]*)\./, `$1 in ${decodedParams.ort} und Umgebung.`);
    }
  }
  
  // Adresse zusammensetzen
  const addressParts = [];
  if (decodedParams.strasse) addressParts.push(decodedParams.strasse);
  
  // PLZ und Ort zusammenfassen ohne Komma dazwischen
  const plzOrtParts = [];
  if (decodedParams.plz) plzOrtParts.push(decodedParams.plz);
  if (decodedParams.ort) plzOrtParts.push(decodedParams.ort);
  
  if (plzOrtParts.length > 0) {
    addressParts.push(plzOrtParts.join(' '));
  }
  
  if (addressParts.length > 0) {
    mergedData.contact.address = addressParts.join(', ');
  }
  
  return mergedData;
}

// Legacy-Funktionen für Rückwärtskompatibilität
export function saveUrlParamsToStorage(params: UrlParams): void {
  return saveUrlParamsToLocalStorage(params);
}

export function loadUrlParamsFromStorage(): ExtractedUrlData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(URL_PARAMS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Fehler beim Laden der URL-Parameter:', error);
    return null;
  }
} 