import { LiquidityPools } from "@/components/liquidity-pools";

export default function PoolsPage() {
  return (
    <main className="container max-w-[95vw] mx-auto relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#66c2ff]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f5e6d3]/30 to-transparent" />
        <div className="absolute top-40 left-20 text-8xl opacity-20">🌴</div>
        <div className="absolute top-60 right-20 text-8xl opacity-20">🏖️</div>
      </div>

      {/* Main Content */}
      <div className="relative pt-12 pb-24">
        <h1 className="text-4xl font-bold text-center mb-2 text-[var(--ocean-dark)]">
          Shell the Vaults
        </h1>
        <p className="text-center text-[var(--ocean-dark)]/60 mb-12">
          Surf the pairs and dive into liquidity pools 🏄‍♂️
        </p>

        {/* Coming Soon Banner */}
        <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-r from-[var(--ocean-light)]/10 to-[var(--coral)]/10 rounded-lg p-4 border border-[var(--ocean-light)]/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐚</span>
            <div>
              <h3 className="font-medium text-[var(--ocean-dark)]">Coming Soon</h3>
              <p className="text-sm text-[var(--ocean-dark)]/60">
                Our vaults are still collecting shells. Stay tuned!
              </p>
            </div>
          </div>
        </div>

        {/* Pools Grid with Opacity */}
        <div className="opacity-50 pointer-events-none">
          <LiquidityPools />
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="wave"></div>
      <div className="wave" style={{ animationDelay: '-5s' }}></div>
    </main>
  );
} 