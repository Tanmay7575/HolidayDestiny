import { test, expect } from '@playwright/test';

let UI_URL="https://holidaydestiny.onrender.com"


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

test("Login",async({page})=>{
      await page.goto(UI_URL);
    
      //get the sign in button
    
      await page.getByRole("link", { name: "Sign In" }).click();
    
      await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    
      await page.locator("[name=email]").fill("fake@gmail.com");
      await page.locator("[name=password]").fill("12345678");
    
      await page.getByRole("button", { name: "Login" }).click();
    
      await expect(page.getByText("User SignIn Successfully")).toBeVisible();
})