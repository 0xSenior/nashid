import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function capture() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: path.join(shotsDir, 'nashid-all-129-home.png'), fullPage: true });
  console.log('Saved nashid-all-129-home.png');

  // Open Library tab
  await page.getByText('المكتبة').first().click();
  await page.waitForTimeout(2000);

  await page.screenshot({ path: path.join(shotsDir, 'nashid-all-129-library.png') });
  console.log('Saved nashid-all-129-library.png');

  await browser.close();
}

capture().catch(console.error);
