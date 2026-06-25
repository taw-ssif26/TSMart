export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  category: string
  type: "script" | "cli-tool" | "desktop-tool" | "web-application" | "web-service"
  price: number
  pricingModel: "one-time" | "monthly" | "subscription" | "free"
  image: string
  features: string[]
  timeSaved: string
  moneySaved: string
  rating: number
  reviews: number
  downloads: number
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ProductFilter {
  category?: string
  type?: string
  pricingModel?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}
