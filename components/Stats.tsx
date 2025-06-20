'use client';

import { useState, useEffect, useRef } from 'react';

interface StatsProps {
  content: any;
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
      <div className="bg-white dark:bg-dark-secondary rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-border/50 dark:border-text-secondary/20">
        <div className="text-4xl lg:text-5xl font-bold text-primary dark:text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
          {decimal ? count.toFixed(1) : count}{suffix}
        </div>
        <div className="text-text-secondary dark:text-light/80 font-medium text-lg">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Stats({ content }: StatsProps) {
  const stats = [
    {
      number: 20,
      label: "Jahre Erfahrung",
      suffix: "",
      duration: 2000
    },
    {
      number: 150,
      label: "Projekte pro Jahr", 
      suffix: "",
      duration: 2500
    },
    {
      number: 4.7,
      label: "Sterne Bewertung",
      suffix: "",
      duration: 1800,
      decimal: true
    }
  ];

  return (
    <section className="bg-surface dark:bg-dark py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent rounded-full text-sm font-medium mb-4">
            Unsere Erfolge
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-6">
            Zahlen, die für sich sprechen
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
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