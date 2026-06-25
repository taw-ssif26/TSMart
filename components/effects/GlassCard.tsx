"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: "cyan" | "gold" | "emerald" | "none"
  hover?: boolean
}

export default function GlassCard({ 
  children, 
  className, 
  glow = "none",
  hover = true 
}: GlassCardProps) {
  const glowClasses = {
    cyan: "hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] hover:border-cyan-glow/30",
    gold: "hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-gold/30",
    emerald: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:border-emerald-glow/30",
    none: "",
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden",
        hover && "transition-all duration-500 ease-out hover:-translate-y-1",
        glowClasses[glow],
        className
      )}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-shimmer" />
      </div>
      {children}
    </div>
  )
}
