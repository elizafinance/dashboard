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
    <main className="min-h-screen relative">
      {/* Bush Background Effect */}
      <div className="absolute inset-0 bg-[#2D5A27]/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A7A3D]/30 via-[#2D5A27]/20 to-[#8B5E3C]/10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16 sm:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2D5A27] mb-6 break-words">
              DeFAI Summer <span className="text-[#4A7A3D]">2025</span> 
            </h1>
            <p className="text-base sm:text-lg text-[#2D5A27]/70 mb-6 max-w-[90vw] sm:max-w-prose mx-auto lg:mx-0">
              Join the ripper revolution of autonomous AI agents in DeFi. 
              The future of finance is being built by AI, for AI. Fair dinkum! 🌿
            </p>

            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto lg:mx-0">
              <div className="flex flex-col lg:flex-row gap-4">
                <Link href="/portfolio" className="w-full lg:flex-1">
                  <Button className="w-full bg-[#2D5A27] hover:bg-[#4A7A3D] text-white py-6 text-lg">
                    Start Your Walkabout 🌿
                  </Button>
                </Link>
                <Link href="/pools" className="w-full lg:flex-1">
                  <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-6 text-lg">
                    Join our Ripper Pools 🏄‍♂️
                  </Button>
                </Link>
              </div>

              {/* Partners Section */}
              <div className="mt-2">
                <h3 className="text-[#2D5A27]/60 text-sm mb-2">Our Mates 🤝</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#2D5A27] text-[#2D5A27] py-3 text-sm hover:bg-[#2D5A27]/10"
                    onClick={() => handleExternalLinkClick('https://elizawakesup.ai', 'Eliza Wakes Up')}
                  >
                    Chat 💬
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#2D5A27] text-[#2D5A27] py-3 text-sm hover:bg-[#2D5A27]/10"
                    onClick={() => handleExternalLinkClick('https://mee.fun', 'Mee.Fun')}
                  >
                    Create 🤖
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative max-w-md mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 sm:mt-20">
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
