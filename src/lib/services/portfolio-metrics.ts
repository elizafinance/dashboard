import { Connection, PublicKey } from '@solana/web3.js'
import { TokenListProvider } from '@solana/spl-token-registry'

const RPC_ENDPOINTS = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
  'https://rpc.ankr.com/solana'
]

async function getWorkingEndpoint() {
  for (const endpoint of RPC_ENDPOINTS) {
    try {
      const connection = new Connection(endpoint)
      await connection.getSlot()
      return endpoint
    } catch (error) {
      console.warn(`Endpoint ${endpoint} failed, trying next...`)
      continue
    }
  }
  throw new Error('No working RPC endpoints found')
}

export interface PortfolioMetrics {
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

export async function calculatePortfolioMetrics(walletAddress: string): Promise<PortfolioMetrics> {
  try {
    const endpoint = await getWorkingEndpoint()
    const connection = new Connection(endpoint)
    const pubKey = new PublicKey(walletAddress)
    
    // Get token balances and transactions
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
    })

    // Get token metadata
    const tokenListProvider = new TokenListProvider()
    const tokenList = await tokenListProvider.resolve()
    const tokens = tokenList.filterByClusterSlug('mainnet-beta').getList()

    // Calculate metrics based on real data
    const metrics = await analyzePortfolio(tokenAccounts, tokens)
    
    return metrics
  } catch (error) {
    console.error('Error calculating portfolio metrics:', error)
    // Return default metrics on error
    return getDefaultMetrics()
  }
}

function getDefaultMetrics(): PortfolioMetrics {
  return {
    defaiScore: 0,
    metrics: {
      capitalManagement: 0,
      degenIndex: 0,
      defiSavviness: 0
    },
    performance: {
      daily: 0,
      vsCMC100: 0
    },
    topHoldings: [],
    aiAnalysis: "Unable to analyze portfolio at this time. Please try again later.",
    comparisonPercentile: 0
  }
}

async function analyzePortfolio(tokenAccounts: any, tokens: any) {
  // Calculate real metrics based on:
  // 1. Token diversification
  // 2. Transaction history
  // 3. DeFi protocol interactions
  // 4. Market performance
  
  // This would integrate with your AI service for analysis
  const aiAnalysis = await getAIAnalysis(tokenAccounts)
  
  return {
    defaiScore: calculateDefaiScore(tokenAccounts),
    metrics: {
      capitalManagement: calculateCapitalMetric(tokenAccounts),
      degenIndex: calculateDegenIndex(tokenAccounts),
      defiSavviness: calculateDefiMetric(tokenAccounts)
    },
    performance: await getPerformanceMetrics(tokenAccounts),
    topHoldings: getTopHoldings(tokenAccounts, tokens),
    aiAnalysis,
    comparisonPercentile: await getPercentileRank(tokenAccounts)
  }
} 