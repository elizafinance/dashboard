import { Connection, PublicKey } from '@solana/web3.js'
import { fetchTokenData } from '@/scripts/fetchTokenData'
import { TokenData, TokenHolding } from '@/types'

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

const HELIUS_RPC = process.env.NEXT_PUBLIC_HELIUS_RPC
if (!HELIUS_RPC) {
  throw new Error('HELIUS_RPC environment variable is not set')
}

async function getWorkingEndpoint(): Promise<Connection | undefined> {
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
    const tokenData = await fetchTokenData(publicKey)
    let connection: Connection | undefined
    
    try {
      connection = await getWorkingEndpoint()
    } catch (error) {
      console.warn('Failed to establish RPC connection, using mock data only')
    }
    return {
      defaiScore: calculateDefaiScore({
        holdings: tokenData.holdings.map(h => ({
          token: h.token,
          percentage: h.percentage,
          balance: h.balance,
          marketData: h.marketData,
          address: h.token.address,
          decimals: h.token.decimals,
          usdValue: h.usdValue,
          percentageOwned: h.percentageOwned,
          firstReceived: h.firstReceived
        })),
        summary: tokenData.summary,
        significantHoldings: tokenData.significantHoldings,
        dailyPerformance: tokenData.dailyPerformance,
        performanceVsCMC: tokenData.performanceVsCMC
      }),
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
        capitalManagement: calculateCapitalMetric({
          holdings: tokenData.holdings.map(h => ({
            token: h.token,
            percentage: h.percentage,
            balance: h.balance,
            marketData: h.marketData,
            address: h.token.address,
            decimals: h.token.decimals,
            usdValue: h.usdValue,
            percentageOwned: h.percentageOwned,
            firstReceived: h.firstReceived
          })),
          summary: tokenData.summary,
          significantHoldings: tokenData.significantHoldings,
          dailyPerformance: tokenData.dailyPerformance,
          performanceVsCMC: tokenData.performanceVsCMC
        }),
        degenIndex: calculateDegenIndex({
          holdings: tokenData.holdings.map(h => ({
            token: h.token,
            percentage: h.percentage,
            balance: h.balance,
            marketData: h.marketData,
            address: h.token.address,
            decimals: h.token.decimals,
            usdValue: h.usdValue,
            percentageOwned: h.percentageOwned,
            firstReceived: h.firstReceived
          })),
          summary: tokenData.summary,
          significantHoldings: tokenData.significantHoldings,
          dailyPerformance: tokenData.dailyPerformance,
          performanceVsCMC: tokenData.performanceVsCMC
        }),
        defiSavviness: calculateDefiMetric({
          holdings: tokenData.holdings.map(h => ({
            token: h.token,
            percentage: h.percentage,
            balance: h.balance,
            marketData: h.marketData,
            address: h.token.address,
            decimals: h.token.decimals,
            usdValue: h.usdValue,
            percentageOwned: h.percentageOwned,
            firstReceived: h.firstReceived
          })),
          summary: tokenData.summary,
          significantHoldings: tokenData.significantHoldings,
          dailyPerformance: tokenData.dailyPerformance,
          performanceVsCMC: tokenData.performanceVsCMC
        })
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
  return Math.min(Math.round(
    tokenData.significantHoldings.reduce((score: number, holding: { token: string }) => {
      if (holding.token === 'DEFAI') return score + 25
      return score + 10
    }, 40)
  ), 100)
}

function calculateCapitalMetric(tokenData: TokenData): number {
  return Math.min(Math.round(
    tokenData.summary.totalHoldings * 10 + 
    tokenData.summary.significantPositions * 15
  ), 100)
}

function calculateDegenIndex(tokenData: TokenData): number {
  return Math.max(0, Math.min(100, 
    100 - tokenData.significantHoldings
      .filter((h: { percentage: number }) => h.percentage > 30)
      .length * 15
  ))
}

function calculateDefiMetric(tokenData: TokenData): number {
  return Math.min(Math.round(
    tokenData.significantHoldings
      .filter((h: { token: string }) => ['DEFAI', 'AI16Z'].includes(h.token))
      .reduce((total: any, h: { percentage: any }) => total + h.percentage, 40)
  ), 100)
}

