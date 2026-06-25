"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Zap, Users, Globe, Award, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/effects/GlassCard"
import ParticleField from "@/components/effects/ParticleField"

const skills = [
  { icon: Code2, label: "Software Development", desc: "Full-stack web, desktop, and CLI applications" },
  { icon: Zap, label: "Automation Engineering", desc: "Process automation, scripting, and workflow optimization" },
  { icon: Globe, label: "Web Services", desc: "APIs, integrations, and cloud infrastructure" },
  { icon: Users, label: "Client Solutions", desc: "Custom builds tailored to business needs" },
]

const values = [
  { title: "Efficiency First", desc: "Every line of code serves a purpose. No bloat, no waste." },
  { title: "Production Ready", desc: "Battle-tested solutions that work from day one." },
  { title: "Client Success", desc: "Your wins are my wins. I measure success by your results." },
  { title: "Continuous Innovation", desc: "Always learning, always improving, always building." },
]

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="relative min-h-screen bg-void-950 pt-24 pb-32">
      <ParticleField />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="gold" className="mb-4">About</Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built by <span className="text-cyan-glow">Tawsif</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            I'm a software engineer and automation specialist who believes that 
            repetitive work should be handled by machines, not humans. TSMart is my 
            marketplace for sharing the tools I build to solve real problems.
          </p>
        </motion.div>

        {/* Story Section */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow="cyan" className="p-8 h-full">
              <div className="w-16 h-16 rounded-2xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-cyan-glow" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                The Story
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  It started with a simple observation: businesses were spending countless hours 
                  on repetitive tasks that could be automated. Reports that took days to compile, 
                  data that needed manual entry, emails that required constant attention.
                </p>
                <p>
                  I built my first automation script for a friend's e-commerce business. It saved 
                  them 20 hours a week. Then another. And another. Soon, I had a collection of 
                  tools that were saving businesses real time and real money.
                </p>
                <p>
                  TSMart was born from that collection. A marketplace where every product is something 
                  I've built, tested, and refined. No generic templates — every tool solves a specific 
                  problem I've encountered in the wild.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard glow="gold" className="p-8 h-full">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                The Mission
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  My mission is simple: <strong className="text-white">eliminate repetitive work</strong>. 
                  Every business has tasks that drain energy and time. I find those tasks and build 
                  software that makes them disappear.
                </p>
                <p>
                  Whether it's a script that processes data in seconds, a CLI tool that automates 
                  deployment, or a full web application that manages an entire workflow — every product 
                  on TSMart is designed to give you back your most valuable resource: time.
                </p>
                <p>
                  I don't just sell software. I sell <strong className="text-cyan-glow">freedom from busywork</strong>.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            What I <span className="text-cyan-glow">Do</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                <GlassCard glow="cyan" className="p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center mx-auto mb-4">
                    <skill.icon className="h-6 w-6 text-cyan-glow" />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{skill.label}</h3>
                  <p className="text-sm text-white/40">{skill.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Core <span className="text-gold">Values</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <GlassCard className="p-6">
                  <h3 className="font-display font-bold text-lg text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-white/40">{value.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
