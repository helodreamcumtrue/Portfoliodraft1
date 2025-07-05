import { type NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"

export async function GET(request: NextRequest) {
  try {
    // Path to your resume file (place in public/files/ directory)
    const resumePath = path.join(process.cwd(), "public", "files", "Alex_Chen_Resume.pdf")

    // Check if file exists
    if (!fs.existsSync(resumePath)) {
      return NextResponse.json({ error: "Resume file not found" }, { status: 404 })
    }

    // Read the file
    const fileBuffer = fs.readFileSync(resumePath)

    // Track download analytics
    console.log("Resume downloaded at:", new Date().toISOString())

    // Return file with proper headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Alex_Chen_Resume.pdf"',
        "Content-Length": fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Resume download error:", error)
    return NextResponse.json({ error: "Failed to download resume" }, { status: 500 })
  }
}
