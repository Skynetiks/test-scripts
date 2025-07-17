import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://skyfunnel.ai/');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Login' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('textbox', { name: 'Enter your mail address' }).fill('demo@skyfunnel.ai');
    await page1.getByRole('textbox', { name: 'Password' }).press('CapsLock');
    await page1.getByRole('textbox', { name: 'Password' }).fill('P');
    await page1.getByRole('textbox', { name: 'Password' }).press('CapsLock');
    await page1.getByRole('textbox', { name: 'Password' }).fill('Pass#123');
    await page1.getByRole('button', { name: 'Login', exact: true }).click();
    await page1.getByRole('link', { name: 'Lead hub' }).click();
    await page1.getByRole('link', { name: 'All Leads' }).click();
    await page1.locator('div').filter({ hasText: /^Name$/ }).locator('div').click();
    await page1.getByRole('textbox', { name: 'Filter' }).fill('suhani');
    await page1.locator('html').click();
    await page1.getByRole('button', { name: 'Open menu' }).click();
    await page1.getByRole('menuitem', { name: 'Delete' }).click();
});

