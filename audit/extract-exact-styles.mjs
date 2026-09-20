import { chromium } from 'playwright';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://nushud.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const styles = await page.evaluate(() => {
    function getDetails(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        width: cs.width,
        height: cs.height,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
        borderRadius: cs.borderRadius,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily,
        gap: cs.gap,
        border: `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}`,
        boxShadow: cs.boxShadow
      };
    }

    const all = Array.from(document.querySelectorAll('*'));
    
    // Find heading "Learn through listening"
    const heading = all.find(e => e.textContent === 'Learn through listening' && e.children.length === 0);
    // Find banner "NUSHUD Studio"
    const studioBanner = all.find(e => e.textContent && e.textContent.includes('NUSHUD Studio') && e.parentElement && e.parentElement.children.length > 1);
    // Find "Last played" card container
    const lastPlayedTag = all.find(e => e.textContent && e.textContent.includes('Last played'));
    // Find Browse library button
    const browseBtn = all.find(e => e.textContent === 'Browse library');
    // Find Vocabulary progress container
    const vocab = all.find(e => e.textContent && e.textContent.includes('Vocabulary progress'));
    // Find Home nav tab
    const homeNav = all.find(e => e.textContent === 'Home');
    // Find Sidebar
    const sidebar = document.querySelector('nav') || document.querySelector('aside') || (homeNav ? homeNav.closest('div[style*="width"]') : null);

    return {
      sidebar: getDetails(sidebar),
      homeNav: getDetails(homeNav?.parentElement),
      heading: getDetails(heading),
      lastPlayedCard: getDetails(lastPlayedTag?.closest('div[style*="border-radius"], div[style*="borderRadius"]')),
      browseBtn: getDetails(browseBtn?.closest('div[role="button"], button, div[tabindex]')),
      vocabContainer: getDetails(vocab?.closest('div[style*="border-radius"], div[style*="borderRadius"]')),
      rootBackground: window.getComputedStyle(document.body).backgroundColor
    };
  });

  console.log('EXACT STYLES:', JSON.stringify(styles, null, 2));
  await browser.close();
}

main().catch(console.error);
