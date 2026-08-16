describe('Sr Link WDIO UI TDD', () => {
  it('logs in and logs out', async () => {
    await browser.url('/');
    await $('input[name="username"]').setValue(process.env.SR_LINK_APPLICATION_USERNAME ?? 'Admin');
    await $('input[name="password"]').setValue(process.env.SR_LINK_APPLICATION_PASSWORD ?? 'admin123');
    await $('button[type="submit"]').click();
    await expect($('.oxd-userdropdown-tab')).toBeDisplayed();
    await $('.oxd-userdropdown-tab').click();
    await $('a=Logout').click();
    await expect($('input[name="username"]')).toBeDisplayed();
  });
});
