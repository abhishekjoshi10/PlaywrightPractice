const {test,expect}=require('@playwright/test');




test('Client App Login', async({page}) =>
{

    // steps 

    // checking for chrome browser
   const email = "test1installer1@arthtechltd.com";
   const products= page.locator('.card-body');
   const productName = 'ZARA COAT 3';
   const DropdownExpiryDate=page.locator("select.input.ddl");
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill("test1installer1@arthtechltd.com");
   await page.locator("#userPassword").fill("Pass@123");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle'); // This is used when all calls are madeup or done. it means it will wait for all locators to be loaded.
   await page.locator(".card-body b").first().waitFor(); // This will also wait for first element to be load.
   const Titles = await page.locator(".card-body b").allTextContents();
   console.log(Titles);
   const count =await products.count();

   for (let i=0; i<count;++i)
   {
     if(await products.nth(i).locator("b").textContent()===productName )
     {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
     }

   }

   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.getByText('Credit Card Number').locator('xpath=..//input').fill('1234 5678 9012 3456');
   console.log("Credit Card Number = "+await await page.getByText('Credit Card Number').locator('xpath=..//input').inputValue());
   await DropdownExpiryDate.nth(0).selectOption("03");
   await DropdownExpiryDate.nth(1).selectOption("31");
   await page.locator("[placeholder*='Country']").pressSequentially("Ind",{delay:100}); 
   const dropdown =await page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount=await dropdown.locator("button").count();

   for(let i=0;i<optionsCount;++i)
   {
      const text = await dropdown.locator("button").nth(i).textContent();

       if (text===" India")
       {
           await dropdown.locator("button").nth(i).click();
           break;
       }
   }

  expect( await page.locator("div.user__name label")).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const rawOrderId = await page.locator("tr label.ng-star-inserted").textContent();
  const orderId = rawOrderId.replace(/[|]/g, '').trim(); 

 console.log("Cleaned orderId = " + orderId);


  await page.locator("[routerlink*='myorders']").nth(1).click();
  //await page.pause();
  //const IdVerification =await page.locator("tr.ng-star-inserted th");  
 await page.locator("tr.ng-star-inserted th").first().waitFor({ state: 'visible' });
 const rows = page.locator("tr.ng-star-inserted th"); 

// 1. Get the actual count of elements
const counts = await rows.count(); 

for (let i = 0; i < counts; ++i) {
    // 2. Get the text and trim whitespace
    const text = (await rows.nth(i).textContent()).trim();

    if (text === orderId) {
        console.log("orderId matched!");
         const dynamicLocator = `(//*[contains(text(),'${orderId}')]//parent::tr/td/button)[1]`;
        await page.locator(dynamicLocator).click();
        break; 
    }

    const orderIdDetails = await page.locator(".col-text").nth(i).textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
}

});
