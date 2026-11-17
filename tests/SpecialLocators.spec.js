import {test,expect} from "@playwright/test";
test('PW Special Locators', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.locator('form input[name="name"]').fill("Anshikaa");
    await page.locator('form input[name="email"]').fill("anshikaa@example.com");
    await page.getByPlaceholder("Password").fill("IamQueen@000");
    await page.getByLabel ("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();
    await page.locator('input[name="bday"]').fill("1990-01-01");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    // 5 sec default wait for assertion to be visible, if not visible, test will fail. We can increase the wait time at step level,by adding timeout in the assertion, in case the page is taking longer to load.
    await expect (page.getByText("Success! The Form has been submitted successfully!.").toBeVisible({timeout:5000}));
    // setting test level timeout, this will apply to all the steps in the test, if any step takes longer than 10 sec, test will fail.
    const slowexpect = expect.configure({timeout:10000});
    await slowexpect(page.getByText("Success! The Form has been submitted successfully!.").toBeVisible());
    await page.getByRole("link",{name:'Shop'}).click();
    await page.locator("app-card").filter({hasText:"nokia Edge"}).getByRole("button").click();

}
);
