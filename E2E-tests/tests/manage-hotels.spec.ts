import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:7000/";
import path from "path";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("fake@gmail.com");
  await page.locator("[name=password]").fill("12345678");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User SignIn Successfully")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.getByRole("link", { name: "Add Hotel" }).click();

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test city");
  await page.locator('[name="country"]').fill("Test India");
  await page.locator('[name="description"]').fill("Test description");
  await page.locator('[name="pricePerNight"]').fill("10000");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").click();
  await page.getByLabel("Parking").click();

  await page.locator('[name="adultCount"]').fill("3");
  await page.locator('[name="childCount"]').fill("2");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "OIP.jpg"),
    path.join(__dirname, "files", "Vector-Hotel-PNG-Download-Image.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("display hotels", async ({ page }) => {
   
  await page.getByRole("link",{name:"My Hotels"}).click();

  await expect(page.getByText("Raj Hotel")).toBeVisible();

  await expect(page.getByText("Pune,Mumbai")).toBeVisible();
  await expect(page.getByText("budget")).toBeVisible();
  await expect(page.getByText("132 per night")).toBeVisible();
  await expect(page.getByText("3 adults, 2")).toBeVisible();
  await expect(page.getByText("1 Star Rating")).toBeVisible();
});
