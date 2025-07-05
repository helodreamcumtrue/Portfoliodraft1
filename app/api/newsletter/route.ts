import { type NextRequest, NextResponse } from "next/server"

// Newsletter subscribers storage (use database in production)
const subscribers: string[] = []

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validation
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Check if already subscribed
    if (subscribers.includes(email)) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 })
    }

    // Add to subscribers
    subscribers.push(email)

    // In production, you might want to:
    // 1. Save to database
    // 2. Send welcome email
    // 3. Integrate with email service (Mailchimp, ConvertKit, etc.)

    console.log(`New newsletter subscriber: ${email}`)

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe. Please try again later." }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    totalSubscribers: subscribers.length,
    subscribers: subscribers, // Remove in production for privacy
  })
}
