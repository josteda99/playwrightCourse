import { test, expect } from '@playwright/test';

test.describe('Feedback form', () => {
  //before hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#feedback');
  });

  //reset feedback form
  test('reset feedback form', async ({ page }) => {
    await page.type('#name', 'name');
    await page.type('#email', 'email');
    await page.type('#subject', 'subject');
    await page.type('#comment', 'comment');
    await page.click("input[name='clear']");
    const nameInput = await page.locator('#name');
    const commentInput = await page.locator('#comment');
    await expect(nameInput).toBeEmpty();
    await expect(commentInput).toBeEmpty();
  });
  //submit feedback form

  test('Submit feedback form', async ({ page }) => {
    await page.type('#name', 'name');
    await page.type('#email', 'email');
    await page.type('#subject', 'subject');
    await page.type('#comment', 'comment');
    await page.click("input[type='submit']");
    await page.waitForSelector('#feedback-title');
  });
});
