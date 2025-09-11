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
  designStyle: 'angular' | 'rounded' | 'modern' | 'klassik',
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
      nav: 'px-8 py-2.5 mx-auto max-w-screen-xl',
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
      nav: 'px-8 py-4 mx-auto max-w-screen-xl',
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
      container: 'fixed top-4 left-1/2 z-50 w-full max-w-5xl px-8',
      transformStyle: getTransformStyle(),
      header: `transition-all duration-300 backdrop-blur-xl shadow-2xl border border-white/10 ${
        isScrolled 
          ? 'bg-black/30 dark:bg-gray-900/40' 
          : 'bg-black/25 dark:bg-gray-900/35'
      }`,
      headerStyle: {},
      nav: 'px-12 py-4',
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
  } else if (designStyle === 'klassik') {
    return {
      container: 'fixed top-0 z-50 w-full',
      transformStyle: getTransformStyle(),
      header: `transition-all duration-300 shadow-sm border-b border-gray-200 dark:border-gray-700 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md dark:bg-gray-900/95' 
          : 'bg-white/90 backdrop-blur-sm dark:bg-gray-900/90'
      }`,
      headerStyle: {},
      nav: 'px-8 py-4 mx-auto max-w-screen-xl',
      borderRadius: 'var(--radius-card)',
      textColor: 'text-text dark:text-light',
      logoStyle: 'text-text dark:text-light',
      ctaStyle: 'text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden flex items-center gap-2 transform hover:scale-105 button-shine',
      ctaStyleDynamic: {
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: '0.75rem 1.5rem'
      },
      ctaHoverStyle: {
        backgroundColor: 'var(--color-secondary)',
        borderColor: 'var(--color-secondary)',
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
      nav: 'px-8 py-2.5 mx-auto max-w-screen-xl',
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
  designStyle: 'angular' | 'rounded' | 'modern' | 'klassik',
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
  } else if (designStyle === 'klassik') {
    return {
      container: 'absolute top-full left-0 mt-3 w-auto min-w-[240px] rounded-xl shadow-2xl z-50 backdrop-blur-md',
      containerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '0.75rem'
      },
      item: 'group flex items-center px-4 py-3 text-sm font-medium uppercase transition-all duration-200 mx-2 relative border-l-4 border-l-transparent text-text-secondary dark:text-light/70 hover:text-primary dark:hover:text-accent hover:border-l-primary hover:bg-primary/5',
      itemHoverStyle: {
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        borderLeftColor: 'var(--color-primary)'
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