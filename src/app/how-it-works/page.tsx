'use client';

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HowItWorksPage() {
  return (
    <main className="container mx-auto px-4 relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#66c2ff]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f5e6d3]/30 to-transparent" />
        <div className="absolute top-40 left-4 sm:left-20 text-6xl sm:text-8xl opacity-20">🐚</div>
        <div className="absolute top-60 right-4 sm:right-20 text-6xl sm:text-8xl opacity-20">⭐️</div>
      </div>

      {/* Main Content */}
      <div className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-[var(--ocean-dark)]">
          Documentation 📚
        </h1>
        <p className="text-center text-[var(--ocean-dark)]/60 mb-8 sm:mb-12 px-4">
          Learn how Eliza.Finance works and how you can maximize your rewards
        </p>

        <Tabs defaultValue="mechanics" className="space-y-8">
          <TabsList className="grid grid-cols-3 max-w-[400px] mx-auto">
            <TabsTrigger value="mechanics">⚙️ Mechanics</TabsTrigger>
            <TabsTrigger value="tokenomics">💰 Tokenomics</TabsTrigger>
            <TabsTrigger value="roadmap">🗺️ Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="mechanics">
            {/* Overview Section */}
            <Card className="p-6 mb-8 bg-white/90 border-2 border-[var(--ocean-light)]">
              <p className="text-[var(--ocean-dark)] leading-relaxed">
                Eliza.Finance is a revolutionary platform that allows you to shell any AI Agent in the ELIZAOS Ecosystem.
              </p>
            </Card>

            {/* Key Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--ocean-dark)] mb-4">✨ Key Features</h2>
              <div className="grid gap-4">
                {[
                  { icon: "🐚", text: "Provide LP on pairs of AI in the ELIZAOS Ecosystem" },
                  { icon: "📈", text: "Earn ELIZA & AI16Z" },
                  { icon: "⚡", text: "Automatic reward distribution" },
                  { icon: "💎", text: "No minimum shelling amount" },
                  { icon: "🛡️", text: "Transparent and secure staking process" }
                ].map((feature, index) => (
                  <Card key={index} className="p-4 bg-white/80 border border-[var(--ocean-light)]/20">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <p className="text-[var(--ocean-dark)]">{feature.text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tokenomics">
            {/* $DEFAI Token Section */}
            <Card className="p-6 mb-8 bg-white/90 border-2 border-[var(--ocean-light)]">
              <h2 className="text-2xl font-bold text-[var(--ocean-dark)] mb-4">💫 $DEFAI Token</h2>
              <p className="text-[var(--ocean-dark)] leading-relaxed mb-6">
                The $DEFAI token is the native token of the platform, designed to enhance the staking ecosystem and provide additional benefits to holders. Token holders will be able to pair their $DEFAI with any AI Agent in the ELIZAOS Ecosystem to earn a share of the AI Agent's revenue.
              </p>

              <h3 className="text-xl font-bold text-[var(--ocean-dark)] mb-4">⚡ Token Utility</h3>
              <div className="grid gap-3">
                {[
                  { icon: "👥", text: "Governance rights over platform decisions" },
                  { icon: "📈", text: "Enhanced APY rates when staking other tokens" },
                  { icon: "💰", text: "Share in platform revenue" },
                  { icon: "🎁", text: "Exclusive access to new features" }
                ].map((utility, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xl">{utility.icon}</span>
                    <p className="text-[var(--ocean-dark)]">{utility.text}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Revenue Model */}
            <Card className="p-6 bg-white/90 border-2 border-[var(--ocean-light)]">
              <h2 className="text-2xl font-bold text-[var(--ocean-dark)] mb-4">🐋 Revenue Model</h2>
              <p className="text-[var(--ocean-dark)] leading-relaxed mb-6">
                The platform generates revenue through multiple streams:
              </p>
              <div className="grid gap-3">
                {[
                  { icon: "⚡", text: "Transaction validation fees" },
                  { icon: "💧", text: "Liquidity provision rewards" },
                  { icon: "🤖", text: "Protocol fees from token unlocking" },
                  { icon: "🤝", text: "Future integrations and partnerships" }
                ].map((stream, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xl">{stream.icon}</span>
                    <p className="text-[var(--ocean-dark)]">{stream.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="roadmap">
            <Card className="p-6 bg-white/90 border-2 border-[var(--ocean-light)]">
              <h2 className="text-2xl font-bold text-[var(--ocean-dark)] mb-4">🗺️ Project Roadmap</h2>
              <div className="grid gap-6">
                {[
                  {
                    phase: "Phase 1: Launch",
                    items: [
                      "Initial platform launch",
                      "Basic staking functionality",
                      "$DEFAI token distribution"
                    ]
                  },
                  {
                    phase: "Phase 2: Expansion",
                    items: [
                      "Advanced AI integration",
                      "Additional pool types",
                      "Governance implementation"
                    ]
                  },
                  {
                    phase: "Phase 3: Ecosystem",
                    items: [
                      "Cross-chain integration",
                      "Partner integrations",
                      "Advanced features rollout"
                    ]
                  }
                ].map((phase, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-xl font-bold text-[var(--ocean-dark)]">{phase.phase}</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-[var(--ocean-dark)]">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
} 