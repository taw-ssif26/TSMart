"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User, LoginData, RegisterData } from "@/types/user"

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

const mockUser: User = {
  id: "user-1",
  email: "tawsif@tsmart.dev",
  name: "Tawsif",
  role: "admin",
  createdAt: "2024-01-01",
  purchases: [],
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (data) => {
        set({ isLoading: true })
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        set({ user: mockUser, isAuthenticated: true, isLoading: false })
      },
      register: async (data) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 1000))
        set({ user: mockUser, isAuthenticated: true, isLoading: false })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },
    }),
    {
      name: "tsmart-auth",
    }
  )
)
