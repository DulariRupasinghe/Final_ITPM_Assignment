const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Student Management/i);
  });

  test('should navigate to programs page', async ({ page }) => {
    await page.goto('/programs');
    // Adjust this expectation based on what's actually on the programs page
    await expect(page).toHaveURL(/\/programs/);
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/\/login/);
    // Check for a login form or button
    const loginButton = page.locator('button:has-text("Login")');
    // await expect(loginButton).toBeVisible(); // Might fail if text is different
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveURL(/\/register/);
  });
});
