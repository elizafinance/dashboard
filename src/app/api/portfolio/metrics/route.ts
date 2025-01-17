import { NextResponse } from 'next/server'
import { calculatePortfolioMetrics } from '@/lib/services/portfolio-metrics'
import { Eliza } from '@ai16z/eliza'

// Initialize Eliza client
const eliza = new Eliza({
  apiKey: process.env.ELIZA_API_KEY
})

// System prompt for portfolio analysis
const PORTFOLIO_PROMPT = `You are Eliza, an autonomous AI agent focused on DeFi and cryptocurrency analysis. 
You provide friendly, concise portfolio analysis using Australian slang. Focus on key metrics and actionable insights.`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const publicKey = searchParams.get('publicKey')

  if (!publicKey) {
    return NextResponse.json({ error: 'Public key is required' }, { status: 400 })
  }

  try {
    // Get portfolio metrics
    const metrics = await calculatePortfolioMetrics(publicKey)

    // Prepare analysis prompt
    const analysisPrompt = `Analyze this crypto portfolio metrics:
    - DEFAI Score: ${metrics.defaiScore}
    - Capital Management: ${metrics.metrics.capitalManagement}
    - Degen Index: ${metrics.metrics.degenIndex}
    - DeFi Savviness: ${metrics.metrics.defiSavviness}
    - Daily Performance: ${metrics.performance.daily}%
    - vs CMC100: ${metrics.performance.vsCMC100}%
    - Top Holdings: ${metrics.topHoldings.join(', ')}

    Provide a concise, friendly analysis in 2-3 sentences using Australian slang. Focus on strengths and areas for improvement.`

    // Get AI analysis using Eliza
    const analysis = await eliza.analyze({
      systemPrompt: PORTFOLIO_PROMPT,
      userPrompt: analysisPrompt,
      temperature: 0.7,
      maxTokens: 150
    })

    return NextResponse.json({
      ...metrics,
      aiAnalysis: analysis.content
    })

  } catch (error) {
    console.error('Error analyzing portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to analyze portfolio' },
      { status: 500 }
    )
  }
} 