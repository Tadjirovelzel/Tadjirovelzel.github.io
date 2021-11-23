const puppeteer = require('puppeteer');
const fs = require('fs/promises')

async function start(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto("https://tudelft.toolsquare.io/login")

    await page.screenshot({path: "loginscreenshot.png", fullPage: true})

    //Write username
    await page.type("#email-field", "tadjirovelzel@gmail.com") //write username
    await page.type("#password-field", "DataScraper2021") // write password
    await page.screenshot({path: "username.png", fullPage: true}) //confirm written data with screenshot

    await Promise.all([await page.click("#login-button"), await page.waitForNavigation()]) //click button and wait to navigate
    await page.waitForTimeout(1000)
    await page.screenshot({path: "loggedin.png", fullPage: true})

    let laserStatus = await page.$eval("tr.el-table__row:nth-child(2) > td:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)", el => el.textContent)

    console.log(laserStatus);



    browser.close();
}

start();