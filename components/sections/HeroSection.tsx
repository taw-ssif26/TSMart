"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-950 via-transparent to-void-950 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-void-950/50 via-transparent to-void-950/50 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-cyan-glow text-sm font-medium mb-8"
        >
          <Sparkles className="h-4 w-4" />
          <span>Premium Software Automations</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">TS</span>
          <span className="text-cyan-glow neon-glow">Mart</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl sm:text-2xl text-white/60 font-light mb-4 max-w-2xl mx-auto"
        >
          Tawsif Software Marketplace
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg text-white/40 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          I build software automations that do the repetitive work so you don't have to. 
          Save time, save money, save energy — focus on what actually matters.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link href="/products">
            <Button size="lg" className="group text-base px-8">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/custom-solutions">
            <Button variant="gold" size="lg" className="text-base px-8">
              Custom Solution
            </Button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Clock, value: "50,000+", label: "Hours Saved" },
            { icon: DollarSign, value: "$2.4M", label: "Money Saved" },
            { icon: Zap, value: "1,200+", label: "Active Clients" },
            { icon: Sparkles, value: "50+", label: "Products" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
              className="glass rounded-xl p-4 text-center group hover:border-cyan-glow/20 transition-all duration-500"
            >
              <stat.icon className="h-5 w-5 text-cyan-glow mx-auto mb-2" />
              <div className="text-2xl font-bold text-white font-display">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], height: ["20%", "40%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 bg-cyan-glow rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
