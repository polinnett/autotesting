const { By } = require('selenium-webdriver');
const URL = 'https://tvoe.ru/'
class MainPage{
    constructor(driver) {
      this.driver = driver;
    }
    async open() {
        console.log('Открытие сайта.');
      await this.driver.get(URL);
      await this.driver.manage().window().maximize();
    }
    async closeModal(){
      console.log('Закрытие модального окна, если появилось.');
      if (await this.driver.findElement(By.className('popup__content'))){
        await this.driver.findElement(By.className('city-detection__button')).click();
        await this.driver.sleep(1000);
      }
    }
    async clickWomans(){
        console.log('Клик на Женщинам');
        await this.driver.findElement(By.xpath("//a[@href='/catalog/jenshchinam/']")).click();
    }
}
module.exports = MainPage;