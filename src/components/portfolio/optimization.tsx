'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'

interface OptimizationSuggestion {
  type: 'rebalance' | 'risk' | 'opportunity'
  title: string
  description: string
  impact: string
  action: string
}

export function PortfolioOptimization() {
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([])

  useEffect(() => {
    // TODO: Fetch real suggestions from API
    setSuggestions([
      {
        type: 'rebalance',
        title: 'Rebalance DEFAI Exposure',
        description: 'G\'day mate! Your DEFAI position is a bit light on. Consider increasing your exposure to maintain optimal portfolio balance.',
        impact: 'Could improve risk-adjusted returns by ~2.5%',
        action: 'Increase DEFAI position by 5%'
      },
      {
        type: 'risk',
        title: 'High Concentration Warning',
        description: 'Crikey! Your position in AI16Z is a fair dinkum chunk of your portfolio.',
        impact: 'Current risk level: High',
        action: 'Consider diversifying into other tokens'
      }
    ])
    setLoading(false)
  }, [publicKey])

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Card className="p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-[var(--ocean-dark)] mb-4">
          Eliza's Portfolio Analysis 🤖
        </h2>
        
        {loading ? (
          <div className="space-y-4">
            <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
            <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2 flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--ocean-dark)]">
                      {suggestion.title}
                    </h3>
                    <p className="text-[var(--ocean-dark)]/70">
                      {suggestion.description}
                    </p>
                    <p className="text-sm font-medium text-[var(--ocean-dark)]/60">
                      {suggestion.impact}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="w-full sm:w-auto px-4 py-2 bg-[var(--coral)] text-white rounded-md hover:bg-[var(--coral)]/90 transition-colors">
                      {suggestion.action}
                    </button>
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