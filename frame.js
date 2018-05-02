const puppeteer = require("puppeteer");
const waitForNavigationAndContext = require("./wait-for-navigation-and-context.js");

puppeteer
  .launch({
    headless: true,
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  })
  .then(async browser => {
    const page = await browser.newPage();
    await page.goto("https://google.com/");
    //await page.waitFor(4000);
    //await page.waitForSelector("html");
    await waitForNavigationAndContext(page, 4000);
    await page.screenshot({ path: "screenshots/screenshot.png" });
    //const divsCounts = await page.$eval("div", divs => divs.length);
    //console.log("div counts", divsCounts);
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });
    console.log("Dimensions:", dimensions);

    await browser.close();
  })
  .catch(e => console.log(e));
