'use client'

/**
 * Performance-Monitor für Konfigurationssystem
 * Überwacht und optimiert Performance-Metriken
 */

interface PerformanceMetrics {
  configLoadTime: number
  styleApplicationTime: number
  localStorageAccessCount: number
  domManipulationCount: number
  eventListenerCount: number
  cacheHitRate: number
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetrics = {
    configLoadTime: 0,
    styleApplicationTime: 0,
    localStorageAccessCount: 0,
    domManipulationCount: 0,
    eventListenerCount: 0,
    cacheHitRate: 0
  }
  private startTimes: Map<string, number> = new Map()
  private localStorageAccesses: number = 0
  private domManipulations: number = 0
  private cacheHits: number = 0
  private cacheMisses: number = 0

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  /**
   * Startet eine Performance-Messung
   */
  startMeasurement(name: string): void {
    this.startTimes.set(name, performance.now())
  }

  /**
   * Beendet eine Performance-Messung
   */
  endMeasurement(name: string): number {
    const startTime = this.startTimes.get(name)
    if (!startTime) return 0

    const duration = performance.now() - startTime
    this.startTimes.delete(name)

    // Spezifische Metriken aktualisieren
    switch (name) {
      case 'configLoad':
        this.metrics.configLoadTime = duration
        break
      case 'styleApplication':
        this.metrics.styleApplicationTime = duration
        break
    }

    return duration
  }

  /**
   * Registriert localStorage-Zugriff
   */
  recordLocalStorageAccess(): void {
    this.localStorageAccesses++
    this.metrics.localStorageAccessCount = this.localStorageAccesses
  }

  /**
   * Registriert DOM-Manipulation
   */
  recordDOMManipulation(): void {
    this.domManipulations++
    this.metrics.domManipulationCount = this.domManipulations
  }

  /**
   * Registriert Cache-Treffer
   */
  recordCacheHit(): void {
    this.cacheHits++
    this.updateCacheHitRate()
  }

  /**
   * Registriert Cache-Fehler
   */
  recordCacheMiss(): void {
    this.cacheMisses++
    this.updateCacheHitRate()
  }

  /**
   * Aktualisiert Cache-Hit-Rate
   */
  private updateCacheHitRate(): void {
    const total = this.cacheHits + this.cacheMisses
    this.metrics.cacheHitRate = total > 0 ? (this.cacheHits / total) * 100 : 0
  }

  /**
   * Registriert Event-Listener-Anzahl
   */
  updateEventListenerCount(count: number): void {
    this.metrics.eventListenerCount = count
  }

  /**
   * Gibt aktuelle Metriken zurück
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  /**
   * Gibt Performance-Report zurück
   */
  getReport(): string {
    const report = `
🚀 Performance Report:
├─ Config Load Time: ${this.metrics.configLoadTime.toFixed(2)}ms
├─ Style Application Time: ${this.metrics.styleApplicationTime.toFixed(2)}ms
├─ LocalStorage Accesses: ${this.metrics.localStorageAccessCount}
├─ DOM Manipulations: ${this.metrics.domManipulationCount}
├─ Event Listeners: ${this.metrics.eventListenerCount}
└─ Cache Hit Rate: ${this.metrics.cacheHitRate.toFixed(1)}%
    `
    return report.trim()
  }

  /**
   * Prüft Performance-Schwellenwerte
   */
  checkPerformanceThresholds(): {
    configLoadSlow: boolean
    styleApplicationSlow: boolean
    tooManyLocalStorageAccesses: boolean
    tooManyDOMManipulations: boolean
    lowCacheHitRate: boolean
  } {
    return {
      configLoadSlow: this.metrics.configLoadTime > 50,
      styleApplicationSlow: this.metrics.styleApplicationTime > 16,
      tooManyLocalStorageAccesses: this.metrics.localStorageAccessCount > 10,
      tooManyDOMManipulations: this.metrics.domManipulationCount > 20,
      lowCacheHitRate: this.metrics.cacheHitRate < 70
    }
  }

  /**
   * Gibt Performance-Empfehlungen zurück
   */
  getRecommendations(): string[] {
    const recommendations: string[] = []
    const thresholds = this.checkPerformanceThresholds()

    if (thresholds.configLoadSlow) {
      recommendations.push('Config-Load-Zeit ist hoch - Caching optimieren')
    }
    if (thresholds.styleApplicationSlow) {
      recommendations.push('Style-Anwendung ist langsam - CSS-Variablen verwenden')
    }
    if (thresholds.tooManyLocalStorageAccesses) {
      recommendations.push('Zu viele localStorage-Zugriffe - Cache implementieren')
    }
    if (thresholds.tooManyDOMManipulations) {
      recommendations.push('Zu viele DOM-Manipulationen - Batch-Updates verwenden')
    }
    if (thresholds.lowCacheHitRate) {
      recommendations.push('Niedrige Cache-Hit-Rate - Caching-Strategie überprüfen')
    }

    return recommendations
  }

  /**
   * Reset aller Metriken
   */
  reset(): void {
    this.metrics = {
      configLoadTime: 0,
      styleApplicationTime: 0,
      localStorageAccessCount: 0,
      domManipulationCount: 0,
      eventListenerCount: 0,
      cacheHitRate: 0
    }
    this.startTimes.clear()
    this.localStorageAccesses = 0
    this.domManipulations = 0
    this.cacheHits = 0
    this.cacheMisses = 0
  }

  /**
   * Debug-Informationen
   */
  debug(): void {
    console.log('🔍 Performance Monitor Debug:')
    console.log(this.getReport())
    console.log('Recommendations:', this.getRecommendations())
  }
}

// Singleton-Instanz exportieren
export const performanceMonitor = PerformanceMonitor.getInstance()

/**
 * Hook für React-Komponenten
 */
export function usePerformanceMonitor() {
  return {
    startMeasurement: (name: string) => performanceMonitor.startMeasurement(name),
    endMeasurement: (name: string) => performanceMonitor.endMeasurement(name),
    recordLocalStorageAccess: () => performanceMonitor.recordLocalStorageAccess(),
    recordDOMManipulation: () => performanceMonitor.recordDOMManipulation(),
    recordCacheHit: () => performanceMonitor.recordCacheHit(),
    recordCacheMiss: () => performanceMonitor.recordCacheMiss(),
    getMetrics: () => performanceMonitor.getMetrics(),
    getReport: () => performanceMonitor.getReport(),
    getRecommendations: () => performanceMonitor.getRecommendations(),
    debug: () => performanceMonitor.debug()
  }
}

/**
 * Performance-Dekorator für Funktionen
 */
export function withPerformanceMonitoring<T extends (...args: any[]) => any>(
  fn: T,
  measurementName: string
): T {
  return ((...args: any[]) => {
    performanceMonitor.startMeasurement(measurementName)
    const result = fn(...args)
    const duration = performanceMonitor.endMeasurement(measurementName)
    
    if (duration > 16) { // Warnung bei > 16ms (60fps)
      console.warn(`⚠️ ${measurementName} took ${duration.toFixed(2)}ms`)
    }
    
    return result
  }) as T
}
