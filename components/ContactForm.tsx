"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { contactAPI } from "@/lib/api"
import { useAnalytics } from "@/hooks/useAnalytics"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackEvent } = useAnalytics()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await contactAPI.submitForm(data)

      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      })

      reset()
      trackEvent("contact_form_submit", { success: true }).catch(console.warn)
    } catch (error: any) {
      toast.error("Failed to send message", {
        description: error?.message || "Please try again later.",
      })

      trackEvent("contact_form_submit", {
        success: false,
        error: error?.message || "Unknown error",
      }).catch(console.warn)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white font-medium">
            Name
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Your Name"
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/25 h-12 text-lg"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="your.email@example.com"
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/25 h-12 text-lg"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-white font-medium">
          Subject
        </Label>
        <Input
          id="subject"
          {...register("subject")}
          placeholder="What's this about?"
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/25 h-12 text-lg"
        />
        {errors.subject && <p className="text-red-400 text-sm">{errors.subject.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Tell me about your project or just say hello!"
          rows={6}
          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/25 resize-none text-lg"
        />
        {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-4 text-lg font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
