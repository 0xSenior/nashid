import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function captureLyrics() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Click on the hero play button or bottom player track cover to open lyrics modal
  const heroPlay = page.locator('.btn-play-hero').first();
  await heroPlay.click();
  await page.waitForTimeout(1000);

  // Click player-left to open synced lyrics modal
  const playerLeft = page.locator('.player-left');
  await playerLeft.click();
  await page.waitForTimeout(2500);

  await page.screenshot({ path: path.join(shotsDir, 'fidelity-lyrics.png') });
  console.log('Saved fidelity-lyrics.png');

  // Click an interactive word to open dictionary modal
  const word = page.locator('.word-interactive').first();
  if (await word.isVisible()) {
    await word.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(shotsDir, 'fidelity-word-modal.png') });
    console.log('Saved fidelity-word-modal.png');
  }

  await browser.close();
}

captureLyrics().catch(console.error);
