import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create a simple PDF-like response or redirect to an actual resume
    // For now, we'll create a simple text response that browsers will download
    const resumeContent = `
LAKSHAY JAIN
Computer Science Student | Entrepreneur | Full Stack Developer

CONTACT INFORMATION
Email: lakshayjain148@gmail.com
Phone: +91 8690140158
Location: India

EXPERIENCE
• Full Stack Developer - Tech Startup (2023 - Present)
• Computer Science Student - University (2022 - Present)  
• Freelance Developer - Various Clients (2021 - Present)

TECHNICAL SKILLS
• JavaScript/TypeScript - 90%
• React/Next.js - 85%
• Python - 80%
• Node.js - 75%
• Database Design - 70%

LEADERSHIP SKILLS
• Team Leadership - 95%
• Project Management - 90%
• Communication - 85%
• Problem Solving - 90%
• Strategic Thinking - 80%

PROJECTS
• 50+ Projects Completed
• 15+ Technologies Mastered
• 3+ Years Experience

This is a sample resume. Please contact me for the full detailed version.
    `

    // Convert to buffer
    const buffer = Buffer.from(resumeContent, "utf-8")

    // Track download analytics
    console.log("Resume downloaded at:", new Date().toISOString())

    // Return file with proper headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": 'attachment; filename="Lakshay_Jain_Resume.txt"',
        "Content-Length": buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Resume download error:", error)
    return NextResponse.json({ error: "Failed to download resume" }, { status: 500 })
  }
}
