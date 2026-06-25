"use client"

import ParticleField from "@/components/effects/ParticleField"
import HeroSection from "@/components/sections/HeroSection"
import TopProducts from "@/components/sections/TopProducts"
import HowItWorks from "@/components/sections/HowItWorks"
import CTASection from "@/components/sections/CTASection"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-void-950">
      {/* 3D Particle Background */}
      <ParticleField />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <TopProducts />
        <HowItWorks />
        <CTASection />
      </div>
    </div>
  )
}
