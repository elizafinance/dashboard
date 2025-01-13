'use client'

import { useState, useEffect } from 'react'
import { TokenGrid } from "@/components/token-grid"
import { TokenHolding } from "@/types"

export default function GridPage() {
  const [holdings, setHoldings] = useState<TokenHolding[]|null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date|null>(null)

  useEffect(() => {
    async function fetchHoldings() {
      try {
        const response = await fetch('/api/holdings')
        const data = await response.json()
        setHoldings(data.holdings)
        setLastUpdated(new Date(data.lastUpdated))
      } catch (error) {
        console.error('Error fetching holdings:', error)
      }
    }

    fetchHoldings()
  }, [])

  if (!holdings) {
    return (
      <main className="container max-w-[95vw] mx-auto p-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <span className="text-4xl">🌊</span>
            <p className="mt-4 text-[var(--ocean-dark)]/60">Loading tokens...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container max-w-[95vw] mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-center text-[var(--ocean-dark)]">
            Token Grid
          </h1>
          <p className="text-[var(--ocean-dark)]/60">
            Explore and filter our token collection 🔍
          </p>
          {lastUpdated && (
            <p className="text-sm text-[var(--ocean-dark)]/40">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>
        <TokenGrid holdings={holdings} />
      </div>
    </main>
  )
} 