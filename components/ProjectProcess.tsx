interface ProjectProcessProps {
  content: any
}

export default function ProjectProcess({ content }: ProjectProcessProps) {
  const projectSteps = [
    {
      number: 1,
      title: "Beratung & Konzeption",
      description: "Professionelle Bestandsaufnahme, detaillierte Beratung und maßgeschneiderte Projektkonzeption direkt vor Ort."
    },
    {
      number: 2,
      title: "Präzise Planung & Angebot",
      description: "Detaillierte Projektplanung mit transparenter Kostenaufstellung und terminlicher Abstimmung nach Ihren Wünschen."
    },
    {
      number: 3,
      title: "Fachgerechte Umsetzung",
      description: "Meisterhafte Ausführung durch unser qualifiziertes Team mit höchsten Qualitätsstandards und pünktlicher Fertigstellung."
    }
  ]

  return (
    <section className="bg-surface dark:bg-dark py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent rounded-full text-sm font-medium mb-4">
            Unser Prozess
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-6">
            So läuft ein Projekt bei uns ab
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
            Von der ersten Idee bis zur finalen Abnahme - unser strukturierter Prozess garantiert optimale Ergebnisse.
          </p>
        </div>

        {/* Mobile Timeline - Vertikal */}
        <div className="block lg:hidden">
          <div className="relative max-w-md mx-auto">
            {/* Vertikale Hauptlinie */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-border dark:bg-gray-600 rounded-full">
              {/* Animierter Fortschrittsstrich */}
              <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-1000 ease-out animate-timeline-progress" 
                   style={{height: '100%'}}></div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-16">
              {projectSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="relative animate-on-scroll"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  {/* Schritt-Nummer Kreis */}
                  <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg z-10 border-4 border-surface dark:border-dark">
                    <span className="text-xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Content Box */}
                  <div className="ml-24 bg-white dark:bg-dark-secondary rounded-xl p-6 shadow-lg border border-border dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                    <h3 className="text-xl font-bold text-text dark:text-light mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary dark:text-light/80 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Kleiner Pfeil zur Verbindung */}
                    <div className="absolute left-16 top-6 w-0 h-0 border-l-8 border-l-white dark:border-l-dark-secondary border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="absolute top-10 left-0 right-0 z-0">
              <div className="flex items-center justify-between max-w-4xl mx-auto px-10">
                {/* Line segments between steps */}
                <div className="flex-1 h-0.5 bg-border dark:bg-gray-600 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full transform -translate-x-full animate-progress-line-1"></div>
                </div>
                <div className="w-10"></div>
                <div className="flex-1 h-0.5 bg-border dark:bg-gray-600 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full transform -translate-x-full animate-progress-line-2"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-12">
              {projectSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="relative animate-on-scroll"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Step Container */}
                  <div className="text-center group">
                    {/* Step Number */}
                    <div className="relative mx-auto w-20 h-20 mb-6">
                      {/* Outer Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse-slow"></div>
                      {/* Inner Circle */}
                      <div className="relative w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-110 transform transition-transform">
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-text dark:text-light group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary dark:text-light/80 leading-relaxed max-w-sm mx-auto">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-lg bg-white/5 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-text dark:text-light mb-4">
              Bereit für Ihr nächstes Projekt?
            </h3>
            <p className="text-text-secondary dark:text-light/80 mb-6">
              Kontaktieren Sie uns für eine kostenlose Erstberatung und lassen Sie uns gemeinsam Ihre Ideen verwirklichen.
            </p>
            <a
              href="#footer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium group"
            >
              Jetzt Beratung anfragen
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 