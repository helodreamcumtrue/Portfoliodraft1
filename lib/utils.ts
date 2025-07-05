import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for safe API calls
export function isBrowser(): boolean {
  return typeof window !== "undefined"
}

export function safeLocalStorage() {
  if (!isBrowser()) {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    }
  }
  return localStorage
}

export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  fallback?: T,
  errorMessage?: string,
): Promise<T | undefined> {
  try {
    return await apiCall()
  } catch (error) {
    console.warn(errorMessage || "API call failed:", error)
    return fallback
  }
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
