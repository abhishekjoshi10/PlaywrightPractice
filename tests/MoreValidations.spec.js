const {test,expect} = require('@playwright/test');
const { on } = require('node:cluster');

//test.describe.configure({mode:'parallel'});
test.describe.configure({mode:'serial'}); // here it will run sequencially but if one test case gets fail then other will be skipped.
test('PopUp validations', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#alertbtn").click();
    page.on("dialog",dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    const framepage=page.frameLocator("#courses-iframe");
    framepage.locator("li a[href*='lifetime']:visible").click();
    const textcheck= await framepage.locator('.text h2').textContent();
    console.log("subs =" +textcheck.split(" ")[1]);
    
    
})

test("Screenshot & Visual comparision", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();

});


test('visual', async ({page}) =>
{
    await page.goto("https://www.google.com/");
   // expect(await page.screenshot()).toMatchSnapshot('landing.png');

})