'use client'

import { useState } from 'react'

interface PackageSelectionProps {
  onPackageSelect?: (packageId: string) => void
}

export default function PackageSelection({ onPackageSelect }: PackageSelectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('professionell')

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: '99€/Monat',
      description: 'One-Page Website für kleine Unternehmen',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      recommended: false,
      features: [
        'One-Page Website',
        'Responsive Design',
        'Kontaktformular',
        'SEO-Grundausstattung',
        'SSL-Zertifikat',
        'Bis zu 10 Bilder'
      ]
    },
    {
      id: 'professionell',
      name: 'Professionell',
      price: '119€/Monat',
      description: 'One-Page mit Leistungssektor',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      recommended: true,
      features: [
        'One-Page Website',
        'Leistungssektor',
        'Referenzen-Galerie',
        'Erweiterte SEO',
        'Google Analytics',
        'Bis zu 25 Bilder',
        'Kontakt-Bar',
        'WhatsApp-Integration'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '159€/Monat',
      description: 'Multi-Page Website für anspruchsvolle Projekte',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      recommended: false,
      features: [
        'Multi-Page Website',
        'Alle Leistungssektoren',
        'Portfolio-Sektion',
        'Team-Vorstellung',
        'FAQ-Bereich',
        'Unbegrenzte Bilder',
        'Premium SEO',
        'Newsletter-Integration',
        'Online-Terminbuchung',
        'Live-Chat-Widget'
      ]
    }
  ]

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
    onPackageSelect?.(packageId)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Paket wählen
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Wählen Sie das passende Paket für Ihr Unternehmen
        </p>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative bg-white dark:bg-gray-800 border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
              selectedPackage === pkg.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            style={{ borderRadius: '0.75rem' }}
            onClick={() => handlePackageSelect(pkg.id)}
          >
            {/* Empfohlen Badge */}
            {pkg.recommended && (
              <div 
                className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-medium px-3 py-1 z-10"
                style={{ borderRadius: '0.5rem' }}
              >
                Empfohlen
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Icon */}
                  <div 
                    className={`w-12 h-12 flex items-center justify-center ${
                      selectedPackage === pkg.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                    style={{ borderRadius: '50%' }}
                  >
                    {pkg.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-xl font-bold ${
                        selectedPackage === pkg.id
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {pkg.name}
                      </h3>
                      
                      {/* Preis rechtsbündig ohne zu weit einzurücken */}
                      <div className="text-right">
                        <span className={`text-lg font-semibold ${
                          selectedPackage === pkg.id
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {pkg.description}
                    </p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-500 dark:text-gray-400">
                          <svg className="w-3 h-3 mr-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Auswahl-Indikator */}
                <div className="ml-4">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPackage === pkg.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {selectedPackage === pkg.id && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-6">
        <button 
          className="bg-blue-500 text-white px-8 py-3 font-semibold hover:bg-blue-600 transition-colors duration-200"
          style={{ borderRadius: '0.5rem' }}
        >
          Paket auswählen
        </button>
      </div>
    </div>
  )
}
