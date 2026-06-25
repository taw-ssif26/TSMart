"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Loader2, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/uiStore"
import { useAuthStore } from "@/store/authStore"

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, setAuthModalOpen } = useUIStore()
  const { login, register, isLoading } = useAuthStore()
  const [mode, setMode] = useState<"login" | "register">(authModalMode)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<"form" | "verify" | "success">("form")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (mode === "register" && !formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Min 8 characters"
    if (mode === "register" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    if (mode === "login") {
      await login({ email: formData.email, password: formData.password })
      setAuthModalOpen(false)
    } else {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
      setStep("verify")
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = verificationCode.join("")
    if (code.length === 6) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("success")
      setTimeout(() => {
        setAuthModalOpen(false)
        setStep("form")
        setVerificationCode(["", "", "", "", "", ""])
      }, 2000)
    }
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0]
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus()
    }
  }

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login")
    setErrors({})
    setStep("form")
  }

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={() => setAuthModalOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md"
          >
            <div className="glass-strong rounded-2xl border border-white/10 p-8 shadow-2xl">
              <button
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-mono text-cyan-glow font-bold text-lg">TS</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  {step === "form" && (mode === "login" ? "Welcome Back" : "Create Account")}
                  {step === "verify" && "Verify Email"}
                  {step === "success" && "All Set!"}
                </h2>
                <p className="text-sm text-white/40 mt-1">
                  {step === "form" && (mode === "login" ? "Sign in to your TSMart account" : "Join the TSMart ecosystem")}
                  {step === "verify" && "Enter the 6-digit code sent to your email"}
                  {step === "success" && "Your account is ready to go"}
                </p>
              </div>

              {step === "form" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "register" && (
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all ${
                            errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-cyan-glow/50"
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all ${
                          errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-cyan-glow/50"
                        }`}
                        placeholder="you@company.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {mode === "register" && (
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Phone (optional)</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all ${
                          errors.password ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-cyan-glow/50"
                        }`}
                        placeholder="Min 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                  </div>

                  {mode === "register" && (
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all ${
                            errors.confirmPassword ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-cyan-glow/50"
                          }`}
                          placeholder="Repeat password"
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                    ) : mode === "login" ? (
                      <><ArrowRight className="mr-2 h-5 w-5" /> Sign In</>
                    ) : (
                      <><ArrowRight className="mr-2 h-5 w-5" /> Create Account</>
                    )}
                  </Button>
                </form>
              )}

              {step === "verify" && (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="flex justify-center gap-2">
                    {verificationCode.map((digit, i) => (
                      <input
                        key={i}
                        id={`code-${i}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        className="w-12 h-14 text-center text-xl font-bold text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all"
                      />
                    ))}
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying...</> : "Verify Email"}
                  </Button>
                  <p className="text-center text-sm text-white/40">
                    Didn't receive it?{" "}
                    <button type="button" className="text-cyan-glow hover:underline">
                      Resend code
                    </button>
                  </p>
                </form>
              )}

              {step === "success" && (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="w-16 h-16 rounded-full bg-emerald-glow/20 border border-emerald-glow/30 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-emerald-glow" />
                  </motion.div>
                  <p className="text-white/60">Redirecting you...</p>
                </div>
              )}

              {step === "form" && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-white/40">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={switchMode}
                      className="text-cyan-glow hover:underline font-medium"
                    >
                      {mode === "login" ? "Create one" : "Sign in"}
                    </button>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
