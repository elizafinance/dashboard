'use client'

import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function NavHeader() {
  return (
    <header className="w-full border-b border-gray-800 bg-black">
      <div className="container max-w-[95vw] mx-auto px-4 py-3 flex items-center justify-between">
        <a href="https://eliza.finance" target="_blank" className="text-[#ff6b35] font-bold text-xl hover:opacity-80 transition-opacity">
          Eliza.Finance
        </a>
        <nav className="flex items-center gap-4">
          <Link 
            href="/"
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/pools"
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            Pools
          </Link>
          <a 
            href="https://ai16z.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1"
          >
            Eliza
            <ExternalLink size={14} />
          </a>
          <span className="text-[#ff6b35] font-medium text-sm px-3 py-1.5">
            Tribute
          </span>
        </nav>
      </div>
    </header>
  )
} 