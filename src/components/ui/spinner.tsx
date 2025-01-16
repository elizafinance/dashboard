"use client"

import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4"
  }

  return (
    <div
      role="status"
      className={cn(
        "animate-spin rounded-full border-[var(--ocean-light)] border-r-transparent",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
} 