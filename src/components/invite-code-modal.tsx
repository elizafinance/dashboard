'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button" 
import { Input } from "./ui/input"

interface InviteCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (code: string) => void
}

export function InviteCodeModal({ open, onOpenChange, onSubmit }: InviteCodeModalProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!code) {
      setError('Please enter an invite code')
      return
    }
    onSubmit(code)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Invite Code 🎫</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <Input
              placeholder="Enter your invite code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[var(--ocean-dark)] text-white"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 