import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavHeader } from '@/components/nav-header'
import { SolanaWalletProvider } from '@/components/providers/wallet-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eliza.Finance 🌊',
  description: 'AI-Powered DeFi on Solana',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌊</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌊</text></svg>"
          type="image/svg+xml"
        />
      </head>
      <body className={inter.className}>
        <SolanaWalletProvider>
          <NavHeader />
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  )
} 