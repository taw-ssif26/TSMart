"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, Clock, Loader2, Wrench, FileText, MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/effects/GlassCard"
import ParticleField from "@/components/effects/ParticleField"

const industries = [
  "E-commerce", "Finance", "Healthcare", "Marketing", 
  "Real Estate", "Education", "Logistics", "Other"
]

const problemTypes = [
  "Data Processing", "Report Generation", "Email Automation",
  "Web Scraping", "Social Media", "Invoice/Billing", "Custom Integration", "Other"
]

const stages = [
  { label: "Sent", desc: "Request submitted" },
  { label: "Reviewed", desc: "Requirements analyzed" },
  { label: "Offered", desc: "Proposal sent" },
  { label: "Architected", desc: "Solution designed" },
  { label: "Building", desc: "In development" },
  { label: "Done", desc: "Ready for delivery" },
  { label: "Delivered", desc: "Handed over" },
]

export default function CustomSolutionsPage() {
  const [submitted, setSubmitted] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    problemType: "",
    description: "",
    budget: "",
    timeline: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setSubmitted(true)
    // Animate progress
    let stage = 0
    const interval = setInterval(() => {
      stage++
      setCurrentStage(stage)
      if (stage >= 2) clearInterval(interval)
    }, 800)
  }

  return (
    <div className="relative min-h-screen bg-void-950 pt-24 pb-32">
      <ParticleField />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="emerald" className="mb-4">Custom Solutions</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Your <span className="text-cyan-glow">Problem</span>,{" "}
            <span className="text-gold">My Solution</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Can't find what you need? Describe your workflow and I'll build a custom automation 
            tailored exactly to your business.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard glow="cyan" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Industry & Problem Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Industry
                    </label>
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all appearance-none"
                    >
                      <option value="" className="bg-void-900">Select industry...</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind} className="bg-void-900">{ind}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Problem Type
                    </label>
                    <select
                      required
                      value={formData.problemType}
                      onChange={(e) => setFormData({ ...formData, problemType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all appearance-none"
                    >
                      <option value="" className="bg-void-900">Select type...</option>
                      {problemTypes.map((pt) => (
                        <option key={pt} value={pt} className="bg-void-900">{pt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Describe Your Needs
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all resize-none"
                    placeholder="Describe the repetitive task you want automated, your current workflow, and what the ideal outcome looks like..."
                  />
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Budget Range (USD)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all appearance-none"
                    >
                      <option value="" className="bg-void-900">Select budget...</option>
                      <option value="under-500" className="bg-void-900">Under $500</option>
                      <option value="500-1000" className="bg-void-900">$500 - $1,000</option>
                      <option value="1000-5000" className="bg-void-900">$1,000 - $5,000</option>
                      <option value="5000+" className="bg-void-900">$5,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all appearance-none"
                    >
                      <option value="" className="bg-void-900">Select timeline...</option>
                      <option value="1-week" className="bg-void-900">Within 1 week</option>
                      <option value="2-weeks" className="bg-void-900">Within 2 weeks</option>
                      <option value="1-month" className="bg-void-900">Within 1 month</option>
                      <option value="flexible" className="bg-void-900">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow="emerald" className="p-8">
              {/* Success Message */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="w-16 h-16 rounded-full bg-emerald-glow/20 border border-emerald-glow/30 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="h-8 w-8 text-emerald-glow" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Request Submitted!
                </h2>
                <p className="text-white/40">
                  Your custom solution request has been received. I'll review it and get back to you within 24 hours.
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="mb-8">
                <h3 className="font-display font-bold text-white mb-6 text-center">
                  Request Progress
                </h3>
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute top-4 left-0 right-0 h-[2px] bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-glow to-emerald-glow"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>

                  {/* Stages */}
                  <div className="relative flex justify-between">
                    {stages.map((stage, i) => (
                      <div key={stage.label} className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all duration-500 ${
                            i <= currentStage
                              ? "bg-cyan-glow/20 border border-cyan-glow text-cyan-glow"
                              : "bg-white/5 border border-white/10 text-white/30"
                          }`}
                        >
                          {i < currentStage ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            i + 1
                          )}
                        </motion.div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          i <= currentStage ? "text-white" : "text-white/30"
                        }`}>
                          {stage.label}
                        </span>
                        <span className="text-[10px] text-white/20 mt-0.5 hidden sm:block">
                          {stage.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="glass rounded-xl p-6">
                <h4 className="font-semibold text-white mb-3">What happens next?</h4>
                <ul className="space-y-2 text-sm text-white/40">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-cyan-glow mt-0.5 flex-shrink-0" />
                    I'll review your requirements within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-cyan-glow mt-0.5 flex-shrink-0" />
                    You'll receive a detailed proposal with timeline and pricing
                  </li>
                  <li className="flex items-start gap-2">
                    <Wrench className="h-4 w-4 text-cyan-glow mt-0.5 flex-shrink-0" />
                    Once approved, I'll start building your custom solution
                  </li>
                </ul>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
