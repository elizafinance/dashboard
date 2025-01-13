'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'

interface YieldOpportunity {
  pool: string
  protocol: string
  apy: number
  tvl: number
  risk: 'Low' | 'Medium' | 'High'
  recommended: boolean
}

export function YieldAggregation() {
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [opportunities, setOpportunities] = useState<YieldOpportunity[]>([])

  useEffect(() => {
    // TODO: Fetch real yield opportunities
    setOpportunities([
      {
        pool: 'DEFAI/SOL',
        protocol: 'Orca',
        apy: 42.5,
        tvl: 1500000,
        risk: 'Medium',
        recommended: true
      },
      {
        pool: 'DEFAI/USDC',
        protocol: 'Raydium',
        apy: 35.8,
        tvl: 2800000,
        risk: 'Low',
        recommended: true
      }
    ])
    setLoading(false)
  }, [publicKey])

  return (
    <div className="grid gap-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--ocean-dark)]">
            Ripper Yield Opportunities 🏄‍♂️
          </h2>
          <Button 
            variant="outline"
            className="border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
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
            {opportunities.map((opp, index) => (
              <div 
                key={index}
                className="bg-white/80 p-4 rounded-lg border border-[var(--ocean-light)]/20"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="font-semibold text-[var(--ocean-dark)]">{opp.pool}</h3>
                    <p className="text-sm text-[var(--ocean-dark)]/60">{opp.protocol}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--coral)]">{opp.apy}%</p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">APY</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">${(opp.tvl/1000000).toFixed(1)}M</p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">TVL</p>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
                    >
                      Farm Now 🌾
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
} 