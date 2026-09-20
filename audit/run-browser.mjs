import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');
if (!fs.existsSync(shotsDir)) {
  fs.mkdirSync(shotsDir, { recursive: true });
}

async function run() {
  console.log('Launching local Google Chrome...');
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
  });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      locale: 'ar-SA',
    });
    const page = await context.newPage();

    // Listen to network requests
    const requests = [];
    page.on('request', req => {
      if (['fetch', 'xhr'].includes(req.resourceType())) {
        requests.push({ url: req.url(), method: req.method() });
      }
    });

    try {
      await page.goto('https://nushud.com', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000); // wait for splash screen to vanish

      const title = await page.title();
      console.log(`Page title [${vp.name}]:`, title);

      const shotPath = path.join(shotsDir, `${vp.name}-home.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      console.log(`Saved screenshot: ${shotPath}`);

      const html = await page.content();
      fs.writeFileSync(path.join(shotsDir, `${vp.name}-dom.html`), html);

      fs.writeFileSync(path.join(shotsDir, `${vp.name}-requests.json`), JSON.stringify(requests, null, 2));
    } catch (err) {
      console.error(`Error loading ${vp.name}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log('Browser audit completed successfully!');
}

run().catch(console.error);
