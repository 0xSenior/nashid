import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function main() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://nushud.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Click on "Browse library"
  await page.getByText('Browse library').click();
  await page.waitForTimeout(3000);

  // Click track "Ask The Lofty Spears"
  console.log('Clicking track...');
  const track = page.locator('text=Ask The Lofty Spears, text=Shar3iatul Fakhri').first();
  await track.click();
  await page.waitForTimeout(4000);

  // Let's click right in the middle of the active arabic lyric line
  console.log('Clicking coordinates on arabic lyrics text...');
  // The lyric line is around x=700, y=430
  await page.mouse.click(700, 430);
  await page.waitForTimeout(2000);

  await page.screenshot({ path: path.join(shotsDir, '7-word-dict-clicked.png') });
  console.log('Saved 7-word-dict-clicked.png');

  // Let's also check if any modal or popup appeared
  const modalText = await page.evaluate(() => {
    const dialogs = document.querySelectorAll('[role="dialog"], [data-testid="modal"], div[style*="z-index"]');
    return Array.from(dialogs).map(d => d.innerText).filter(Boolean);
  });
  console.log('Modal text detected:', modalText);

  await browser.close();
}

main().catch(console.error);
