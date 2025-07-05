// PDF Conversion Script
// This script provides instructions for converting the markdown documentation to PDF

const conversionInstructions = `
# Converting Documentation to PDF

## Method 1: Using Pandoc (Recommended)

### Install Pandoc
- **Windows:** Download from https://pandoc.org/installing.html
- **Mac:** brew install pandoc
- **Linux:** sudo apt-get install pandoc

### Convert to PDF
\`\`\`bash
pandoc PORTFOLIO_DEVELOPMENT_DOCUMENTATION.md -o Portfolio_Development_Documentation.pdf --pdf-engine=wkhtmltopdf
\`\`\`

## Method 2: Online Converters

### Recommended Online Tools:
1. **Markdown to PDF:** https://md-to-pdf.fly.dev/
2. **Pandoc Try:** https://pandoc.org/try/
3. **Dillinger:** https://dillinger.io/

### Steps:
1. Copy the content from PORTFOLIO_DEVELOPMENT_DOCUMENTATION.md
2. Paste into the online converter
3. Download the generated PDF

## Method 3: VS Code Extension

### Install Extension:
- "Markdown PDF" by yzane

### Usage:
1. Open PORTFOLIO_DEVELOPMENT_DOCUMENTATION.md in VS Code
2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
3. Type "Markdown PDF: Export (pdf)"
4. Select the command and wait for generation

## Method 4: Browser Print

### Steps:
1. Open the markdown file in a markdown viewer
2. Use browser's print function (Ctrl+P)
3. Select "Save as PDF" as destination
4. Adjust margins and formatting as needed

## Styling Options

For better PDF formatting, you can add CSS styling:

\`\`\`css
<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2, h3 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

code {
  background-color: #f8f9fa;
  padding: 2px 4px;
  border-radius: 3px;
}

pre {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
\`\`\`
`

console.log(conversionInstructions)

export { conversionInstructions }
