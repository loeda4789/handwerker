import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getContentData } from '@/lib/config'
// import { ThemeProvider } from '@/contexts/ThemeContext'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} transition-colors duration-300`}>
        {/* <ThemeProvider> */}
          {children}
        {/* </ThemeProvider> */}
        
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