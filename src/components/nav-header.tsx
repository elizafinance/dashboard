'use client'

import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function NavHeader() {
  return (
    <header className="w-full border-b border-[var(--ocean-light)] bg-gradient-to-r from-[var(--sand-dark)] to-[var(--sand-light)]">
      <div className="container max-w-[95vw] mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Eliza Finance Logo"
            width={32}
            height={32}
            className="rounded-full border-2 border-[var(--coral)]"
          />
          <span className="text-[var(--ocean-dark)] font-bold text-xl flex items-center gap-1">
            Eliza.Finance
            <span className="text-2xl">🏖️</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link 
            href="/"
            className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/pools"
            className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors flex items-center gap-1"
          >
            Pools <span className="text-lg">🌊</span>
          </Link>
          <a 
            href="https://ai16z.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors flex items-center gap-1"
          >
            Eliza
            <ExternalLink size={14} />
          </a>
          <WalletMultiButton className="phantom-button" />
        </nav>
      </div>
    </header>
  )
} 