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
    await page1.getByRole('link', { name: 'Add Lead' }).click();
    await page1.getByRole('textbox', { name: 'First Name' }).fill('suhani');
    await page1.getByRole('textbox', { name: 'Last Name' }).fill('mishra');
    await page1.getByRole('textbox', { name: 'Email (Required if no phone)' }).fill('suhanimishra123@gmail.com');
    await page1.locator('button[type="submit"]', { hasText: 'Add Lead' }).click();
});