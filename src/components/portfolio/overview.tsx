'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { useWallet } from '@solana/wallet-adapter-react'

interface PortfolioStats {
  totalValue: number
  dailyChange: number
  topHoldings: Array<{
    token: string
    value: number
    change24h: number
  }>
}

export function PortfolioOverview() {
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<PortfolioStats | null>(null)

  useEffect(() => {
    // TODO: Fetch portfolio data
    setLoading(false)
  }, [publicKey])

  if (loading) {
    return (
      <div className="grid gap-4">
        <Card className="p-6">
          <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <Card className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ocean-dark)] mb-4">
          Portfolio Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-[var(--ocean-light)]/10 p-3 sm:p-4 rounded-lg">
            <p className="text-sm text-[var(--ocean-dark)]/60">Total Value</p>
            <p className="text-xl sm:text-2xl font-bold text-[var(--ocean-dark)]">
              Loading...
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--ocean-dark)] mb-3 sm:mb-4">
            Eliza's Recommendations 🤖
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-[var(--ocean-dark)]/70">
              I'm analyzing your portfolio... Stay tuned for some ripper recommendations!
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
} 