// Test-Datei für Branche-Funktionalität
// Diese Datei kann nach dem Testen gelöscht werden

import { 
  getContentDataByBranche, 
  getCurrentBranche, 
  setBranche, 
  clearBrancheFromStorage,
  getAvailableBranches,
  isBrancheAvailable 
} from '@/lib/config';

// Test-Funktionen
export function testBrancheFunctionality() {
  console.log(' Teste Branche-Funktionalität...');
  
  // 1. Verfügbare Branchen anzeigen
  console.log(' Verfügbare Branchen:', getAvailableBranches());
  
  // 2. Aktuelle Branche abrufen
  const currentBranche = getCurrentBranche();
  console.log(' Aktuelle Branche:', currentBranche);
  
  // 3. Branche setzen
  setBranche('fliesenleger');
  console.log(' Branche auf fliesenleger gesetzt');
  
  // 4. Content für aktuelle Branche laden
  const content = getContentDataByBranche();
  console.log(' Content geladen:', content.company.name);
  
  // 5. Branche-Validierung
  console.log(' fliesenleger verfügbar:', isBrancheAvailable('fliesenleger'));
  console.log(' invalid verfügbar:', isBrancheAvailable('invalid'));
  
  return {
    availableBranches: getAvailableBranches(),
    currentBranche: getCurrentBranche(),
    content: content
  };
}

// URL-Parameter Test
export function testUrlParameter() {
  console.log(' Teste URL-Parameter...');
  
  // Simuliere URL mit Branche-Parameter
  const testUrl = 'https://example.com/?branche=elektriker';
  const url = new URL(testUrl);
  const branche = url.searchParams.get('branche');
  
  console.log(' URL-Parameter branche:', branche);
  
  if (branche) {
    setBranche(branche);
    const content = getContentDataByBranche();
    console.log(' Content für', branche, ':', content.company.name);
  }
}

// Cleanup-Funktion
export function cleanupBrancheTest() {
  console.log(' Cleanup Branche-Test...');
  clearBrancheFromStorage();
  console.log(' Branche-Test bereinigt');
}
