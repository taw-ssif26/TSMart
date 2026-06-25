"use client"

import { create } from "zustand"

interface UIStore {
  isNavOpen: boolean
  isCartOpen: boolean
  isAuthModalOpen: boolean
  authModalMode: "login" | "register"
  setNavOpen: (open: boolean) => void
  setCartOpen: (open: boolean) => void
  setAuthModalOpen: (open: boolean, mode?: "login" | "register") => void
  toggleNav: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isNavOpen: false,
  isCartOpen: false,
  isAuthModalOpen: false,
  authModalMode: "login",
  setNavOpen: (open) => set({ isNavOpen: open }),
  setCartOpen: (open) => set({ isCartOpen: open }),
  setAuthModalOpen: (open, mode = "login") =>
    set({ isAuthModalOpen: open, authModalMode: mode }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}))
