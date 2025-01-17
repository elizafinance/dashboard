'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'
import poolsData from '@/data/pools.json'

interface YieldOpportunity {
  id: string
  name: string
  token0: string
  token1: string
  tvl: number
  apr: number
  protocol?: string
  risk?: 'Low' | 'Medium' | 'High'
  recommended?: boolean
}

export function YieldAggregation() {
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [opportunities, setOpportunities] = useState<YieldOpportunity[]>([])

  useEffect(() => {
    // Transform pool data to include additional yield-specific fields
    const yieldOpps = poolsData.pools.map(pool => ({
      ...pool,
      protocol: ['Orca', 'Raydium', 'Jupiter'][Math.floor(Math.random() * 3)],
      risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High',
      recommended: Math.random() > 0.5
    }))
    setOpportunities(yieldOpps)
    setLoading(false)
  }, [publicKey])

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-[var(--ocean-light)]/5 to-[var(--coral)]/5">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-[var(--ocean-dark)] truncate">Prepare for Launch! 🚀</h3>
            <p className="text-sm text-[var(--ocean-dark)]/60 truncate">
              Lock your LP tokens on Raydium to be ready for our yield farming pools
            </p>
          </div>
          <a 
            href="https://raydium.io/liquidity-pools/?token=5LGyBHMMPwzMunxhcBMn6ZWAuqoHUQmcFiboTJidFURP"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-shrink-0"
          >
            <Button 
              className="w-full sm:w-auto bg-[var(--ocean-dark)] hover:bg-[var(--ocean-light)] text-white"
            >
              Lock LP on Raydium 🏊‍♂️
            </Button>
          </a>
        </div>
      </Card>

      <Card className="p-6 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[var(--ocean-dark)] truncate">
            Ripper Yield Opportunities 🏄‍♂️
          </h2>
          <Button 
            variant="outline"
            className="w-full sm:w-auto border-[var(--ocean-dark)] text-[var(--ocean-dark)] flex-shrink-0"
          >
            Auto-Compound Settings
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
            <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div 
                key={opp.id}
                className="bg-white/80 p-4 rounded-lg border border-[var(--ocean-light)]/20"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[var(--ocean-dark)] truncate">{opp.name}</h3>
                    <p className="text-sm text-[var(--ocean-dark)]/60 truncate">{opp.protocol}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--coral)]">
                      {opp.apr ? `${opp.apr}%` : 'TBA'}
                    </p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">APR</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {opp.tvl > 0 ? `$${(opp.tvl/1000000).toFixed(1)}M` : 'TBA'}
                    </p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">TVL</p>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
                      disabled={opp.tvl === 0}
                    >
                      Farm Now 🌾
                    </Button>
                  </div>
                </div>
                {opp.recommended && (
                  <div className="mt-2 text-xs text-[var(--coral)] font-medium truncate">
                    🤖 Eliza Recommends: Bonza opportunity for yield farming!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
} 