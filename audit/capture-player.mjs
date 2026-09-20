import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function run() {
  console.log('Launching Chrome to test player and lyrics interaction...');
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'en-US',
  });
  const page = await context.newPage();

  await page.goto('https://nushud.com', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Click on the first recommended nasheed
  console.log('Clicking on first nasheed card...');
  const firstCard = page.locator('text=Nabarat Shiri Satt').first();
  if (await firstCard.isVisible()) {
    await firstCard.click();
    console.log('Clicked first card, waiting for player...');
    await page.waitForTimeout(4000);

    await page.screenshot({ path: path.join(shotsDir, 'desktop-playing.png') });
    console.log('Saved desktop-playing.png');

    // Look for lyrics button or full player
    const lyricsBtn = page.locator('text=Lyrics, text=lyrics, button:has-text("Lyrics")').first();
    if (await lyricsBtn.isVisible()) {
      await lyricsBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(shotsDir, 'desktop-lyrics.png') });
      console.log('Saved desktop-lyrics.png');
    }
  } else {
    // Try clicking any image or card in recommended section
    const anyCard = page.locator('div[role="button"]').first();
    await anyCard.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(shotsDir, 'desktop-clicked.png') });
  }

  await browser.close();
  console.log('Player capture finished.');
}

run().catch(console.error);
