const { test, expect } = require('@playwright/test');

test('practicing orangeHrm', async ({ page }) => {

    const userName = "Admin";
    const passsWord = "admin123";
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.waitForLoadState('networkidle');
    await page.getByPlaceholder("Username").fill(userName);
    await page.getByPlaceholder("Password").fill(passsWord);
    await page.getByRole("button").filter({ hasText: ' Login ' }).click();
    await expect(page).toHaveTitle('OrangeHRM');
    const pageTitle = await page.title();
    console.log(`The actual page title is: ${pageTitle}`);
    await page.locator("a[href*='viewAdminModule']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text').click();
    await page.getByRole('option').filter({ hasText: '-- Select --' }).click();
    await page.getByRole('button', { name: ' Search ' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('cell').locator('span.oxd-checkbox-input').nth(0).waitFor();
    const records = await page.getByRole('cell').locator('span.oxd-checkbox-input').all();
    console.log('records = ' + records);
    for (let i = 0; i < records.length; i += 2) {
        await records[i].click();
    }
    await page.getByRole('button', { name: ' Delete Selected ' }).click();
    await expect(page.locator('html').getByRole('document')).toContainText('Are you Sure?');
    await expect(page.locator('html').getByRole('document')).toContainText('The selected record will be permanently deleted. Are you sure you want to continue?');
    await page.getByRole('button', { name: 'Yes, Delete' }).click();
    await page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text').click();
    //await page.locator('div:nth-child(4) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
    await page.getByRole('option', { name: '-- Select --' }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.pause();


})