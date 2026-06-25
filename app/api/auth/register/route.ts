import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // In production: validate, hash password, create user in DB, send verification email
  console.log("Registration:", body.email)

  return NextResponse.json({ 
    success: true, 
    message: "Registration successful (mock). Please check your email for verification.",
    user: {
      id: "user-new",
      email: body.email,
      name: body.name,
      role: "user",
    }
  })
}
