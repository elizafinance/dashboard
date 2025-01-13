import { SolanaWalletProvider } from '@/components/providers/wallet-provider'
import { Analytics } from '@/components/analytics'
import { NavHeader } from '@/components/nav-header'
import type { Metadata } from 'next/types'
import './globals.css'

export const metadata: Metadata = {
  title: "Eliza.Finance | AI-Powered DeFi Platform",
  description: "Dive into the future of decentralized finance with autonomous AI agents. Join our beach-side community of DeFi explorers and discover innovative liquidity pools.",
  keywords: "DeFi, AI, Solana, Liquidity Pools, Cryptocurrency, Autonomous Agents, Blockchain",
  openGraph: {
    title: "Eliza.Finance | AI-Powered DeFi Platform",
    description: "Dive into the future of decentralized finance with autonomous AI agents",
    images: ['/beach-crew.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Eliza.Finance | AI-Powered DeFi Platform",
    description: "Dive into the future of decentralized finance with autonomous AI agents",
    images: ['/beach-crew.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SolanaWalletProvider>
          <Analytics />
          <NavHeader />
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  )
} 