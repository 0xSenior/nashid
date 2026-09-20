import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function main() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to nushud...');
  await page.goto('https://nushud.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Click on "Browse library"
  console.log('Clicking "Browse library"...');
  await page.getByText('Browse library').click();
  await page.waitForTimeout(3000);

  // Click on the title "Shar3iatul Fakhri"
  console.log('Clicking "Shar3iatul Fakhri"...');
  const title = page.getByText('Shar3iatul Fakhri').first();
  await title.click();
  console.log('Clicked track! Waiting 5s...');
  await page.waitForTimeout(5000);

  await page.screenshot({ path: path.join(shotsDir, '4-track-playing.png') });
  console.log('Saved 4-track-playing.png');

  // Let's see all text on the screen to find lyrics or player elements
  const bodyText = await page.innerText('body');
  console.log('Snippet of current body text:', bodyText.slice(0, 300));

  // Try clicking on player bar if at bottom to expand lyrics
  const playerBar = page.locator('div:has-text("Shar3iatul Fakhri")').last();
  if (await playerBar.isVisible()) {
    console.log('Clicking player bar to expand...');
    await playerBar.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(shotsDir, '5-player-expanded.png') });
    console.log('Saved 5-player-expanded.png');
  }

  await browser.close();
  console.log('Done!');
}

main().catch(console.error);
