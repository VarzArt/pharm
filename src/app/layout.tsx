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
  title: 'App',
  description: 'Next starter',
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
            duration: 1500,
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
