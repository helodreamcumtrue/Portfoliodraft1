import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create a comprehensive PDF-like content structure
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Lakshay Jain - Resume</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #00d4ff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .name {
            font-size: 2.5em;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .title {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 15px;
        }
        .contact {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 0.9em;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 1.4em;
            font-weight: bold;
            color: #00d4ff;
            border-bottom: 2px solid #00d4ff;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .experience-item {
            margin-bottom: 20px;
            padding: 15px;
            border-left: 4px solid #00d4ff;
            background: #f8f9fa;
        }
        .job-title {
            font-weight: bold;
            font-size: 1.1em;
            color: #333;
        }
        .company {
            color: #666;
            font-style: italic;
        }
        .period {
            color: #00d4ff;
            font-weight: bold;
            font-size: 0.9em;
        }
        .description {
            margin-top: 10px;
            color: #555;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .skill-category {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #00d4ff;
        }
        .skill-category h4 {
            color: #333;
            margin-bottom: 10px;
        }
        .skill-list {
            list-style: none;
            padding: 0;
        }
        .skill-list li {
            padding: 3px 0;
            color: #666;
        }
        .skill-list li:before {
            content: "• ";
            color: #00d4ff;
            font-weight: bold;
        }
        .education {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #00d4ff;
        }
        @media print {
            body { margin: 0; padding: 15px; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">LAKSHAY JAIN</div>
        <div class="title">Computer Science Student | Entrepreneur | Designer | Photographer</div>
        <div class="contact">
            <span>📧 lakshayjain148@gmail.com</span>
            <span>📱 +91 8690140158</span>
            <span>🔗 linkedin.com/in/lakshay-jainn</span>
            <span>🐙 github.com/helodreamcumtrue</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">ABOUT ME</div>
        <p>Motivated second-year Computer Science student with a strong passion for technology and entrepreneurship. Skilled in design and photography with a keen interest in startup ecosystems and innovation. Seeking opportunities to apply technical knowledge and creative problem-solving skills in dynamic tech environments. Eager to contribute to projects that blend technology with impactful solutions.</p>
    </div>

    <div class="section">
        <div class="section-title">EDUCATION</div>
        <div class="education">
            <div class="job-title">Bachelor of Engineering in Computer Science & Engineering</div>
            <div class="company">Thapar Institute of Engineering and Technology</div>
            <div class="period">2024 - 2028</div>
            <br>
            <div class="job-title">High School Diploma - Class 12</div>
            <div class="company">Green Valley School</div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">EXPERIENCE</div>
        
        <div class="experience-item">
            <div class="job-title">Founder</div>
            <div class="company">Dreamy Crafts</div>
            <div class="period">Present</div>
            <div class="description">
                • Founded and operated a greeting card business, designing and creating custom greeting cards for various occasions<br>
                • Developed and managed an e-commerce website for direct-to-consumer sales<br>
                • Established distribution partnerships with local retailers and shopkeepers to expand market reach<br>
                • Handle end-to-end business operations, including product design, manufacturing, marketing, and customer relations<br>
                • Website: https://sites.google.com/view/dreamycrafts56
            </div>
        </div>

        <div class="experience-item">
            <div class="job-title">Product Researcher</div>
            <div class="company">Aarohan - Enactus Thapar</div>
            <div class="period">2024 - Present</div>
            <div class="description">
                • Conducted comprehensive market research for PET bottle to 3D filament conversion technology<br>
                • Analyzed material properties and performance characteristics of various plastic polymers for optimal filament production<br>
                • Compared mechanical strength, flexibility, and printing quality of different material compositions<br>
                • Researched target market segments and competitive landscape in sustainable 3D printing industry
            </div>
        </div>

        <div class="experience-item">
            <div class="job-title">Core Team Member</div>
            <div class="company">TED X TIET</div>
            <div class="period">2024 - Present</div>
            <div class="description">
                • Contributed to the design and execution of society events<br>
                • Handled creative design tasks for posters and event branding<br>
                • Assisted as a volunteer in logistics and participant coordination
            </div>
        </div>

        <div class="experience-item">
            <div class="job-title">Team Member</div>
            <div class="company">ACM Society</div>
            <div class="period">2024 - Present</div>
            <div class="description">
                • Contributed to the design and execution of Ideathon & Eclipse (Flagship Event)<br>
                • Handled creative design tasks for posters and event branding<br>
                • Developed media strategies to promote club events and increase campus visibility
            </div>
        </div>

        <div class="experience-item">
            <div class="job-title">Photographer</div>
            <div class="company">FAPS Society</div>
            <div class="period">2024 - Present</div>
            <div class="description">
                • Created visual content for club's social media and promotional campaigns<br>
                • Assisted in organizing photography walks and skill-building workshops
            </div>
        </div>

        <div class="experience-item">
            <div class="job-title">Member</div>
            <div class="company">Enactus Thapar</div>
            <div class="period">2024 - Present</div>
            <div class="description">
                • Created multimedia content packages for distribution to various media channels<br>
                • Facilitated business case study competitions and entrepreneurial challenges<br>
                • Outreach for various companies for CSR Activities
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">SKILLS</div>
        <div class="skills-grid">
            <div class="skill-category">
                <h4>Technical Skills</h4>
                <ul class="skill-list">
                    <li>Adobe Lightroom</li>
                    <li>Adobe Photoshop</li>
                    <li>Adobe Illustrator</li>
                    <li>Figma</li>
                    <li>Snapseed</li>
                    <li>UI/UX Design</li>
                </ul>
            </div>
            <div class="skill-category">
                <h4>Soft Skills</h4>
                <ul class="skill-list">
                    <li>Problem Solving</li>
                    <li>Photography</li>
                    <li>AI Prompting</li>
                    <li>Event Management</li>
                    <li>Leadership Skills</li>
                    <li>Designing</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">ACHIEVEMENTS</div>
        <ul class="skill-list">
            <li>Successfully founded and operated Dreamy Crafts greeting card business</li>
            <li>Active member in multiple technical and entrepreneurial societies</li>
            <li>Contributed to sustainable technology research in 3D printing industry</li>
            <li>Experienced in event management and creative design</li>
        </ul>
    </div>

    <div class="section">
        <div class="section-title">CONNECT</div>
        <p>
            <strong>LinkedIn:</strong> https://www.linkedin.com/in/lakshay-jainn/<br>
            <strong>GitHub:</strong> https://github.com/helodreamcumtrue<br>
            <strong>Instagram:</strong> https://www.instagram.com/elemental_101/<br>
            <strong>Portfolio:</strong> https://lakshayjain.dev<br>
            <strong>Business:</strong> https://sites.google.com/view/dreamycrafts56
        </p>
    </div>
</body>
</html>
    `

    // Convert HTML to PDF-like format (for demonstration, we'll use HTML with print styles)
    // In a real implementation, you might use libraries like puppeteer or jsPDF
    const buffer = Buffer.from(resumeHTML, "utf-8")

    // Track download analytics
    console.log("Resume downloaded at:", new Date().toISOString())

    // Return HTML file that can be printed as PDF
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": 'attachment; filename="Lakshay_Jain_Resume.html"',
        "Content-Length": buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Resume download error:", error)
    return NextResponse.json({ error: "Failed to download resume" }, { status: 500 })
  }
}
