import { AppConfig } from './types'

export interface HeaderStyles {
  container: string
  transformStyle: React.CSSProperties
  header: string
  headerStyle: React.CSSProperties
  nav: string
  borderRadius: string
  textColor: string
  logoStyle: string
  ctaStyle: string
  ctaStyleDynamic: React.CSSProperties
  ctaHoverStyle: React.CSSProperties
}

export interface DropdownStyles {
  container: string
  containerStyle: React.CSSProperties
  item: string
  itemHoverStyle: React.CSSProperties
}

export const getHeaderStyles = (
  designStyle: 'angular' | 'rounded' | 'modern',
  isScrolled: boolean,
  headerVisible: boolean = true
): HeaderStyles => {
  const getTransformStyle = () => {
    if (designStyle === 'modern') {
      return {
        transform: 'translateX(-50%)',
        transition: 'transform 0.3s ease-in-out'
      }
    } else if (designStyle === 'rounded') {
      return {
        transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }
    }
    return {}
  }

  if (designStyle === 'angular') {
    return {
      container: 'fixed top-0 z-50 w-full',
      transformStyle: {},
      header: `transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-lg dark:bg-gray-900/95 dark:border-gray-700' 
          : 'bg-transparent'
      }`,
      headerStyle: isScrolled ? {} : {},
      nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
      borderRadius: '0px',
      textColor: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
      logoStyle: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
      ctaStyle: 'text-white font-medium transition-all duration-200',
      ctaStyleDynamic: {
        backgroundColor: 'var(--color-secondary)',
        borderColor: 'var(--color-secondary)'
      },
      ctaHoverStyle: {
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
        color: 'white'
      }
    }
  } else if (designStyle === 'rounded') {
    return {
      container: 'fixed top-0 z-50 w-full',
      transformStyle: getTransformStyle(),
      header: `transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-lg dark:bg-gray-900/95 dark:border-gray-700' 
          : 'bg-transparent'
      }`,
      headerStyle: isScrolled ? {} : {},
      nav: 'px-4 py-4 mx-auto max-w-screen-xl',
      borderRadius: 'var(--radius-card)',
      textColor: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
      logoStyle: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
      ctaStyle: 'text-white font-medium transition-all duration-200',
      ctaStyleDynamic: {
        backgroundColor: 'var(--color-secondary)',
        borderColor: 'var(--color-secondary)'
      },
      ctaHoverStyle: {
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
        color: 'white'
      }
    }
  } else if (designStyle === 'modern') {
    return {
      container: 'fixed top-4 left-1/2 z-50 w-full max-w-5xl px-4',
      transformStyle: getTransformStyle(),
      header: `transition-all duration-300 backdrop-blur-xl shadow-2xl border border-white/10 ${
        isScrolled 
          ? 'bg-black/30 dark:bg-gray-900/40' 
          : 'bg-black/25 dark:bg-gray-900/35'
      }`,
      headerStyle: {},
      nav: 'px-8 py-4',
      borderRadius: '2rem',
      textColor: 'text-white',
      logoStyle: 'text-white',
      ctaStyle: 'text-white font-medium transition-all duration-200',
      ctaStyleDynamic: {
        backgroundColor: 'var(--color-secondary)',
        borderColor: 'var(--color-secondary)'
      },
      ctaHoverStyle: {
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
        color: 'white'
      }
    }
  } else {
    // Fallback
    return {
      container: 'fixed top-0 z-50 w-full',
      transformStyle: {},
      header: `transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-lg dark:bg-gray-900/95 dark:border-gray-700' 
          : 'bg-transparent'
      }`,
      headerStyle: isScrolled ? {} : {},
      nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
      borderRadius: 'var(--radius-modal)',
      textColor: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
      logoStyle: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
      ctaStyle: 'text-white font-medium transition-all duration-200',
      ctaStyleDynamic: {
        backgroundColor: 'var(--color-secondary)',
        borderColor: 'var(--color-secondary)'
      },
      ctaHoverStyle: {
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
        color: 'white'
      }
    }
  }
}

export const getDropdownStyles = (
  designStyle: 'angular' | 'rounded' | 'modern',
  isScrolled: boolean
): DropdownStyles => {
  if (designStyle === 'angular') {
    return {
      container: 'absolute top-full left-0 mt-2 w-48 shadow-xl border z-50 backdrop-blur-md',
      containerStyle: {
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '8px'
      },
      item: 'block px-4 py-3 text-gray-700 hover:text-white hover:bg-orange-500 font-medium transition-all duration-300 first:rounded-t-lg last:rounded-b-lg uppercase hover:scale-[1.02] hover:shadow-md',
      itemHoverStyle: {
        backgroundColor: '#f97316',
        color: 'white'
      }
    }
  } else if (designStyle === 'rounded') {
    return {
      container: 'absolute top-full left-0 mt-2 w-48 shadow-xl border z-50 backdrop-blur-md',
      containerStyle: {
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 'var(--radius-card)'
      },
      item: 'block px-4 py-3 text-gray-700 hover:text-white hover:bg-orange-500 font-medium transition-all duration-300 first:rounded-t-lg last:rounded-b-lg uppercase hover:scale-[1.02] hover:shadow-md',
      itemHoverStyle: {
        backgroundColor: '#f97316',
        color: 'white'
      }
    }
  } else {
    // Modern style
    return {
      container: 'absolute top-full left-0 mt-2 w-48 shadow-xl z-50 backdrop-blur-md',
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      },
      item: 'block px-4 py-3 text-white hover:text-white hover:bg-orange-500 font-medium transition-all duration-300 first:rounded-t-xl last:rounded-b-xl uppercase hover:scale-[1.02]',
      itemHoverStyle: {
        backgroundColor: '#f97316',
        color: 'white'
      }
    }
  }
}
