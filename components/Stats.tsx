'use client';

import { useState, useEffect, useRef } from 'react';
import { ContentData } from '@/types/content';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

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
  
  // Design-Style aus localStorage abrufen
  const [designStyle, setDesignStyle] = useState<string>('angular');
  
  useEffect(() => {
    const savedDesignStyle = localStorage.getItem('design-style');
    if (savedDesignStyle) {
      setDesignStyle(savedDesignStyle);
    }
    
    const handleDesignStyleChange = () => {
      const newDesignStyle = localStorage.getItem('design-style');
      if (newDesignStyle) {
        setDesignStyle(newDesignStyle);
      }
    };
    
    window.addEventListener('storage', handleDesignStyleChange);
    return () => window.removeEventListener('storage', handleDesignStyleChange);
  }, []);
  
  // Verwende Daten aus content.json
  const stats = content.stats.customStats;
  
  // Moderne Ansichten (rounded, modern) verwenden Services-ähnlichen Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern';

  return (
    <section className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          {designStyle === 'rounded' && (
            <span className="inline-block px-6 py-2 text-white text-sm font-medium mb-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ 
                borderRadius: 'var(--radius-button)',
                backgroundColor: 'var(--color-secondary)'
              }}>
              Unsere Erfolge
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-6 transition-colors duration-300">
            {designStyle === 'modern' ? (
              <span className="heading-underline-large">Zahlen, die für sich sprechen</span>
            ) : (
              'Zahlen, die für sich sprechen'
            )}
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto transition-colors duration-300">
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