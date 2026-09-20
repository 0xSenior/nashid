import fs from 'fs';

async function main() {
  console.log('Downloading entry bundle...');
  const res = await fetch('https://nushud.com/_expo/static/js/web/entry-2c529ed32021ae5a4c278bdf2bfff4b6.js');
  const code = await res.text();
  console.log('Bundle size:', code.length, 'bytes');

  fs.writeFileSync('audit/bundle.js', code);

  // Search for API endpoints, URLs, Supabase, backend configurations
  const urlMatches = code.match(/https?:\/\/[a-zA-Z0-9_\-\.]+(:\d+)?\/[a-zA-Z0-9_\-\.\/]+/g) || [];
  const uniqueUrls = [...new Set(urlMatches)].filter(u => !u.includes('w3.org') && !u.includes('google'));
  
  // Search for routes
  const routeMatches = code.match(/"\/(tabs|nasheed|artist|playlist|search|lyrics|learn|profile|auth|settings)[^"]*"/g) || [];
  const uniqueRoutes = [...new Set(routeMatches)];

  // Search for colors (hex)
  const hexColors = code.match(/#[0-9a-fA-F]{6}\b/g) || [];
  const colorCounts = {};
  for (const c of hexColors) {
    colorCounts[c.toLowerCase()] = (colorCounts[c.toLowerCase()] || 0) + 1;
  }
  const topColors = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]).slice(0, 25);

  const report = {
    bundleSize: code.length,
    urls: uniqueUrls.slice(0, 30),
    routes: uniqueRoutes.slice(0, 30),
    topColors,
  };

  fs.writeFileSync('audit/bundle-analysis.json', JSON.stringify(report, null, 2));
  console.log('Analysis completed successfully!');
  console.log(JSON.stringify(report, null, 2));
}

main().catch(console.error);
