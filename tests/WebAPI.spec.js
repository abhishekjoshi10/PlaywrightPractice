const {test,expect,request} = require('@playwright/test');


const LoginPayLoad ={userEmail: "test1installer1@arthtechltd.com", userPassword: "Pass@123"};
const OrderPayLoad={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const{APIutils}=require('./utils/APIutils');

let response;
let Token;
let OrderId;
test.beforeAll(async ()=>
{

    const ApiContext= await request.newContext();
    const apiutils= new APIutils(ApiContext,LoginPayLoad);
    response = await apiutils.createOrder(OrderPayLoad);
   

        //
     
});




test('Place the Order', async ({ page }) => {


   page.addInitScript(value =>
   {

    window.localStorage.setItem('token', value);

   },response.Token);


   // const email = "";
   // const productName = 'ZARA COAT 3';
   await page.goto("https://rahulshettyacademy.com/client/");
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.OrderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.OrderId.includes(orderIdDetails)).toBeTruthy();
 
});