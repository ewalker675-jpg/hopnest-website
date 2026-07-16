const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.join(__dirname, 'What-to-Bring-Hopnest.pdf');
const parser = new pdf.PDFParse({ data: fs.readFileSync(pdfPath) });

parser.load().then(async () => {
    console.log("PDF loaded, rendering page 1 to PNG...");
    const result = await parser.getScreenshot({
        imageBuffer: true,
        scale: 2.0 // Render at high quality
    });
    
    if (result.pages && result.pages.length > 0) {
        const page = result.pages[0];
        const outPath = path.join(__dirname, 'What-to-Bring-Hopnest.png');
        fs.writeFileSync(outPath, Buffer.from(page.data));
        console.log("Successfully saved PNG to:", outPath);
    } else {
        console.log("No pages returned from getScreenshot");
    }
}).catch(err => {
    console.error("Error during rendering:", err);
});
