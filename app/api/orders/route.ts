import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // In production: validate, create order in DB, process payment via Stripe/PayPal
  console.log("Order received:", body)

  return NextResponse.json({ 
    success: true, 
    orderId: "ord-" + Math.random().toString(36).substring(2, 10),
    message: "Order created (mock)" 
  })
}
