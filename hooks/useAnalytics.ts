"use client"

import { useEffect } from "react"
import { analyticsAPI } from "@/lib/api"

export function useAnalytics() {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") {
      return
    }

    // Track page view with error handling
    const trackPageView = async () => {
      try {
        await analyticsAPI.trackEvent({
          event: "page_view",
          page: window.location.pathname,
          timestamp: new Date(),
          userAgent: navigator.userAgent,
        })
      } catch (error) {
        // Silently fail - don't break the page
        console.warn("Page view tracking failed:", error)
      }
    }

    trackPageView()

    // Track scroll depth with throttling
    let maxScroll = 0
    let scrollTimeout: NodeJS.Timeout | null = null

    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Throttle scroll tracking
      scrollTimeout = setTimeout(async () => {
        try {
          const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
          )

          if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent

            // Track milestone scroll depths
            if ([25, 50, 75, 100].includes(scrollPercent)) {
              await analyticsAPI.trackEvent({
                event: "scroll_depth",
                page: window.location.pathname,
                timestamp: new Date(),
                userAgent: navigator.userAgent,
              })
            }
          }
        } catch (error) {
          console.warn("Scroll tracking failed:", error)
        }
      }, 500) // Throttle to 500ms
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [])

  const trackEvent = async (eventName: string, additionalData?: any) => {
    try {
      // Only track in browser environment
      if (typeof window === "undefined") {
        return
      }

      await analyticsAPI.trackEvent({
        event: eventName,
        page: window.location.pathname,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        ...additionalData,
      })
    } catch (error) {
      console.warn(`Event tracking failed for ${eventName}:`, error)
    }
  }

  return { trackEvent }
}
