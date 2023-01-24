import { test, expect } from '@playwright/test';

test.describe.only('new Purchase foreign cyrrency', () => {
  //before hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#signin_button');
    await page.type('#user_login', 'username');
    await page.type('#user_password', 'password');
    await page.click('text=Sign in');
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
  });

  test('Should send new payment in different currency', async ({ page }) => {
    await page.click('#pay_bills_tab');
    await page.click("a[href='#ui-tabs-3']");
    await page.selectOption('#pc_currency', 'China (yuan)');
    await page.waitForSelector('#sp_sell_rate');
    await page.type('#pc_amount', '5000');
    await page.pause();
    await page.click('#pc_inDollars_true');
    await page.click('#pc_calculate_costs');
    const message = await page.locator('#pc_conversion_amount');
    await expect(message).toContainText(
      '28785.26 yuan (CNY) = 5000.00 U.S. dollar (USD)'
    );
    await page.click('#purchase_cash');
    const messageSucc = await page.locator('#alert_content');
    await expect(messageSucc).toContainText(
      'Foreign currency cash was successfully purchased.'
    );
  });
});
