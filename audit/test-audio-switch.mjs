import { chromium } from 'playwright';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testAudioSwitch() {
  console.log('Testing audio track switching...');
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Play first track
  const playHero = page.locator('.btn-play-hero');
  await playHero.click();
  await page.waitForTimeout(1500);

  const initialAudioState = await page.evaluate(() => {
    const audio = document.querySelector('audio');
    return {
      paused: audio ? audio.paused : true,
      src: audio ? audio.src : null,
      currentTime: audio ? audio.currentTime : 0
    };
  });
  console.log('Initial track playback state:', initialAudioState);

  // 2. Click another track in Recently Played row
  const secondCard = page.locator('.horizontal-card').nth(2);
  await secondCard.click();
  await page.waitForTimeout(1500);

  const switchedAudioState = await page.evaluate(() => {
    const audio = document.querySelector('audio');
    return {
      paused: audio ? audio.paused : true,
      src: audio ? audio.src : null,
      currentTime: audio ? audio.currentTime : 0
    };
  });
  console.log('Switched track playback state:', switchedAudioState);

  await browser.close();

  if (!switchedAudioState.paused && switchedAudioState.currentTime > 0 && switchedAudioState.src !== initialAudioState.src) {
    console.log('SUCCESS: Track switched and is actively playing with audio flowing!');
  } else {
    console.warn('Playback check result:', switchedAudioState);
  }
}

testAudioSwitch().catch(console.error);
