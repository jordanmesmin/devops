// frontend/test/authentication.test.js
const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:80');
    await driver.findElement(By.id('username')).sendKeys('testuser');
    await driver.findElement(By.id('password')).sendKeys('password');
    await driver.findElement(By.id('loginButton')).click();
    let token = await driver.wait(until.elementLocated(By.id('token')), 10000);
    console.log(await token.getText());
  } finally {
    await driver.quit();
  }
})();
