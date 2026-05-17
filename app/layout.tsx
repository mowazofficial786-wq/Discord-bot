import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import { Navbar } from '@/components/navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KILLERMC - Premium Minecraft Server',
  description: 'Join KILLERMC for the ultimate Minecraft survival experience. Purchase premium ranks and unlock exclusive features!',
  generator: 'v0.app',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b758aae46c05efb41552080135084cf5-iZxpJKuidCZCNDaEE5ku0IsvrDKLDC.webp',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b758aae46c05efb41552080135084cf5-iZxpJKuidCZCNDaEE5ku0IsvrDKLDC.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
