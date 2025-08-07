//Create a contact list
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
    const email = 'yashikap716@gmail.com';
    const password = 'Pass#123';
    const lead = 'h';                 // details can be changed here as required
    const contact = 'new';
    const contactListName = 'New Contact List';


    await page.goto('https://skyfunnel-git-dev-skynetiks.vercel.app/login?callbackUrl=%2Fdashboard%2Fhome');
    await page.getByRole('textbox', { name: 'Enter your mail address' }).click();
    await page.getByRole('textbox', { name: 'Enter your mail address' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.getByRole('link', { name: 'Lead hub' }).click();
    await page.getByRole('link', { name: 'Contact Lists' }).click();
    await page.mouse.move(50, 200);
    await page.waitForTimeout(200);
    await page.mouse.move(1000, 200);
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Add Contact List' }).click();
    await page.getByRole('heading', { name: 'Untitled Contact List' }).getByRole('button').click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill('ct List');
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(contactListName);
    await page.getByRole('button', { name: 'Save' }).click();

    //Add leads in contact list
    await page.getByRole('button', { name: 'Add Leads' }).click();
    const leadRows = await page.getByLabel('Select row').all();
    for (let i = 0; i < 10 && i < leadRows.length; i++) {
        await leadRows[i].click();
    }
    await page.getByRole('button', { name: 'Save' }).click();

    //Search lead by its name in contact list
    await expect(page.getByRole('row').nth(1)).toBeVisible();
    await page.waitForTimeout(500);
    await page.locator('div').filter({ hasText: /^Name$/ }).locator('div').getByRole('img').click();
    await page.getByRole('textbox', { name: 'Filter' }).click();
    await page.getByRole('textbox', { name: 'Filter' }).fill(lead);
    await page.locator('html').click();

    //Filter leads
    await page.getByRole('combobox').filter({ hasText: 'Select Status' }).click();
    await page.getByRole('option', { name: 'ACTIVE' }).click();
    await page.getByRole('combobox').filter({ hasText: 'ACTIVE' }).click();
    await page.getByRole('option', { name: 'LOST' }).click();
    await page.getByRole('combobox').filter({ hasText: 'Select Assignee' }).click();
    await page.getByRole('option', { name: 'test id' }).click();
    await page.getByRole('button', { name: 'Filters', exact: true }).click();
    await page.getByText('Valid email').click();
    await page.getByRole('button', { name: 'Apply Filters' }).click();
    await page.getByRole('button', { name: '(1) Selected' }).click();
    await page.getByRole('dialog').getByText('Email', { exact: true }).click();
    await page.getByRole('checkbox', { name: 'Valid email' }).click();
    await page.getByRole('button', { name: 'Apply Filters' }).click();
    await page.getByRole('button', { name: 'Clear Filters' }).click();

    //Remove a lead from contact list
    const firstRow = await page.getByRole('row').nth(1);
    await firstRow.getByLabel('Select row').click();
    await page.getByRole('button', { name: 'Remove' }).click();

    //Remove leads in bulk in a contact list
    for (let i = 1; i <= 5; i++) {
        const row = await page.getByRole('row').nth(i);
        await row.getByLabel('Select row').click();
    }
    await page.getByRole('button', { name: 'Remove' }).click();

    //Search contact list by its name
    await page.locator('div').filter({ hasText: /^Contact List$/ }).locator('a').click();
    await page.locator('div').filter({ hasText: /^Contact List$/ }).locator('div').click();
    await page.getByRole('textbox', { name: 'Filter' }).click();
    await page.getByRole('textbox', { name: 'Filter' }).fill(contact);

    //Delete contact list
    await page.mouse.click(1200, 100);
    await page.waitForTimeout(500);
    const filteredRow = page.getByRole('row').nth(1);
    await filteredRow.getByLabel('Select row').click();
    await page.getByRole('button', { name: 'Delete' }).click();
});

