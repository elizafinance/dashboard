import { Connection, PublicKey } from '@solana/web3.js'
import { fetchTokenData } from '@/scripts/fetchTokenData'

interface TokenHolding {
  token: {
    address: string
    balance: number
    decimals: number
    percentageOwned: number
  }
  balance: number
  marketData?: {
    price: number
    volume24h: number
    marketCap: number
  }
  percentage: number
  change24h: number
}

interface TokenData {
  holdings: TokenHolding[]
  summary: {
    totalValue: number
    totalHoldings: number
    significantPositions: number
    averagePosition: number
    topHoldingsValue: number
    topHoldingsPercentage: number
  }
  dailyPerformance: number
  performanceVsCMC: number
  significantHoldings: Array<{
    token: string
    value: number
    percentage: number
  }>
}

interface PortfolioMetrics {
  defaiScore: number
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

const HELIUS_RPC = process.env.NEXT_PUBLIC_HELIUS_RPC || 'https://rpc-devnet.helius.xyz/?api-key=YOUR_API_KEY'

async function getWorkingEndpoint(): Promise<Connection> {
  try {
    const connection = new Connection(HELIUS_RPC, 'confirmed')
    await connection.getLatestBlockhash()
    console.log('Using Helius RPC endpoint')
    return connection
  } catch (error) {
    console.warn('Helius endpoint failed, using mock data')
    throw new Error('Failed to establish connection')
  }
}

export async function calculatePortfolioMetrics(publicKey: string): Promise<PortfolioMetrics> {
  try {
    const tokenData = await fetchTokenData(publicKey)
    let connection = null
    
    try {
      connection = await getWorkingEndpoint()
    } catch (error) {
      console.warn('Failed to establish RPC connection, using mock data only')
    }

    // Calculate metrics using available data
    return {
      defaiScore: calculateDefaiScore(tokenData),
      risk: 75,
      entryScore: 70,
      exitScore: 75,
      gasScore: 85,
      trendScore: 80,
      volatilityScore: 60,
      alphaScore: 75,
      protocolScore: 85,
      yieldScore: 70,
      contractScore: 80,
      liquidity: 85,
      diversification: 75,
      metrics: {
        capitalManagement: calculateCapitalMetric(tokenData),
        degenIndex: calculateDegenIndex(tokenData),
        defiSavviness: calculateDefiMetric(tokenData)
      },
      performance: {
        daily: tokenData.dailyPerformance,
        vsCMC100: tokenData.performanceVsCMC
      },
      topHoldings: tokenData.significantHoldings.map(h => h.token),
      aiAnalysis: "G'day! Your portfolio is looking ripper with a healthy balance. Consider increasing your DeFi exposure to optimize returns.",
      comparisonPercentile: 75
    }
  } catch (error) {
    console.error('Error calculating portfolio metrics:', error)
    throw error
  }
}

function calculateDefaiScore(tokenData: TokenData): number {
    const holdingsScore = tokenData.significantHoldings.reduce((score, holding) => {
        if (holding.token === 'DEFAI') {
            return score + 25
        }
        return score + 10
    }, 0)

    const performanceScore = (tokenData.dailyPerformance + 100) * 0.3
    const relativeScore = (tokenData.performanceVsCMC + 100) * 0.2

    return Math.min(Math.round(holdingsScore + performanceScore + relativeScore), 100)
}

function calculateCapitalMetric(tokenData: TokenData): number {
    const diversificationScore = Math.min(tokenData.significantHoldings.length * 20, 100)
    const balanceScore = tokenData.significantHoldings.every(h => h.percentage <= 50) ? 100 : 70
    
    return Math.round((diversificationScore + balanceScore) / 2)
}

function calculateDegenIndex(tokenData: TokenData): number {
    const concentrationPenalty = tokenData.significantHoldings
        .filter(h => h.percentage > 30)
        .length * 15

    return Math.max(Math.min(100 - concentrationPenalty, 100), 0)
}

function calculateDefiMetric(tokenData: TokenData): number {
    const defiTokens = tokenData.significantHoldings
        .filter(h => ['DEFAI', 'AI16Z'].includes(h.token))
        .reduce((total, h) => total + h.percentage, 0)

    return Math.min(Math.round(defiTokens + 40), 100)
}

