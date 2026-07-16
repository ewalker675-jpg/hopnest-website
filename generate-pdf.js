const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const pdf = require('pdf-parse');

// 1. Get the base64 logo
const logoPath = path.join(__dirname, 'images', 'favicon.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');

// 2. HTML template with adjusted print styles
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>What to Bring Checklist</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 18mm 22mm 18mm; /* Bottom margin reserved for footer */
    }
    body {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #3E3028; /* --bark */
      margin: 0;
      padding: 0;
      font-size: 13.5px;
      line-height: 1.45;
      background-color: #FFFFFF;
    }
    .header {
      text-align: center;
      margin-bottom: 15px;
    }
    .logo-container {
      margin-bottom: 15px;
      margin-top: 5px;
    }
    .logo {
      width: 28px;
      height: 28px;
    }
    h1 {
      font-size: 26px;
      font-weight: 700;
      margin: 0 0 6px 0;
      color: #3E3028;
      letter-spacing: 1.5px;
    }
    .subtitle {
      font-size: 11px;
      font-weight: 600;
      color: #8C827A; /* brand gray */
      letter-spacing: 3px;
      margin-bottom: 15px;
      text-transform: uppercase;
    }
    .divider {
      border-bottom: 1px solid #D6CFC4; /* --mist */
      margin-bottom: 15px;
    }
    h2 {
      font-size: 16px;
      color: #6B7C5C; /* --sage */
      margin-top: 18px;
      margin-bottom: 8px;
      font-weight: 700;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }
    li {
      margin-bottom: 6px;
      padding-left: 15px;
      text-indent: -15px;
      color: #4C3F37; /* slightly lighter bark for body text */
    }
    li::before {
      content: "• ";
      color: #3E3028;
      font-weight: bold;
      padding-right: 5px;
    }
    .bold-keyword {
      font-weight: 700;
      color: #3E3028; /* --bark for labels */
    }
    .footer-container {
      position: fixed;
      bottom: -15mm; /* Positioned inside the page bottom margin */
      left: 0;
      right: 0;
      text-align: center;
      height: 15mm;
    }
    .footer-divider {
      border-top: 1px solid #D6CFC4; /* --mist */
      margin-bottom: 10px;
    }
    .footer-text {
      font-size: 11px;
      color: #8C827A;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
    }
    .page-number {
      font-size: 11px;
      color: #8C827A;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-container">
      <img class="logo" src="data:image/png;base64,${logoBase64}" alt="Hopnest Logo">
    </div>
    <h1>HOPNEST RETREATS</h1>
    <div class="subtitle">WHAT TO BRING CHECKLIST</div>
    <div class="divider"></div>
  </div>

  <h2>1. The Essentials</h2>
  <ul>
    <li><span class="bold-keyword">Towels:</span> Please bring your own towels for the showers. We provide bed linen, but towels are not included.</li>
    <li><span class="bold-keyword">Tea towels & Kitchen towels:</span> For washing up and wiping down surfaces in the kitchen.</li>
    <li><span class="bold-keyword">Slip-on shoes:</span> Crocs, sliders, or flip-flops are highly recommended for easily stepping in and out of the tents.</li>
    <li><span class="bold-keyword">Warm layers:</span> Even in summer, it can get chilly in the evenings under canvas. Pack plenty of cozy jumpers, warm socks, and warm pajamas.</li>
    <li><span class="bold-keyword">Extra toilet roll:</span> We provide toilet roll, but if you have a large group or are worried about running short, it is always handy to bring a few extra rolls.</li>
    <li><span class="bold-keyword">Toiletries:</span> Please bring your own shower gels, hair wash, etc. Please try to keep them environmentally friendly!</li>
  </ul>

  <h2>2. Around the Site & Fire Pit</h2>
  <ul>
    <li><span class="bold-keyword">Comfy deck chairs / folding chairs:</span> We provide dining tables and chairs, plus log seating around the fire pit. However, if you want to lounge or get right up close to the campfire, we recommend bringing a folding deck chair or camping chair.</li>
    <li><span class="bold-keyword">Picnic blanket:</span> Great for lying on the grass outside the tents during the day.</li>
    <li><span class="bold-keyword">Torches / headlamps:</span> Useful for walking around the site and paths after dark.</li>
    <li><span class="bold-keyword">Firelighters:</span> We provide campfire wood, but bringing your own firelighters will help you get the campfire going quickly.</li>
  </ul>

  <h2>3. Food & Drink</h2>
  <ul>
    <li><span class="bold-keyword">BBQ & cooking ingredients:</span> We provide some campfire wood, a gas hob, and a gas BBQ. Please bring your own food, cooking oils, and condiments.</li>
    <li><span class="bold-keyword">Extra ice / cool boxes:</span> We have a small fridge on-site, but if you are a large group bringing a lot of drinks and food, an extra cool box with ice packs is very handy.</li>
  </ul>

  <h2>4. Outdoor Protection</h2>
  <ul>
    <li><span class="bold-keyword">Insect repellent:</span> Essential for the summer evenings outdoors!</li>
    <li><span class="bold-keyword">Sunscreen & sunglasses:</span> To protect against sun glare.</li>
    <li><span class="bold-keyword">Sturdy walking shoes or wellies:</span> For walking the local footpaths.</li>
  </ul>

  <div class="footer-container">
    <div class="footer-divider"></div>
    <div class="footer-text">Hopnest Retreats &middot; Martley, Worcestershire &middot; hello@hopnestretreats.co.uk</div>
    <div class="page-number">-- 1 of 1 --</div>
  </div>
</body>
</html>`;

const htmlPath = path.join(__dirname, 'What-to-Bring-Hopnest.html');
fs.writeFileSync(htmlPath, htmlContent);
console.log("HTML file generated at:", htmlPath);

// 3. Convert HTML to PDF using MS Edge
const pdfPath = path.join(__dirname, 'What-to-Bring-Hopnest-v2.pdf');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const command = `"${edgePath}" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${htmlPath}"`;

try {
    execSync(command);
    console.log("PDF file successfully generated at:", pdfPath);
    
    // 4. Render the new PDF to PNG for visual inspection
    const parser = new pdf.PDFParse({ data: fs.readFileSync(pdfPath) });
    parser.load().then(async () => {
        const result = await parser.getScreenshot({
            imageBuffer: true,
            scale: 2.0
        });
        if (result.pages && result.pages.length > 0) {
            const page = result.pages[0];
            const outPngPath = path.join(__dirname, 'What-to-Bring-Hopnest-v2.png');
            fs.writeFileSync(outPngPath, Buffer.from(page.data));
            console.log("Successfully saved comparison PNG to:", outPngPath);
        }
    });
} catch (error) {
    console.error("Failed to generate PDF:", error);
}
