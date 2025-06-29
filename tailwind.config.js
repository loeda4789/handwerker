/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // VEREINFACHTES FARBSYSTEM - Nur 8 essenzielle Farben
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)', 
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-light': 'var(--color-text-light)',
        'text-secondary': 'var(--color-text-secondary)',
        
        // Legacy Support
        border: 'var(--color-border)',
        dark: 'var(--color-dark)',
        'dark-secondary': 'var(--color-dark-secondary)',
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'base': 'var(--radius-base)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
        
        // Komponent-spezifische Radiusse
        'button': 'var(--radius-button)',
        'card': 'var(--radius-card)',
        'image': 'var(--radius-image)',
        'modal': 'var(--radius-modal)',
        'input': 'var(--radius-input)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}