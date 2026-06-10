const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching headless browser...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
  
  // Wait explicitly for the page to be ready
  await page.waitForSelector('body', { timeout: 10000 });
  await page.waitForSelector('.group.bg-white', { timeout: 10000 }).catch(() => console.log('Card not found initially'));

  // Helper to get computed background color
  const getBgColor = async (selector) => {
    return await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return 'Element not found';
      return window.getComputedStyle(el).backgroundColor;
    }, selector);
  };

  console.log('\n--- INITIAL STATE (Expected: Light Mode) ---');
  let bodyBg = await getBgColor('body');
  let cardBg = await getBgColor('.group.bg-white'); // Target a featured project card
  
  console.log('Body Background:', bodyBg);
  console.log('Card Background:', cardBg);

  console.log('\n--- CLICKING THEME TOGGLE BUTTON ---');
  // Click the theme toggle button. It has title="Toggle Theme"
  await page.click('button[title="Toggle Theme"]');
  
  // Wait for transition (300ms transition time + buffer)
  await new Promise(r => setTimeout(r, 800));

  console.log('\n--- NEW STATE (Expected: Dark Mode) ---');
  bodyBg = await getBgColor('body');
  cardBg = await getBgColor('.group.bg-white'); 
  
  console.log('Body Background:', bodyBg);
  console.log('Card Background:', cardBg);
  
  // Also check the specific marquee wrapper the user mentioned
  let marqueeBg = await getBgColor('.animate-marquee');
  // Go up one level to the wrapper
  let marqueeWrapperBg = await page.evaluate(() => {
    const el = document.querySelector('.animate-marquee');
    if (!el || !el.parentElement) return 'Not found';
    return window.getComputedStyle(el.parentElement).backgroundColor;
  });
  console.log('Marquee Wrapper Background:', marqueeWrapperBg);

  await browser.close();
})();
