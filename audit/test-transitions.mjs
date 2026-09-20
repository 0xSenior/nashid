import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function testTransitions() {
  console.log('Testing transitions in Chrome...');
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click on Library to test page transition animation
  const libraryTab = page.locator('.sidebar-menu .menu-item:has-text("Library")');
  await libraryTab.click();
  await page.waitForTimeout(150); // Mid-transition snapshot
  await page.screenshot({ path: path.join(shotsDir, 'transition-library-enter.png') });
  console.log('Saved transition-library-enter.png');

  await page.waitForTimeout(800);

  // Click on Playlists to test maintenance transition animation
  const playlistsTab = page.locator('.sidebar-menu .menu-item:has-text("Playlists")');
  await playlistsTab.click();
  await page.waitForTimeout(150); // Mid-transition snapshot
  await page.screenshot({ path: path.join(shotsDir, 'transition-playlists-enter.png') });
  console.log('Saved transition-playlists-enter.png');

  // Go back Home and click on a song to open lyrics modal
  const homeTab = page.locator('.sidebar-menu .menu-item:has-text("Home")');
  await homeTab.click();
  await page.waitForTimeout(600);

  // Open full lyrics
  const lyricsOpenTrigger = page.locator('.lyrics-open-indicator, .player-left, .btn-play-hero').first();
  await lyricsOpenTrigger.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(shotsDir, 'transition-lyrics-modal.png') });
  console.log('Saved transition-lyrics-modal.png');

  await browser.close();
  console.log('All transition tests completed successfully.');
}

testTransitions().catch(console.error);
