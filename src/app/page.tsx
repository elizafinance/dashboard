"use client"
import Head from 'next/head';
import { TokenGrid } from "@/components/token-grid";
import { TokenHolding } from "@/types";
import { formatDateTime } from '@/lib/date-utils';
import { useState, useEffect } from 'react';
import { getLatestData } from './actions';

export default function Page() {
  const [holdings, setHoldings] = useState<TokenHolding[]|null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date|null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    async function updateData() {
      setIsLoading(true);
      setError(null);
      try {
        const { holdings, lastUpdated } = await getLatestData();
        setHoldings(holdings);
        setLastUpdated(lastUpdated);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error updating data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    updateData();
  }, []);

  return (
    <>
      <Head>
        <title>Eliza Finance | ElizaOS | Directory of DeFi Agents</title>
        <meta name="description" content="Live 'Observatory' dashboard showcasing the emergent network of autonomous AI agents" />
      </Head>
      <main className="container max-w-[95vw] mx-auto p-4">
        <div className="flex flex-col items-center mb-8">

          <div className="flex flex-col items-center gap-4 mb-4">
            <h1 className="text-[32px] font-bold leading-[36px] text-center">
              <span className="text-[rgb(36,36,36)]">DeFAI Leaderboard</span>{" "}
              <span className="text-gray-400">v1.0</span>
            </h1>
            <h2 className="text-[18px] leading-[24px] text-center text-[rgb(68,77,86)]">
              
            </h2>

            <div className="flex flex-wrap gap-4 mb-4 justify-center">
              <a 
                href="https://mee.fun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 border-2 border-[rgb(94,84,68)] rounded-full 
                          text-[rgb(94,84,68)] font-medium hover:bg-[rgb(232,227,214)] 
                          transition-colors whitespace-nowrap"
              >
                Create an Eliza 🦾
              </a>
            </div>
          </div>
          {
            (error) ?
              <div>{error}</div> :
              (isLoading) ? 
                <div>Loading...</div> : 
                (holdings === null) ?
                  <div>No data found</div> :
                  <TokenGrid holdings={holdings} />
          }
          
          <footer className="mt-8 text-center text-[rgb(68,77,86)] text-sm">
            <p>
              Eliza Finance is an unofficial, open source, community-led project.{' '}
              <a 
                href="https://twitter.com/gigawidearray" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(94,84,68)] hover:opacity-80 transition-opacity"
              >
                DM @gigawidearray
              </a>
              {' '}to contribute on <a href="https://github.com/elizafinance/dashboard" target="_blank" rel="noopener noreferrer" className="text-[rgb(94,84,68)] hover:opacity-80 transition-opacity">GitHub</a>
            </p>
            <p>Also, DYOR / NFA / GTFO, ILU 🖤</p>
            <p>Forked with ❤️ from <a href="https://x.com/timshel" target="_blank" rel="noopener noreferrer" className="text-[rgb(94,84,68)] hover:opacity-80 transition-opacity">Eliza's World</a></p>
            <div className="flex justify-center gap-4 mt-4">
              <a 
                href="https://github.com/ai16z/elizas-world/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(94,84,68)] hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com/ai16zdao"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-[rgb(94,84,68)] hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/timshelxyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(94,84,68)] hover:opacity-80 transition-opacity"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Last updated: {formatDateTime(lastUpdated)} GMT
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
