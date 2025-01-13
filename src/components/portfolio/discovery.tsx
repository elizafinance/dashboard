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
            twitter: 'ai16z_dao',
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
    <div className="grid gap-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ocean-dark)]">
              New Opportunities 🎯
            </h2>
            <p className="text-sm text-[var(--ocean-dark)]/60">
              Eliza's found some fresh opportunities in the ecosystem
            </p>
          </div>
          <Button 
            variant="outline"
            className="border-[var(--ocean-dark)] text-[var(--ocean-dark)]"
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
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-[var(--ocean-dark)]">
                      {opp.name} ({opp.symbol})
                    </h3>
                    <div className="flex gap-2 mt-1">
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
                    className={`${getScoreColor(opp.score)} font-medium text-lg`}
                  >
                    {opp.score}
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
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

                <div className="flex gap-2">
                  {opp.socials.twitter && (
                    <a 
                      href={`https://twitter.com/${opp.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                  {opp.socials.telegram && (
                    <a 
                      href={`https://t.me/${opp.socials.telegram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Telegram
                    </a>
                  )}
                  {opp.socials.discord && (
                    <a 
                      href={opp.socials.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Discord
                    </a>
                  )}
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