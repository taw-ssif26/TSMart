import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // In production: verify credentials against DB, generate JWT, set httpOnly cookie
  console.log("Login attempt:", body.email)

  return NextResponse.json({ 
    success: true, 
    token: "mock-jwt-token",
    user: {
      id: "user-1",
      email: body.email,
      name: "Tawsif",
      role: "admin",
    }
  })
}
