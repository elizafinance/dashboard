'use client'

import { ExternalLink, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

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
  const pathname = usePathname()

  const NavLinks = () => (
    <>
      {[
        { href: '/portfolio', label: 'Portfolio 🌿' },
        { href: '/pools', label: 'Pools 🪴' },
        { href: '/how-it-works', label: 'Docs 📚' },
      ].map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-[#2D5A27] hover:text-[#4A7A3D] transition-colors px-3 py-2 rounded-lg',
            pathname === link.href && 'bg-[#2D5A27]/10 font-medium'
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  )

  // Mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="w-full border-b border-[#2D5A27]/20 bg-gradient-to-r from-[#4A7A3D]/10 to-[#2D5A27]/5">
      <div className="container max-w-[95vw] mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Eliza Finance Logo"
            width={32}
            height={32}
            className="rounded-full border-2 border-[#2D5A27]"
          />
          <Image
            src="/typeFont.png"
            alt="Eliza Finance"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <span className="text-2xl">🌿</span>
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
            className="border-[#2D5A27]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-[#2D5A27]" />
            ) : (
              <Menu className="h-5 w-5 text-[#2D5A27]" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 md:hidden">
          <div className="container h-full flex flex-col items-center justify-center gap-8">
            <NavLinks />
            <WalletButton />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 border-[#2D5A27]"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-5 w-5 text-[#2D5A27]" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
} 