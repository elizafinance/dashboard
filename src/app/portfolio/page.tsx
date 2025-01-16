'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from '@solana/wallet-adapter-react'
import { Card } from "@/components/ui/card"
import { InviteCodeModal } from '@/components/invite-code-modal'
import { validateInviteCode, setInviteCode, hasValidInviteCode } from '@/lib/services/invite-code'

// Import portfolio components
import { PortfolioOverview } from "@/components/portfolio/overview"
import { PortfolioOptimization } from "@/components/portfolio/optimization"
import { YieldAggregation } from "@/components/portfolio/yield"
import { TradesAndSwaps } from "@/components/portfolio/trades"
import { LendingDashboard } from "@/components/portfolio/lending"
import { OpportunityDiscovery } from "@/components/portfolio/discovery"
import { PortfolioSwaps } from "@/components/portfolio/swaps"

export default function PortfolioPage() {
  const { connected } = useWallet()
  const router = useRouter()
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      const hasValidCode = await hasValidInviteCode()
      setHasAccess(hasValidCode)
      if (!hasValidCode) {
        setShowInviteModal(true)
      }
    }
    checkAccess()
  }, [])

  const handleInviteSubmit = async (code: string) => {
    const isValid = await setInviteCode(code)
    if (isValid) {
      setHasAccess(true)
      setShowInviteModal(false)
    } else {
      // Handle invalid code error
      console.error('Invalid invite code')
    }
  }

  if (!connected) {
    return (
      <main className="container max-w-[90vw] mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="max-w-[95%] mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[var(--ocean-dark)] mb-6">
              Connect Your Wallet 🏄‍♂️
            </h1>
            <p className="text-[var(--ocean-dark)]/70 mb-8">
              Connect your wallet to access Eliza's ripper portfolio management tools
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (!hasAccess) {
    return (
      <InviteCodeModal
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
        onSubmit={handleInviteSubmit}
      />
    )
  }

  return (
    <div className="container max-w-[1200px] mx-auto p-4 sm:p-6 space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full bg-gradient-to-r from-[var(--sand-light)] to-[var(--sand-dark)] p-1 rounded-lg border-2 border-[var(--ocean-light)]">
          <TabsTrigger 
            value="overview"
            className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
          >
            Overview 📊
          </TabsTrigger>
          <TabsTrigger 
            value="optimization"
            className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
          >
            Optimization 🎯
          </TabsTrigger>
          <TabsTrigger 
            value="yield"
            className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
          >
            Yield 💰
          </TabsTrigger>
          <TabsTrigger 
            value="trades"
            className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
          >
            Trades 📈
          </TabsTrigger>
          <TabsTrigger 
            value="lending"
            className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
          >
            Lending 🏦
          </TabsTrigger>
          <TabsTrigger 
            value="discovery"
            className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
          >
            Discovery 🔍
          </TabsTrigger>
          <TabsTrigger 
            value="swaps"
            className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm rounded-md transition-all duration-200"
          >
            Swaps 🔄
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PortfolioOverview />
        </TabsContent>
        <TabsContent value="optimization">
          <PortfolioOptimization />
        </TabsContent>
        <TabsContent value="yield">
          <YieldAggregation />
        </TabsContent>
        <TabsContent value="trades">
          <TradesAndSwaps />
        </TabsContent>
        <TabsContent value="lending">
          <LendingDashboard />
        </TabsContent>
        <TabsContent value="discovery">
          <OpportunityDiscovery />
        </TabsContent>
        <TabsContent value="swaps">
          <PortfolioSwaps />
        </TabsContent>
      </Tabs>
    </div>
  )
}