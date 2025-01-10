'use client'

import { ExternalLink } from 'lucide-react'

export function NavHeader() {
  return (
    <header className="w-full border-b border-gray-800 bg-black">
      <div className="container max-w-[95vw] mx-auto px-4 py-3 flex items-center justify-between">
        <a href="https://my.eliza.finance/" target="_blank" className="hover:opacity-80 transition-opacity">
          <img 
            src="/observatory_orange.png" 
            alt="Observatory Logo" 
            className="h-8 w-8"
          />
        </a>
        <nav className="flex items-center gap-4">
          <a 
            href="https://ai16z.ai/" 
            className="text-gray-300 font-medium text-sm hover:bg-gray-800 px-3 py-1.5 rounded-xl"
          >
            ai16z
          </a>
          <a 
            href="https://ai16z.github.io/eliza/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 font-medium text-sm hover:bg-gray-800 px-3 py-1.5 rounded-xl"
          >
            Eliza
          </a>
          <span className="text-[#ff6b35] font-medium text-sm px-3 py-1.5">
            Tribute
          </span>
        </nav>
      </div>
    </header>
  )
} 