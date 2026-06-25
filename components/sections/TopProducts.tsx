"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Star, Download, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/effects/GlassCard"
import { mockProducts } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"

export default function TopProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { addItem } = useCartStore()

  const topProducts = mockProducts.slice(0, 4)

  const typeColors: Record<string, string> = {
    "script": "emerald",
    "cli-tool": "cyan",
    "desktop-tool": "gold",
    "web-application": "default",
    "web-service": "default",
  }

  const typeLabels: Record<string, string> = {
    "script": "Script",
    "cli-tool": "CLI Tool",
    "desktop-tool": "Desktop App",
    "web-application": "Web App",
    "web-service": "Web Service",
  }

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Badge variant="gold" className="mb-4">Top Products</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Battle-Tested <span className="text-cyan-glow">Automations</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Every product is built to solve real problems. No fluff, just results.
          </p>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <GlassCard glow="cyan" className="h-full flex flex-col">
                {/* Product Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-void-800 to-void-900 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-mono text-white/5 font-bold select-none">
                      {product.name.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant={typeColors[product.type] as any}>
                      {typeLabels[product.type]}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="h-3 w-3 text-gold fill-gold" />
                    <span className="text-xs text-white font-medium">{product.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-cyan-glow transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/40 mb-4 line-clamp-2">{product.tagline}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-white/50">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-cyan-glow" />
                      <span>{product.timeSaved}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-emerald-glow" />
                      <span>{product.moneySaved}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white font-display">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs text-white/40 ml-1">
                        /{product.pricingModel === "one-time" ? "once" : "mo"}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addItem(product)}
                      className="text-xs"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button variant="outline" size="lg" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
