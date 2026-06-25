"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, MessageCircle, Mail, MapPin } from "lucide-react"

const footerLinks = {
  products: [
    { label: "All Products", href: "/products" },
    { label: "Scripts", href: "/products?type=script" },
    { label: "CLI Tools", href: "/products?type=cli-tool" },
    { label: "Web Apps", href: "/products?type=web-application" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Custom Solutions", href: "/custom-solutions" },
    { label: "How to Purchase", href: "/how-to-purchase" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Documentation", href: "/how-to-purchase" },
    { label: "Talk to a Dev", href: "/contact" },
    { label: "Collab", href: "/contact" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://telegram.org", label: "Telegram" },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-void-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cyan-glow/20 border border-cyan-glow/30 flex items-center justify-center">
                <span className="font-mono text-cyan-glow font-bold text-lg">TS</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white">
                  TSM<span className="text-cyan-glow">art</span>
                </span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              Premium software automations built by Tawsif. Save time, save money, 
              save energy — focus on what matters.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-cyan-glow hover:border-cyan-glow/30 hover:bg-cyan-glow/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-cyan-glow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-cyan-glow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-cyan-glow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} TSMart. Built by Tawsif. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
