'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'
import { DiscoverySettingsModal } from './discovery-settings-modal'

interface TokenOpportunity {
  name: string
  symbol: string
  address: string
  score: number
  priceChange: {
    h24: number
  }
  marketCap: number
  volume: {
    h24: number
  }
  socials: {
    twitter?: string
    telegram?: string
    discord?: string
  }
  tags: string[]
}

export function OpportunityDiscovery() {
    const { publicKey } = useWallet()
    const [loading, setLoading] = useState(true)
    const [opportunities, setOpportunities] = useState<TokenOpportunity[]>([])
    const [showSettings, setShowSettings] = useState(false)
    const [settings, setSettings] = useState({
      minScore: 60,
      minMarketCap: 1,
      showHighRisk: false,
      showNewTokens: true,
      includeSocials: true
    })
  
    useEffect(() => {
      // TODO: Fetch real opportunities from API
      setOpportunities([
        {
          name: 'AI16Z DAO',
          symbol: 'AI16Z',
          address: 'Ai16Z...',
          score: 85,
          priceChange: { h24: 12.5 },
          marketCap: 2500000,
          volume: { h24: 150000 },
          socials: {
            twitter: 'ai16zdao',
          telegram: 'ai16z_community'
        },
        tags: ['DAO', 'AI', 'Governance']
      },
      {
        name: 'DegenAI',
        symbol: 'DGNAI',
        address: 'DgnAi...',
        score: 72,
        priceChange: { h24: -5.2 },
        marketCap: 1200000,
        volume: { h24: 80000 },
        socials: {
          discord: 'https://discord.gg/degenai'
        },
        tags: ['GameFi', 'AI']
      }
    ])
    setLoading(false)
  }, [publicKey])

  const getScoreColor = (score: number) => {
    if (score >= 79) return 'text-green-400'
    if (score >= 60) return 'text-orange-300'
    if (score >= 40) return 'text-red-500'
    return 'text-red-800'
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-[var(--ocean-dark)] truncate">
              New Opportunities 🎯
            </h2>
            <p className="text-sm text-[var(--ocean-dark)]/60 truncate">
              Eliza's found some fresh opportunities in the ecosystem
            </p>
          </div>
          <Button 
            variant="outline"
            className="w-full sm:w-auto border-[var(--ocean-dark)] text-[var(--ocean-dark)] flex-shrink-0"
            onClick={() => setShowSettings(true)}
          >
            Discovery Settings 🔍
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
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[var(--ocean-dark)] truncate">
                      {opp.name} ({opp.symbol})
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {opp.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-[var(--ocean-light)]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a 
                    href={`https://www.solsniffer.com/scanner/${opp.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${getScoreColor(opp.score)} font-medium text-lg flex-shrink-0`}
                  >
                    {opp.score}
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-[var(--ocean-dark)]/60">24h Change</p>
                    <p className={`font-bold ${
                      opp.priceChange.h24 > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {opp.priceChange.h24}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--ocean-dark)]/60">Market Cap</p>
                    <p className="font-medium">${(opp.marketCap/1000000).toFixed(2)}M</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--ocean-dark)]/60">24h Volume</p>
                    <p className="font-medium">${(opp.volume.h24/1000).toFixed(0)}K</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(opp.socials).map(([platform, link], i) => (
                    <a
                      key={i}
                      href={platform === 'twitter' ? `https://twitter.com/${link}` : link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--ocean-dark)]/60 hover:text-[var(--ocean-dark)] transition-colors"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      <DiscoverySettingsModal
        open={showSettings}
        onOpenChange={setShowSettings}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  )
} 