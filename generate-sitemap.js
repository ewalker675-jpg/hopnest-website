const fs = require('fs');
const path = require('path');

const domain = 'https://www.hopnestretreats.co.uk';

// Define priorities for pages
const priorities = {
  '/': '1.0',
  '/bell-tents': '0.9',
  '/exclusive-campsite': '0.9',
  '/exclusive-hire-glamping': '0.9',
  '/exclusive-group-glamping': '0.9',
  '/the-tipi-retreat': '0.9',
  '/faq': '0.8',
  '/local-guide': '0.8',
  '/hen-party-glamping': '0.8',
  '/birthday-glamping': '0.8',
  '/stag-do-glamping': '0.8',
  '/large-group-glamping': '0.7',
  '/group-glamping-hot-tub': '0.7',
  '/shepherd-huts': '0.7',
  '/about': '0.7',
  '/blog/large-group-glamping-uk-guide': '0.7'
};

const pages = [
  '/',
  '/bell-tents',
  '/exclusive-campsite',
  '/exclusive-hire-glamping',
  '/exclusive-group-glamping',
  '/the-tipi-retreat',
  '/hen-party-glamping',
  '/birthday-glamping',
  '/stag-do-glamping',
  '/large-group-glamping',
  '/group-glamping-hot-tub',
  '/shepherd-huts',
  '/about',
  '/faq',
  '/local-guide',
  '/blog/large-group-glamping-uk-guide'
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

pages.forEach(page => {
  const priority = priorities[page] || '0.5';
  xml += '  <url>\n';
  xml += `    <loc>${domain}${page === '/' ? '' : page}</loc>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>\n';

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
console.log('sitemap.xml generated successfully!');
