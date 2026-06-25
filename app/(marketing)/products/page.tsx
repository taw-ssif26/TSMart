"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, Filter, Star, Clock, DollarSign, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/effects/GlassCard"
import { mockProducts } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"
import ParticleField from "@/components/effects/ParticleField"

const categories = ["All", "Automation", "Scraping", "AI", "Finance", "Marketing", "DevOps"]
const types = ["All Types", "Script", "CLI Tool", "Desktop App", "Web App", "Web Service"]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All Types")
  const { addItem } = useCartStore()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const filtered = mockProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory
    const matchType = selectedType === "All Types" || 
                     (selectedType === "Script" && p.type === "script") ||
                     (selectedType === "CLI Tool" && p.type === "cli-tool") ||
                     (selectedType === "Desktop App" && p.type === "desktop-tool") ||
                     (selectedType === "Web App" && p.type === "web-application") ||
                     (selectedType === "Web Service" && p.type === "web-service")
    return matchSearch && matchCategory && matchType
  })

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
    <div className="relative min-h-screen bg-void-950 pt-24 pb-32">
      <ParticleField />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="cyan" className="mb-4">Store</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Product <span className="text-cyan-glow">Catalog</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Browse our collection of battle-tested automations. Each product is built to solve real business problems.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/30"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedType === t
                    ? "bg-gold/20 text-gold border border-gold/30"
                    : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard glow="cyan" className="h-full flex flex-col group">
                {/* Image Area */}
                <div className="relative h-52 bg-gradient-to-br from-void-800 to-void-900 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-7xl font-mono text-white/5 font-bold select-none group-hover:scale-110 transition-transform duration-700">
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
                    <span className="text-xs text-white/40">({product.reviews})</span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                    <ShoppingCart className="h-3 w-3 text-white/60" />
                    <span className="text-xs text-white/60">{product.downloads}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-cyan-glow transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/40 mb-3">{product.tagline}</p>

                  {/* Features preview */}
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                          <div className="w-1 h-1 rounded-full bg-cyan-glow/60" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

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

                  {/* Price & Actions */}
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <div>
                      <span className="text-2xl font-bold text-white font-display">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs text-white/40 ml-1">
                        /{product.pricingModel === "one-time" ? "once" : "mo"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/products/${product.slug}`}>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => addItem(product)}
                        className="text-xs"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
