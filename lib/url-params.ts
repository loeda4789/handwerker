import { ContentData } from '@/types/content';
import urlData from '@/data/url-data.json';

export interface UrlParams {
  firmenname?: string;
  strasse?: string;
  plz?: string;
  ort?: string;
  email?: string;
  telefon?: string;
}

export interface ExtractedUrlData {
  url_params: UrlParams;
  extracted_data: {
    timestamp: string;
    source_url: string;
  };
}

// Funktion zum Extrahieren der URL-Parameter
export function extractUrlParams(): UrlParams {
  if (typeof window === 'undefined') {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);
  
  return {
    firmenname: searchParams.get('firmenname') || undefined,
    strasse: searchParams.get('strasse') || undefined,
    plz: searchParams.get('plz') || undefined,
    ort: searchParams.get('ort') || undefined,
    email: searchParams.get('email') || undefined,
    telefon: searchParams.get('telefon') || undefined,
  };
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

// Funktion zum Speichern der URL-Parameter (für Entwicklung/Debugging)
export function saveUrlParamsToStorage(params: UrlParams): void {
  if (typeof window === 'undefined') return;
  
  const extractedData: ExtractedUrlData = {
    url_params: params,
    extracted_data: {
      timestamp: new Date().toISOString(),
      source_url: window.location.href
    }
  };
  
  try {
    localStorage.setItem('url-params-data', JSON.stringify(extractedData, null, 2));
    console.log('URL-Parameter gespeichert:', extractedData);
  } catch (error) {
    console.warn('Fehler beim Speichern der URL-Parameter:', error);
  }
}

// Funktion zum Laden gespeicherter URL-Parameter
export function loadUrlParamsFromStorage(): ExtractedUrlData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('url-params-data');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Fehler beim Laden der URL-Parameter:', error);
    return null;
  }
} 