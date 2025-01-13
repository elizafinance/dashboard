'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_DEFAI_CONTRACT!)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--ocean-light)]/20 to-[var(--sand-light)]/30">
      <div className="container max-w-[95vw] mx-auto pt-16 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-6xl font-bold text-[var(--ocean-dark)] mb-6">
              DeFAI Summer <span className="text-[var(--coral)]">2025</span> 
            </h1>
            <p className="text-xl text-[var(--ocean-dark)]/70 mb-6">
              Join the ripper revolution of autonomous AI agents in DeFi. 
              The future of finance is being built by AI, for AI. Fair dinkum! 🤖
            </p>
            
            {/* Contract Address Card */}
            <div className="bg-white/80 p-4 rounded-lg mb-8 border border-[var(--ocean-light)]/20 hover:border-[var(--ocean-light)] transition-all">
              <p className="text-sm text-[var(--ocean-dark)]/60 mb-2">$DEFAI Contract:</p>
              <div className="flex items-center gap-2 font-mono text-sm">
                <a 
                  href={`https://solscan.io/token/${process.env.NEXT_PUBLIC_DEFAI_CONTRACT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ocean-dark)] hover:text-[var(--coral)] transition-colors truncate"
                >
                  {process.env.NEXT_PUBLIC_DEFAI_CONTRACT}
                </a>
                <button 
                  onClick={handleCopyAddress}
                  className="text-[var(--ocean-dark)]/40 hover:text-[var(--ocean-dark)] transition-colors"
                  title="Copy address"
                >
                  📋
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full">
              {/* Main CTA */}
              <Link href="/pools" className="w-full">
                <Button className="w-full bg-[var(--ocean-dark)] hover:bg-[var(--ocean-light)] text-white px-8 py-8 text-xl">
                 Dive into our Pools 🏄‍♂️
                </Button>
              </Link>

              {/* Partners Section */}
              <div className="mt-4">
                <h3 className="text-[var(--ocean-dark)]/60 text-sm mb-3">Our Mates 🤝</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://elizawakesup.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-[var(--ocean-dark)] text-[var(--ocean-dark)] px-6 py-4 text-base"
                    >
                      Chat with Eliza 💬
                    </Button>
                  </a>
                  <a 
                    href="https://mee.fun"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-[var(--coral)] text-[var(--coral)] hover:bg-[var(--coral)]/10 px-6 py-4 text-base"
                    >
                      Create Eliza 🤖
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <Image
              src="/beach-crew.png"
              alt="Eliza Finance Beach Crew"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/80 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[var(--ocean-dark)] mb-3">🤖 AI-Powered DeFi</h3>
            <p className="text-[var(--ocean-dark)]/70">
              Experience the future of finance with our network of autonomous DeFi agents
            </p>
          </div>
          <div className="bg-white/80 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[var(--ocean-dark)] mb-3">🔍 Smart Analytics</h3>
            <p className="text-[var(--ocean-dark)]/70">
              Get real-time insights and analysis from our AI-powered observatory
            </p>
          </div>
          <div className="bg-white/80 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[var(--ocean-dark)] mb-3">🤝 Community First</h3>
            <p className="text-[var(--ocean-dark)]/70">
              Join a vibrant community of DeFi enthusiasts and AI explorers
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
