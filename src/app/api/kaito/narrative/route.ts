import { NextResponse } from 'next/server'

// Mock data structure based on Kaito's social/narrative metrics
interface NarrativeData {
  mindshareScore: number
  sentiment: {
    overall: number
    twitter: number
    telegram: number
    discord: number
  }
  trending: {
    topics: string[]
    tokens: string[]
  }
  volume24h: number
}

export async function GET() {
  // TODO: Replace with real Kaito API integration
  const mockData: NarrativeData = {
    mindshareScore: Math.floor(Math.random() * 30) + 70, // 70-100
    sentiment: {
      overall: +(Math.random() * 0.4 + 0.6).toFixed(2), // 0.6-1.0
      twitter: +(Math.random() * 0.4 + 0.6).toFixed(2),
      telegram: +(Math.random() * 0.4 + 0.6).toFixed(2),
      discord: +(Math.random() * 0.4 + 0.6).toFixed(2)
    },
    trending: {
      topics: ['AI Agents', 'DeFi Summer', 'Autonomous Trading'],
      tokens: ['DEFAI', 'AI16Z', 'DGNAI']
    },
    volume24h: Math.floor(Math.random() * 1000000) + 500000
  }

  return NextResponse.json(mockData)
} 