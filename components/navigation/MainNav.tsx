"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, X, ShoppingCart, User, Search, Home, 
  Package, Wrench, Info, HelpCircle, Phone, Users, Code2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/uiStore"
import { useAuthStore } from "@/store/authStore"
import { useCartStore } from "@/store/cartStore"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products", icon: Package },
  { label: "Custom Solutions", href: "/custom-solutions", icon: Wrench },
  { label: "About", href: "/about", icon: Info },
  { label: "How to Purchase", href: "/how-to-purchase", icon: HelpCircle },
  { label: "Contact", href: "/contact", icon: Phone },
]

const authNavItems = [
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/profile", icon: User },
]

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { setAuthModalOpen } = useUIStore()
  const { user, isAuthenticated } = useAuthStore()
  const { itemCount } = useCartStore()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-void-950/80 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-cyan-glow/20 border border-cyan-glow/30 group-hover:bg-cyan-glow/30 transition-all duration-300" />
                <span className="relative font-mono text-cyan-glow font-bold text-lg">TS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white tracking-tight">
                  TSM<span className="text-cyan-glow">art</span>
                </span>
                <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase -mt-1">
                  Tawsif Software
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg",
                    pathname === item.href
                      ? "text-cyan-glow"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-cyan-glow/10 border border-cyan-glow/20 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <Button variant="ghost" size="icon" className="hidden sm:flex text-white/60 hover:text-white">
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-glow text-void-950 text-xs font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Auth */}
              {isAuthenticated ? (
                <Link href="/profile">
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setAuthModalOpen(true, "login")}
                  className="hidden sm:flex"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-void-950/95 backdrop-blur-2xl"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Nav Content */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-void-950 border-l border-white/10 p-8 pt-24"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        pathname === item.href
                          ? "bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="my-4 border-t border-white/10" />

                {/* Collab Link */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Code2 className="h-5 w-5" />
                    Collab for Devs
                  </Link>
                </motion.div>

                {!isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-4"
                  >
                    <Button
                      className="w-full"
                      onClick={() => {
                        setIsMobileOpen(false)
                        setAuthModalOpen(true, "login")
                      }}
                    >
                      Sign In
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
