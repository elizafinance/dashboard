'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface DiscoverySettings {
  minScore: number
  minMarketCap: number
  showHighRisk: boolean
  showNewTokens: boolean
  includeSocials: boolean
}

interface DiscoverySettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: DiscoverySettings
  onSettingsChange: (settings: DiscoverySettings) => void
}

export function DiscoverySettingsModal({
  open,
  onOpenChange,
  settings,
  onSettingsChange
}: DiscoverySettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[var(--ocean-dark)]">Discovery Settings 🔍</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <Label>Minimum Token Score</Label>
            <Slider
              value={[settings.minScore]}
              onValueChange={([value]) => 
                onSettingsChange({ ...settings, minScore: value })
              }
              min={0}
              max={100}
              step={1}
              className="[&_[role=slider]]:bg-[var(--coral)]"
            />
            <div className="flex justify-between text-sm text-[var(--ocean-dark)]/60">
              <span>High Risk</span>
              <span>Low Risk</span>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Minimum Market Cap</Label>
            <Slider
              value={[settings.minMarketCap]}
              onValueChange={([value]) => 
                onSettingsChange({ ...settings, minMarketCap: value })
              }
              min={0}
              max={10}
              step={0.1}
              className="[&_[role=slider]]:bg-[var(--coral)]"
            />
            <div className="flex justify-between text-sm text-[var(--ocean-dark)]/60">
              <span>$0</span>
              <span>$10M</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-risk">Show High Risk Opportunities</Label>
            <Switch
              id="high-risk"
              checked={settings.showHighRisk}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...settings, showHighRisk: checked })
              }
              className="data-[state=checked]:bg-[var(--coral)]"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="new-tokens">Include New Tokens</Label>
            <Switch
              id="new-tokens"
              checked={settings.showNewTokens}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...settings, showNewTokens: checked })
              }
              className="data-[state=checked]:bg-[var(--coral)]"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="socials">Require Social Links</Label>
            <Switch
              id="socials"
              checked={settings.includeSocials}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...settings, includeSocials: checked })
              }
              className="data-[state=checked]:bg-[var(--coral)]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 