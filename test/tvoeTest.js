const { expect } = require('chai');
const { Builder, Browser, By } = require('selenium-webdriver');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const MainPage = require('./TvoeTests/MainPage');
const WomanPage = require('./TvoeTests/WomanPage');
const OuterWearPage = require('./TvoeTests/OuterWearPage');

describe('TVOE Test', () => {
    let driver;
    let mainPage;
    let womanPage;
    let outerwearPage;
    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        mainPage = new MainPage(driver);
        womanPage = new WomanPage(driver);
        outerwearPage = new OuterWearPage(driver);
    });
    after(async () => {
        await driver.quit();
    });
    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            const screenshot = await driver.takeScreenshot();
            const testCaseName = this.currentTest.title.replace(/\s+/g, '-').toLowerCase();
            const dateTime = new Date().toISOString().replace(/[-:.]/g, '');
            const fileName = `${testCaseName}-${dateTime}.png`;
            await writeFileAsync(fileName, screenshot, 'base64');
        }
    });
    it('Тесты стартовой страницы', async () => {
        await mainPage.open();
        await mainPage.closeModal();
        await mainPage.clickWomans();
    });
    it('Тесты для страницы Женской одежды', async () => {
        const header = await womanPage.checkWoman();
        expect(header).to.equal("ОДЕЖДА И ОБУВЬ ДЛЯ ЖЕНЩИН");
        await womanPage.clickOuterWear();
    });
    it('Тесты для страницы Верхней одежды', async () => {
        const header = await outerwearPage.checkOuterWear();
        expect(header).to.equal("ВЕРХНЯЯ ОДЕЖДА ДЛЯ ЖЕНЩИН");
        await outerwearPage.logFilters();
        await outerwearPage.logElements();
    });
})