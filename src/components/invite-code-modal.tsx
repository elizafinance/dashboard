'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button" 
import { Input } from "./ui/input"

interface InviteCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (code: string) => void
}

export function InviteCodeModal({ open, onOpenChange, onSubmit }: InviteCodeModalProps) {
  const [code, setCode] = useState('')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[var(--ocean-dark)]">Enter Invite Code 🎟️</DialogTitle>
          <DialogDescription className="text-[var(--ocean-dark)]/70">
            You need an invite code to access this section. Join our Telegram to get one!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your invite code..."
            className="border-[var(--ocean-light)]"
          />
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <a
              href="https://t.me/DEFAI_PORTAL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--ocean-dark)] hover:text-[var(--coral)] transition-colors"
            >
              Get Invited on Telegram 💬
            </a>
            <Button 
              onClick={() => onSubmit(code)}
              className="w-full sm:w-auto bg-[var(--ocean-dark)] hover:bg-[var(--ocean-light)] text-white"
            >
              Submit Code 🎯
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 