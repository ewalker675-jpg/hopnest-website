const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.join(__dirname, 'What-to-Bring-Hopnest.pdf');
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new pdf.PDFParse({ data: dataBuffer });
parser.load().then(() => {
    return parser.getText();
}).then(res => {
    console.log("=== PDF CONTENT ===");
    console.log(res.text); // Let's log res.text or res
    console.log("===================");
    console.log("Structure of response:", Object.keys(res));
}).catch(err => {
    console.error(err);
});
