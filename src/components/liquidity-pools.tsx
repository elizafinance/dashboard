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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {pools.map((pool) => (
        <Card key={pool.id} className="p-4 bg-black border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                🐚
              </div>
              <div>
                <h3 className="font-bold text-lg">{pool.name}</h3>
                <p className="text-gray-400 text-sm">Pool</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">TVL</span>
              <span className="font-medium">${pool.tvl.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">APR</span>
              <span className="font-medium text-green-500">{pool.apr}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="w-full border-gray-700 hover:bg-gray-800"
            >
              Deposit
            </Button>
            <Button 
              variant="outline"
              className="w-full border-gray-700 hover:bg-gray-800"
            >
              Withdraw
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
} 