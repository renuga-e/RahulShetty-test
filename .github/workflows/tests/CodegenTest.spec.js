import { test, expect } from '@playwright/test';

test('codegen', async ({ page }) => {
await page.goto('https://rahulshettyacademy.com/angularpractice/');

  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.getByText('Checkout ( 1 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByText('I agree with the term &').click();
  await page.getByRole('checkbox', { name: 'I agree with the term &' }).check();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
  await expect(page.locator('app-checkout')).toMatchAriaSnapshot(`
    - text: Please choose your delivery location. Then click on purchase button
    - textbox "Please choose your delivery location. Then click on purchase button"
    - checkbox "I agree with the term & Conditions " [checked]
    - text: I agree with the term & Conditions 
    - button "Purchase"
    `);
});