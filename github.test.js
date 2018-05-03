const puppeteer = require("puppeteer");
const waitForNavigationAndContext = require("./wait-for-navigation-and-context.js");
const CREDS = require("./creds");

// dom element selectors
const USERNAME_SELECTOR = "#login_field";
const PASSWORD_SELECTOR = "#password";
const BUTTON_SELECTOR =
  "#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block";

const SEARCH_INPUT =
  "body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.d-flex.flex-justify-between.flex-auto > div:nth-child(1) > div > div > form > label > input.form-control.header-search-input.js-site-search-focus";

puppeteer
  .launch({
    headless: true
  })
  .then(async browser => {
    const page = await browser.newPage();
    await page.goto("https://github.com/login");
    //await page.waitFor(4000);
    //await page.waitForSelector("html");
    await waitForNavigationAndContext(page, 4000);
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation();

    //const userToSearch = "john";
    // const searchUrl = `https://github.com/search?utf8=%E2%9C%93&q=${userToSearch}&type=`;
    //await page.goto(searchUrl);
    //await page.waitFor(2 * 1000);

    // await page.click(SEARCH_INPUT);
    // await page.keyboard.type(userToSearch);

    // await page.click(SEARCH_INPUT);

    // await page.waitForNavigation();

    await page.screenshot({ path: "screenshots/screenshot.png" });

   await browser.close();
  })
  .catch(e => console.log(e));
