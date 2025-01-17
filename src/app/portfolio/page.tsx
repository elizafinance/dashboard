'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from '@solana/wallet-adapter-react'
import { Card } from "@/components/ui/card"
import { InviteCodeModal } from '@/components/invite-code-modal'
import { validateInviteCode, setInviteCode, hasValidInviteCode } from '@/lib/services/invite-code'
import { cn } from "@/lib/utils"

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
    <div className="container mx-auto px-4">
      <Tabs defaultValue="overview" className="w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--ocean-light)]/20 via-[var(--coral)]/10 to-[var(--ocean-light)]/20 blur-xl h-[50%] -z-10" />
          <TabsList className="relative w-full h-auto flex-wrap sm:flex-nowrap overflow-x-auto scrollbar-hide bg-white/50 backdrop-blur-sm border border-[var(--ocean-light)]/20 p-1.5 rounded-xl">
            <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto gap-1.5">
              <TabsTrigger 
                value="overview"
                className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm text-[var(--ocean-dark)]/70 transition-all duration-200"
              >
                Overview 📊
              </TabsTrigger>
              <TabsTrigger 
                value="optimization"
                className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm text-[var(--ocean-dark)]/70 transition-all duration-200"
              >
                Optimization 🎯
              </TabsTrigger>
              <TabsTrigger 
                value="yield"
                className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm text-[var(--ocean-dark)]/70 transition-all duration-200"
              >
                Yield 🌾
              </TabsTrigger>
              <TabsTrigger 
                value="trades"
                className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm text-[var(--ocean-dark)]/70 transition-all duration-200"
              >
                Trades 📈
              </TabsTrigger>
              <TabsTrigger 
                value="lending"
                className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm text-[var(--ocean-dark)]/70 transition-all duration-200"
              >
                Lending 🏦
              </TabsTrigger>
              <TabsTrigger 
                value="discovery"
                className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm text-[var(--ocean-dark)]/70 transition-all duration-200"
              >
                Discovery 🔍
              </TabsTrigger>
              <TabsTrigger 
                value="swaps"
                className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[var(--ocean-dark)] data-[state=active]:shadow-sm text-[var(--ocean-dark)]/70 transition-all duration-200"
              >
                Swaps 🔄
              </TabsTrigger>
            </div>
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
    </div>
  )
}