'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { useWallet } from '@solana/wallet-adapter-react'
import { OverviewMetrics } from './overview-metrics'

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
  return (
    <div className="grid gap-4">
      <OverviewMetrics />
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--ocean-dark)] mb-3 sm:mb-4">
            Eliza's Recommendations 🤖
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-[var(--ocean-dark)]/70">
              Based on your DEFAI score and portfolio metrics, here are my recommendations...
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
} 