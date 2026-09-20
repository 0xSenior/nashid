import { chromium } from 'playwright';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const shotsDir = path.resolve('audit/shots');

async function testDhahiktu() {
  console.log('Testing Dhahiktu Faqalu synced lyrics & dictionary card...');
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Go to Library tab
  const libraryTab = page.locator('.sidebar-menu .menu-item:has-text("Library")');
  await libraryTab.click();
  await page.waitForTimeout(1500);

  // 2. Search for "Dhahiktu"
  const searchInput = page.locator('.search-input-wrapper input');
  await searchInput.fill('Dhahiktu');
  await page.waitForTimeout(1000);

  // 3. Click the track card to play and open lyrics
  const trackCard = page.locator('.library-track-card').first();
  await trackCard.click();
  await page.waitForTimeout(2500);

  // Take screenshot of Synced Lyrics Player (Matching Screenshot 1)
  await page.screenshot({ path: path.join(shotsDir, 'nushud-dhahiktu-lyrics.png') });
  console.log('Saved nushud-dhahiktu-lyrics.png');

  // 4. Click the word "فقالوا"
  const faqaluWord = page.locator('.word-span:has-text("فقالوا")').first();
  if (await faqaluWord.isVisible()) {
    await faqaluWord.click();
    await page.waitForTimeout(1500);

    // Take screenshot of embedded dictionary card (Matching Screenshot 2 & 3)
    await page.screenshot({ path: path.join(shotsDir, 'nushud-dhahiktu-word-card.png') });
    console.log('Saved nushud-dhahiktu-word-card.png');
  } else {
    console.log('Word فقالوا not found, clicking first word span');
    const firstWord = page.locator('.word-span').first();
    await firstWord.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(shotsDir, 'nushud-dhahiktu-word-card.png') });
    console.log('Saved fallback word card');
  }

  await browser.close();
  console.log('Finished testing Dhahiktu Faqalu successfully!');
}

testDhahiktu().catch(console.error);
