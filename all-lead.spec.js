const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
    const Loginemail = 'yashikap716@gmail.com';
    const password = 'Pass#123';
    const Firstname = 'shreya';                  // details can be changed here as required
    const Lastname = 'singh';
    const email = 'abc@gmail.com';
    const lead = 's';
    const filePath = 'C:\\Users\\tanis\\Desktop\\100_leads.csv';
    const expectedLeads = [
        { name: 'Maria Davis', phone_number: '4729142597', email: 'xallen@anderson.info' },
        { name: 'John Owens', phone_number: '363-867-8729', email: 'millssarah@wolf.com' },
        { name: 'Lauren Evans', phone_number: '977-589-3383x5384', email: 'woodnicholas@obrien.org' },
        { name: 'Leah Woods', phone_number: '458-069-6933', email: 'nvasquez@yahoo.com' },
    ];


    //Login
    await page.goto('https://skyfunnel-git-dev-skynetiks.vercel.app/login?callbackUrl=%2Fdashboard%2Fhome');
    await page.getByRole('textbox', { name: 'Enter your mail address' }).click();
    await page.getByRole('textbox', { name: 'Enter your mail address' }).fill(Loginemail);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.getByRole('link', { name: 'Lead hub' }).click();
    await page.getByRole('link', { name: 'All Leads' }).click();
    await page.mouse.move(50, 200);
    await page.waitForTimeout(200);
    await page.mouse.move(1000, 200);
    await page.waitForTimeout(500);

    //User cannot create a lead if email or phone number is missing
    await page.getByRole('link', { name: 'Add Lead' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill(Firstname);
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill(Lastname);
    await page.getByRole('button', { name: 'Add Lead' }).click();
    await page.waitForTimeout(3000);
    await page.locator('svg.lucide-chevron-left').click();

    //Add a new lead
    await page.getByRole('link', { name: 'Add Lead' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill(Firstname);
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill(Lastname);
    await page.getByRole('textbox', { name: 'Job Title' }).click();
    await page.getByRole('textbox', { name: 'Job Title' }).fill('manager');
    await page.getByRole('combobox').filter({ hasText: 'Select source' }).click();
    await page.getByLabel('Social Media').getByText('Social Media').click();
    await page.getByRole('textbox', { name: 'Email (Required if no phone)' }).click();
    await page.getByRole('textbox', { name: 'Email (Required if no phone)' }).fill(email);
    await page.getByRole('button', { name: 'Add Lead' }).click();

    //User cannot create a lead with duplicate email or phone
    await page.getByRole('link', { name: 'Add Lead' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Richard');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Burke');
    await page.getByRole('textbox', { name: 'Email (Required if no phone)' }).fill('alexis70@kent.com');
    await page.getByRole('button', { name: 'Add Lead' }).click();
    await page.waitForSelector('a:has-text("Edit Existing Lead")', { state: 'visible', timeout: 10000 });
    await page.click('a:has-text("Edit Existing Lead")');
    await page.waitForSelector('svg.lucide-chevron-left', { state: 'visible', timeout: 10000 });
    await page.locator('svg.lucide-chevron-left').first().click();
    await page.waitForSelector('svg.lucide-chevron-left', { state: 'visible', timeout: 10000 });
    await page.locator('svg.lucide-chevron-left').first().click();

    //Search lead by its name
    await expect(page.getByRole('row').nth(1)).toBeVisible();
    await page.locator('div').filter({ hasText: /^Name$/ }).locator('div').getByRole('img').click();
    await page.getByRole('textbox', { name: 'Filter' }).click();
    await page.getByRole('textbox', { name: 'Filter' }).fill(lead);
    await page.locator('html').click();

    //Import lead and validate      
    await page.getByRole('button', { name: 'Import Leads' }).click();
    const fileInput = await page.waitForSelector('input[type="file"]', { state: 'visible' });
    await fileInput.setInputFiles(filePath);
    await page.getByRole('combobox').nth(0).click();
    await page.getByRole('option', { name: 'Full Name' }).click();
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'Phone' }).click();
    await page.getByRole('combobox').nth(2).click();
    await page.getByRole('option', { name: 'Email' }).click();
    for (const lead of expectedLeads) {
        const nameVisible = await page.locator(`text="${lead.name}"`).isVisible();
        const emailVisible = await page.locator(`text="${lead.email}"`).isVisible();
        console.log(`Checking lead: ${lead.name} | name visible: ${nameVisible}, email visible: ${emailVisible}`);
        expect(nameVisible).toBe(true);
        expect(emailVisible).toBe(true);
    }
    await page.getByRole('button', { name: 'Import Leads' }).click();
    await page.locator('div').filter({ hasText: /^You can close this window nowClose$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^You can close this window/ }).waitFor();
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    await page.mouse.click(10, 10);
    await page.pause();

    //Filter leads and clear filter
    await page.getByRole('combobox').filter({ hasText: 'Select Status' }).click();
    await page.getByLabel('INTERESTED').getByText('INTERESTED').click();
    await page.getByRole('combobox').filter({ hasText: 'Select Assignee' }).click();
    await page.getByRole('option', { name: 'test id' }).click();
    await page.getByRole('button', { name: 'Filters', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Phone' }).click();
    await page.getByRole('button', { name: 'Apply Filters' }).click();
    await page.getByRole('button', { name: '(1) Selected' }).click();
    await page.getByRole('checkbox', { name: 'Email', exact: true }).click();
    await page.getByRole('button', { name: 'Apply Filters' }).click();
    await page.getByRole('combobox').filter({ hasText: 'records' }).click();
    await page.getByRole('option', { name: '50 records' }).click();
    await page.getByRole('button', { name: 'Columns' }).click();
    await page.getByRole('menuitemcheckbox', { name: 'location' }).click();
    await page.getByRole('button', { name: 'Columns' }).click();
    await page.getByRole('menuitemcheckbox', { name: 'location' }).click();
    await page.getByRole('button', { name: 'Clear Filters' }).click(); 
    
    //Edit existing lead information
    const firstLeadRow = page.getByRole('row').nth(1);
    await firstLeadRow.locator('a').first().click();
    await page.getByRole('button', { name: 'Set Status' }).click();
    await page.getByRole('combobox').click();
    await page.getByText('INTERESTED').click();
    await page.getByRole('button', { name: 'Assign New Status' }).click();
    await page.getByRole('main').locator('a').click();

    //Delete a lead
    const firstRow = await page.getByRole('row').nth(1);
    await firstRow.getByLabel('Select row').click();
    await page.locator('button.bg-destructive:has-text("Delete")').click();

    //Bulk delete multiple leads
    for (let i = 1; i <= 5; i++) {
        const row = await page.getByRole('row').nth(i);
        await row.getByLabel('Select row').click();
    }
    await page.locator('button.bg-destructive:has-text("Delete")').click();

});


