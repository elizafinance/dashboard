import { NextResponse } from 'next/server'

interface MarketData {
  tokens: {
    [key: string]: {
      price: number
      priceChange24h: number
      volume24h: number
      marketCap: number
      liquidity: number
    }
  }
  marketConditions: {
    overall: 'Favorable' | 'Neutral' | 'Unfavorable'
    volatility: number
    trend: 'Bullish' | 'Bearish' | 'Sideways'
  }
  opportunities: Array<{
    pair: string
    type: 'entry' | 'exit'
    confidence: number
    expectedReturn: number
  }>
}

export async function GET() {
  // TODO: Replace with real market data integration
  const mockData: MarketData = {
    tokens: {
      'DEFAI': {
        price: +(Math.random() * 2 + 1).toFixed(2),
        priceChange24h: +(Math.random() * 20 - 10).toFixed(2),
        volume24h: Math.floor(Math.random() * 1000000) + 100000,
        marketCap: Math.floor(Math.random() * 10000000) + 1000000,
        liquidity: Math.floor(Math.random() * 500000) + 100000
      },
      'AI16Z': {
        price: +(Math.random() * 5 + 2).toFixed(2),
        priceChange24h: +(Math.random() * 20 - 10).toFixed(2),
        volume24h: Math.floor(Math.random() * 2000000) + 200000,
        marketCap: Math.floor(Math.random() * 20000000) + 2000000,
        liquidity: Math.floor(Math.random() * 1000000) + 200000
      }
    },
    marketConditions: {
      overall: ['Favorable', 'Neutral', 'Unfavorable'][Math.floor(Math.random() * 3)] as 'Favorable' | 'Neutral' | 'Unfavorable',
      volatility: +(Math.random() * 0.5 + 0.2).toFixed(2),
      trend: ['Bullish', 'Bearish', 'Sideways'][Math.floor(Math.random() * 3)] as 'Bullish' | 'Bearish' | 'Sideways'
    },
    opportunities: Array(3).fill(null).map(() => ({
      pair: ['DEFAI/USDC', 'AI16Z/USDC', 'DEFAI/AI16Z'][Math.floor(Math.random() * 3)],
      type: Math.random() > 0.5 ? 'entry' : 'exit',
      confidence: Math.floor(Math.random() * 30) + 70,
      expectedReturn: +(Math.random() * 5 + 1).toFixed(2)
    }))
  }

  return NextResponse.json(mockData)
} 