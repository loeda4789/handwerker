'use client';

import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    // Delay um sicherzustellen, dass DOM bereit ist
    const timeout = setTimeout(() => {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Alle Elemente mit animate-on-scroll finden und beobachten
      const elements = document.querySelectorAll('.animate-on-scroll');
      console.log('Found animate-on-scroll elements:', elements.length);
      
      elements.forEach((element) => {
        observer.observe(element);
      });

      // Cleanup function
      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
} 