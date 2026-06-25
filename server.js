const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Pretty URL routing: maps /bell-tents to bell-tents.html, /small-group-getaway to small-group-getaway.html, etc.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  // Prevent path traversal
  if (page.includes('.') || page.includes('/') || page.includes('\\')) {
    return next();
  }
  const filePath = path.join(__dirname, `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      next();
    }
  });
});

// Serve any other static files (like robots.txt, favicon, sitemap.xml) directly from root
app.use(express.static(__dirname));

// 404 Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html')); // Fallback to home
});

app.listen(PORT, () => {
  console.log(`Hopnest Retreats website serving locally on http://localhost:${PORT}`);
});
