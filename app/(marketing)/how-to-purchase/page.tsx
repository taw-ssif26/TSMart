"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ShoppingCart, CreditCard, Download, Settings, MessageSquare, CheckCircle, ArrowRight, Play, FileText, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/effects/GlassCard"
import ParticleField from "@/components/effects/ParticleField"
import Link from "next/link"

const steps = [
  {
    icon: ShoppingCart,
    title: "Browse & Select",
    desc: "Explore the product catalog. Each product includes detailed descriptions, feature lists, and time/money saved metrics to help you decide.",
    tip: "Use filters to narrow down by category, type, or pricing model.",
  },
  {
    icon: CreditCard,
    title: "Add to Cart & Checkout",
    desc: "Add products to your cart. Review your selections, then proceed to checkout. We support one-time purchases and subscription models.",
    tip: "Subscriptions can be cancelled anytime from your profile.",
  },
  {
    icon: Download,
    title: "Receive Your Product",
    desc: "After payment confirmation, you'll receive download links for scripts/tools or access credentials for web applications and services.",
    tip: "All products come with a setup guide included.",
  },
  {
    icon: Settings,
    title: "Setup & Configure",
    desc: "Follow the included documentation to set up the product. Most tools are ready to use within minutes. For complex setups, detailed guides are provided.",
    tip: "Need help? Use the 'Talk to a Dev' option anytime.",
  },
  {
    icon: CheckCircle,
    title: "Start Automating",
    desc: "Your automation is now running. Monitor performance, request updates, or scale up as your business grows.",
    tip: "Leave a review to help other buyers!",
  },
]

const faqs = [
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for enterprise clients. Cryptocurrency payments are coming soon.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 14-day money-back guarantee on all products. If the tool doesn't solve your problem, contact us for a full refund.",
  },
  {
    q: "What's the difference between one-time and subscription?",
    a: "One-time purchases give you lifetime access with updates for 1 year. Subscriptions include continuous updates, priority support, and new features.",
  },
  {
    q: "Can I request modifications to a product?",
    a: "Absolutely! Use the Custom Solutions page to describe your modifications. I'll provide a quote for the custom work.",
  },
  {
    q: "Do you provide support after purchase?",
    a: "All purchases include email support. Subscription plans include priority support with faster response times.",
  },
]

export default function HowToPurchasePage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="relative min-h-screen bg-void-950 pt-24 pb-32">
      <ParticleField />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="gold" className="mb-4">How to Purchase</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Getting Started is <span className="text-cyan-glow">Simple</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            From browsing to automating — here's everything you need to know about purchasing 
            and setting up products from TSMart.
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="mb-24">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <GlassCard glow="cyan" className="p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center">
                        <step.icon className="h-7 w-7 text-cyan-glow" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-cyan-glow/60">STEP {i + 1}</span>
                        <h3 className="font-display font-bold text-xl text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/60 leading-relaxed mb-3">{step.desc}</p>
                      <div className="flex items-start gap-2 text-sm text-gold/80">
                        <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{step.tip}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Talk to a Dev CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-24"
        >
          <GlassCard glow="gold" className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-gold" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Still Have Questions?
            </h2>
            <p className="text-white/40 max-w-md mx-auto mb-6">
              Talk directly to a developer. No sales team, no chatbots — just me, ready to help you 
              find the right solution.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="gold" className="text-base px-8">
                Talk to a Dev
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </GlassCard>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Frequently Asked <span className="text-cyan-glow">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="p-6">
                <h3 className="font-display font-bold text-white mb-2 flex items-start gap-3">
                  <FileText className="h-5 w-5 text-cyan-glow mt-0.5 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed pl-8">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
