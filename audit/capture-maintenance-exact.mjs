import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function captureScreens() {
  console.log('Launching Chrome to verify exact home match and maintenance views...');
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Home View with exact margins, padding, Discord banner, and compact cards
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(shotsDir, 'exact-home-match.png') });
  console.log('Saved exact-home-match.png');

  // 2. Playlists Maintenance View
  const playlistsTab = page.locator('.sidebar-menu .menu-item:has-text("Playlists")');
  await playlistsTab.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(shotsDir, 'playlists-maintenance.png') });
  console.log('Saved playlists-maintenance.png');

  // 3. Studio Maintenance View
  const studioTab = page.locator('.sidebar-menu .menu-item:has-text("Studio")');
  await studioTab.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(shotsDir, 'studio-maintenance.png') });
  console.log('Saved studio-maintenance.png');

  await browser.close();
  console.log('All verification screens captured successfully.');
}

captureScreens().catch(console.error);
