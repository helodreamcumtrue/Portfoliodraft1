import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo (use a database in production)
let analyticsData: any[] = []

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    // Validate required fields
    if (!eventData.event || !eventData.page) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Add timestamp and IP for tracking
    const enrichedEvent = {
      ...eventData,
      timestamp: new Date().toISOString(),
      ip: request.ip || request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Store the event (in production, save to database)
    analyticsData.push(enrichedEvent)

    // Keep only last 1000 events in memory
    if (analyticsData.length > 1000) {
      analyticsData = analyticsData.slice(-1000)
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    )
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export async function GET() {
  try {
    // Calculate basic stats
    const totalEvents = analyticsData.length
    const uniqueVisitors = new Set(analyticsData.map((event) => event.ip)).size
    const pageViews = analyticsData.filter((event) => event.event === "page_view").length
    const contactForms = analyticsData.filter((event) => event.event === "contact_form_submit").length
    const resumeDownloads = analyticsData.filter((event) => event.event === "resume_download").length

    // Recent events (last 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentEvents = analyticsData.filter((event) => new Date(event.timestamp) > yesterday)

    const stats = {
      totalEvents,
      uniqueVisitors,
      pageViews,
      contactForms,
      resumeDownloads,
      recentEvents: recentEvents.length,
      topPages: getTopPages(),
      hourlyStats: getHourlyStats(),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Analytics stats error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}

function getTopPages() {
  const pageCount: { [key: string]: number } = {}
  analyticsData
    .filter((event) => event.event === "page_view")
    .forEach((event) => {
      pageCount[event.page] = (pageCount[event.page] || 0) + 1
    })

  return Object.entries(pageCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([page, count]) => ({ page, count }))
}

function getHourlyStats() {
  const hourlyCount: { [key: string]: number } = {}
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)

  analyticsData
    .filter((event) => new Date(event.timestamp) > last24Hours)
    .forEach((event) => {
      const hour = new Date(event.timestamp).getHours()
      hourlyCount[hour] = (hourlyCount[hour] || 0) + 1
    })

  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    hour_label: `${hour}:00`,
    count: hourlyCount[hour] || 0,
  }))
}
