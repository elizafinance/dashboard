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
  const router = useRouter()
  const { publicKey } = useWallet()
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      const hasValidCode = await hasValidInviteCode()
      setHasAccess(hasValidCode)
      setShowInviteModal(!hasValidCode)
    }
    checkAccess()
  }, [])

  const handleInviteSubmit = async (code: string) => {
    const isValid = await validateInviteCode(code)
    if (isValid) {
      await setInviteCode(code)
      setHasAccess(true)
      setShowInviteModal(false)
    }
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
    <Tabs defaultValue="overview" className="container max-w-[1200px] mx-auto p-4 sm:p-6 space-y-6">
      <div className="overflow-x-auto scrollbar-hide sm:overflow-visible">
        <TabsList className="w-max sm:w-full flex sm:grid sm:grid-cols-7 bg-[var(--ocean-light)]/10 rounded-xl p-2 gap-2">
          <TabsTrigger 
            value="overview"
            className="flex-shrink-0 min-w-[120px] scroll-ml-2 scroll-snap-align-start data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm px-4 rounded-md transition-all duration-200"
          >
            Overview 📊
          </TabsTrigger>
          <TabsTrigger 
            value="optimization"
            className="flex-shrink-0 min-w-[120px] scroll-ml-2 scroll-snap-align-start data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm px-4 rounded-md transition-all duration-200"
          >
            Optimization 🎯
          </TabsTrigger>
          <TabsTrigger 
            value="yield"
            className="flex-shrink-0 min-w-[120px] scroll-ml-2 scroll-snap-align-start data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm px-4 rounded-md transition-all duration-200"
          >
            Yield 💰
          </TabsTrigger>
          <TabsTrigger 
            value="trades"
            className="flex-shrink-0 min-w-[120px] scroll-ml-2 scroll-snap-align-start data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm px-4 rounded-md transition-all duration-200"
          >
            Trades 📈
          </TabsTrigger>
          <TabsTrigger 
            value="lending"
            className="flex-shrink-0 min-w-[120px] scroll-ml-2 scroll-snap-align-start data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm px-4 rounded-md transition-all duration-200"
          >
            Lending 🏦
          </TabsTrigger>
          <TabsTrigger 
            value="discovery"
            className="flex-shrink-0 min-w-[120px] scroll-ml-2 scroll-snap-align-start data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm px-4 rounded-md transition-all duration-200"
          >
            Discovery 🔍
          </TabsTrigger>
          <TabsTrigger 
            value="swaps"
            className="flex-shrink-0 min-w-[120px] scroll-ml-2 scroll-snap-align-start data-[state=active]:bg-white/90 data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm px-4 rounded-md transition-all duration-200"
          >
            Swaps 🔄
          </TabsTrigger>
        </TabsList>
      </div>

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
  )
}