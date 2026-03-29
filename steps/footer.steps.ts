import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { ForbesHomePage } from '../pages/ForbesHomePage';

const { Given, When, Then } = createBdd();

Given('I navigate to the Forbes homepage', async ({ page }) => {
  const forbesHomePage = new ForbesHomePage(page);
  await forbesHomePage.navigate();
});

Then('the {string} link should be visible in the footer', async ({ page }, linkName: string) => {
  const forbesHomePage = new ForbesHomePage(page);
  const targetLink = forbesHomePage.getFooterLink(linkName);
  
  await targetLink.scrollIntoViewIfNeeded();
  await expect(targetLink).toBeVisible({ timeout: 15000 });
});

When('I click the {string} logo in the footer', async ({ page }, logoName: string) => {
  const forbesHomePage = new ForbesHomePage(page);
  const logoLink = forbesHomePage.getFooterLogo(logoName);
  
  await logoLink.scrollIntoViewIfNeeded(); 
  // Native click to bypass Playwright's strict viewport checks for complex footers
  await logoLink.evaluate((el: HTMLElement) => el.click());
});

Then('I should be redirected to the Forbes homepage', async ({ page }) => {
  await expect(page).toHaveURL(/.*forbes\.com\/?/, { timeout: 15000 });
});

