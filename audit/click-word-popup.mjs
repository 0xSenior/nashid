import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function main() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating...');
  await page.goto('https://nushud.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Click Browse library
  await page.getByText('Browse library').click();
  await page.waitForTimeout(3000);

  // Click Shar3iatul Fakhri
  console.log('Clicking track Shar3iatul Fakhri...');
  await page.getByText('Shar3iatul Fakhri').first().click();
  await page.waitForTimeout(5000);

  // Now the lyrics screen is open
  console.log('Clicking on lyrics word at (700, 430)...');
  await page.mouse.click(700, 430);
  await page.waitForTimeout(3000);

  await page.screenshot({ path: path.join(shotsDir, '7-word-popup.png') });
  console.log('Saved 7-word-popup.png');

  // Let's also try clicking another word position
  console.log('Clicking at (780, 430)...');
  await page.mouse.click(780, 430);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(shotsDir, '8-word-popup-alt.png') });
  console.log('Saved 8-word-popup-alt.png');

  await browser.close();
  console.log('All done!');
}

main().catch(console.error);
