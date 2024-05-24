const { By } = require('selenium-webdriver');
class WomanPage{
    constructor(driver) {
        this.driver = driver;
      }
      async checkWoman() {
        console.log('Проверка заголовка страницы Женской одежды.');
        const title = await this.driver.findElement(By.xpath("//h1[@class='top-block__page-title']"));
        const header = await title.getText();
        return header;
      }
      
      async clickOuterWear() {
        console.log('Клик по Верхней одежде.');
        const wearLink = await this.driver.findElement(By.xpath("//a[@href='/catalog/jenshchinam/odejda/']"));
        const actions = this.driver.actions({ async: true });
        await actions.move({ origin: wearLink }).perform();
        await this.driver.findElement(By.xpath("//a[@href='/catalog/jenshchinam/verhnyaya-odezhda/']")).click();
      }
}
module.exports = WomanPage;