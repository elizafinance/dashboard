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
    <div className="grid gap-4">
      <Card className="p-6">
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
              <div 
                key={index}
                className="bg-white/80 p-4 rounded-lg border border-[var(--ocean-light)]/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[var(--ocean-dark)]">
                    {suggestion.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--ocean-light)]/10">
                    {suggestion.type}
                  </span>
                </div>
                <p className="text-[var(--ocean-dark)]/70 mb-2">
                  {suggestion.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[var(--ocean-dark)]/60">
                    {suggestion.impact}
                  </span>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-[var(--coral)] text-[var(--coral)] hover:bg-[var(--coral)]/10"
                  >
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
} 