'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Pool {
  pair: string;
  protocol: string;
  apy: number;
  tvl: number;
  volume24h: number;
}

export const INITIAL_POOLS: Pool[] = [
  {
    pair: 'DEFAI/SOL',
    protocol: 'Orca',
    apy: 42.5,
    tvl: 1500000,
    volume24h: 250000
  },
  {
    pair: 'DEFAI/USDC',
    protocol: 'Raydium',
    apy: 35.8,
    tvl: 2800000,
    volume24h: 450000
  }
];

export function LiquidityPools() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {INITIAL_POOLS.map((pool, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[var(--ocean-dark)]">{pool.pair}</h3>
              <span className="text-sm text-[var(--ocean-dark)]/60">{pool.protocol}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-[var(--coral)]">{pool.apy}%</p>
                <p className="text-xs text-[var(--ocean-dark)]/60">APY</p>
              </div>
              <div>
                <p className="text-sm font-medium">${(pool.tvl/1000000).toFixed(1)}M</p>
                <p className="text-xs text-[var(--ocean-dark)]/60">TVL</p>
              </div>
              <div>
                <p className="text-sm font-medium">${(pool.volume24h/1000).toFixed(0)}K</p>
                <p className="text-xs text-[var(--ocean-dark)]/60">24h Vol</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled
                className="border-[var(--ocean-light)]/40 text-[var(--ocean-dark)] hover:bg-[var(--ocean-light)]/10"
              >
                Deposit 🏊‍♂️
              </Button>
              <Button 
                variant="outline"
                size="sm"
                disabled
                className="border-[var(--ocean-light)]/40 text-[var(--ocean-dark)] hover:bg-[var(--ocean-light)]/10"
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