import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getContentData } from '@/lib/config'
// import { ThemeProvider } from '@/contexts/ThemeContext'
// import ThemeSwitcher from '@/components/ThemeSwitcher'

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
      <body className={`${inter.className} transition-colors duration-300`}>
        {/* <ThemeProvider> */}
          {children}
          {/* <ThemeSwitcher /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
} 