'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'

interface LendingOpportunity {
  token: string
  apy: number
  tvl: number
  risk: 'Low' | 'Medium' | 'High'
  utilization: number
  liquidityUsd: number
  warningFlags: string[]
}

export function LendingDashboard() {
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [opportunities, setOpportunities] = useState<LendingOpportunity[]>([])

  useEffect(() => {
    // TODO: Fetch real lending opportunities
    setOpportunities([
      {
        token: 'DEFAI',
        apy: 12.5,
        tvl: 1500000,
        risk: 'Medium',
        utilization: 65,
        liquidityUsd: 75000,
        warningFlags: []
      },
      {
        token: 'AI16Z',
        apy: 18.2,
        tvl: 800000,
        risk: 'High',
        utilization: 85,
        liquidityUsd: 45000,
        warningFlags: ['⚠️ High utilization', '⚠️ Low liquidity']
      }
    ])
    setLoading(false)
  }, [publicKey])

  return (
    <div className="grid gap-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ocean-dark)]">
              Lending Markets 🏦
            </h2>
            <p className="text-sm text-[var(--ocean-dark)]/60">
              Eliza's analyzed these lending opportunities for risk and reward
            </p>
          </div>
          <Button 
            variant="outline"
            className="border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
          >
            Risk Settings ⚠️
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
                    <h3 className="font-semibold text-[var(--ocean-dark)]">{opp.token}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      opp.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      opp.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {opp.risk} Risk
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--coral)]">{opp.apy}%</p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">APY</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{opp.utilization}%</p>
                    <p className="text-xs text-[var(--ocean-dark)]/60">Utilization</p>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
                    >
                      Lend Now 🌊
                    </Button>
                  </div>
                </div>
                {opp.warningFlags.length > 0 && (
                  <div className="mt-2 text-xs text-amber-600">
                    {opp.warningFlags.join(' • ')}
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