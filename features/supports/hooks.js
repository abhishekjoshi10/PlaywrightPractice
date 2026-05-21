const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { Given, When, Then } = require('@cucumber/cucumber');
// FIX 1: Import chromium directly from the package instead of 'playwright'
const { chromium } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');





Before(async function (){

    
        const browser = await chromium.launch({ headless: false }); 
        const context = await browser.newContext();
        this.page = await context.newPage();
        this.browser = browser; 
        this.poManager = new POManager(this.page);
});

BeforeStep(function(){

});

AfterStep(async function({result}){

    if (result.status===Status.FAILED)
    {
        await this.page.screenshot({path:'screenshot11.png'});
    }
});


After(async function (){
   //  await this.browser.close();
})