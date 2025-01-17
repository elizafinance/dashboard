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
    <div className="w-full max-w-full overflow-hidden">
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-[var(--ocean-dark)] truncate">
              Trade Opportunities 🎯
            </h2>
            <p className="text-sm text-[var(--ocean-dark)]/60 truncate">
              Eliza's found some ripper trades for ya, mate!
            </p>
          </div>
          <Button 
            variant="outline"
            className="w-full sm:w-auto border-[var(--ocean-dark)] text-[var(--ocean-dark)] flex-shrink-0"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[var(--ocean-dark)] truncate">{opp.pair}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--ocean-light)]/10 inline-block mt-1">
                      {opp.type}
                    </span>
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="text-2xl font-bold text-[var(--coral)]">+{opp.expectedReturn}%</p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">Expected Return</p>
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="text-sm font-medium">{opp.confidence}%</p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">Confidence</p>
                  </div>
                  <div className="flex justify-start sm:justify-end">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
                    >
                      Execute Trade 🏄‍♂️
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-[var(--ocean-dark)]/60 truncate">
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