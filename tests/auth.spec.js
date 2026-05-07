const { test, expect } = require('@playwright/test');

test.describe('Authentication', () => {
  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in invalid credentials
    await page.fill('input[name="itNumber"]', 'INVALID_ID');
    await page.fill('input[name="password"]', 'wrongpassword');
    
    // Click the SIGN IN button
    await page.click('button:has-text("SIGN IN")');
    
    // Expect an error message to appear
    const errorAlert = page.locator('.bg-rose-500\\/10');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText(/Invalid username or password/i);
  });

  test('should navigate to registration from login page', async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("Join Now")');
    await expect(page).toHaveURL(/\/register/);
  });
});
