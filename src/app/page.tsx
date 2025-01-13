'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { LeaveSiteModal } from '@/components/leave-site-modal'

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingUrl, setPendingUrl] = useState('')
  const [pendingSiteName, setPendingSiteName] = useState('')

  const handleExternalLinkClick = (url: string, siteName: string) => {
    setPendingUrl(url)
    setPendingSiteName(siteName)
    setModalOpen(true)
  }

  const handleConfirmNavigation = () => {
    window.open(pendingUrl, '_blank', 'noopener,noreferrer')
    setModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--ocean-light)]/20 to-[var(--sand-light)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16 sm:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 w-full lg:w-auto">
            <h1 className="text-4xl sm:text-6xl font-bold text-[var(--ocean-dark)] mb-6">
              DeFAI Summer <span className="text-[var(--coral)]">2025</span> 
            </h1>
            <p className="text-lg sm:text-xl text-[var(--ocean-dark)]/70 mb-6 max-w-prose">
              Join the ripper revolution of autonomous AI agents in DeFi. 
              The future of finance is being built by AI, for AI. Fair dinkum! 🤖
            </p>

            <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:mx-0">
              {/* Main CTA */}
              <Link href="/pools" className="w-full">
                <Button className="w-full bg-[var(--ocean-dark)] hover:bg-[var(--ocean-light)] text-white px-4 sm:px-8 py-6 sm:py-8 text-lg sm:text-xl">
                  Dive into our Pools 🏄‍♂️
                </Button>
              </Link>

              {/* Partners Section */}
              <div className="mt-4">
                <h3 className="text-[var(--ocean-dark)]/60 text-sm mb-3">Our Mates 🤝</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-[var(--ocean-dark)] text-[var(--ocean-dark)] px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base"
                    onClick={() => handleExternalLinkClick('https://elizawakesup.ai', 'Eliza Wakes Up')}
                  >
                    Chat 💬
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-[var(--coral)] text-[var(--coral)] hover:bg-[var(--coral)]/10 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base"
                    onClick={() => handleExternalLinkClick('https://mee.fun', 'Mee.Fun')}
                  >
                    Create 🤖
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative w-full max-w-lg mx-auto">
              <Image
                src="/beach-crew.png"
                alt="Eliza Finance Beach Crew"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-24 max-w-6xl mx-auto">
          <div className="bg-white/80 p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--ocean-dark)] mb-3">🤖 AI-Powered DeFi</h3>
            <p className="text-sm sm:text-base text-[var(--ocean-dark)]/70">
              Experience the future of finance with our network of autonomous DeFi agents
            </p>
          </div>
          <div className="bg-white/80 p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--ocean-dark)] mb-3">🔍 Smart Analytics</h3>
            <p className="text-sm sm:text-base text-[var(--ocean-dark)]/70">
              Get real-time insights and analysis from our AI-powered observatory
            </p>
          </div>
          <div className="bg-white/80 p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--ocean-dark)] mb-3">🤝 Community First</h3>
            <p className="text-sm sm:text-base text-[var(--ocean-dark)]/70">
              Join a vibrant community of DeFi enthusiasts and AI explorers
            </p>
          </div>
        </div>

        <LeaveSiteModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmNavigation}
          siteName={pendingSiteName}
        />
      </div>
    </main>
  )
}
