'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import poolsData from '@/data/pools.json';

interface Pool {
  id: string;
  name: string;
  token0: string;
  token1: string;
  tvl: number;
  apr: number;
}

export function LiquidityPools() {
  return (
    <div className="grid grid-cols-1 gap-4 px-2 sm:px-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {poolsData.pools.map((pool) => (
        <Card 
          key={pool.id} 
          className="p-4 sm:p-6 bg-white/90 border-2 border-[var(--ocean-light)] shadow-lg hover:shadow-xl transition-all"
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--ocean-light)]/20 pb-3">
              <h3 className="font-semibold text-[var(--ocean-dark)] text-base sm:text-lg mb-1 sm:mb-0">
                {pool.name}
              </h3>
              <span className="text-xs sm:text-sm text-[var(--ocean-dark)]/60 bg-[var(--ocean-light)]/5 px-2 py-1 rounded-full">
                {pool.token0}/{pool.token1}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-[var(--ocean-light)]/5 p-2 sm:p-3 rounded-lg text-center">
                <p className="text-lg sm:text-xl font-bold text-[var(--coral)]">
                  {pool.apr ? `${pool.apr}%` : 'TBA'}
                </p>
                <p className="text-[10px] sm:text-xs text-[var(--ocean-dark)]/60">APR</p>
              </div>
              <div className="bg-[var(--ocean-light)]/5 p-2 sm:p-3 rounded-lg text-center">
                <p className="text-lg sm:text-xl font-medium">
                  {pool.tvl > 0 ? `$${(pool.tvl/1000000).toFixed(1)}M` : 'TBA'}
                </p>
                <p className="text-[10px] sm:text-xs text-[var(--ocean-dark)]/60">TVL</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled
                className="text-xs sm:text-sm h-8 sm:h-9 border-2 border-[var(--ocean-light)] text-[var(--ocean-dark)] hover:bg-[var(--ocean-light)]/10"
              >
                Deposit 🏊‍♂️
              </Button>
              <Button 
                variant="outline"
                size="sm"
                disabled
                className="text-xs sm:text-sm h-8 sm:h-9 border-2 border-[var(--ocean-light)] text-[var(--ocean-dark)] hover:bg-[var(--ocean-light)]/10"
              >
                Withdraw 🌴
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 