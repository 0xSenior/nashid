import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');
if (!fs.existsSync(shotsDir)) {
  fs.mkdirSync(shotsDir, { recursive: true });
}

async function run() {
  console.log('Starting full walkthrough using local Google Chrome...');
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'en-US',
  });
  const page = await context.newPage();

  console.log('1. Navigating to https://nushud.com ...');
  await page.goto('https://nushud.com', { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(3000);

  // Take full desktop home screenshot
  await page.screenshot({ path: path.join(shotsDir, '1-desktop-home.png'), fullPage: true });
  console.log('Captured 1-desktop-home.png');

  // 2. Click "Browse library" button or sidebar Library
  console.log('2. Opening Library...');
  const libraryNav = page.locator('text=Library').first();
  if (await libraryNav.isVisible()) {
    await libraryNav.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(shotsDir, '2-library-page.png'), fullPage: true });
    console.log('Captured 2-library-page.png');
  }

  // 3. Click the first track in Library to play it and open player
  console.log('3. Clicking first track to play...');
  const firstTrack = page.locator('div[role="button"]').first();
  await firstTrack.click();
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(shotsDir, '3-player-active.png') });
  console.log('Captured 3-player-active.png');

  // 4. Try clicking Lyrics button or track cover to expand lyrics
  console.log('4. Expanding lyrics...');
  const lyricsTarget = page.locator('text=Lyrics, text=lyrics, button[aria-label*="lyric" i]').first();
  if (await lyricsTarget.isVisible()) {
    await lyricsTarget.click();
    await page.waitForTimeout(3000);
  } else {
    // try clicking bottom player bar
    const bottomBar = page.locator('[data-testid="player-bar"], div:has-text("0:")').last();
    if (await bottomBar.isVisible()) {
      await bottomBar.click();
      await page.waitForTimeout(2000);
    }
  }
  await page.screenshot({ path: path.join(shotsDir, '4-lyrics-view.png') });
  console.log('Captured 4-lyrics-view.png');

  // 5. Open Playlists tab
  console.log('5. Navigating to Playlists...');
  const playlistsNav = page.locator('text=Playlists').first();
  if (await playlistsNav.isVisible()) {
    await playlistsNav.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(shotsDir, '5-playlists-page.png'), fullPage: true });
    console.log('Captured 5-playlists-page.png');
  }

  // 6. Open Cards tab
  console.log('6. Navigating to Cards...');
  const cardsNav = page.locator('text=Cards').first();
  if (await cardsNav.isVisible()) {
    await cardsNav.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(shotsDir, '6-cards-page.png'), fullPage: true });
    console.log('Captured 6-cards-page.png');
  }

  await browser.close();
  console.log('All Chrome walkthrough screenshots completed!');
}

run().catch(err => {
  console.error('Error during walkthrough:', err);
});
