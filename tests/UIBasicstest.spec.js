const {test, expect} = require('@playwright/test');


test('Browser concept PW test', async ({browser})=>
{
   
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const cardTitles = page.locator(".card-body a");
   await page.goto ("https://rahulshettyacademy.com/loginpagePractice/");
   console.log(await page.title());
   //css  fill
   await userName.fill("rahulshetty");
   await page.locator("[type='password']").fill("Learning@830$3mK2");
   // you can also use locator for submit button as '#signInBtn'
   await signIn.click();
   //webdriver wait in selenium is equal to below - we are trying to extract the content of this locator
   console.log(await page.locator("[style*='block']").textContent());
   // now lets check whether the content is matching the expectation
   await expect(page.locator("[style*='block']")).toContainText("Incorrect");
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   // below locator locator(".card-body a") gives 4 elements, so to pin point the correct element, we can use 2 below methods
   //this first() gives you the first elemnt, and you can last() for last element, you can use this for second, third, etc
   console.log (await cardTitles.first().textContent());
   //nth(0) is first, nth(1) second, so on
   console.log (await cardTitles.nth(1).textContent());
   // to grab titles of all text content
   const allTitles= await cardTitles.allTextContents();
   console.log(allTitles);

});

test('Page PW test', async ({page}) =>
{
 // making a change for Renu fixes branch  
   await page.got ("https://google.com");
   //get title and add assertion
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
   
});

test('UI Controls', async ({page}) =>
{
   await page.goto ("https://rahulshettyacademy.com/loginpagePractice/");
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const documentLink = page.locator("[href*=decuments-request']");
   const dropdown = page.locator("select.form-control");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("okayBtn").click();
// to double check if the assertion worked, we are checking whethere the checkbox is checked.
   console.log(page.locator(".radiotextsty").last()).isChecked();
//assertion
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").click();
   await expect (page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
//this assertion will check if the checkbox.ischecked is FALSE (checking if its unchecked)
   await expect (page.locator("#terms").isChecked).toBeFalsy();
// to check that the message is blinking text
   await expect(documentLink).toHaveAttribute("class","blinkingText");
// to pause and open the inspector
// await page.pause();


});  
   
test.only('Child window handling', async ({browser}) =>
{
   const context = await browser.newContext(); // in the browser, opening a new context window
   const page = await context.newPage(); //in that context window, we are creating/opening a newpage
   await page.goto ("https://rahulshettyacademy.com/loginpagePractise/"); //asking to go to this URL
   const documentLink = page.locator("[href*='documents-request']"); // look for this page locator
//asking PW to wait for the link to openup a new page
   const [newPage] = await Promise.all( 
      [
         context.waitForEvent('page'), //listen for new page event, and when it happens, assign it to newPage variable
         documentLink.click(),//
      ])

const text = await newPage.locator(".red").textContent();
console.log(text); 
const arraytext = text.split("@")
const domain = arraytext[1].split(" ")[0]
console.log(domain); 
await page.locator("#username").fill(domain);
await page.pause(); // to pause to see the output in the console, and to check if the domain is filled in the username field
console.log(await page.locator("#username").inputValue()); // this will not work, because the username field is an input field, and textContent will not work on input fields. We need to use inputValue() instead.

})
