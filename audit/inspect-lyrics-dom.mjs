import { chromium } from 'playwright';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://nushud.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  await page.getByText('Browse library').click();
  await page.waitForTimeout(3000);

  await page.getByText('Shar3iatul Fakhri').first().click();
  await page.waitForTimeout(4000);

  // Dump lyrics container HTML
  const lyricsHtml = await page.evaluate(() => {
    // find elements containing arabic characters
    const all = Array.from(document.querySelectorAll('*'));
    const arabicElems = all.filter(el => /[\u0600-\u06FF]/.test(el.textContent || '') && el.children.length === 0);
    return arabicElems.slice(0, 15).map(el => ({
      tag: el.tagName,
      text: el.textContent,
      className: el.className,
      style: el.getAttribute('style'),
      onclick: Boolean(el.onclick),
      parentTag: el.parentElement ? el.parentElement.tagName : null,
      parentClass: el.parentElement ? el.parentElement.className : null
    }));
  });

  console.log('Arabic elements:', JSON.stringify(lyricsHtml, null, 2));

  // Try clicking the first text element that has arabic letters
  await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const el = all.find(e => /[\u0600-\u06FF]/.test(e.textContent || '') && e.children.length === 0);
    if (el) {
      el.click();
      el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });

  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'audit/shots/6-word-click-result.png' });
  console.log('Saved 6-word-click-result.png');

  await browser.close();
}

main().catch(console.error);
