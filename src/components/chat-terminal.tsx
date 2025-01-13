'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const PROMO_CODES = [
  '950MXOCG', 'QEQWUKJU', 'J04LB01Y', 'XQL05M5I', '1AX2GI3G',
  '6GOUHLDY', '2XXVHT59', 'DCX2NJ7B', '1XU4QLJI', 'ZDX522MK', '2WJFDVYD'
];

export function ChatTerminal() {
  return (
    <div className="w-full max-w-4xl mb-8 border border-gray-800 rounded-lg overflow-hidden bg-black">
      <div className="bg-gray-900 px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-sm text-gray-400">DeFAI Terminal</span>
        </div>
      </div>
      
      <div className="h-[300px] p-4 font-mono text-sm flex items-center justify-center text-center">
        <div className="text-gray-400">
          <p className="mb-2">😴 Eliza is currently sleeping...</p>
          <p>Our DeFAI Teller is under maintenance and will return soon with improved capabilities!</p>
          <p className="mt-4 text-xs">When we're back, chat with me to discover special Mee.Fun promo codes!</p>
        </div>
      </div>

      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            disabled
            className="flex-1 bg-gray-900 text-gray-500 px-3 py-2 rounded border border-gray-700 cursor-not-allowed"
            placeholder="Terminal under maintenance..."
          />
          <Button 
            disabled
            className="bg-gray-800 text-gray-500 cursor-not-allowed"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
} 