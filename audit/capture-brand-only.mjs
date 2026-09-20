import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function captureBrand() {
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const brandElem = page.locator('.sidebar-brand');
  await brandElem.screenshot({ path: path.join(shotsDir, 'brand-header-refined.png') });
  console.log('Saved brand-header-refined.png');

  await page.screenshot({ path: path.join(shotsDir, 'home-with-refined-brand.png') });
  console.log('Saved home-with-refined-brand.png');

  await browser.close();
}

captureBrand().catch(console.error);
