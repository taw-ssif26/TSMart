"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassCard from "@/components/effects/GlassCard"
import { useCartStore } from "@/store/cartStore"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-void-950 flex items-center justify-center p-8">
        <GlassCard className="p-12 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-8 w-8 text-white/20" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
          <p className="text-white/40 mb-6">Browse our products and add items to your cart.</p>
          <Link href="/products">
            <Button>
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-void-950 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl font-bold text-white">
              Shopping <span className="text-cyan-glow">Cart</span>
            </h1>
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-white/40 hover:text-red-400">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4 mb-8">
            {items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-void-800 to-void-900 flex items-center justify-center flex-shrink-0">
                      <Package className="h-6 w-6 text-white/20" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-white truncate">{item.product.name}</h3>
                      <p className="text-sm text-white/40">{item.product.tagline}</p>
                      <p className="text-xs text-cyan-glow/60 mt-1">
                        {item.product.pricingModel === "one-time" ? "One-time purchase" : "Monthly subscription"}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right min-w-[100px]">
                      <p className="text-lg font-bold text-white font-display">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-400/30 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <GlassCard glow="gold" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/60">Subtotal</span>
              <span className="text-white font-medium">{formatPrice(total)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/60">Tax (estimated)</span>
              <span className="text-white font-medium">{formatPrice(total * 0.08)}</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-bold text-gold font-display">{formatPrice(total * 1.08)}</span>
            </div>
            <Button size="lg" className="w-full text-base">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-white/30 mt-3">
              Checkout will be integrated with Stripe/PayPal when backend is connected.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
