'use client'

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NewsItem {
  title: string
  description: string
  source: string
  url: string
  publishedAt: string
  category: 'defi' | 'ai' | 'market' | 'tech'
}

interface LessonModule {
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  topics: string[]
  duration: string
}

export default function UniPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [lessons, setLessons] = useState<LessonModule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch real news and lessons
    setNews([
      {
        title: "AI Agents Revolutionize DeFi Trading",
        description: "How autonomous AI agents are transforming DeFi trading strategies...",
        source: "CoinDesk",
        url: "#",
        publishedAt: new Date().toISOString(),
        category: 'ai'
      }
    ])
    
    setLessons([
      {
        title: "Understanding DeFi Liquidity Pools",
        description: "G'day mate! Let's dive into how liquidity pools work and why they're important...",
        difficulty: 'Beginner',
        topics: ['AMMs', 'Impermanent Loss', 'Yield Farming'],
        duration: '15 mins'
      }
    ])
    setLoading(false)
  }, [])

  return (
    <main className="container max-w-[95vw] mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--ocean-dark)] mb-2">
          Eliza's DeFi University 🎓
        </h1>
        <p className="text-[var(--ocean-dark)]/70 mb-8">
          Surf through personalized lessons and catch up on the latest crypto news
        </p>

        <Tabs defaultValue="learn">
          <TabsList className="mb-8">
            <TabsTrigger value="learn">Learn DeFi</TabsTrigger>
            <TabsTrigger value="news">Crypto News</TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <div className="grid gap-6">
              {loading ? (
                <Card className="p-6">
                  <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
                </Card>
              ) : (
                lessons.map((lesson, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--ocean-dark)]">
                          {lesson.title}
                        </h3>
                        <p className="text-[var(--ocean-dark)]/60 mt-1">
                          {lesson.description}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {lesson.topics.map((topic, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-[var(--ocean-light)]/10"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-[var(--ocean-dark)]/60">
                      Duration: {lesson.duration}
                    </p>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="news">
            <div className="grid gap-6">
              {loading ? (
                <Card className="p-6">
                  <div className="h-24 bg-[var(--ocean-light)]/10 rounded animate-pulse" />
                </Card>
              ) : (
                news.map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[var(--ocean-dark)]">
                        {item.title}
                      </h3>
                      <span className="text-sm text-[var(--ocean-dark)]/60">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[var(--ocean-dark)]/70 mb-4">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--ocean-dark)]/60">
                        Source: {item.source}
                      </span>
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--coral)] hover:underline"
                      >
                        Read More →
                      </a>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
} 