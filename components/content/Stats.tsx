'use client';

import { useState, useEffect, useRef } from 'react';
import { ContentData } from '@/types/content';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { useLayoutConfig, useStyleConfig, useHeadingsConfig } from '@/contexts/AppConfigContext';

interface StatsProps {
  content: ContentData;
}

interface CounterProps {
  end: number;
  duration: number;
  label: string;
  suffix?: string;
  decimal?: boolean;
}

function Counter({ end, duration, label, suffix = '', decimal = false }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.7 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !hasStarted) {
      setHasStarted(true);
      let startTime: number;
      const startCount = 0;

      const animate = (currentTime: number) => {
        if (startTime === undefined) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = startCount + (end - startCount) * easeOutQuart;
        
        if (decimal) {
          setCount(Math.round(currentCount * 10) / 10);
        } else {
          setCount(Math.floor(currentCount));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, hasStarted, end, duration, decimal]);

  return (
    <div ref={counterRef} className="text-center group">
      <div className="p-8 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:transform hover:scale-105 hover:-translate-y-2 cursor-default"
        style={{ 
          borderRadius: 'var(--radius-card)',
          backgroundColor: 'var(--color-surface)',
          borderLeft: '4px solid var(--color-accent)'
        }}>
        <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-500 ease-out"
          style={{ color: 'var(--color-accent)' }}>
          {decimal ? count.toFixed(1) : count}{suffix}
        </div>
        <div className="font-medium text-lg transition-colors duration-300"
          style={{ color: 'var(--color-text)' }}>
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Stats({ content }: StatsProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation();
  
  // Design-Style aus AppConfigContext
  const { design: designStyle } = useLayoutConfig();
  const { badgeStyle, fontFamily } = useStyleConfig();
  
  // Verwende Daten aus content.json
  const stats = content.stats.customStats;
  
  // Moderne Ansichten (rounded, modern) verwenden Services-ähnlichen Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern';

  // Badge-Klassen basierend auf Stil-Paket
  const getBadgeClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-white px-4 py-2 text-sm font-medium mb-4"
    const badgeClasses = {
      minimal: "badge-minimal",
      rounded: "badge-rounded", 
      pill: "badge-pill",
      outlined: "badge-outlined",
      none: "badge-none"
    }
    return `${baseClasses} ${badgeClasses[badgeStyle]}`
  }
  
  const getFontClass = () => {
    // Alle Headlines verwenden jetzt die dynamischen Fonts über CSS-Variablen
    return "" // Keine spezielle Font-Klasse mehr nötig
  }

  return (
    <section className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          {/* Badge nur anzeigen wenn badgeStyle nicht 'none' ist */}
          {badgeStyle !== 'none' && (
            <div className={getBadgeClasses()}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Fakten & Zahlen
            </div>
          )}
          <h3 className={`text-2xl md:text-3xl font-bold text-text dark:text-light mb-6 transition-colors duration-300 ${getFontClass()}`}>
            {designStyle === 'modern' ? (
              <span className="heading-underline-large">Zahlen, die für sich sprechen</span>
            ) : (
              'Zahlen, die für sich sprechen'
            )}
          </h2>
          <p className={`text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto transition-colors duration-300 ${getFontClass()}`}>
            Diese Zahlen spiegeln unser Engagement für Qualität und Kundenzufriedenheit wider.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Counter
                end={stat.number}
                duration={stat.duration}
                label={stat.label}
                suffix={stat.suffix}
                decimal={stat.decimal}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 