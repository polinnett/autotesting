const { expect } = require('chai');
const { Builder, Browser, By } = require('selenium-webdriver');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

class TodoPage {
  constructor(driver) {
    this.driver = driver;
  }
  async open() {
    await this.driver.get('https://lambdatest.github.io/sample-todo-app/');
  }
  async getHeader() {
    return await this.driver.findElement(By.xpath('//h2')).getText();
  }
  async getTodoRemainingText() {
    return await this.driver.findElement(By.xpath('//span[contains(text(), "remaining")]')).getText();
  }
  async clickTodo(index) {
    await this.driver.findElement(By.name(`li${index}`)).click();
  }
  async addTodo(text) {
    await this.driver.findElement(By.id('sampletodotext')).sendKeys(text);
    await this.driver.findElement(By.id('addbutton')).click();
    const fd = await this.driver.findElement(By.xpath('/html/body/div/div/div/ul/li[6]/span'));
    if (fd) {
      await this.driver.findElement(By.xpath('/html/body/div/div/div/ul/li[6]/span')).click();
    }
  }
}

describe('Todo App', () => {
  let driver;
  let page;
  before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    page = new TodoPage(driver);
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

  it('should display the correct header', async () => {
    await page.open();
    const header = await page.getHeader();
    expect(header).to.equal('LambdaTest Sample App');
  });

  it('should update the remaining todos', async () => {
    await page.open();
    let remainingText = await page.getTodoRemainingText();
    expect(remainingText).to.equal('5 of 5 remaining');
    for (let i = 1; i <= 5; i++) {
      await page.clickTodo(i);
      remainingText = await page.getTodoRemainingText();
      expect(remainingText).to.equal(`${5 - i} of 5 remaining`);
    }
    await page.addTodo('Хафизова Полина Дмитриевна');
    remainingText = await page.getTodoRemainingText();
    expect(remainingText).to.equal('1 of 6 remaining');
    await page.clickTodo(6);
    remainingText = await page.getTodoRemainingText();
    expect(remainingText).to.equal('0 of 6 remaining');
  });
});