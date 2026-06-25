"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MessageSquare, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-cyan-glow/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to <span className="text-cyan-glow neon-glow">Automate</span>?
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-10">
            Whether you need a ready-made solution or a custom-built automation, 
            let's make your business run on autopilot.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="group text-base px-8">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/custom-solutions">
              <Button variant="gold" size="lg" className="text-base px-8">
                <Wrench className="mr-2 h-4 w-4" />
                Custom Solution
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-base px-8">
                <MessageSquare className="mr-2 h-4 w-4" />
                Talk to a Dev
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
