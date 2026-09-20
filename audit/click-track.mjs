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
  await page.screenshot({ path: path.join(shotsDir, '3-library-view.png') });
  console.log('Saved 3-library-view.png');

  // Now in library, click on the first track card or track title
  console.log('Clicking on track...');
  const track = page.locator('text=Shar3iatul Fakhri, text=Ayn Al Quroonul, text=Nabarat, div[tabindex="0"]').first();
  await track.click();
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(shotsDir, '4-playing-track.png') });
  console.log('Saved 4-playing-track.png');

  // Check if lyrics panel is open or can be clicked
  const lyricsElem = page.locator('text=Lyrics, text=words, [aria-label*="lyric" i]').first();
  if (await lyricsElem.isVisible()) {
    await lyricsElem.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(shotsDir, '5-synced-lyrics.png') });
    console.log('Saved 5-synced-lyrics.png');
  }

  await browser.close();
  console.log('Finished successfully!');
}

main().catch(console.error);
