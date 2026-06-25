import { NextResponse } from "next/server"
import { mockProducts } from "@/lib/data"

export async function GET() {
  // In production, this would query your database
  return NextResponse.json({ products: mockProducts })
}
