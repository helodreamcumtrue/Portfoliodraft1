"use client"

import { useState, useEffect, useRef } from "react"
import {
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Download,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Code,
  Users,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/ContactForm"
import { useAnalytics } from "@/hooks/useAnalytics"
import { resumeAPI } from "@/lib/api"

export default function CinematicPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const name = "Your Name"
  const subtitle = "Your Title/Description"

  const { trackEvent } = useAnalytics()

  // Typing animation
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= name.length) {
        setTypedText(name.slice(0, index))
        index++
      } else {
        setIsTypingComplete(true)
        clearInterval(timer)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Video controls
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })

      // Track navigation with error handling
      trackEvent("section_navigation", { section: sectionId }).catch((error) => {
        console.warn("Navigation tracking failed:", error)
      })
    }
    setIsMenuOpen(false)
  }

  const handleResumeDownload = async () => {
    try {
      // Track download attempt
      trackEvent("resume_download_attempt").catch((error) => {
        console.warn("Download tracking failed:", error)
      })

      const blob = await resumeAPI.downloadResume()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "Alex_Chen_Resume.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      // Track successful download
      trackEvent("resume_download_success").catch((error) => {
        console.warn("Download success tracking failed:", error)
      })
    } catch (error) {
      console.error("Resume download failed:", error)

      // Track download failure
      trackEvent("resume_download_error", { error: error.message }).catch((trackError) => {
        console.warn("Download error tracking failed:", trackError)
      })
    }
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      {isMounted && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
            style={{
              width:
                typeof window !== "undefined"
                  ? `${Math.min((scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100, 100)}%`
                  : "0%",
            }}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-black/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold tracking-wider">
              <span className="text-cyan-400">A</span>C
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["About", "Experience", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium tracking-wide hover:text-cyan-400 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              {["About", "Experience", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-white hover:text-cyan-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black">
          <div className="matrix-bg absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="matrix-particle absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 text-center px-4"
          style={{
            transform: isMounted ? `translateY(${scrollY * 0.5}px)` : "translateY(0px)",
          }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display tracking-wider mb-6 leading-none">
            {typedText}
            {!isTypingComplete && <span className="animate-pulse text-cyan-400">|</span>}
          </h1>

          {isTypingComplete && (
            <div className="animate-fade-in-up">
              <p className="text-xl md:text-2xl text-gray-300 mb-8 tracking-wide font-light">{subtitle}</p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button
                  onClick={() => scrollToSection("about")}
                  className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25"
                >
                  LEARN MORE ABOUT ME
                </Button>

                <Button
                  onClick={handleResumeDownload}
                  variant="ghost"
                  className="text-white hover:text-cyan-400 px-8 py-4 text-lg font-semibold tracking-wide transition-all duration-300"
                >
                  <Download className="mr-2" size={20} />
                  DOWNLOAD CV
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-8">
                {[
                  { icon: Linkedin, href: "https://linkedin.com/in/yourusername", color: "hover:text-blue-400" },
                  { icon: Github, href: "https://github.com/yourusername", color: "hover:text-gray-400" },
                  { icon: Instagram, href: "https://instagram.com/yourusername", color: "hover:text-pink-400" },
                  { icon: ExternalLink, href: "https://yourwebsite.com", color: "hover:text-cyan-400" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-125`}
                  >
                    <social.icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-cyan-400" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Portrait */}
            <div
              className="relative"
              style={{
                transform: isMounted ? `translateY(${scrollY * 0.1}px)` : "translateY(0px)",
              }}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-6xl font-bold text-cyan-400">AC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              style={{
                transform: isMounted ? `translateY(${scrollY * 0.05}px)` : "translateY(0px)",
              }}
            >
              <h2 className="text-5xl md:text-6xl font-display tracking-wider mb-8 leading-tight">
                ABOUT
                <span className="block text-cyan-400">ME</span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed mb-8 font-body font-light">
                I'm a passionate Computer Science student with an entrepreneurial spirit. Currently building innovative
                solutions through Dreamy Craft while mastering the art of code and design.
              </p>

              <p className="text-lg text-gray-400 leading-relaxed mb-12 font-light">
                My mission is to bridge technology and creativity, creating impactful solutions that matter.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { number: "3+", label: "YEARS EXPERIENCE" },
                  { number: "50+", label: "PROJECTS COMPLETED" },
                  { number: "15+", label: "TECHNOLOGIES" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-black text-cyan-400 mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-400 tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-black tracking-wider text-center mb-20">EXPERIENCE</h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-400 to-blue-500" />

            <div className="space-y-24">
              {[
                {
                  title: "FOUNDER & CEO",
                  company: "Dreamy Craft",
                  period: "2022 - Present",
                  description:
                    "Built and scaled a creative business from ground up, serving 500+ customers with 95% satisfaction rate.",
                  metrics: ["500+ Customers", "95% Satisfaction", "50+ Products", "2+ Years"],
                  side: "left",
                },
                {
                  title: "PRODUCT RESEARCHER",
                  company: "Aarohan Project - Enactus Thapar",
                  period: "2023 - Present",
                  description:
                    "Led product research for social impact projects, developing sustainable solutions for rural communities.",
                  metrics: ["Market Research", "Social Impact", "Team Leadership", "Innovation"],
                  side: "right",
                },
                {
                  title: "TECHNICAL LEAD",
                  company: "ACM Society & Entrepreneurship Club",
                  period: "2022 - Present",
                  description:
                    "Organized technical events, workshops, and hackathons. Built communities and fostered innovation.",
                  metrics: ["Event Management", "Community Building", "Technical Workshops", "Leadership"],
                  side: "left",
                },
              ].map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${exp.side === "left" ? "justify-start" : "justify-end"}`}
                  style={{
                    transform: isMounted ? `translateY(${scrollY * 0.02 * (index + 1)}px)` : "translateY(0px)",
                  }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-black z-10" />

                  {/* Content Card */}
                  <div
                    className={`w-5/12 ${exp.side === "left" ? "mr-auto pr-8" : "ml-auto pl-8"} group cursor-pointer`}
                  >
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:bg-gray-800/50 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-400/10 transform hover:-translate-y-2">
                      <div className="text-sm text-cyan-400 font-semibold tracking-wide mb-2">{exp.period}</div>
                      <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                      <h4 className="text-lg text-gray-300 mb-4">{exp.company}</h4>
                      <p className="text-gray-400 mb-6 leading-relaxed">{exp.description}</p>

                      <div className="grid grid-cols-2 gap-2">
                        {exp.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full text-center"
                          >
                            {metric}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-black tracking-wider text-center mb-20">SKILLS</h2>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Technical Skills */}
            <div
              style={{
                transform: isMounted ? `translateY(${scrollY * 0.02}px)` : "translateY(0px)",
              }}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center">
                <Code className="mr-4 text-cyan-400" size={32} />
                TECHNICAL
              </h3>

              <div className="space-y-6">
                {[
                  { skill: "JavaScript/TypeScript", level: 90 },
                  { skill: "React/Next.js", level: 85 },
                  { skill: "Python", level: 80 },
                  { skill: "Node.js", level: 75 },
                  { skill: "Database Design", level: 70 },
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{item.skill}</span>
                      <span className="text-cyan-400 font-bold">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-cyan-400/25"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div
              style={{
                transform: isMounted ? `translateY(${scrollY * 0.03}px)` : "translateY(0px)",
              }}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center">
                <Users className="mr-4 text-cyan-400" size={32} />
                LEADERSHIP
              </h3>

              <div className="space-y-6">
                {[
                  { skill: "Team Leadership", level: 95 },
                  { skill: "Project Management", level: 90 },
                  { skill: "Communication", level: 85 },
                  { skill: "Problem Solving", level: 90 },
                  { skill: "Strategic Thinking", level: 80 },
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{item.skill}</span>
                      <span className="text-cyan-400 font-bold">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-purple-400/25"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-black tracking-wider text-center mb-20">
            GET IN
            <span className="block text-cyan-400">TOUCH</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div
              style={{
                transform: isMounted ? `translateY(${scrollY * 0.02}px)` : "translateY(0px)",
              }}
            >
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div
              className="space-y-8"
              style={{
                transform: isMounted ? `translateY(${scrollY * 0.01}px)` : "translateY(0px)",
              }}
            >
              {[
                {
                  icon: Mail,
                  title: "EMAIL",
                  content: "your.email@example.com",
                  subtitle: "Drop me a line anytime",
                  color: "text-cyan-400",
                  bgGradient: "from-cyan-500/10 to-blue-500/10",
                  borderGradient: "from-cyan-500/30 to-blue-500/30",
                  hoverGlow: "hover:shadow-cyan-400/20",
                },
                {
                  icon: Phone,
                  title: "PHONE",
                  content: "+1 (123) 456-7890",
                  subtitle: "Available Mon-Fri, 9AM-6PM",
                  color: "text-purple-400",
                  bgGradient: "from-purple-500/10 to-pink-500/10",
                  borderGradient: "from-purple-500/30 to-pink-500/30",
                  hoverGlow: "hover:shadow-purple-400/20",
                },
                {
                  icon: MapPin,
                  title: "LOCATION",
                  content: "Your City, State, Country",
                  subtitle: "Open to remote opportunities",
                  color: "text-emerald-400",
                  bgGradient: "from-emerald-500/10 to-green-500/10",
                  borderGradient: "from-emerald-500/30 to-green-500/30",
                  hoverGlow: "hover:shadow-emerald-400/20",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${contact.bgGradient} backdrop-blur-sm border border-gray-800/50 hover:border-transparent transition-all duration-500 ${contact.hoverGlow} hover:shadow-2xl transform hover:-translate-y-2`}
                >
                  {/* Gradient Border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${contact.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
                  />
                  <div className="absolute inset-[1px] bg-gray-900/80 rounded-xl" />

                  {/* Content */}
                  <div className="relative p-8 flex items-center space-x-6">
                    {/* Icon Container */}
                    <div
                      className={`relative flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${contact.bgGradient} border border-gray-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <contact.icon
                        className={`${contact.color} group-hover:scale-110 transition-all duration-300`}
                        size={28}
                      />
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${contact.bgGradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-bold text-lg tracking-wide group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                          {contact.title}
                        </h4>
                        <div
                          className={`w-2 h-2 rounded-full ${contact.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                      </div>
                      <p
                        className={`${contact.color} font-semibold text-base mb-1 group-hover:text-white transition-colors duration-300`}
                      >
                        {contact.content}
                      </p>
                      <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors duration-300">
                        {contact.subtitle}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <ExternalLink className={`${contact.color} w-5 h-5`} />
                    </div>
                  </div>

                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="pt-12">
                <div className="text-center mb-8">
                  <h4 className="text-white font-bold text-xl tracking-wide mb-2">CONNECT WITH ME</h4>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
                </div>

                <div className="flex justify-center space-x-6">
                  {[
                    {
                      icon: Linkedin,
                      href: "https://linkedin.com/in/yourusername",
                      color: "hover:text-blue-400",
                      bgColor: "hover:bg-blue-500/10",
                      borderColor: "hover:border-blue-400/50",
                      name: "LinkedIn",
                    },
                    {
                      icon: Github,
                      href: "https://github.com/yourusername",
                      color: "hover:text-gray-300",
                      bgColor: "hover:bg-gray-500/10",
                      borderColor: "hover:border-gray-400/50",
                      name: "GitHub",
                    },
                    {
                      icon: Instagram,
                      href: "https://instagram.com/yourusername",
                      color: "hover:text-pink-400",
                      bgColor: "hover:bg-pink-500/10",
                      borderColor: "hover:border-pink-400/50",
                      name: "Instagram",
                    },
                    {
                      icon: ExternalLink,
                      href: "https://yourwebsite.com",
                      color: "hover:text-cyan-400",
                      bgColor: "hover:bg-cyan-500/10",
                      borderColor: "hover:border-cyan-400/50",
                      name: "Portfolio",
                    },
                  ].map((social, index) => (
                    <div key={index} className="group relative">
                      <a
                        href={social.href}
                        className={`relative w-14 h-14 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl flex items-center justify-center text-gray-400 ${social.color} ${social.bgColor} ${social.borderColor} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg`}
                      >
                        <social.icon size={22} />

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>

                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-lg border border-gray-700 whitespace-nowrap">
                          {social.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 tracking-wide">© 2024 ALEX CHEN. CRAFTED WITH PRECISION.</p>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap');
        
        .font-display {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
        }

        .font-body {
          font-family: 'Oswald', sans-serif;
          font-weight: 400;
        }
        
        .matrix-particle {
          animation: matrix-fall linear infinite;
        }
        
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) scale(1);
            opacity: 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00d4ff, #0099cc);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #00e6ff, #00b3e6);
        }
      `}</style>
    </div>
  )
}
