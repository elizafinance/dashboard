import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Card } from "@/components/ui/card"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Image from 'next/image'
import { calculatePortfolioMetrics } from '@/lib/services/portfolio-metrics'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion'
import { Spinner } from '../ui/spinner'
import { shareOnX } from '@/lib/social-share'

interface PortfolioMetrics {
  risk: number
  entryScore: number
  exitScore: number
  gasScore: number
  trendScore: number
  volatilityScore: number
  alphaScore: number
  protocolScore: number
  yieldScore: number
  contractScore: number
  liquidity: number
  diversification: number
  defaiScore: number
  metrics: {
    capitalManagement: number
    degenIndex: number
    defiSavviness: number
  }
  performance: {
    daily: number
    vsCMC100: number
  }
  topHoldings: string[]
  aiAnalysis: string
  comparisonPercentile: number
}

export function OverviewMetrics() {
  const { publicKey } = useWallet()
  const [metrics, setMetrics] = useState<PortfolioMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMetrics() {
      if (!publicKey) {
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        const data = await calculatePortfolioMetrics(publicKey.toString())
        setMetrics(data)
      } catch (error) {
        console.error('Error fetching metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [publicKey])

  if (!publicKey) {
    return (
      <Card className="p-6">
        <p className="text-center text-[var(--ocean-dark)]/60">
          Connect your wallet to view portfolio metrics
        </p>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="p-6 flex justify-center items-center min-h-[400px]">
        <Spinner />
      </Card>
    )
  }

  if (!metrics) {
    return (
      <Card className="p-6">
        <p className="text-center text-[var(--ocean-dark)]/60">
          Error loading metrics
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-[var(--sand-light)] to-[var(--sand-dark)] border-2 border-[var(--ocean-light)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/logo.png"
          alt="DEFAI Logo"
          width={48}
          height={48}
          className="rounded-full border-2 border-[var(--coral)]"
        />
        <div>
          <h2 className="text-lg font-bold text-[var(--ocean-dark)] break-all">
            {publicKey?.toString()}
          </h2>
          <p className="text-sm text-[var(--ocean-dark)]/60">
            Connected Wallet
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Bar Charts */}
        <div className="space-y-4">
          <MetricBar label="Capital management" value={metrics.metrics.capitalManagement} />
          <MetricBar label="Degen index" value={metrics.metrics.degenIndex} />
          <MetricBar label="DeFi savviness" value={metrics.metrics.defiSavviness} />
        </div>

        {/* Center Column - Main Score */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-48 h-48">
            <CircularProgressbar
              value={metrics.defaiScore}
              text={`${metrics.defaiScore}`}
              styles={buildStyles({
                pathColor: 'var(--ocean-dark)',
                textColor: 'var(--ocean-dark)',
                trailColor: 'var(--ocean-light)'
              })}
            />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <p className="text-center font-medium text-[var(--ocean-dark)]">DEFAI SCORE</p>
            <button
              onClick={() => shareOnX(metrics)}
              className="inline-flex items-center justify-center rounded-md bg-[var(--ocean-dark)] px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-[var(--ocean-dark)]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ocean-dark)]"
            >
              Share on 𝕏
            </button>
          </div>
        </div>

        {/* Right Column - Performance Metrics */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <PerformanceGauge 
              label="24h performance"
              value={metrics.performance.daily}
            />
            <PerformanceGauge 
              label="vs CMC100"
              value={metrics.performance.vsCMC100}
            />
          </div>
          <ComparisonMeter value={metrics.comparisonPercentile} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 p-4 bg-white/80 rounded-lg border border-[var(--ocean-light)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🤖</span>
          <h3 className="font-medium text-[var(--ocean-dark)]">Eliza's Analysis</h3>
        </div>
        <p className="text-sm leading-relaxed text-[var(--ocean-dark)]/80">
          {metrics.aiAnalysis}
        </p>
      </div>

      {/* Additional Metrics */}
      <div className="mt-8">
        <Accordion type="single" collapsible>
          <AccordionItem value="detailed-metrics">
            <AccordionTrigger className="text-lg font-bold text-[var(--ocean-dark)]">
              View Detailed Metrics 📊
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Portfolio Health */}
                <Card className="p-4 bg-white/80">
                  <h3 className="text-lg font-bold text-[var(--ocean-dark)] mb-4">Portfolio Health 🏥</h3>
                  <div className="space-y-4">
                    <MetricBar
                      label="Diversification Score"
                      value={metrics?.diversification || 0}
                      />
                    <MetricBar
                      label="Liquidity Rating" 
                      value={metrics?.liquidity || 0}
                    />
                    <MetricBar
                      label="Risk Exposure"
                      value={metrics?.risk || 0}
                    />
                  </div>
                </Card>

                {/* Trading Behavior */}
                <Card className="p-4 bg-white/80">
                  <h3 className="text-lg font-bold text-[var(--ocean-dark)] mb-4">Trading Style 🎯</h3>
                  <div className="space-y-4">
                    <MetricBar
                      label="Entry Timing"
                      value={metrics?.entryScore || 0}
                    />
                    <MetricBar
                      label="Exit Execution"
                      value={metrics?.exitScore || 0}
                    />
                    <MetricBar
                      label="Gas Optimization"
                      value={metrics?.gasScore || 0}
                    />
                  </div>
                </Card>

                {/* Market Adaptation */}
                <Card className="p-4 bg-white/80">
                  <h3 className="text-lg font-bold text-[var(--ocean-dark)] mb-4">Market Adaptation 🌊</h3>
                  <div className="space-y-4">
                    <MetricBar
                      label="Trend Following"
                      value={metrics?.trendScore || 0}
                    />
                    <MetricBar
                      label="Volatility Management"
                      value={metrics?.volatilityScore || 0}
                    />
                    <MetricBar
                      label="Alpha Generation"
                      value={metrics?.alphaScore || 0}
                    />
                  </div>
                </Card>

                {/* DeFi Engagement */}
                <Card className="p-4 bg-white/80">
                  <h3 className="text-lg font-bold text-[var(--ocean-dark)] mb-4">DeFi Engagement 🏦</h3>
                  <div className="space-y-4">
                    <MetricBar
                      label="Protocol Diversity"
                      value={metrics?.protocolScore || 0}
                    />
                    <MetricBar
                      label="Yield Optimization"
                      value={metrics?.yieldScore || 0}
                    />
                    <MetricBar
                      label="Smart Contract Risk"
                      value={metrics?.contractScore || 0}
                    />
                  </div>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  )
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1 text-[var(--ocean-dark)]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 bg-[var(--ocean-light)] rounded-full">
        <div 
          className="h-full bg-[var(--ocean-dark)] rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function PerformanceGauge({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto">
        <CircularProgressbar
          value={Math.abs(value)}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: value >= 0 ? 'var(--coral)' : 'var(--ocean-light)',
            textColor: 'var(--ocean-dark)',
            trailColor: 'var(--ocean-light)'
          })}
        />
      </div>
      <p className="mt-2 text-sm text-[var(--ocean-dark)]">{label}</p>
    </div>
  )
}

function ComparisonMeter({ value }: { value: number }) {
  return (
    <div>
      <p className="text-sm mb-2 text-[var(--ocean-dark)]">Better than others</p>
      <div className="h-4 bg-[var(--ocean-light)] rounded-full">
        <div 
          className="h-full bg-[var(--coral)] rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-right text-sm mt-1 text-[var(--ocean-dark)]">{value}%</p>
    </div>
  )
} 