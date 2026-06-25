export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "user" | "admin" | "developer"
  createdAt: string
  purchases: Purchase[]
}

export interface Purchase {
  id: string
  productId: string
  productName: string
  price: number
  purchasedAt: string
  status: "active" | "expired" | "pending"
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginData {
  email: string
  password: string
}
