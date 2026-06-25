"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, ArrowLeft, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { cn } from "@/lib/utils"

const dashboardNav = [
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/profile", icon: User },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-void-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-void-950/50 backdrop-blur-xl fixed left-0 top-0 bottom-0 z-40 hidden lg:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-glow/20 border border-cyan-glow/30 flex items-center justify-center">
              <span className="font-mono text-cyan-glow font-bold text-sm">TS</span>
            </div>
            <span className="font-display font-bold text-lg text-white">
              TSM<span className="text-cyan-glow">art</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {dashboardNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 space-y-2">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-white/40 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-white/40 hover:text-red-400"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-void-950/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-white">TSM<span className="text-cyan-glow">art</span></span>
        </Link>
        <div className="flex items-center gap-2">
          {dashboardNav.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" size="icon" className={cn(
                "text-white/40",
                pathname === item.href && "text-cyan-glow"
              )}>
                <item.icon className="h-5 w-5" />
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
