interface MetricBarProps {
  label: string
  value: number
  description: string
}

export function MetricBar({ label, value, description }: MetricBarProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-[var(--ocean-dark)]">{label}</span>
        <span className="text-sm font-bold text-[var(--ocean-dark)]">{value}%</span>
      </div>
      <div className="h-2 bg-[var(--ocean-light)]/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[var(--ocean-light)] to-[var(--coral)] rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-xs text-[var(--ocean-dark)]/60 mt-1">{description}</p>
    </div>
  )
} 