const fs = require('fs');
const s = fs.readFileSync('audit/bundle.js', 'utf8');

// Search for route paths in Expo Router context
const idx = s.indexOf('expo-router');
console.log('expo router present:', idx !== -1);

// Look for Tabs or Route definitions
const tabMatches = s.match(/"(index|search|library|favorites|profile|settings|player|lyrics|learn|vocabulary|explore)"/g) || [];
console.log('Tab keywords count:', tabMatches.length);

// Look for Bottom tab bar component or icons
const iconRegex = /(?:name|icon):\s*['"]([a-zA-Z0-9_\-]+)['"]/g;
const icons = new Set();
let m;
while ((m = iconRegex.exec(s)) !== null) {
  if (['home', 'search', 'music', 'book', 'user', 'heart', 'play', 'pause', 'list', 'settings'].includes(m[1].toLowerCase())) {
    icons.add(m[1]);
  }
}
console.log('Icons found:', Array.from(icons));

// Search for screens in Expo router app structure
const screens = new Set();
const screenRegex = /\/app\/([a-zA-Z0-9_\-\/]+)\.(tsx|jsx|js|ts)/g;
while ((m = screenRegex.exec(s)) !== null) {
  screens.add(m[1]);
}
console.log('App screens:', Array.from(screens));
