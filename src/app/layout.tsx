import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavHeader } from '@/components/nav-header'
import { SolanaWalletProvider } from '@/components/providers/wallet-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eliza.Finance',
  description: 'DeFAI at your fingertips',
  openGraph: {
    title: 'Eliza.Finance',
    description: 'DeFAI at your fingertips',
    images: [
      {
        url: '/sisters.webp',
        width: 1200,
        height: 630,
        alt: 'Eliza Finance Sisters'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eliza.Finance',
    description: 'DeFAI at your fingertips',
    images: ['/sisters.webp']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SolanaWalletProvider>
          <NavHeader />
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  )
} 