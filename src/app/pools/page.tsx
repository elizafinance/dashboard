import { LiquidityPools } from "@/components/liquidity-pools";
import { Button } from "@/components/ui/button";

export default function PoolsPage() {
  return (
    <main className="container mx-auto px-4 relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#66c2ff]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f5e6d3]/30 to-transparent" />
        <div className="absolute top-40 left-4 sm:left-20 text-6xl sm:text-8xl opacity-20">🌴</div>
        <div className="absolute top-60 right-4 sm:right-20 text-6xl sm:text-8xl opacity-20">🏖️</div>
      </div>

      {/* Main Content */}
      <div className="relative pt-8 sm:pt-12 pb-16 sm:pb-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-[var(--ocean-dark)]">
          Shell the Vaults, Mate
        </h1>
        <p className="text-center text-[var(--ocean-dark)]/60 mb-8 sm:mb-12 px-4">
          Crikey! Surf these bonza pairs and dive into our ripper liquidity pools 🏄‍♂️
        </p>

        {/* Coming Soon Banner */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 bg-gradient-to-r from-[var(--ocean-light)]/10 to-[var(--coral)]/10 rounded-lg p-4 border border-[var(--ocean-light)]/20 mx-4 sm:mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl">🐚</span>
              <div>
                <h3 className="font-medium text-[var(--ocean-dark)]">She's Coming Soon, Mate</h3>
                <p className="text-sm text-[var(--ocean-dark)]/60">
                  Our vaults are still collecting shells at the billabong. No worries, stay tuned!
                </p>
              </div>
            </div>
            <a 
              href="https://raydium.io/liquidity-pools/?token=5LGyBHMMPwzMunxhcBMn6ZWAuqoHUQmcFiboTJidFURP"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                className="w-full sm:w-auto bg-[var(--ocean-dark)] hover:bg-[var(--ocean-light)] text-white"
              >
                Lock LP Now on Raydium 🏊‍♂️
              </Button>
            </a>
          </div>
        </div>
        
        {/* Pools Grid with Opacity */}
        <div className="opacity-50 pointer-events-none px-4 mt-12">
          <LiquidityPools />
        </div>
      </div>
    </main>
  );
} 