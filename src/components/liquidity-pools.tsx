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
    id: 'aicc-defai',
    name: 'AICC/DEFAI',
    token0: 'AICC',
    token1: 'DEFAI',
    tvl: 250000,
    apr: 42.5
  },
  {
    id: 'defai-anon',
    name: 'DEFAI/ANON',
    token0: 'DEFAI',
    token1: 'ANON',
    tvl: 165000,
    apr: 33.7
  },
  {
    id: 'defai-ai16z',
    name: 'DEFAI/AI16Z',
    token0: 'DEFAI',
    token1: 'AI16Z',
    tvl: 320000,
    apr: 48.6
  },
  {
    id: 'sol-defai',
    name: 'SOL/DEFAI',
    token0: 'SOL',
    token1: 'DEFAI',
    tvl: 280000,
    apr: 45.2
  },
  {
    id: 'defai-tank',
    name: 'DEFAI/TANK',
    token0: 'DEFAI',
    token1: 'TANK',
    tvl: 175000,
    apr: 34.9
  },
  {
    id: 'defai-animonica',
    name: 'DEFAI/ANIMONICA',
    token0: 'DEFAI',
    token1: 'ANIMONICA',
    tvl: 155000,
    apr: 32.8
  },
  {
    id: 'defai-project89',
    name: 'DEFAI/P89',
    token0: 'DEFAI',
    token1: 'P89',
    tvl: 185000,
    apr: 36.4
  },
  {
    id: 'defai-afi',
    name: 'DEFAI/AFI',
    token0: 'DEFAI',
    token1: 'AFI',
    tvl: 195000,
    apr: 37.6
  },
  {
    id: 'defai-shaw',
    name: 'DEFAI/SHAW',
    token0: 'DEFAI',
    token1: 'SHAW',
    tvl: 210000,
    apr: 39.8
  },
  {
    id: 'defai-alice',
    name: 'DEFAI/ALICE',
    token0: 'DEFAI',
    token1: 'ALICE',
    tvl: 145000,
    apr: 31.2
  },
  {
    id: 'pengu-defai',
    name: 'PENGU/DEFAI',
    token0: 'PENGU',
    token1: 'DEFAI',
    tvl: 195000,
    apr: 37.6
  },
  {
    id: 'ai16z-eliza',
    name: 'AI16Z/ELIZA',
    token0: 'AI16Z',
    token1: 'ELIZA',
    tvl: 290000,
    apr: 46.5
  },
  {
    id: 'ai16z-degenai',
    name: 'AI16Z/DEGENAI',
    token0: 'AI16Z',
    token1: 'DEGENAI',
    tvl: 270000,
    apr: 44.3
  },
  {
    id: 'eliza-degenai',
    name: 'ELIZA/DEGENAI',
    token0: 'ELIZA',
    token1: 'DEGENAI',
    tvl: 230000,
    apr: 41.2
  },
  {
    id: 'defai-aioraai',
    name: 'DEFAI/AIORAAI',
    token0: 'DEFAI',
    token1: 'AIORAAI',
    tvl: 185000,
    apr: 36.4
  },
  {
    id: 'ai16z-aioraai',
    name: 'AI16Z/AIORAAI',
    token0: 'AI16Z',
    token1: 'AIORAAI',
    tvl: 240000,
    apr: 42.1
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