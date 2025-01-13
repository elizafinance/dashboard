'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Pool {
  id: string;
  name: string;
  token0: string;
  token1: string;
  tvl: number;
  apr: number;
}

const INITIAL_POOLS: Pool[] = [
  {
    id: 'ai16z-defai',
    name: 'AI16Z/DEFAI',
    token0: 'AI16Z',
    token1: 'DEFAI',
    tvl: 250000,
    apr: 42.5
  },
  {
    id: 'defai-sol',
    name: 'DEFAI/SOL',
    token0: 'DEFAI',
    token1: 'SOL',
    tvl: 180000,
    apr: 35.8
  },
  {
    id: 'eliza-defai',
    name: 'ELIZA/DEFAI',
    token0: 'ELIZA',
    token1: 'DEFAI',
    tvl: 120000,
    apr: 28.4
  },
  {
    id: 'ai16z-sol',
    name: 'AI16Z/SOL',
    token0: 'AI16Z',
    token1: 'SOL',
    tvl: 320000,
    apr: 45.2
  },
  {
    id: 'eliza-sol',
    name: 'ELIZA/SOL',
    token0: 'ELIZA',
    token1: 'SOL',
    tvl: 280000,
    apr: 38.6
  },
  {
    id: 'eliza-ai16z',
    name: 'ELIZA/AI16Z',
    token0: 'ELIZA',
    token1: 'AI16Z',
    tvl: 150000,
    apr: 32.7
  }
];

export function LiquidityPools() {
  const [pools] = useState<Pool[]>(INITIAL_POOLS);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4 max-w-6xl mx-auto">
      {pools.map((pool) => (
        <Card 
          key={pool.id} 
          className="p-4 bg-gradient-to-br from-[var(--shell)] to-[var(--sand-light)] border-[var(--ocean-light)]/20 hover:border-[var(--ocean-light)] transition-all duration-300 group"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[var(--ocean-light)]/10 flex items-center justify-center border-2 border-[var(--ocean-light)]/20 group-hover:border-[var(--ocean-light)] transition-colors">
              <span className="text-3xl">🐚</span>
            </div>
            
            <div>
              <h3 className="font-bold text-[var(--ocean-dark)]">{pool.name}</h3>
              <div className="space-y-1 mt-2">
                <p className="text-sm text-[var(--ocean-dark)]/60">
                  TVL: ${pool.tvl.toLocaleString()}
                </p>
                <p className="text-sm text-[var(--ocean-dark)]/60">
                  APR: {pool.apr}% 🌊
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-[var(--ocean-light)]/40 text-[var(--ocean-dark)] 
                         hover:bg-[var(--ocean-light)]/10 transition-colors text-xs"
              >
                Deposit 🏊‍♂️
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="border-[var(--ocean-light)]/40 text-[var(--ocean-dark)]
                         hover:bg-[var(--ocean-light)]/10 transition-colors text-xs"
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