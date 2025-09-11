import { useState, useEffect } from 'react'

export const useHeaderScroll = (designStyle: string) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrolled = currentScrollY > 50
      setIsScrolled(scrolled)
      
      // Header visibility logic basierend auf Design-Stil
      if (designStyle === 'rounded') {
        // Bei rounded: Einblenden wenn nach oben gescrollt wird oder am Anfang der Seite
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setHeaderVisible(true)
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHeaderVisible(false)
        }
      } else {
        // Bei anderen Styles: Immer sichtbar
        setHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [designStyle, lastScrollY])

  return { isScrolled, headerVisible }
}
