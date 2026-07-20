import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import Header from '@/app/components/ui/header'
import { Inter } from 'next/font/google'
import Footer from '@/app/components/ui/footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://xymera.com'),

  title: 'XYMERA',

  description: 'Премиальные биологически активные добавки нового поколения.',

  openGraph: {
    title: 'XYMERA',
    description: 'Премиальные биологически активные добавки нового поколения.',
    url: 'https://xymerapeptides.com',
    siteName: 'XYMERA',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'XYMERA',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'XYMERA',
    description: 'Премиальные биологически активные добавки нового поколения.',
    images: ['/images/logo.png'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#626262',
              color: '#f7f7f4',
              borderRadius: '16px',
              padding: '14px 18px',
              fontSize: '15px',
              fontWeight: 500,
              textAlign: 'center',
            },
          }}
        />
      </body>
    </html>
  )
}
