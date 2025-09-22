'use client'

/**
 * Zentraler Event-Manager für optimierte Event-Listener-Verwaltung
 * Reduziert redundante Listener und verbessert Performance
 */

type EventCallback = (...args: any[]) => void

class EventManager {
  private static instance: EventManager
  private listeners: Map<string, Set<EventCallback>> = new Map()
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map()

  private constructor() {}

  static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager()
    }
    return EventManager.instance
  }

  /**
   * Fügt einen Event-Listener hinzu (verhindert Duplikate)
   */
  addEventListener(event: string, callback: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    
    this.listeners.get(event)!.add(callback)
    
    // Cleanup-Funktion zurückgeben
    return () => {
      this.removeEventListener(event, callback)
    }
  }

  /**
   * Entfernt einen Event-Listener
   */
  removeEventListener(event: string, callback: EventCallback): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.delete(callback)
      if (eventListeners.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  /**
   * Entfernt alle Listener für ein Event
   */
  removeAllListeners(event: string): void {
    this.listeners.delete(event)
  }

  /**
   * Entfernt alle Listener
   */
  removeAllListeners(): void {
    this.listeners.clear()
  }

  /**
   * Dispatched ein Event an alle Listener
   */
  dispatchEvent(event: string, ...args: any[]): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(...args)
        } catch (error) {
          console.error(`Fehler in Event-Listener für ${event}:`, error)
        }
      })
    }
  }

  /**
   * Debounced Event-Dispatch (verhindert zu häufige Ausführungen)
   */
  dispatchEventDebounced(event: string, delay: number = 16, ...args: any[]): void {
    const timerKey = `${event}-debounced`
    
    if (this.debounceTimers.has(timerKey)) {
      clearTimeout(this.debounceTimers.get(timerKey)!)
    }
    
    const timer = setTimeout(() => {
      this.dispatchEvent(event, ...args)
      this.debounceTimers.delete(timerKey)
    }, delay)
    
    this.debounceTimers.set(timerKey, timer)
  }

  /**
   * Gibt die Anzahl der Listener für ein Event zurück
   */
  getListenerCount(event: string): number {
    return this.listeners.get(event)?.size || 0
  }

  /**
   * Gibt alle registrierten Events zurück
   */
  getRegisteredEvents(): string[] {
    return Array.from(this.listeners.keys())
  }

  /**
   * Cleanup aller Timer
   */
  cleanup(): void {
    this.debounceTimers.forEach(timer => clearTimeout(timer))
    this.debounceTimers.clear()
    this.listeners.clear()
  }
}

// Singleton-Instanz exportieren
export const eventManager = EventManager.getInstance()

/**
 * Spezielle Event-Typen für die App
 */
export const APP_EVENTS = {
  CONFIG_CHANGED: 'config-changed',
  DESIGN_STYLE_CHANGED: 'design-style-changed',
  COLOR_SCHEME_CHANGED: 'color-scheme-changed',
  FONT_FAMILY_CHANGED: 'font-family-changed',
  STORAGE_CHANGED: 'storage-changed',
  URL_CHANGED: 'url-changed'
} as const

/**
 * Hook für React-Komponenten
 */
export function useEventManager() {
  return {
    addEventListener: (event: string, callback: EventCallback) => eventManager.addEventListener(event, callback),
    removeEventListener: (event: string, callback: EventCallback) => eventManager.removeEventListener(event, callback),
    dispatchEvent: (event: string, ...args: any[]) => eventManager.dispatchEvent(event, ...args),
    dispatchEventDebounced: (event: string, delay?: number, ...args: any[]) => eventManager.dispatchEventDebounced(event, delay, ...args)
  }
}

/**
 * Optimierte Storage-Event-Verwaltung
 */
export function setupOptimizedStorageListener() {
  if (typeof window === 'undefined') return () => {}

  let lastStorageData: Record<string, string> = {}
  
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key && e.newValue !== lastStorageData[e.key]) {
      lastStorageData[e.key] = e.newValue || ''
      
      // Debounced Event-Dispatch
      eventManager.dispatchEventDebounced(APP_EVENTS.STORAGE_CHANGED, 16, {
        key: e.key,
        newValue: e.newValue,
        oldValue: e.oldValue
      })
    }
  }

  window.addEventListener('storage', handleStorageChange)
  
  return () => {
    window.removeEventListener('storage', handleStorageChange)
  }
}

/**
 * Optimierte URL-Change-Verwaltung
 */
export function setupOptimizedUrlListener() {
  if (typeof window === 'undefined') return () => {}

  let lastUrl = window.location.href
  
  const handleUrlChange = () => {
    const currentUrl = window.location.href
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl
      eventManager.dispatchEventDebounced(APP_EVENTS.URL_CHANGED, 16, currentUrl)
    }
  }

  // Popstate Event
  window.addEventListener('popstate', handleUrlChange)
  
  // History API Override
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args)
    setTimeout(handleUrlChange, 0)
  }
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args)
    setTimeout(handleUrlChange, 0)
  }
  
  return () => {
    window.removeEventListener('popstate', handleUrlChange)
    history.pushState = originalPushState
    history.replaceState = originalReplaceState
  }
}
