'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'
import { ArrowDownUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { WalletButton } from "@/components/wallet-wrapper"

interface Token {
  symbol: string
  name: string
  icon: string
  address: string
}

export default function SwapPage() {
  const { connected } = useWallet()
  const [amount, setAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [fromToken, setFromToken] = useState<string>('')
  const [toToken, setToToken] = useState<string>('')
  const [tokens] = useState<Token[]>([
    { symbol: 'DEFAI', name: 'DeFi AI', icon: '🤖', address: '...' },
    { symbol: 'AI16Z', name: 'AI16Z Token', icon: '🧠', address: '...' },
    { symbol: 'SOL', name: 'Solana', icon: '◎', address: '...' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵', address: '...' },
  ])

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  return (
    <main className="container max-w-[95vw] mx-auto px-4 relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#66c2ff]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f5e6d3]/30 to-transparent" />
        <div className="absolute top-20 left-4 sm:left-20 text-6xl sm:text-8xl opacity-20">🏄‍♂️</div>
        <div className="absolute bottom-20 right-4 sm:right-20 text-6xl sm:text-8xl opacity-20">🌊</div>
      </div>

      {/* Main Content */}
      <div className="relative pt-8 sm:pt-12 pb-16 sm:pb-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-[var(--ocean-dark)]">
          Surf the Swap, Mate
        </h1>
        <p className="text-center text-[var(--ocean-dark)]/60 mb-8 sm:mb-12 px-4">
          Catch the perfect wave and ride these ripper token swaps 🏊‍♂️
        </p>

        {/* Swap Card */}
        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-[#1a1b1f]/90 border-2 border-[var(--ocean-light)] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--ocean-light)]/20 via-[var(--coral)]/20 to-[var(--ocean-light)]/20" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--ocean-light)]/20 via-[var(--coral)]/20 to-[var(--ocean-light)]/20" />
            
            {/* Keep existing swap interface */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--ocean-light)]">Pay</span>
                  <span className="text-sm text-[var(--ocean-light)]">Balance: 0.00</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-[#2c2d33] border-[var(--ocean-light)]/20 text-white text-2xl"
                    placeholder="0.00"
                  />
                  <Select value={fromToken} onValueChange={setFromToken}>
                    <SelectTrigger className="w-[140px] bg-[#2c2d33] border-[var(--ocean-light)]/20 text-white">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2c2d33] border-[var(--ocean-light)]/20">
                      {tokens.map((token) => (
                        <SelectItem 
                          key={token.symbol} 
                          value={token.symbol}
                          className="text-white hover:bg-[var(--ocean-light)]/10"
                        >
                          <div className="flex items-center gap-2">
                            <span>{token.icon}</span>
                            <span>{token.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSwapTokens}
                  className="rounded-full bg-[#2c2d33] hover:bg-[var(--ocean-light)]/10 text-white"
                >
                  <ArrowDownUp className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--ocean-light)]">Receive</span>
                  <span className="text-sm text-[var(--ocean-light)]">Balance: 0.00</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    className="flex-1 bg-[#2c2d33] border-[var(--ocean-light)]/20 text-white text-2xl"
                    placeholder="0.00"
                  />
                  <Select value={toToken} onValueChange={setToToken}>
                    <SelectTrigger className="w-[140px] bg-[#2c2d33] border-[var(--ocean-light)]/20 text-white">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2c2d33] border-[var(--ocean-light)]/20">
                      {tokens.map((token) => (
                        <SelectItem 
                          key={token.symbol} 
                          value={token.symbol}
                          className="text-white hover:bg-[var(--ocean-light)]/10"
                        >
                          <div className="flex items-center gap-2">
                            <span>{token.icon}</span>
                            <span>{token.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                {connected ? (
                  <Button 
                    className="w-full bg-[var(--ocean-dark)] hover:bg-[var(--ocean-light)] text-white h-12"
                  >
                    Swap 🏄‍♂️
                  </Button>
                ) : (
                  <WalletButton />
                )}
              </div>
            </div>
          </Card>

          {/* Info Banner */}
          <div className="mt-6 bg-gradient-to-r from-[var(--ocean-light)]/10 to-[var(--coral)]/10 rounded-lg p-4 border border-[var(--ocean-light)]/20">
            <div className="flex items-center gap-3">
              <span className="text-xl">🐚</span>
              <div>
                <h3 className="font-medium text-[var(--ocean-dark)]">Powered by Jupiter</h3>
                <p className="text-sm text-[var(--ocean-dark)]/60">
                  Best rates in the seven seas, guaranteed by Jupiter's aggregator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 