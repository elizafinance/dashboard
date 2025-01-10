import { Providers } from './providers'
import { Analytics } from '@/components/analytics'
import { NavHeader } from '@/components/nav-header'
import type { Metadata } from 'next/types'
import './globals.css'

export const metadata: Metadata = {
  title: "Eliza Finance: Decentralized Finance Powered by AI Agents",
  description: "Forked from Elizas World and inspired to be a Directory of DeFi Agents.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Providers>
          <NavHeader />
          {children}
        </Providers>
      </body>
    </html>
  )
} 