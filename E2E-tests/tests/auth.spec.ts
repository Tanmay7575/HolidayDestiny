import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/"

test('allow user to sign in', async ({ page }) => {
         await page.goto(UI_URL);

         //get the sign in button

         await page.getByRole("link",{name:"Sign In"}).click();

         await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();

         await page.locator("[name=email]").fill("fake@gmail.com");
         await page.locator("[name=password]").fill("12345678");

         await page.getByRole("button",{name:"Login"}).click();

          await expect(page.getByText("User SignIn Successfully")).toBeVisible();

          await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
          await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
          await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();

});

test('test to Register new user',async({page})=>{
  const testEmail=`test_registration${Math.floor(Math.random()*90000)+10000}@test.com`
  await page.goto(UI_URL);
    
  await page.getByRole("link",{name:"Sign In"}).click();
   
  await page.getByRole("link",{name:"Create an acount here"}).click();

  await expect(page.getByText("Create an Account")).toBeVisible();

  await page.locator("[name=firstName]").fill("lamesh");
  await page.locator("[name=lastName]").fill("sharma");
  await page.locator("[name=email]").fill(`${testEmail}`);
  await page.locator("[name=password]").fill("12345678");
  await page.locator("[name=confirmPassword]").fill("12345678");

  await page.getByRole("button",{name:"Submit"}).click();

  await expect(page.getByText('User Register Successfully')).toBeVisible();


})


const BASE_URL = "https://thegoldenbean-frontend.onrender.com";

test("E2E: User sign-up, order food, checkout and payment", async ({ page }) => {

  const testEmail = `test_Email${Math.floor(Math.random() * 9000) + 1000}@email.com`;
  const testPassword = `${Math.floor(Math.random() * 100000000) + 12345678}`;

  // STEP 1: Visit Home Page
  await test.step("Navigate to app", async () => {
    await page.goto(BASE_URL);
    await page.waitForLoadState();
  });

  // STEP 2: User Registration
  await test.step("Register a new user", async () => {
    await page.getByRole("button", { name: "Sign Up" }).click();
    await page.getByPlaceholder("Name").fill("Ravi Kumar Shastri");
    await page.getByPlaceholder("Email").fill(testEmail);
    await page.getByPlaceholder("Password").fill(testPassword);
    await page.check('input[type="checkbox"]');
    await page.getByRole("button", { name: "Create Account" }).click();
    await page.waitForSelector(".food-item");
  });

  // STEP 3: Add Food Items
  await test.step("Add food items to cart", async () => {
    const categories = ["Cakes", "Brownies", "Deserts", "Pastries"];

    for (const category of categories) {
      await page.click(`[data-testid="menu-item-${category}"]`);
      await page.locator('img[alt="Add"]').first().click();
      await page.waitForTimeout(1000);
    }

    await page.locator('img[alt="MyOrders"]').click();
    await page.getByRole("button", { name: "PROCEED TO CHECKOUT" }).waitFor();

  });

  // STEP 4: Proceed to Checkout
  await test.step("Enter shipping details", async () => {
    await page.getByRole("button", { name: "PROCEED TO CHECKOUT" }).click();

    await page.getByPlaceholder("First Name").fill("Ravi");
    await page.getByPlaceholder("Last Name").fill("Kumar Shastri");
    await page.getByPlaceholder("Email").fill("abc@gmail.com");
    await page.getByPlaceholder("Street").fill("Hadapsar");
    await page.getByPlaceholder("City").fill("Pune");
    await page.getByPlaceholder("State").fill("Maharashtra");
    await page.getByPlaceholder("Zip code").fill("412222");
    await page.getByPlaceholder("Country").fill("India");
    await page.getByPlaceholder("Phone").fill("9784774757");
  });

  // STEP 5: Enter Payment Details
  await test.step("Enter payment details and submit", async () => {
    await page.getByRole("button", { name: "PROCEED TO PAYMENT" }).click();

    await page.getByPlaceholder("email@example.com").fill("abx12@gmail.com");
    await page.getByPlaceholder("1234 1234 1234 1234").fill("4242 4242 4242 4242");
    await page.getByPlaceholder("MM / YY").fill("02 28");
    await page.getByPlaceholder("CVC").fill("175");
    await page.getByPlaceholder("Full name on card").fill("Ravi");

    await page.getByRole("button", { name: "Pay" }).click();
  });

});





