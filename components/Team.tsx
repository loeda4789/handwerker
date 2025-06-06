import React from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'

interface TeamProps {
  content: ContentData
}

export default function Team({ content }: TeamProps) {
  return (
    <section id="team" className="bg-surface dark:bg-dark-secondary py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent rounded-full text-sm font-medium mb-4">
            Unser Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-light mb-6">
            Die Experten hinter jedem Projekt
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto mb-8">
            Erfahren, engagiert & nah dran – lernen Sie unsere Fachkräfte kennen.
          </p>
          <div className="max-w-4xl mx-auto space-y-4 text-text-secondary dark:text-light/80">
            <p>
              Hinter jedem gelungenen Projekt steht ein Team aus leidenschaftlichen 
              Handwerkern, die ihr Handwerk von der Pike auf gelernt haben und täglich mit 
              Herzblut ausüben.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.team.map((member, index) => (
            <div
              key={index}
              className="group text-center animate-on-scroll cursor-pointer"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationDuration: '600ms',
                animationFillMode: 'both'
              }}
            >
              {/* Member Photo */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20 flex items-center justify-center border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3">
                  <div className="text-center">
                    <div className="w-36 h-36 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-inner">
                      <span className="text-4xl font-bold text-white drop-shadow-lg">
                        {member.name.split(' ').map(n => n.charAt(0)).join('')}
                      </span>
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </div>
                
                {/* Position Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-primary text-white text-sm font-medium rounded-full shadow-md">
                    {member.position.includes('Geschäftsführer') ? 'Geschäftsführer' :
                     member.position.includes('Projektleiterin') ? 'Büro' :
                     member.position.includes('Elektrik') ? 'Vorarbeiter' :
                     member.position.includes('Malerin') || member.position.includes('Gestalterin') ? 'Gestaltung' :
                     member.position.includes('Fliesenleger') ? 'Fassade' :
                     member.position.includes('Kundenservice') ? 'Innenraum' :
                     member.position.includes('Trockenbauer') ? 'Azubi' :
                     member.position.includes('Auszubildende') ? 'Azubi' :
                     'Fachkraft'}
                  </span>
                </div>
              </div>
              
              {/* Member Info */}
              <div className="space-y-3 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-text dark:text-light group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-text-secondary dark:text-light/70 font-medium text-lg">
                  {member.specialization}
                </p>
                <p className="text-sm text-text-secondary/60 dark:text-light/50 group-hover:text-text-secondary dark:group-hover:text-light/70 transition-colors duration-300">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
} 