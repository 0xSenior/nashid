import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function captureFidelity() {
  console.log('Launching Chrome to capture high-fidelity screens...');
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Home Page (Dark theme)
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(shotsDir, 'fidelity-home-dark.png') });
  console.log('Saved fidelity-home-dark.png');

  // 2. Toggle to Light theme
  const themeToggle = page.locator('.sidebar-footer .menu-item').first();
  await themeToggle.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(shotsDir, 'fidelity-home-light.png') });
  console.log('Saved fidelity-home-light.png');

  // Toggle back to Dark theme
  await themeToggle.click();
  await page.waitForTimeout(500);

  // 3. Library Page (Dark theme)
  const libraryTab = page.locator('.sidebar-menu .menu-item:has-text("Library")');
  await libraryTab.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(shotsDir, 'fidelity-library-dark.png') });
  console.log('Saved fidelity-library-dark.png');

  // 4. Account Page
  const accountTab = page.locator('.sidebar-footer .menu-item:has-text("Account")');
  await accountTab.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(shotsDir, 'fidelity-account.png') });
  console.log('Saved fidelity-account.png');

  await browser.close();
  console.log('Done capturing fidelity screens.');
}

captureFidelity().catch(console.error);
