import{test ,expect} from '@playwright/test';

test('playwright special locators',async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abcd1234");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name:'Shop'}).click();
    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole("button").click();
    await page.locator('[class="nav-link btn btn-primary"]').click();
});



test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('Test Installer');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('test1installer1@arthtechltd.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Pass@123');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByRole('radio', { name: 'Employed' }).check();
  await page.locator('input[name="bday"]').fill('1994-06-22');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('form-comp')).toContainText('× Success! The Form has been submitted successfully!.');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).pressSequentially('ind');
  await page.getByText('India').click();
  await page.getByText('I agree with the term &').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await expect(page.locator('app-checkout')).toContainText('Success! Thank you! Your order will be delivered in next few weeks');
});