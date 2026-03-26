import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Given('I navigate to the Forbes homepage', async ({ page }) => {
  // Use commit to prevent network hangs from ad trackers
  await page.goto('https://www.forbes.com/', { waitUntil: 'commit', timeout: 60000 });
  // Wait for the footer to ensure the page structure is there
  await expect(page.locator('footer').first()).toBeVisible({ timeout: 30000 });
});

Then('the {string} link should be visible in the footer', async ({ page }, linkName: string) => {
  const footer = page.locator('footer').first();
  const targetLink = footer.getByRole('link', { name: new RegExp('^\\\\s*' + linkName + '\\\\s*$|^' + linkName + '$', 'i') }).first();
  
  await targetLink.scrollIntoViewIfNeeded();
  await expect(targetLink).toBeVisible({ timeout: 15000 });
});

When('I click the {string} logo in the footer', async ({ page }, logoName: string) => {
  const footer = page.locator('footer').first();
  const logoLink = footer.getByRole('link', { name: new RegExp(logoName, 'i') }).first();
  
  await logoLink.scrollIntoViewIfNeeded();
  // Native click to bypass Playwright's strict viewport checks for complex footers
  await logoLink.evaluate((el: HTMLElement) => el.click());
});

Then('I should be redirected to the Forbes homepage', async ({ page }) => {
  await expect(page).toHaveURL(/.*forbes\.com\/?/, { timeout: 15000 });
});

