'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TradeAnalysis {
  mindshareScore: number
  marketCondition: 'Favorable' | 'Neutral' | 'Unfavorable'
  entryPoint: boolean
  orderSize?: number
  tradeParameters?: {
    token: string
    price: number
    size: number
    route: string[]
  }
}

export function AITrading() {
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<TradeAnalysis | null>(null)
  const [dcaSettings, setDcaSettings] = useState({
    weeklyAmount: 10000,
    interval: 4 // hours
  })

  useEffect(() => {
    // Simulate the analysis process from the sequence diagram
    const fetchData = async () => {
      try {
        // Fetch narrative data (Kaito API)
        const narrativeData = await fetch('/api/kaito/narrative')
        
        // Get market data (Thirdweb API)
        const marketData = await fetch('/api/market/data')
        
        // Simulate analysis process
        setAnalysis({
          mindshareScore: 85,
          marketCondition: 'Favorable',
          entryPoint: true,
          orderSize: 2500,
          tradeParameters: {
            token: 'DEFAI',
            price: 1.25,
            size: 2000,
            route: ['Jupiter', 'Orca']
          }
        })
        
        setLoading(false)
      } catch (error) {
        console.error('Error in AI analysis:', error)
      }
    }

    const interval = setInterval(fetchData, dcaSettings.interval * 60 * 60 * 1000)
    fetchData()

    return () => clearInterval(interval)
  }, [publicKey, dcaSettings.interval])

  return (
    <div className="grid gap-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-[var(--ocean-dark)] mb-4">
          AI Trading Dashboard 🤖
        </h2>
        
        {/* DCA Settings */}
        <div className="bg-[var(--ocean-light)]/10 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-[var(--ocean-dark)] mb-2">
            DCA Parameters
          </h3>
          <p className="text-sm text-[var(--ocean-dark)]/60">
            Currently set to ${dcaSettings.weeklyAmount.toLocaleString()} weekly, 
            checking every {dcaSettings.interval} hours
          </p>
        </div>

        {loading ? (
          <div className="h-48 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
        ) : analysis ? (
          <div className="space-y-6">
            {/* Analysis Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/80 p-4 rounded-lg border border-[var(--ocean-light)]/20">
                <p className="text-sm text-[var(--ocean-dark)]/60">Mindshare Score</p>
                <p className="text-2xl font-bold text-[var(--ocean-dark)]">
                  {analysis.mindshareScore}%
                </p>
              </div>
              
              <div className="bg-white/80 p-4 rounded-lg border border-[var(--ocean-light)]/20">
                <p className="text-sm text-[var(--ocean-dark)]/60">Market Condition</p>
                <p className="text-2xl font-bold text-[var(--ocean-dark)]">
                  {analysis.marketCondition}
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-lg border border-[var(--ocean-light)]/20">
                <p className="text-sm text-[var(--ocean-dark)]/60">Entry Point</p>
                <p className="text-2xl font-bold text-[var(--ocean-dark)]">
                  {analysis.entryPoint ? '✅ Yes' : '❌ No'}
                </p>
              </div>
            </div>

            {/* Trade Parameters */}
            {analysis.tradeParameters && (
              <Card className="p-4 border-2 border-[var(--ocean-light)]">
                <h3 className="font-medium text-[var(--ocean-dark)] mb-3">
                  Recommended Trade
                </h3>
                <div className="space-y-2">
                  <p>Token: {analysis.tradeParameters.token}</p>
                  <p>Size: ${analysis.tradeParameters.size.toLocaleString()}</p>
                  <p>Route: {analysis.tradeParameters.route.join(' → ')}</p>
                  <Button 
                    className="w-full sm:w-auto mt-4 bg-[var(--ocean-dark)] hover:bg-[var(--ocean-light)] text-white"
                  >
                    Execute Trade 🏄‍♂️
                  </Button>
                </div>
              </Card>
            )}
          </div>
        ) : null}
      </Card>
    </div>
  )
} 