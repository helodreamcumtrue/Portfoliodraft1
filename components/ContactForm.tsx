"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { contactAPI } from "@/lib/api"
import { useAnalytics } from "@/hooks/useAnalytics"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const { trackEvent } = useAnalytics()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await contactAPI.submitForm(formData)

      setSubmitStatus("success")
      setStatusMessage(response.message || "Message sent successfully!")

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Track successful submission
      trackEvent("contact_form_submit", { success: true }).catch(console.warn)
    } catch (error: any) {
      setSubmitStatus("error")
      setStatusMessage(error?.message || "Failed to send message. Please try again.")

      // Track failed submission
      trackEvent("contact_form_submit", {
        success: false,
        error: error?.message || "Unknown error",
      }).catch(console.warn)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="YOUR NAME"
          required
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/25 h-12 text-lg"
        />
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="YOUR EMAIL"
          required
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/25 h-12 text-lg"
        />
      </div>

      <Input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="SUBJECT"
        required
        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/25 h-12 text-lg"
      />

      <Textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="YOUR MESSAGE"
        rows={6}
        required
        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/25 resize-none text-lg"
      />

      {/* Status Message */}
      {submitStatus !== "idle" && (
        <div
          className={`flex items-center p-4 rounded-lg ${
            submitStatus === "success"
              ? "bg-green-900/20 border border-green-500/30 text-green-400"
              : "bg-red-900/20 border border-red-500/30 text-red-400"
          }`}
        >
          {submitStatus === "success" ? (
            <CheckCircle className="mr-3" size={20} />
          ) : (
            <AlertCircle className="mr-3" size={20} />
          )}
          <span>{statusMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-4 text-lg font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            SENDING...
          </>
        ) : (
          <>
            <Send className="mr-2" size={20} />
            SEND MESSAGE
          </>
        )}
      </Button>
    </form>
  )
}
