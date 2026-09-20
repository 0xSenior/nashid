import { chromium } from 'playwright';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://nushud.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const dump = await page.evaluate(() => {
    function cleanStyles(el) {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        class: el.className,
        width: cs.width,
        height: cs.height,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
        borderRadius: cs.borderRadius,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        border: `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}`,
        display: cs.display,
        flexDirection: cs.flexDirection,
        alignItems: cs.alignItems,
        justifyContent: cs.justifyContent,
        gap: cs.gap,
        maxWidth: cs.maxWidth
      };
    }

    const mainContainer = document.querySelector('#root > div > div > div:nth-child(2)') || document.querySelector('#root');
    const cards = Array.from(document.querySelectorAll('img[src*="nasheed-covers"]')).map(img => {
      const card = img.closest('div[style*="border-radius"], div[style*="borderRadius"]') || img.parentElement;
      return cleanStyles(card);
    });

    const sidebarEl = document.querySelector('button')?.closest('div[style*="width: 2"], div[style*="width:2"], div[style*="width: 3"]');

    return {
      mainContainer: mainContainer ? cleanStyles(mainContainer) : null,
      sampleCard: cards[0],
      sidebar: sidebarEl ? cleanStyles(sidebarEl) : null
    };
  });

  console.log('DOM DUMP:', JSON.stringify(dump, null, 2));
  fs.writeFileSync('audit/exact-dom-dump.json', JSON.stringify(dump, null, 2));
  await browser.close();
}

main().catch(console.error);
