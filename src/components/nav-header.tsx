'use client'

import { ExternalLink, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the WalletMultiButton with no SSR
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export function WalletButton() {
  return <WalletMultiButton className="phantom-button" />
}

export function NavHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const NavLinks = () => (
    <>
      <Link 
        href="/"
        className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </Link>
      <Link 
        href="/pools"
        className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors flex items-center gap-1"
        onClick={() => setIsMenuOpen(false)}
      >
        Pools <span className="text-lg">🌊</span>
      </Link>
      {/* <Link 
        href="/swap"
        className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors flex items-center gap-1"
        onClick={() => setIsMenuOpen(false)}
      >
        Swap <span className="text-lg">💬</span>
      </Link> */}
      {/* <Link 
        href="/chat"
        className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors flex items-center gap-1"
        onClick={() => setIsMenuOpen(false)}
      >
        Chat <span className="text-lg">💬</span>
      </Link> 
      <Link 
        href="/uni"
        className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors flex items-center gap-1"
        onClick={() => setIsMenuOpen(false)}
      >
        University <span className="text-lg">💬</span>
      </Link> */}
      <Link 
        href="/portfolio"
        className="text-[var(--ocean-dark)] hover:text-[var(--ocean-light)] transition-colors flex items-center gap-1"
        onClick={() => setIsMenuOpen(false)}
      >
        Portfolio <span className="text-lg">💬</span>
      </Link>
    </>
  )

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLinks />
          <WalletButton />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-[var(--ocean-light)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-[var(--ocean-dark)]" />
            ) : (
              <Menu className="h-5 w-5 text-[var(--ocean-dark)]" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[var(--ocean-light)] shadow-lg md:hidden z-50">
            <nav className="container max-w-[90vw] mx-auto py-4 px-6 flex flex-col gap-4">
              <div className="flex flex-col gap-3 text-[var(--ocean-dark)]">
                <NavLinks />
              </div>
              <div className="pt-2 border-t border-[var(--ocean-light)]/20">
                <WalletButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 