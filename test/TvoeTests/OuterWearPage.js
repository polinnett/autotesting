const { By } = require('selenium-webdriver');
class OuterWearPage{
    constructor(driver) {
        this.driver = driver;
      }
      async checkOuterWear() {
        console.log('Проверка заголовка страницы Верхней одежды.');
        const title = await this.driver.findElement(By.xpath("//h1[@class='top-block__page-title']"));
        const header = await title.getText();
        return header;
      }
      async logFilters(){
        console.log('Вывод фильтров товара.');
        let filters = await this.driver.findElements(By.className('subcategories__scroller'));
        let title = await this.driver.findElements(By.xpath('//div[@class="subcategories__scroller"]/child::a'));
        for (let i = 0; i <= filters.length; i++) {
            console.log(`Фильтр ${i+1}: ${await title[i].getText()} `);
        }
      }
      async logElements(){
        console.log('Вывод первых 10 товаров.');
        let name = await this.driver.findElements(By.xpath('//span[@class="product__title-text"]'));
        for (let i = 0; i <= 10; i++) {
            console.log(`Верхняя одежда: ${await name[i].getText()} `);
        }
    }
}
module.exports = OuterWearPage;