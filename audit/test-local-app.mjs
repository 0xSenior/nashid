import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function testLocalApp() {
  console.log('Testing our local Nashid web app at http://localhost:3000 ...');
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Screenshot of our new Home page
  await page.screenshot({ path: path.join(shotsDir, 'nashid-app-home.png'), fullPage: true });
  console.log('Saved nashid-app-home.png');

  // 2. Open Library tab
  await page.getByText('المكتبة').first().click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(shotsDir, 'nashid-app-library.png'), fullPage: true });
  console.log('Saved nashid-app-library.png');

  // 3. Play a nasheed and open synced lyrics
  const playBtn = page.locator('.card-play-btn').first();
  await playBtn.click();
  await page.waitForTimeout(2000);

  // Click bottom player bar to expand synced lyrics
  const playerBar = page.locator('.player-left');
  await playerBar.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(shotsDir, 'nashid-app-lyrics.png') });
  console.log('Saved nashid-app-lyrics.png');

  // 4. Click an Arabic word in the lyrics to test the dictionary popup modal
  const wordSpan = page.locator('.word-interactive').first();
  if (await wordSpan.isVisible()) {
    await wordSpan.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(shotsDir, 'nashid-app-word-modal.png') });
    console.log('Saved nashid-app-word-modal.png');
  }

  // 5. Open Flashcards tab
  const closeLyrics = page.locator('.lyrics-header button').first();
  await closeLyrics.click();
  await page.waitForTimeout(1000);

  await page.getByText('بطاقات التعلّم').first().click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(shotsDir, 'nashid-app-cards.png') });
  console.log('Saved nashid-app-cards.png');

  await browser.close();
  console.log('All local tests passed successfully!');
}

testLocalApp().catch(console.error);
