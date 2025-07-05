const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface AnalyticsEvent {
  event: string
  page: string
  timestamp: Date
  userAgent?: string
}

export interface NewsletterSubscription {
  email: string
}

// Contact Form API
export const contactAPI = {
  async submitForm(data: ContactFormData) {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to submit contact form")
    }

    return response.json()
  },
}

// Analytics API
export const analyticsAPI = {
  async trackEvent(event: AnalyticsEvent) {
    try {
      // Only track in browser environment
      if (typeof window === "undefined") {
        return
      }

      const response = await fetch(`${API_BASE_URL}/analytics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })

      // Don't throw error if analytics fails - just log it
      if (!response.ok) {
        console.warn("Analytics tracking failed:", response.status, response.statusText)
        return
      }

      return response.json()
    } catch (error) {
      // Silently fail analytics - don't break the user experience
      console.warn("Analytics tracking failed:", error)
    }
  },

  async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/stats`)
      if (!response.ok) {
        throw new Error("Failed to fetch analytics stats")
      }
      return response.json()
    } catch (error) {
      console.error("Failed to fetch analytics stats:", error)
      throw error
    }
  },
}

// Newsletter API
export const newsletterAPI = {
  async subscribe(data: NewsletterSubscription) {
    const response = await fetch(`${API_BASE_URL}/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to subscribe to newsletter")
    }

    return response.json()
  },
}

// Resume Download API
export const resumeAPI = {
  async downloadResume() {
    const response = await fetch(`${API_BASE_URL}/resume/download`)
    if (!response.ok) {
      throw new Error("Failed to download resume")
    }
    return response.blob()
  },

  async trackDownload() {
    await analyticsAPI.trackEvent({
      event: "resume_download",
      page: "portfolio",
      timestamp: new Date(),
      userAgent: navigator.userAgent,
    })
  },
}
