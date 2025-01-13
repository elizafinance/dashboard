'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("DeFiVh2Ry5vEoKHqKhUwKbHzJ1ZrXbXdLbomQPbZxQrt")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--ocean-light)]/20 to-[var(--sand-light)]/30">
      {/* Hero Section */}
      <div className="container max-w-[95vw] mx-auto pt-16 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl font-bold text-[var(--ocean-dark)] mb-6">
              Welcome to Eliza.Finance
            </h1>
            <p className="text-xl text-[var(--ocean-dark)]/70 mb-8">
              Dive into the future of decentralized finance powered by autonomous AI agents. 
              Join our beach-side community of DeFi explorers! 🏖️
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/pools">
                <Button className="bg-[var(--ocean-dark)] hover:bg-[var(--ocean-light)] text-white px-8 py-6 text-lg">
                  Explore Pools 🌊
                </Button>
              </Link>
              <a 
                href="https://elizawakesup.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-[var(--ocean-dark)] text-[var(--ocean-dark)] px-8 py-6 text-lg">
                  Chat with Eliza 💬
                </Button>
              </a>
              <a 
                href="https://mee.fun"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-[var(--coral)] text-[var(--coral)] hover:bg-[var(--coral)]/10 px-8 py-6 text-lg">
                  Create Eliza 🤖
                </Button>
              </a>
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

        {/* Footer Info */}
        <div className="mt-24 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[var(--ocean-dark)]/60">Powered by</span>
            <a 
              href="https://birdeye.so/token/DeFiVh2Ry5vEoKHqKhUwKbHzJ1ZrXbXdLbomQPbZxQrt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--coral)] hover:opacity-80 transition-opacity font-medium"
            >
              $DEFAI
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-[var(--ocean-dark)]/40">Contract:</span>
            <a 
              href="https://solscan.io/token/DeFiVh2Ry5vEoKHqKhUwKbHzJ1ZrXbXdLbomQPbZxQrt"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[var(--ocean-dark)]/60 hover:text-[var(--ocean-dark)] transition-colors"
            >
              DeFiVh2Ry5vEoKHqKhUwKbHzJ1ZrXbXdLbomQPbZxQrt
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
      </div>
    </main>
  )
}
