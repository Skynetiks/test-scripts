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
    await page1.getByRole('textbox', { name: 'Find a lead, contact list, or' }).click();
    await page1.getByPlaceholder('Type a command or search...').fill('');
    await page1.getByRole('button', { name: 'Close' }).click();
    const supportButton = page1.locator('a[href="/dashboard/support"]');
    await supportButton.waitFor({ state: 'visible' });  // Make sure it's there
    await supportButton.scrollIntoViewIfNeeded();       // Make sure it's visible
    await page.waitForTimeout(500);                     // Give any animation time to finish
    await supportButton.click({ force: true });         // Force the click
    await page1.getByRole('button', { name: 'Submit a ticket' }).click();
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByRole('button', { name: 'Toggle notifications' }).click();
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByRole('button').filter({ hasText: /^$/ }).click();
    await page1.getByRole('menuitem', { name: 'Dashboard' }).click();
    await page1.getByRole('button').filter({ hasText: /^$/ }).click();
    await page1.getByRole('menuitem', { name: 'Your Organization' }).click();
    await page1.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await page1.getByRole('menuitem', { name: 'Profile' }).click();
    await page1.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await page1.getByRole('menuitem', { name: 'Manage Subscription' }).click();
    await page1.getByRole('button').filter({ hasText: /^$/ }).click();
    const sunIcon = page1.locator('svg.lucide-sun');
    console.log(await sunIcon.count()); // should be 1
    await sunIcon.highlight();          // highlights it in trace
    await sunIcon.click();
    await page1.locator('.lucide.lucide-laptop').click();
    await page1.locator('.lucide.lucide-moon > path').click();
    await page1.locator('.lucide.lucide-laptop').click();
});