"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Star, Clock, DollarSign, ShoppingCart, Check, ArrowLeft, Download, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/effects/GlassCard"
import { mockProducts } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"
import ParticleField from "@/components/effects/ParticleField"

const typeIcons: Record<string, React.ElementType> = {
  "script": Zap,
  "cli-tool": Download,
  "desktop-tool": Download,
  "web-application": Globe,
  "web-service": Globe,
}

const typeLabels: Record<string, string> = {
  "script": "Script / Code",
  "cli-tool": "CLI Tool",
  "desktop-tool": "Desktop Application",
  "web-application": "Web Application",
  "web-service": "Web Service",
}

const typeColors: Record<string, string> = {
  "script": "emerald",
  "cli-tool": "cyan",
  "desktop-tool": "gold",
  "web-application": "default",
  "web-service": "default",
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addItem } = useCartStore()

  const product = mockProducts.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen bg-void-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const TypeIcon = typeIcons[product.type] || Zap

  return (
    <div className="relative min-h-screen bg-void-950 pt-24 pb-32">
      <ParticleField />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link href="/products" className="inline-flex items-center gap-2 text-white/40 hover:text-cyan-glow transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow="cyan" className="p-8">
              {/* Type Badge */}
              <div className="flex items-center gap-3 mb-6">
                <Badge variant={typeColors[product.type] as any}>
                  <TypeIcon className="h-3 w-3 mr-1" />
                  {typeLabels[product.type]}
                </Badge>
                <Badge variant="secondary">
                  {product.category}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-cyan-glow mb-6">{product.tagline}</p>

              {/* Description */}
              <p className="text-white/60 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-cyan-glow" />
                    <span className="text-sm text-white/40">Time Saved</span>
                  </div>
                  <span className="text-xl font-bold text-white font-display">{product.timeSaved}</span>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-emerald-glow" />
                    <span className="text-sm text-white/40">Money Saved</span>
                  </div>
                  <span className="text-xl font-bold text-white font-display">{product.moneySaved}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-gold fill-gold"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                  <span className="text-white font-bold ml-2">{product.rating}</span>
                </div>
                <span className="text-white/40">{product.reviews} reviews</span>
                <span className="text-white/40">{product.downloads} downloads</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Right: Pricing & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard glow="gold" className="p-8 sticky top-24">
              <h3 className="font-display font-bold text-xl text-white mb-6">Pricing</h3>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white font-display">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-white/40">
                    {product.pricingModel === "one-time" ? "one-time" : "/month"}
                  </span>
                </div>
                <p className="text-sm text-white/40">
                  {product.pricingModel === "one-time" 
                    ? "Lifetime access. No recurring fees."
                    : "Cancel anytime. Full support included."
                  }
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 mb-8">
                <Button
                  size="lg"
                  className="w-full text-base"
                  onClick={() => addItem(product)}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Link href="/custom-solutions">
                  <Button variant="outline" size="lg" className="w-full text-base">
                    Request Custom Version
                  </Button>
                </Link>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-white mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-glow/20 border border-emerald-glow/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-emerald-glow" />
                      </div>
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
