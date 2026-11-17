const {test, expect} = require('@playwright/test');
test.only('Pageconcept Client App', async ({page})=>
{
   
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("Anshikaa@gmail.com");
   await page.locator("#userPassword").fill("IamQueen@000");
   await page.locator("[value='Login']").click();
   // creating a locator for the products, since we have multiple products, we are using locator to get all the products
   const products = page.locator (".card-body");
   //ASSIGNING THE ACTUAL PRODUCT NAME YOU ARE AFTER TO ADD IN CART
   const productName = 'ZARA COAT 3';
   const emailid = "anshikaa@gmail.com";
   // since allTestcontents does NOT wait for the page to load, we need to add a waitForLoadState() to make sure the page is loaded before we try to get the text contents
   //await page.waitforLoadState('networkidle');
   // since waitforLoadstate is NOT working as expected and its dicourage to use by PW, we are using a locator to wait for the element to be visible before we try to get the text contents
   await page.locator(".card-body b").first().waitFor();
   const allTitles = await page.locator(".card-body b").allTextContents();
   console.log(allTitles);
   //ordering Zara Coat 4 
   // we are capturing the count of the products, since we have multiple products
   const count = await products.count();
   let productAdded = false;
   // we are using a for loop to iterate through the products and find the product we want to order
   for(let i = 0; i < count; ++i)
   {
      //serching the nth of product and wrt to that product the locator is looked for
      if ((await products.nth(i).locator("b").textContent())?.trim() === productName)
      {
         //add to cart
         await products.nth(i).getByRole("button", { name: "Add To Cart" }).click();
         productAdded = true;
         break;
      }
      
   }
  // assertion to check whether the product is added to the cart or not
   expect(productAdded, `${productName} should be available on the products page`).toBe(true);
  // clicking on the cart button to go to the cart page
   await page.locator("[routerlink='/dashboard/cart']").click();
   // assertion to check whether the product is available in the cart or not

   await expect(page.getByRole("heading", { name: productName })).toBeVisible();
// pause to see the output in the console, and to check if the product is added to the cart
// await page.pause();
// clicking on the checkout button to go to the checkout page
   await page.locator("text= Checkout").click();
   await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 100});
   await page.locator(".ta-results").waitFor();
   const dropDown = page.locator(".ta-results");
   const optionsCount = await dropDown.locator("button").count();
// optionsCount = await dropDown.locator("button").count();
for (let i=0;i<optionsCount; ++i)
{
   const text = await dropDown.locator("button").nth(i).textContent();
   if (text === " India")
   {
      await dropDown.locator("button").nth(i).click();
      break;
   }
}
//to check the email id entered on cart is same as the email id coming up as greyed out email id 
   await expect(page.locator(".user__name [type='text']").first()).toContainText(emailid);
// await expect(page.locator(".user__name")).toContainText(emailid);
//enter card and coupon details and place order
   await page.locator(".input txt text-validated").fill("4111 1111 1111 1111");
   // enter card name
   await page.locator(".title [type='text']").fill("Anshikaa");
   // enter exp date
   await page.locator(".input txt").first().fill("12");
   await page.locator(".input txt").nth(1).fill("29");
   await page.locator("[placeholder='CVV']").fill("123");
   await page.locator(".input ddl").fill("12");
   await page.locator("[placeholder='CVV']").fill("123");
   await page.locator(".input txt ng-pristine ng-valid ng-touched").fill("rahulshettyacademy");
   await page.locator("btn btn-primary mt-1").click();
   await expect(page.locator(".mt-1 ng-star-inserted")).toHaveText("* Coupon Applied");
   await page.locator(".action__submit").click();

//to confirm the order is placed and we see the confirmation message
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   console.log(orderId);

 
// go through all the listed order and find the orderid matching to above orderid and click on the view button to see the order details
await page.locator(".btn btn-custom").click(); 
//waiting for the order details page to load and display the orderid
await page.locator(".col-text -main").waitFor();
const orderRows = await page.locator("ng-star-inserted").count();
for (let i=0; i<orderRows; ++i)
{
const text = await page.locator("ng-star-inserted").nth(i).locator("th").textContent();
if (text === orderId)
{
   await page.locator(".btn btn-primary").click();
   break;
}
// assertion to check whether the orderid is matching to the orderid on the order details page  
   expect(await page.locator(".col-text -main").textContent()).toContain(orderId);
}
}
)