"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, Rocket, Zap, TrendingUp, ArrowRight } from "lucide-react"
import { howItWorks } from "@/lib/data"
import GlassCard from "@/components/effects/GlassCard"
import { Badge } from "@/components/ui/badge"

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  rocket: Rocket,
  zap: Zap,
  "trending-up": TrendingUp,
}

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-glow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="emerald" className="mb-4">How It Works</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            From <span className="text-gold">Problem</span> to{" "}
            <span className="text-cyan-glow">Solution</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Four simple steps to transform your workflow with automation.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => {
            const Icon = iconMap[step.icon] || Zap
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-[2px]">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                      className="h-full bg-gradient-to-r from-cyan-glow/30 to-transparent origin-left"
                    />
                  </div>
                )}

                <GlassCard glow="cyan" className="h-full p-6 relative">
                  {/* Step number */}
                  <div className="absolute -top-4 left-6">
                    <div className="w-8 h-8 rounded-full bg-cyan-glow/20 border border-cyan-glow/30 flex items-center justify-center">
                      <span className="text-cyan-glow font-mono font-bold text-sm">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-cyan-glow" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
