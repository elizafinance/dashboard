import { Connection } from '@solana/web3.js'

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

export async function fetchNarrativeData() {
  try {
    const response = await fetch('/api/kaito/narrative')
    if (!response.ok) {
      throw new Error('Failed to fetch narrative data')
    }
    return response.json()
  } catch (error) {
    console.error('Narrative data fetch error:', error)
    return {
      mindshareScore: 0,
      sentiment: {
        overall: 0,
        twitter: 0,
        telegram: 0,
        discord: 0
      },
      trending: {
        topics: [],
        tokens: []
      },
      volume24h: 0
    }
  }
}

export async function fetchMarketData() {
  try {
    const endpoint = await getWorkingEndpoint()
    const connection = new Connection(endpoint)
    
    const response = await fetch('/api/market/data')
    if (!response.ok) {
      throw new Error('Failed to fetch market data')
    }
    
    const data = await response.json()
    return {
      ...data,
      connection
    }
  } catch (error) {
    console.error('Market data fetch error:', error)
    return {
      tokens: {},
      marketConditions: {
        overall: 'Neutral',
        volatility: 0,
        trend: 'Sideways'
      },
      opportunities: []
    }
  }
}

export async function analyzeTradeOpportunity(narrativeData: any, marketData: any) {
  try {
    const mindshareScore = narrativeData.mindshareScore
    const marketCondition = marketData.marketConditions.overall
    const volatility = marketData.marketConditions.volatility

    // Enhanced scoring system with risk management
    const score = mindshareScore * (1 - volatility)
    const entryPoint = score > 75 && marketCondition === 'Favorable'
    const riskLevel = volatility > 0.5 ? 'High' : volatility > 0.3 ? 'Medium' : 'Low'

    return {
      score,
      entryPoint,
      marketCondition,
      confidence: Math.min(mindshareScore, 95),
      riskLevel,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Analysis error:', error)
    return null
  }
} 