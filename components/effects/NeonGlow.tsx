"use client"

import { cn } from "@/lib/utils"

interface NeonGlowProps {
  children: React.ReactNode
  color?: "cyan" | "gold" | "emerald"
  className?: string
  as?: "h1" | "h2" | "h3" | "span" | "p" | "div"
}

export default function NeonGlow({ 
  children, 
  color = "cyan", 
  className,
  as: Component = "span"
}: NeonGlowProps) {
  const colorClasses = {
    cyan: "text-cyan-glow drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] drop-shadow-[0_0_20px_rgba(0,212,255,0.3)]",
    gold: "text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]",
    emerald: "text-emerald-glow drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]",
  }

  return (
    <Component className={cn(colorClasses[color], className)}>
      {children}
    </Component>
  )
}
