/**
 * Font Style Helper API
 * 
 * Bietet Funktionen zum dynamischen Wechseln der Font-Styles
 * basierend auf dem data-style Attribut am <body> Element.
 */

export type FontStyle = 'einfach' | 'standard' | 'modern'

/**
 * Setzt das data-style Attribut am <body> Element
 * @param style - Der gewünschte Font-Style
 */
export function setStyle(style: FontStyle): void {
  if (typeof window === 'undefined') return
  
  const body = document.body
  if (body) {
    body.setAttribute('data-style', style)
    
    // Optional: In localStorage speichern für Persistenz
    localStorage.setItem('font-style', style)
    
    console.log(`🎨 Font-Style geändert zu: ${style}`)
  }
}

/**
 * Liest den aktuellen Font-Style vom <body> Element
 * @returns Der aktuelle Font-Style oder 'standard' als Fallback
 */
export function getCurrentStyle(): FontStyle {
  if (typeof window === 'undefined') return 'standard'
  
  const body = document.body
  if (body) {
    const currentStyle = body.getAttribute('data-style') as FontStyle
    return currentStyle || 'standard'
  }
  
  return 'standard'
}

/**
 * Initialisiert den Font-Style beim Laden der Seite
 * - Liest aus localStorage (falls vorhanden)
 * - Liest aus URL Query Parameter ?style=modern
 * - Setzt data-style Attribut entsprechend
 */
export function initializeStyle(): void {
  if (typeof window === 'undefined') return
  
  // 1. URL Query Parameter prüfen
  const urlParams = new URLSearchParams(window.location.search)
  const urlStyle = urlParams.get('style') as FontStyle
  
  if (urlStyle && ['einfach', 'standard', 'modern'].includes(urlStyle)) {
    setStyle(urlStyle)
    return
  }
  
  // 2. localStorage prüfen
  const storedStyle = localStorage.getItem('font-style') as FontStyle
  if (storedStyle && ['einfach', 'standard', 'modern'].includes(storedStyle)) {
    setStyle(storedStyle)
    return
  }
  
  // 3. Default: standard
  setStyle('standard')
}

/**
 * Font-Mapping für die verschiedenen Styles
 */
export const FONT_MAPPING: Record<FontStyle, string> = {
  einfach: 'Raleway',
  standard: 'Montserrat', 
  modern: 'Space Grotesk'
}

/**
 * Gibt den Font-Namen für einen Style zurück
 * @param style - Der Font-Style
 * @returns Der Font-Name
 */
export function getFontName(style: FontStyle): string {
  return FONT_MAPPING[style]
}

/**
 * Event Listener für URL-Änderungen (für SPA-Navigation)
 * Wechselt automatisch den Style wenn sich die URL ändert
 */
export function setupStyleListener(): void {
  if (typeof window === 'undefined') return
  
  // Initialisierung beim Laden
  initializeStyle()
  
  // Event Listener für URL-Änderungen
  window.addEventListener('popstate', () => {
    initializeStyle()
  })
  
  // Event Listener für pushState/replaceState (für SPA-Navigation)
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args)
    setTimeout(initializeStyle, 0)
  }
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args)
    setTimeout(initializeStyle, 0)
  }
}

/**
 * React Hook für Font-Style Management
 * @returns Object mit currentStyle, setStyle und getFontName
 */
export function useFontStyle() {
  if (typeof window === 'undefined') {
    return {
      currentStyle: 'standard' as FontStyle,
      setStyle: () => {},
      getFontName: () => 'Montserrat'
    }
  }
  
  return {
    currentStyle: getCurrentStyle(),
    setStyle,
    getFontName: (style?: FontStyle) => getFontName(style || getCurrentStyle())
  }
}
