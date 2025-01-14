'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Card } from "@/components/ui/card"
import "@jup-ag/terminal/css"

export function PortfolioSwaps() {
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
    <div className="space-y-6">
      <Card className="p-6 bg-[#1a1b1f]/90 border-2 border-[var(--ocean-light)] relative overflow-hidden">
        {initError ? (
          <div className="text-center text-red-500 py-8">
            {initError}
          </div>
        ) : (
          <div id="integrated-terminal" />
        )}
      </Card>

      <div className="bg-gradient-to-r from-[var(--ocean-light)]/10 to-[var(--coral)]/10 rounded-lg p-4 border border-[var(--ocean-light)]/20">
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
  )
} 