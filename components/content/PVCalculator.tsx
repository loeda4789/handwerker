'use client'

import { useState, useEffect, useCallback } from 'react'
import { ContentData } from '@/types/content'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

interface PVCalculatorProps {
  content: ContentData
}

interface CalculatorInputs {
  houseSize: number
  electricityUsage: number
  roofOrientation: string
  roofSlope: number
  budget: number
  roofType: string
}

interface CalculationResult {
  recommendedSize: number
  estimatedCost: number
  yearlySavings: number
  paybackPeriod: number
  co2Savings: number
  monthlySavings: number
}

export default function PVCalculator({ content }: PVCalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    houseSize: 120,
    electricityUsage: 3500,
    roofOrientation: 'south',
    roofSlope: 30,
    budget: 15000,
    roofType: 'tile'
  })

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()

  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  const roofOrientations = [
    { value: 'south', label: 'Süd', efficiency: 1.0 },
    { value: 'southeast', label: 'Südost', efficiency: 0.95 },
    { value: 'southwest', label: 'Südwest', efficiency: 0.95 },
    { value: 'east', label: 'Ost', efficiency: 0.85 },
    { value: 'west', label: 'West', efficiency: 0.85 },
    { value: 'northeast', label: 'Nordost', efficiency: 0.75 },
    { value: 'northwest', label: 'Nordwest', efficiency: 0.75 },
    { value: 'north', label: 'Nord', efficiency: 0.65 }
  ]

  const roofTypes = [
    { value: 'tile', label: 'Ziegeldach', costFactor: 1.0 },
    { value: 'metal', label: 'Metalldach', costFactor: 0.9 },
    { value: 'flat', label: 'Flachdach', costFactor: 1.2 },
    { value: 'slate', label: 'Schieferdach', costFactor: 1.1 }
  ]

  const calculatePV = useCallback(() => {
    setIsCalculating(true)
    
    // Simuliere Berechnungszeit
    setTimeout(() => {
      const orientation = roofOrientations.find(o => o.value === inputs.roofOrientation)
      const roofType = roofTypes.find(t => t.value === inputs.roofType)
      
      if (!orientation || !roofType) return

      // === REALISTISCHE PV-BERECHNUNG ===
      
      // 1. Dachfläche berechnen
      const roofArea = inputs.houseSize * 0.8 // 80% des Hauses als Dachfläche
      
      // 2. Dachneigung-Faktor (optimal bei 30-35°)
      const slopeFactor = Math.max(0.7, 1 - Math.abs(inputs.roofSlope - 32) / 50)
      
      // 3. Dachausrichtung-Faktor
      const orientationFactor = orientation.efficiency
      
      // 4. Dachtyp-Faktor (Einfluss auf Installation)
      const roofTypeFactor = roofType.costFactor
      
      // 5. Verfügbare Dachfläche für PV (berücksichtigt Dachneigung und Ausrichtung)
      const usableArea = roofArea * orientationFactor * slopeFactor
      
      // 6. Maximal mögliche Anlagengröße (1 kWp = 6-8 m², je nach Dachneigung)
      const areaPerKw = inputs.roofSlope > 45 ? 8 : 7 // Steilere Dächer brauchen mehr Fläche
      const maxSystemSize = Math.floor(usableArea / areaPerKw)
      
      // 7. Empfohlene Anlagengröße basierend auf:
      //    - Stromverbrauch (sollte 80-120% des Verbrauchs abdecken)
      //    - Verfügbarer Dachfläche
      //    - Budget (max. 20.000€ für 10 kWp)
      const targetCoverage = 1.0 // 100% des Verbrauchs
      const sizeByConsumption = Math.ceil(inputs.electricityUsage * targetCoverage / 1000)
      const sizeByBudget = Math.floor(inputs.budget / (1600 * roofTypeFactor))
      const sizeByArea = maxSystemSize
      
      // Empfohlene Größe = Minimum aller Faktoren
      const recommendedSize = Math.max(1, Math.min(sizeByConsumption, sizeByArea, sizeByBudget))
      
      // 8. Kostenberechnung (realistischer)
      const baseCostPerKw = 1400 // Basis-Kosten pro kWp
      const roofTypeMultiplier = roofTypeFactor
      const sizeDiscount = recommendedSize >= 10 ? 0.9 : recommendedSize >= 5 ? 0.95 : 1.0 // Mengenrabatt
      const costPerKw = baseCostPerKw * roofTypeMultiplier * sizeDiscount
      const estimatedCost = Math.round(recommendedSize * costPerKw)
      
      // 9. Stromproduktion (realistisch basierend auf Standort und Dach)
      // Deutsche Durchschnittswerte: 800-1200 kWh/kWp pro Jahr
      const baseProduction = 1000 // kWh/kWp pro Jahr
      const locationFactor = 1.0 // Deutschland Durchschnitt
      const roofEfficiency = orientationFactor * slopeFactor
      const yearlyProduction = Math.round(recommendedSize * baseProduction * locationFactor * roofEfficiency)
      
      // 10. Einsparungen berechnen
      const electricityPrice = 0.35 // 35 Cent/kWh (aktueller Durchschnitt)
      const selfConsumptionRate = 0.3 // 30% Eigenverbrauch
      const feedInTariff = 0.08 // 8 Cent/kWh Einspeisevergütung
      
      const selfConsumed = yearlyProduction * selfConsumptionRate
      const fedIn = yearlyProduction * (1 - selfConsumptionRate)
      
      const yearlySavings = Math.round(
        selfConsumed * electricityPrice + fedIn * feedInTariff
      )
      const monthlySavings = Math.round(yearlySavings / 12)
      
      // 11. Amortisation (realistischer)
      const maintenanceCost = 50 // €/Jahr Wartung
      const netYearlySavings = yearlySavings - maintenanceCost
      const paybackPeriod = netYearlySavings > 0 ? Math.round(estimatedCost / netYearlySavings) : 99
      
      // 12. CO2-Einsparung (deutscher Strommix)
      const co2Factor = 0.485 // kg CO2/kWh (deutscher Strommix 2023)
      const co2Savings = Math.round(yearlyProduction * co2Factor)

      setResult({
        recommendedSize,
        estimatedCost,
        yearlySavings: Math.max(0, yearlySavings),
        paybackPeriod: Math.min(99, paybackPeriod),
        co2Savings,
        monthlySavings: Math.max(0, monthlySavings)
      })
      
      setIsCalculating(false)
    }, 1500)
  }, [inputs, roofOrientations, roofTypes])

  useEffect(() => {
    calculatePV()
  }, [calculatePV])

  const getBadgeClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-white text-sm font-medium mb-4"
    const badgeClasses = {
      minimal: "badge-minimal",
      rounded: "badge-rounded", 
      pill: "badge-pill",
      outlined: "badge-outlined",
      gradient: "badge-gradient",
      none: "badge-none"
    }
    return `${baseClasses} ${badgeClasses[badgeStyle]}`
  }

  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'

  return (
    <section className={`py-16 bg-background ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-on-scroll">
          {badgeStyle !== 'none' && (
            <div className={getBadgeClasses()}>
              PV-Rechner
            </div>
          )}
          
          <h2 className={`text-3xl md:text-4xl font-bold text-text mb-4`}>
            {designStyle === 'modern' ? (
              <span className="heading-underline">Kostenloser Photovoltaik-Rechner</span>
            ) : (
              'Kostenloser Photovoltaik-Rechner'
            )}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Berechnen Sie Ihre optimale Photovoltaikanlage und sparen Sie bares Geld
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Eingabeformular */}
          <div className="bg-surface p-8 shadow-lg" style={{ borderRadius: 'var(--radius-card)' }}>
            <h3 className="text-2xl font-bold text-text mb-6">Ihre Angaben</h3>
            
            <div className="space-y-6">
              {/* Hausgröße */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Hausgröße (m²)
                </label>
                <input
                  type="number"
                  value={inputs.houseSize}
                  onChange={(e) => setInputs({...inputs, houseSize: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
                  style={{ borderRadius: 'var(--radius-input)' }}
                />
              </div>

              {/* Stromverbrauch */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Stromverbrauch (kWh/Jahr)
                </label>
                <input
                  type="number"
                  value={inputs.electricityUsage}
                  onChange={(e) => setInputs({...inputs, electricityUsage: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
                  style={{ borderRadius: 'var(--radius-input)' }}
                />
              </div>

              {/* Dachausrichtung */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Dachausrichtung
                </label>
                <select
                  value={inputs.roofOrientation}
                  onChange={(e) => setInputs({...inputs, roofOrientation: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
                  style={{ borderRadius: 'var(--radius-input)' }}
                >
                  {roofOrientations.map((orientation) => (
                    <option key={orientation.value} value={orientation.value}>
                      {orientation.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dachneigung */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Dachneigung: {inputs.roofSlope}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={inputs.roofSlope}
                  onChange={(e) => setInputs({...inputs, roofSlope: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>0°</span>
                  <span>60°</span>
                </div>
              </div>

              {/* Dachtyp */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Dachtyp
                </label>
                <select
                  value={inputs.roofType}
                  onChange={(e) => setInputs({...inputs, roofType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
                  style={{ borderRadius: 'var(--radius-input)' }}
                >
                  {roofTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Budget (€)
                </label>
                <input
                  type="number"
                  value={inputs.budget}
                  onChange={(e) => setInputs({...inputs, budget: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900"
                  style={{ borderRadius: 'var(--radius-input)' }}
                />
              </div>
            </div>
          </div>

          {/* Ergebnisse */}
          <div className="bg-surface p-8 shadow-lg" style={{ borderRadius: 'var(--radius-card)' }}>
            <h3 className="text-2xl font-bold text-text mb-6">Ihre Berechnung</h3>
            
            {isCalculating ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-8 w-8 border-b-2 border-primary" style={{ borderRadius: 'var(--radius-button)' }}></div>
                <span className="ml-3 text-text-secondary">Berechne...</span>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Empfohlene Anlagengröße */}
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {result.recommendedSize} kWp
                  </div>
                  <div className="text-text-secondary">Empfohlene Anlagengröße</div>
                </div>

                {/* Kosten */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold text-accent mb-1">
                      {result.estimatedCost.toLocaleString()} €
                    </div>
                    <div className="text-sm text-text-secondary">Geschätzte Kosten</div>
                  </div>
                  
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-secondary mb-1">
                      {result.monthlySavings} €
                    </div>
                    <div className="text-sm text-text-secondary">Monatliche Einsparung</div>
                  </div>
                </div>

                {/* Einsparungen */}
                <div className="text-center p-4 bg-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {result.yearlySavings.toLocaleString()} €
                  </div>
                  <div className="text-sm text-text-secondary">Jährliche Einsparung</div>
                </div>

                {/* Amortisation */}
                <div className="text-center p-4 bg-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {result.paybackPeriod} Jahre
                  </div>
                  <div className="text-sm text-text-secondary">Amortisationszeit</div>
                </div>

                {/* CO2-Einsparung */}
                <div className="text-center p-4 bg-emerald-100 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {result.co2Savings.toLocaleString()} kg
                  </div>
                  <div className="text-sm text-text-secondary">CO2-Einsparung pro Jahr</div>
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <a
                    href="#kontakt"
                    className="w-full inline-flex items-center justify-center px-8 py-4 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      borderRadius: 'var(--radius-button)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                    }}
                  >
                    Kostenloses Angebot anfordern
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Zusätzliche Informationen */}
        <div className="mt-12 text-center">
          <div className="bg-surface p-6 rounded-lg" style={{ borderRadius: 'var(--radius-card)' }}>
            <h4 className="text-lg font-semibold text-text mb-4">Hinweise zur Berechnung</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-text-secondary">
              <div>
                <strong>Standort:</strong> Berechnung basiert auf deutschen Durchschnittswerten (1000 kWh/kWp)
              </div>
              <div>
                <strong>Dachfaktoren:</strong> Berücksichtigt Dachneigung, Ausrichtung und Dachtyp
              </div>
              <div>
                <strong>Eigenverbrauch:</strong> 30% Eigenverbrauch, 70% Einspeisung (8 Cent/kWh)
              </div>
              <div>
                <strong>Strompreis:</strong> 35 Cent/kWh (aktueller Durchschnitt)
              </div>
              <div>
                <strong>Kosten:</strong> 1400€/kWp Basis, Mengenrabatt ab 5 kWp
              </div>
              <div>
                <strong>Wartung:</strong> 50€/Jahr Wartungskosten berücksichtigt
              </div>
              <div>
                <strong>CO2-Faktor:</strong> 0,485 kg CO2/kWh (deutscher Strommix 2023)
              </div>
              <div>
                <strong>Garantie:</strong> 25 Jahre Leistungsgarantie auf Module
              </div>
            </div>
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-text">
                <strong>Wichtiger Hinweis:</strong> Die Berechnung ist eine Schätzung. 
                Für eine genaue Planung empfehlen wir eine Vor-Ort-Besichtigung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
