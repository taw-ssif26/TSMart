"use client"

import { motion } from "framer-motion"
import { User, Mail, Calendar, Package, Star, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/effects/GlassCard"
import { useAuthStore } from "@/store/authStore"
import { formatPrice } from "@/lib/utils"

export default function ProfilePage() {
  const { user, logout } = useAuthStore()

  if (!user) {
    return (
      <div className="min-h-screen bg-void-950 flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <p className="text-white/40">Please sign in to view your profile.</p>
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
          {/* Profile Header */}
          <div className="mb-10">
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              My <span className="text-cyan-glow">Profile</span>
            </h1>
            <p className="text-white/40">Manage your account and view your purchases.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Card */}
            <GlassCard glow="cyan" className="p-6 lg:col-span-1">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-cyan-glow/10 border-2 border-cyan-glow/30 flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-cyan-glow" />
                </div>
                <h2 className="font-display font-bold text-xl text-white mb-1">{user.name}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-white/40 mb-4">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </div>
                <Badge variant="gold" className="mb-4">{user.role}</Badge>
                <div className="flex items-center justify-center gap-1 text-xs text-white/30">
                  <Calendar className="h-3 w-3" />
                  Member since {new Date(user.createdAt).getFullYear()}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <Button variant="ghost" className="w-full text-white/40 hover:text-red-400" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </GlassCard>

            {/* Stats & Purchases */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <GlassCard className="p-4 text-center">
                  <Package className="h-5 w-5 text-cyan-glow mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white font-display">{user.purchases.length}</div>
                  <div className="text-xs text-white/40">Purchases</div>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                  <Star className="h-5 w-5 text-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white font-display">0</div>
                  <div className="text-xs text-white/40">Reviews</div>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-glow font-display">{formatPrice(0)}</div>
                  <div className="text-xs text-white/40">Total Spent</div>
                </GlassCard>
              </div>

              {/* Purchases */}
              <GlassCard className="p-6">
                <h3 className="font-display font-bold text-lg text-white mb-4">Purchase History</h3>
                {user.purchases.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-8 w-8 text-white/10 mx-auto mb-3" />
                    <p className="text-white/30">No purchases yet.</p>
                    <p className="text-white/20 text-sm mt-1">Your purchased products will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user.purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
                      >
                        <div>
                          <p className="font-medium text-white">{purchase.productName}</p>
                          <p className="text-xs text-white/40">
                            {new Date(purchase.purchasedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{formatPrice(purchase.price)}</p>
                          <Badge variant={purchase.status === "active" ? "emerald" : "secondary"} className="text-xs">
                            {purchase.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
