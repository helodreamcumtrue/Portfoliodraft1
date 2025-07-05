import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lakshay Jain - Computer Science Student & Entrepreneur",
  description:
    "Motivated Computer Science student with passion for technology and entrepreneurship. Skilled in design, photography, and startup ecosystems.",
  keywords: ["Lakshay Jain", "Computer Science", "Entrepreneur", "Designer", "Photography", "Thapar Institute"],
  authors: [{ name: "Lakshay Jain" }],
  creator: "Lakshay Jain",
  publisher: "Lakshay Jain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lakshayjain.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lakshay Jain - Computer Science Student & Entrepreneur",
    description:
      "Motivated Computer Science student with passion for technology and entrepreneurship. Skilled in design, photography, and startup ecosystems.",
    url: "https://lakshayjain.dev",
    siteName: "Lakshay Jain Portfolio",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Lakshay Jain Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakshay Jain - Computer Science Student & Entrepreneur",
    description:
      "Motivated Computer Science student with passion for technology and entrepreneurship. Skilled in design, photography, and startup ecosystems.",
    creator: "@lakshayjain",
    images: ["/placeholder.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
