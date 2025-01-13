import { NextResponse } from 'next/server'

// Temporary mock data until we have real data
const mockHoldings = [
  {
    address: "5voS9evDjxF589WuEub5i4ti7FWQmZCsAsyD5ucbuRqM",
    balance: 1000000,
    percentageOwned: 10,
    usdValue: 50000,
    marketData: {
      baseToken: {
        name: "Eliza Token",
        symbol: "ELIZA"
      },
      pairCreatedAt: new Date().toISOString(),
      priceUsd: "0.05",
      fdv: 5000000,
      score: 85,
      info: {
        imageUrl: "https://via.placeholder.com/32",
        websites: [{ url: "https://eliza.finance" }],
        socials: [
          { type: "twitter", url: "https://twitter.com/eliza_finance" }
        ]
      },
      priceChange: {
        m5: 2.5,
        h1: 5,
        h6: -1,
        h24: 10
      }
    }
  }
  // Add more mock tokens as needed
]

export async function GET() {
  try {
    // In the future, fetch real data here
    return NextResponse.json({
      holdings: mockHoldings,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in holdings API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch holdings' },
      { status: 500 }
    )
  }
} 