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
      <main className="container max-w-[95vw] mx-auto p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[var(--ocean-dark)] mb-6">
            G'day! Connect Your Wallet 🏄‍♂️
          </h1>
          <p className="text-[var(--ocean-dark)]/70 mb-8">
            Connect your wallet to access Eliza's ripper portfolio management tools
          </p>
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
    <main className="container max-w-[95vw] mx-auto p-8">
      <h1 className="text-4xl font-bold text-[var(--ocean-dark)] mb-8">
        Your Portfolio Dashboard
      </h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="yield">Yield Farming</TabsTrigger>
          <TabsTrigger value="trades">Trades & Swaps</TabsTrigger>
          <TabsTrigger value="lending">Lending</TabsTrigger>
          <TabsTrigger value="discovery">Discovery</TabsTrigger>
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
      </Tabs>
    </main>
  )
} 