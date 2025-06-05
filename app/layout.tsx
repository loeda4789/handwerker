import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getContentData } from '@/lib/config'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Handwerker Template - Next.js',
  description: 'Ein flexibles Template für Handwerksbetriebe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = getContentData()
  
  return (
    <html lang={content.meta.language} suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 