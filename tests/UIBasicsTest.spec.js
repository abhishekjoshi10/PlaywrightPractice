const {test,expect}=require('@playwright/test');


test('First test', async({browser}) =>
{

    // steps 

    // checking for chrome browser
    const context=await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('Browser context test', async({browser}) =>
{

    // steps 

    // checking for chrome browser
    const context=await browser.newContext();
    const page = await context.newPage();

    const username= page.locator('#username');
    const password= page.locator('#password');
    const SignId=page.locator("[name='signin']");
    const cardTitles =page.locator(".card-body a");
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    await username.fill("test1installer1@arthtechltd.com");
    await password.fill("Pass@1234");
    await SignId.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password");

    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await SignId.click();

    console.log (await page.locator(".card-body a").first().textContent());
    console.log (await page.locator(".card-body a").nth(1).textContent());
    const allTiles =await cardTitles.allTextContents();
    console.log(allTiles);

});

test('page test', async({browser,page}) =>
{

    // steps 

    // checking for chrome browser
    // const context=await browser.newContext();
    // const page = await context.newPage();
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});


test('UI Controls', async({browser,page}) =>
{

    // Dropdown Radio buttons 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username= page.locator('#username');
    const password= page.locator('#password');
    const SignId=page.locator("[name='signin']");
    const Dropdown=page.locator("select.form-control");
    const DocumentLink = page.locator("[href*='documents']");

    //await page.locator("//*[text()=' User']/parent::label").click(); //xpath

    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    //await Dropdown.selectOption("consult");
    console.log(await page.locator(".radiotextsty").nth(1).isChecked()); 
    await expect (page.locator(".radiotextsty").nth(1)).toBeChecked();
    await page.locator("#terms").click();
    await expect (page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(DocumentLink).toHaveAttribute("class","blinkingText");
    page.pause();



    
});

test('Child windows handle', async({browser}) =>
{

    const context=await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const DocumentLink = page.locator("[href*='documents']");
    const [newpage] =await Promise.all(
    [context.waitForEvent('page'),  // waitForEvent is also used for switching window
    DocumentLink.click(),])
    await newpage.waitForLoadState('networkidle');
    const text = await newpage.locator(".red").first().textContent();
    console.log(text);
    const arrayText=text.split("@");
    const domain =arrayText[1].split(" ")[0]
    console.log(domain);

    const username= page.locator('#username');
    const password= page.locator('#password');
    const SignId=page.locator("[name='signin']");

    await page.bringToFront();

    await username.fill(domain);
    await page.pause();
    console.log("The input value = "+await username.inputValue());



});