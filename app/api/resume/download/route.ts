import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create comprehensive resume content based on Lakshay's CV
    const resumeContent = `
LAKSHAY JAIN
Computer Science Student | Entrepreneur | Designer | Photographer

CONTACT INFORMATION
Email: lakshayjain148@gmail.com
Phone: +91 8690140158
LinkedIn: https://www.linkedin.com/in/lakshay-jainn/
GitHub: https://github.com/helodreamcumtrue
Instagram: https://www.instagram.com/elemental_101/

ABOUT ME
Motivated second-year Computer Science student with a strong passion for technology and entrepreneurship. 
Skilled in design and photography with a keen interest in startup ecosystems and innovation. 
Seeking opportunities to apply technical knowledge and creative problem-solving skills in dynamic tech environments. 
Eager to contribute to projects that blend technology with impactful solutions.

EDUCATION
Thapar Institute of Engineering and Technology (2024-2028)
Bachelor of Engineering in Computer Science & Engineering

Green Valley School
High School Diploma - Class 12

EXPERIENCE

Founder | Dreamy Crafts
• Founded and operated a greeting card business, designing and creating custom greeting cards for various occasions
• Developed and managed an e-commerce website for direct-to-consumer sales
• Established distribution partnerships with local retailers and shopkeepers to expand market reach
• Handle end-to-end business operations, including product design, manufacturing, marketing, and customer relations
• Website: https://sites.google.com/view/dreamycrafts56

Aarohan - Enactus Thapar | Product Researcher
• Conducted comprehensive market research for PET bottle to 3D filament conversion technology
• Analyzed material properties and performance characteristics of various plastic polymers for optimal filament production
• Compared mechanical strength, flexibility, and printing quality of different material compositions
• Researched target market segments and competitive landscape in sustainable 3D printing industry

ACM Society | Team Member
• Contributed to the design and execution of society events including Ideathon & Eclipse (Flagship Event)
• Handled creative design tasks for posters and event branding
• Developed media strategies to promote club events and increase campus visibility

TED X TIET | Core Team Member
• Contributed to the design and execution of society events
• Handled creative design tasks for posters and event branding
• Assisted as a volunteer in logistics and participant coordination

FAPS Society | Photographer
• Created visual content for club's social media and promotional campaigns
• Assisted in organizing photography walks and skill-building workshops

Enactus Thapar | Member
• Created multimedia content packages for distribution to various media channels
• Facilitated business case study competitions and entrepreneurial challenges
• Outreach for various companies for CSR Activities

TECHNICAL SKILLS
• Adobe Lightroom
• Adobe Photoshop
• Adobe Illustrator
• Figma
• Snapseed
• UI/UX Design

SOFT SKILLS
• Problem Solving
• Photography
• AI Prompting
• Event Management
• Leadership Skills
• Designing

ACHIEVEMENTS
• Successfully founded and operated Dreamy Crafts greeting card business
• Active member in multiple technical and entrepreneurial societies
• Contributed to sustainable technology research in 3D printing industry
• Experienced in event management and creative design

For more information and detailed portfolio, visit: https://lakshayjain.dev
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
