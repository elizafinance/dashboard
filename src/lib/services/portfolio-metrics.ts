import { Connection, PublicKey } from '@solana/web3.js'
import { fetchTokenData } from '@/scripts/fetchTokenData'
import type { TokenData as AppTokenData, TokenHolding } from '@/types'

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

async function getWorkingEndpoint(): Promise<Connection | undefined> {
  const HELIUS_RPC = process.env.NEXT_PUBLIC_HELIUS_RPC
  if (!HELIUS_RPC) {
    console.warn('HELIUS_RPC environment variable is not set')
    return undefined
  }

  try {
    const connection = new Connection(HELIUS_RPC, 'confirmed')
    await connection.getLatestBlockhash()
    console.log('Using Helius RPC endpoint')
    return connection
  } catch (error) {
    console.warn('Helius endpoint failed:', error)
    return undefined
  }
}

export async function calculatePortfolioMetrics(publicKey: string): Promise<PortfolioMetrics> {
  try {
    const rawTokenData = await fetchTokenData(publicKey)
    
    // Ensure rawTokenData has the expected structure
    if (!rawTokenData || !('holdings' in rawTokenData) || !Array.isArray(rawTokenData.holdings)) {
      throw new Error('Invalid token data structure')
    }

    const tokenData: AppTokenData = {
      holdings: rawTokenData.holdings.map(h => ({
        address: h.mint,
        balance: h.amount,
        decimals: 9, // Assuming default decimals for Solana tokens
        usdValue: h.value,
        percentageOwned: h.percentage,
        firstReceived: 0, // Placeholder, adjust as needed
        marketData: {
          baseToken: {
            address: h.mint,
            name: h.token || h.mint,
            symbol: h.token || h.mint
          },
          priceUsd: (h.value / h.amount).toString(),
          priceChange: {
            m5: 0,
            h1: 0,
            h6: 0,
            h24: h.change24h || 0
          },
          pairCreatedAt: Date.now(),
          score: 0 // Placeholder, adjust as needed
        }
      })),
      summary: rawTokenData.summary,
      dailyPerformance: rawTokenData.dailyPerformance,
      performanceVsCMC: rawTokenData.performanceVsCMC,
      significantHoldings: rawTokenData.significantHoldings
    }

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
        daily: rawTokenData.dailyPerformance || 0,
        vsCMC100: rawTokenData.performanceVsCMC || 0
      },
      topHoldings: rawTokenData.significantHoldings?.map(h => h.token) || [],
      aiAnalysis: "G'day! Your portfolio is looking ripper with a healthy balance. Consider increasing your DeFi exposure to optimize returns.",
      comparisonPercentile: 75
    }
  } catch (error) {
    console.error('Error calculating portfolio metrics:', error)
    throw error
  }
}

function calculateDefaiScore(tokenData: AppTokenData): number {
  if (!tokenData.significantHoldings || !Array.isArray(tokenData.significantHoldings)) {
    throw new Error('Invalid significantHoldings data structure');
  }

  return Math.min(
    Math.round(
      tokenData.significantHoldings.reduce((score: number, holding: { token: string }) => {
        if (holding.token === 'DEFAI') return score + 25;
        return score + 10;
      }, 40)
    ),
    100
  );
}

function calculateCapitalMetric(tokenData: AppTokenData): number {
  return Math.min(Math.round(
    tokenData.summary.totalHoldings * 10 + 
    tokenData.summary.significantPositions * 15
  ), 100)
}

function calculateDegenIndex(tokenData: AppTokenData): number {
  return Math.max(0, Math.min(100, 
    100 - tokenData.significantHoldings
      .filter((h: { percentage: number }) => h.percentage > 30)
      .length * 15
  ))
}

function calculateDefiMetric(tokenData: AppTokenData): number {
  return Math.min(Math.round(
    tokenData.significantHoldings
      .filter((h: { token: string }) => ['DEFAI', 'AI16Z'].includes(h.token))
      .reduce((total: any, h: { percentage: any }) => total + h.percentage, 40)
  ), 100)
}

