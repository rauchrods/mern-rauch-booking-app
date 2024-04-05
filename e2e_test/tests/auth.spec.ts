import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow user to log in", async ({ page }) => {
  await page.goto(`${UI_URL}`);

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.getByRole("link", { name: "Click here to Login" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("user18@email.com");

  await page.locator("[name=password]").fill("#user18");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("user logged in successfully")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();

  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to sign in", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 9000) + 1000
  }@email.com`;

  await page.goto(`${UI_URL}`);

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[id=fni]").fill("user1");
  await page.locator("[id=lni]").fill("erewrerer");
  await page.locator("[id=emaili]").fill(testEmail);
  await page.locator("[id=passwordi]").fill("#user1");
  await page.locator("[id=cnfpasswordi]").fill("#user1");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration successful")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();

  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
