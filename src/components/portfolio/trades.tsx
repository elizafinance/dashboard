'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'
import poolsData from '@/data/pools.json'

interface TradeOpportunity {
  pair: string
  type: 'swap' | 'arbitrage'
  expectedReturn: number
  confidence: number
  route: string[]
}

export function TradesAndSwaps() {
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [opportunities, setOpportunities] = useState<TradeOpportunity[]>([])

  useEffect(() => {
    // Generate trade opportunities from pools data
    const tradeOpps = poolsData.pools.slice(0, 2).map(pool => ({
      pair: `${pool.token0}/${pool.token1}`,
      type: Math.random() > 0.5 ? 'swap' : 'arbitrage' as 'swap' | 'arbitrage',
      expectedReturn: +(Math.random() * 3).toFixed(1),
      confidence: Math.floor(Math.random() * 20) + 80,
      route: ['Jupiter', 'Orca', 'Raydium'].slice(0, Math.floor(Math.random() * 2) + 2)
    }))
    setOpportunities(tradeOpps)
    setLoading(false)
  }, [publicKey])

  return (
    <div className="grid gap-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ocean-dark)]">
              Trade Opportunities 🎯
            </h2>
            <p className="text-sm text-[var(--ocean-dark)]/60">
              Eliza's found some ripper trades for ya, mate!
            </p>
          </div>
          <Button 
            variant="outline"
            className="border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
          >
            Trading Settings ⚙️
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
            <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-4">
            {opportunities.map((opp, index) => (
              <div 
                key={index}
                className="bg-white/80 p-4 rounded-lg border border-[var(--ocean-light)]/20"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="font-semibold text-[var(--ocean-dark)]">{opp.pair}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--ocean-light)]/10">
                      {opp.type}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--coral)]">+{opp.expectedReturn}%</p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">Expected Return</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{opp.confidence}%</p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">Confidence</p>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
                    >
                      Execute Trade 🏄‍♂️
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-[var(--ocean-dark)]/60">
                  Route: {opp.route.join(' → ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
} 