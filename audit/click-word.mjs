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
  await page.getByText('Browse library').click();
  await page.waitForTimeout(3000);

  // Click on "Shar3iatul Fakhri"
  await page.getByText('Shar3iatul Fakhri').first().click();
  await page.waitForTimeout(4000);

  // Click on an Arabic word in the lyrics, e.g. "خُطُوَاتُ"
  console.log('Clicking Arabic word...');
  const word = page.locator('text=خُطُوَاتُ, text=الحَقِّ, text=الكَوْنِ').first();
  if (await word.isVisible()) {
    await word.click();
    console.log('Clicked word! Waiting for dictionary popup...');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(shotsDir, '6-word-popup.png') });
    console.log('Saved 6-word-popup.png');
  }

  await browser.close();
  console.log('Done!');
}

main().catch(console.error);
