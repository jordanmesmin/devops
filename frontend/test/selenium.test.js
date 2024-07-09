// frontend/tests/selenium.test.js
const { Builder, By, until } = require('selenium-webdriver');

let driver = new Builder().forBrowser('chrome').build();

async function runTest() {
  try {
    await driver.get('http://localhost:3001');
    console.log("Navigated to http://localhost:3001");

    // Imprimer le contenu HTML de la page pour vérifier son chargement
    const pageSource = await driver.getPageSource();
    console.log("Page source:", pageSource);

    // Attendre jusqu'à ce que l'élément soit localisé, avec un délai d'attente plus long
    const visitors = await driver.wait(until.elementLocated(By.id('visitors')), 20000); // 20 secondes
    console.log("Element located");

    // Log le texte de l'élément
    console.log(await visitors.getText());
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
}

runTest();
