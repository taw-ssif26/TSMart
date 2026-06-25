import type { Metadata } from "next"
import { Inter, Space_Grotesk, Orbitron } from "next/font/google"
import "./globals.css"
import AuthModal from "@/components/auth/AuthModal"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TSMart — Tawsif Software Marketplace",
  description: "Premium software automations, scripts, and tools that save your business time, money, and energy.",
  keywords: ["automation", "software", "scripts", "tools", "marketplace", "TSMart"],
  authors: [{ name: "Tawsif" }],
  openGraph: {
    title: "TSMart — Tawsif Software Marketplace",
    description: "Premium software automations that save your business time, money, and energy.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} font-sans`}>
        {children}
        <AuthModal />
      </body>
    </html>
  )
}
