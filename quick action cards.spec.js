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
    await page1.getByRole('link', { name: 'Add Lead' }).click();
    await page1.goto('https://app.skyfunnel.ai/dashboard/home');
    await page1.getByRole('link', { name: 'Email Campaign' }).click();
    await page1.goto('https://app.skyfunnel.ai/dashboard/home');
    await page1.getByRole('link', { name: 'View Leads' }).click();
    await page1.goto('https://app.skyfunnel.ai/dashboard/home');
    await page1.getByRole('link', { name: 'Email Template' }).click();
    await page1.goto('https://app.skyfunnel.ai/dashboard/home');
    await page1.getByRole('link', { name: 'WhatsApp Settings' }).click();
    await page1.goto('https://app.skyfunnel.ai/dashboard/home');
    await page1.getByRole('link', { name: 'WhatsApp Template' }).click();
    await page1.goto('https://app.skyfunnel.ai/dashboard/home');
    await page1.getByRole('link', { name: 'WhatsApp Campaign' }).click();
    await page1.goto('https://app.skyfunnel.ai/dashboard/home');
    });