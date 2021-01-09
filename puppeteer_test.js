const puppeteer = require('puppeteer');
const url = 'https://nodejs.org/en/blog/';
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(url)

    // Example: Taking a screenshot
    // await page.screenshot({path: 'nodejs_blog_screenshot.png'});

    // Example: Printing all html text within page
    // console.log(await response.text());

    // Example: Getting element using XPath (not full Xpath)
    const example = await page.evaluate(element => {
        return element.textContent;
      }, (await page.$x('//*[@id="main"]/div/ul/li[1]/a'))[0]);
    console.log(example);



    await browser.close();
}) ();