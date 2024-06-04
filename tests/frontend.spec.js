const { test, expect } = require('@playwright/test');

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should register a new user', async ({ page, browserName }) => {
  
    await page.click('button#toggle-button');
    await expect(page.locator('h2')).toHaveText('Register');
     console.log(browserName);
    const username = `newuser_${browserName}`;
    await page.fill('input#username', username);
    await page.fill('input#password', 'newpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('#message')).toHaveText('Registration successful!');
  });


  test('should redirect to home page after login', async ({ page, browserName }) => {
    const username = `newuser_${browserName}`;
    await page.fill('input#username', username);
    await page.fill('input#password', 'newpassword');
    await page.click('button[type="submit"]');

    await page.waitForURL('/home');
    await expect(page.url()).toBe(`${page.context()._options.baseURL}/home`);
    await expect(page.locator('h2')).toHaveText('Welcome to the Home Page');
  });

 
});
