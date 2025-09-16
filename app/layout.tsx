import type { Metadata } from 'next'
import { Inter, Raleway, Montserrat, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { getContentData } from '@/lib/config'
import { AppConfigProvider } from '@/contexts/AppConfigContext'
import ConfigCard from '@/components/config/ConfigCard'
import Script from 'next/script'
import FontStyleInitializer from '@/components/FontStyleInitializer'
import ColorSchemeInitializer from '@/components/ColorSchemeInitializer'

// Google Fonts laden
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body'
})

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-heading-einfach'
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-heading-standard'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-heading-modern'
})

const content = getContentData()

export const metadata: Metadata = {
  title: `${content.company.name} - ${content.company.tagline}`,
  description: content.about.text,
  keywords: 'Handwerker, Fliesenleger, Badezimmer, Renovierung, Sanierung',
  authors: [{ name: content.company.name }],
  creator: content.company.name,
  publisher: content.company.name,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '16x16', type: 'image/svg+xml' }
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.svg'
  },
  openGraph: {
    title: `${content.company.name} - ${content.company.tagline}`,
    description: content.about.text,
    url: 'https://www.mustermann-handwerk.de',
    siteName: content.company.name,
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${content.company.name} - ${content.company.tagline}`,
    description: content.about.text,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch für bessere Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect für kritische Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Critical CSS ist bereits in globals.css definiert */}
      </head>
      <body 
        className={`${inter.variable} ${raleway.variable} ${montserrat.variable} ${spaceGrotesk.variable}`}
        data-style="standard"
        suppressHydrationWarning
      >
        <AppConfigProvider>
          <FontStyleInitializer />
          <ColorSchemeInitializer />
          {children}
          <ConfigCard />
        </AppConfigProvider>
        
        {/* Service Worker für Image Caching */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('Service Worker registered:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('Service Worker registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
} 