export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: string
  paymentMethod?: string
}

export interface OrderItem {
  productId: string
  productName: string
  price: number
  quantity: number
}
