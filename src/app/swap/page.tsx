'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { useWallet } from '@solana/wallet-adapter-react'
import "@jup-ag/terminal/css"

export default function SwapPage() {
  const walletProps = useWallet()
  const [initError, setInitError] = useState<string>('')

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@jup-ag/terminal")
        .then((mod) => {
          const init = mod.init
          try {
            init({
              displayMode: "integrated",
              integratedTargetId: "integrated-terminal",
              endpoint: "https://api.mainnet-beta.solana.com",
            })
          } catch (err) {
            console.error('Failed to initialize Jupiter Terminal:', err)
            setInitError('Failed to initialize swap interface')
          }
        })
        .catch((err) => {
          console.error('Failed to load Jupiter Terminal:', err)
          setInitError('Failed to load swap interface')
        })
    }
  }, [])

  return (
    <main className="container max-w-[95vw] mx-auto px-4 relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#66c2ff]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f5e6d3]/30 to-transparent" />
        <div className="absolute top-20 left-4 sm:left-20 text-6xl sm:text-8xl opacity-20">🏄‍♂️</div>
        <div className="absolute bottom-20 right-4 sm:right-20 text-6xl sm:text-8xl opacity-20">🌊</div>
      </div>

      {/* Main Content */}
      <div className="relative pt-8 sm:pt-12 pb-16 sm:pb-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-[var(--ocean-dark)]">
          Surf the Swap, Mate
        </h1>
        <p className="text-center text-[var(--ocean-dark)]/60 mb-8 sm:mb-12 px-4">
          Catch the perfect wave and ride these ripper token swaps 🏊‍♂️
        </p>

        {/* Jupiter Terminal */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 bg-[#1a1b1f]/90 border-2 border-[var(--ocean-light)] relative overflow-hidden">
            {initError ? (
              <div className="text-center text-red-500 py-8">
                {initError}
              </div>
            ) : (
              <div id="integrated-terminal" />
            )}
          </Card>

          {/* Info Banner */}
          <div className="mt-6 bg-gradient-to-r from-[var(--ocean-light)]/10 to-[var(--coral)]/10 rounded-lg p-4 border border-[var(--ocean-light)]/20">
            <div className="flex items-center gap-3">
              <span className="text-xl">🐚</span>
              <div>
                <h3 className="font-medium text-[var(--ocean-dark)]">Powered by Jupiter</h3>
                <p className="text-sm text-[var(--ocean-dark)]/60">
                  Best rates in the seven seas, guaranteed by Jupiter's aggregator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 