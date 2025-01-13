import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
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
              <Link href="/chat">
                <Button variant="outline" className="border-[var(--ocean-dark)] text-[var(--ocean-dark)] px-8 py-6 text-lg">
                  Chat with Eliza 💬
                </Button>
              </Link>
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
