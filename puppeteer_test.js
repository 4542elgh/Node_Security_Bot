const puppeteer = require('puppeteer');
const url = 'https://nodejs.org/en/blog/';
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://nodejs.org/en/blog/');
  await page.screenshot({path: 'nodejs_blog_screenshot.png'});
 
  await browser.close();
})();