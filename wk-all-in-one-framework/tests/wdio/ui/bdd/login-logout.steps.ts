import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the WDIO login page is opened', async () => {
  await browser.url('/');
});

When('the WDIO user logs in', async () => {
  await $('input[name="username"]').setValue(process.env.WK_APPLICATION_USERNAME ?? 'Admin');
  await $('input[name="password"]').setValue(process.env.WK_APPLICATION_PASSWORD ?? 'admin123');
  await $('button[type="submit"]').click();
});

Then('the WDIO dashboard is visible', async () => {
  await expect($('.oxd-userdropdown-tab')).toBeDisplayed();
});

When('the WDIO user logs out', async () => {
  await $('.oxd-userdropdown-tab').click();
  await $('a=Logout').click();
});

Then('the WDIO login page is visible', async () => {
  await expect($('input[name="username"]')).toBeDisplayed();
});
