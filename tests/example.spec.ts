import { test, expect } from '@playwright/test';
import { assertTitle, loadHomePage } from '../helpers';

test('Simple basic test', async ({ page }) => {
  await page.goto('https://www.example.com');
  const pageTitle = await page.locator('h1');
  await expect(pageTitle).toContainText('Example Domain');
});

test('clickin in elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html');
  await page.click('#signin_button');
  await page.click('text=Sign in');
  const errorMessage = await page.locator('.alert-error');
  await expect(errorMessage).toContainText('Login and/or password are wrong.');
});

test.skip('Selector', async ({ page }) => {
  //text
  await page.click('text=some text');
  //css selector
  await page.click('button=selector');
  await page.click('#id');
  await page.click('.class');
  //only visible selector
  await page.click('.submit-button:visible');
  //Combinations
  await page.click('#username . first');
  //xpath
  await page.click('//button');
});

test.describe.parallel('my first test suite', () => {
  test('working whit inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#signin_button');
    await page.type('#user_login', 'some username');
    await page.type('#user_password', 'some password');
    await page.click('text=Sign in');
    const errorMessage = await page.locator('.alert-error');
    await expect(errorMessage).toContainText(
      'Login and/or password are wrong.'
    );
  });

  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://example.com/');
    await expect(page).toHaveURL('https://example.com/');
    await expect(page).toHaveTitle('Example Domain');
    const element = await page.locator('h1');
    await expect(element).toBeVisible();
    await expect(element).toHaveText('Example Domain');
    await expect(element).toHaveCount(1);
    const noExistingElement = await page.locator('h5');
    await expect(noExistingElement).not.toBeVisible();
  });
});

test.describe('hooks', () => {
  test.beforeEach(async ({ page }) => {
    //1.load website
    await page.goto('https://example.com/');
  });

  test('Screenshot', async ({ page }) => {
    //2. take screeshot of fullpage
    await page.screenshot({ path: 'screenshow.png', fullPage: true });
  });

  test('Single element Screenshot', async ({ page }) => {
    const element = await page.$('h1');
    await element.screenshot({ path: 'singleElement.png' });
  });
});

test('custom helpers', async ({ page }) => {
  await loadHomePage(page);
  await assertTitle(page);
});
