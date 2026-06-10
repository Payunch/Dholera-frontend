const puppeteer = require('puppeteer');

(async () => {
  console.log('\n🚀 Launching Automated Verification Agent...');
  
  try {
    const browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();

    // Pre-seed language cookie to bypass the Language Gate modal
    await page.setCookie({
      name: 'preferred_lang',
      value: 'en',
      url: 'http://localhost:3000'
    });

    // Pre-seed theme cookie to start the test in Light Mode
    await page.setCookie({
      name: 'user_theme',
      value: 'light',
      url: 'http://localhost:3000'
    });

    // Block third-party tracking scripts to avoid load delays
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      if (
        url.includes('googletagmanager.com') ||
        url.includes('googlesyndication.com') ||
        url.includes('google-analytics.com') ||
        url.includes('doubleclick.net')
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
    
    console.log('🌐 Navigating to http://localhost:3000...');
    
    // Use 'domcontentloaded' so it doesn't wait for every single image/font to download, 
    // which prevents the timeout error we saw earlier.
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    console.log('⏳ Waiting for React and Tailwind classes to hydrate...');
    await page.waitForSelector('button[title="Toggle Theme"]', { timeout: 15000 });
    
    const getThemeColors = async () => {
      return await page.evaluate(() => {
        const getBg = (selector) => {
          const el = document.querySelector(selector);
          return el ? window.getComputedStyle(el).backgroundColor : 'Element Not Found';
        };
        const getText = (selector) => {
          const el = document.querySelector(selector);
          return el ? window.getComputedStyle(el).color : 'Element Not Found';
        };
        
        // Find the marquee wrapper specifically
        let marqueeBg = 'Not Found';
        let marqueeClasses = 'Not Found';
        const marquee = document.querySelector('.animate-marquee');
        if (marquee && marquee.parentElement) {
           marqueeBg = window.getComputedStyle(marquee.parentElement).backgroundColor;
           marqueeClasses = marquee.parentElement.className;
        }

        return {
          cookies: document.cookie,
          htmlClass: document.documentElement.className,
          bodyBg: getBg('body'),
          bodyText: getText('body'),
          marqueeWrapperBg: marqueeBg,
          marqueeWrapperClasses: marqueeClasses
        };
      });
    };

    console.log('\n=========================================');
    console.log('       ☀️ LIGHT MODE VERIFICATION       ');
    console.log('=========================================');
    let lightColors = await getThemeColors();
    console.log('Cookies:            ', lightColors.cookies);
    console.log('HTML ClassName:     ', lightColors.htmlClass);
    console.log('Body Background:    ', lightColors.bodyBg, '(Should be rgb(255, 255, 255) / pure white)');
    console.log('Body Text Color:    ', lightColors.bodyText, '(Should be dark slate)');
    console.log('Logo Marquee BG:    ', lightColors.marqueeWrapperBg, '(Should be pure white)');

    console.log('\n🔄 Agent is clicking the Theme Toggle button...');
    await page.click('button[title="Toggle Theme"]');
    
    // Wait for the 300ms CSS transition to fully complete
    await new Promise(r => setTimeout(r, 1000));

    console.log('\n=========================================');
    console.log('       🌙 DARK MODE VERIFICATION        ');
    console.log('=========================================');
    let darkColors = await getThemeColors();
    console.log('Cookies:            ', darkColors.cookies);
    console.log('HTML ClassName:     ', darkColors.htmlClass);
    console.log('Body Background:    ', darkColors.bodyBg, '(Should be rgb(2, 6, 23) / deep slate)');
    console.log('Body Text Color:    ', darkColors.bodyText, '(Should be near white)');
    console.log('Logo Marquee BG:    ', darkColors.marqueeWrapperBg, '(Should be dark slate)');

    console.log('\n✅ Verification Complete! Closing agent...');
    await browser.close();

  } catch (error) {
    console.error('\n❌ Agent encountered an error:', error.message);
    console.log('Make sure your development server (npm run dev) is actively running on localhost:3000!');
    process.exit(1);
  }
})();
