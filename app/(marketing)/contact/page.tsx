"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, MessageCircle, Mail, Send, Code2, CheckCircle, Loader2, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/effects/GlassCard"
import ParticleField from "@/components/effects/ParticleField"

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-white hover:border-white/30", bg: "hover:bg-white/10" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com", color: "hover:text-cyan-glow hover:border-cyan-glow/30", bg: "hover:bg-cyan-glow/10" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-400 hover:border-blue-400/30", bg: "hover:bg-blue-400/10" },
  { icon: MessageCircle, label: "Telegram", href: "https://telegram.org", color: "hover:text-cyan-400 hover:border-cyan-400/30", bg: "hover:bg-cyan-400/10" },
  { icon: Mail, label: "Email", href: "mailto:tawsif@tsmart.dev", color: "hover:text-gold hover:border-gold/30", bg: "hover:bg-gold/10" },
]

const collabTypes = [
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Technical Writer",
  "Other",
]

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "collab">("contact")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [collabForm, setCollabForm] = useState({ name: "", email: "", type: "", skills: "", message: "" })

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setSubmitted(true)
  }

  const handleCollabSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="relative min-h-screen bg-void-950 pt-24 pb-32">
      <ParticleField />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="cyan" className="mb-4">Contact</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Let's <span className="text-cyan-glow">Connect</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Reach out through any channel. For developers, check out the collaboration portal below.
          </p>
        </motion.div>

        {/* Social Gauntlet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white text-center mb-8">
            Choose Your <span className="text-gold">Channel</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`glass rounded-2xl p-6 text-center group transition-all duration-500 border border-white/10 ${social.color} ${social.bg} hover:border-opacity-30`}
              >
                <social.icon className="h-8 w-8 mx-auto mb-3 text-white/40 group-hover:text-current transition-colors" />
                <span className="text-sm font-medium text-white/60 group-hover:text-current transition-colors">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 mb-10"
        >
          <button
            onClick={() => { setActiveTab("contact"); setSubmitted(false) }}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "contact"
                ? "bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/30"
                : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Mail className="inline h-4 w-4 mr-2" />
            Contact
          </button>
          <button
            onClick={() => { setActiveTab("collab"); setSubmitted(false) }}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "collab"
                ? "bg-gold/20 text-gold border border-gold/30"
                : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Code2 className="inline h-4 w-4 mr-2" />
            Collab for Devs
          </button>
        </motion.div>

        {/* Contact Form */}
        {activeTab === "contact" && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard glow="cyan" className="p-8 max-w-2xl mx-auto">
              <h2 className="font-display text-xl font-bold text-white mb-6">Send a Message</h2>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 transition-all resize-none"
                    placeholder="How can I help you?"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : <><Send className="mr-2 h-5 w-5" /> Send Message</>}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {/* Collab Form */}
        {activeTab === "collab" && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard glow="gold" className="p-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-white">Developer Collaboration</h2>
                  <p className="text-sm text-white/40">Join the TSMart ecosystem</p>
                </div>
              </div>
              <form onSubmit={handleCollabSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={collabForm.name}
                      onChange={(e) => setCollabForm({ ...collabForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={collabForm.email}
                      onChange={(e) => setCollabForm({ ...collabForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Your Role</label>
                  <select
                    required
                    value={collabForm.type}
                    onChange={(e) => setCollabForm({ ...collabForm, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-void-900">Select your role...</option>
                    {collabTypes.map((t) => (
                      <option key={t} value={t} className="bg-void-900">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Skills & Experience</label>
                  <input
                    type="text"
                    value={collabForm.skills}
                    onChange={(e) => setCollabForm({ ...collabForm, skills: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all"
                    placeholder="React, Node.js, Python, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Why do you want to collaborate?</label>
                  <textarea
                    required
                    rows={4}
                    value={collabForm.message}
                    onChange={(e) => setCollabForm({ ...collabForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all resize-none"
                    placeholder="Tell me about your ideas and what you'd like to build together..."
                  />
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : <><Send className="mr-2 h-5 w-5" /> Submit Request</>}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {/* Success State */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard glow="emerald" className="p-8 max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-16 h-16 rounded-full bg-emerald-glow/20 border border-emerald-glow/30 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="h-8 w-8 text-emerald-glow" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                {activeTab === "contact" ? "Message Sent!" : "Request Submitted!"}
              </h2>
              <p className="text-white/40 mb-6">
                {activeTab === "contact"
                  ? "I'll get back to you within 24 hours."
                  : "I'll review your collaboration request and reach out soon."
                }
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Send Another
              </Button>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
