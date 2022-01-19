const {Builder, By, Key} = require('selenium-webdriver')
const assert = require('assert')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())


const shoe = {
    name:"nike shoe",
    description: "test description",
    price: 200,
    lastPrice: 250,
    stock: 10,
    image: "https://static.dafiti.cl/p/16hrs-0839-8454111-1-catalog-new.jpg"
}

const user= {
    email : "packie2304@gmail.com",
    password: "Matias@2022"
}
const expectedErrorToast = "Image URL required"

function uploadCategoryTest(){
    describe('Testing function to upload category from admin panel - ', function (){
        this.timeout(35000)

        let randomString = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
        const categoryRandom = `Category Test ${randomString}`


        

        let webDriver = new Builder().forBrowser('chrome').build()
        webDriver.manage().window().maximize()

        // SELECT LIST NOT SUPPORTED TO JS
        // it('sending incorrect inputs to shoe from Upload Shoe form component - Must find error message prompted when clicking "send"', async()=>{
            // await webDriver.get('http://localhost:3000/signin')
            // await webDriver.sleep(500)
            // await webDriver.findElement(By.name('email')).sendKeys(user.email)
            // await webDriver.findElement(By.name('password')).sendKeys(user.password)
            // await webDriver.findElement(By.className('sign-button')).click()
            // await webDriver.sleep(3000)
            // await webDriver.get('http://localhost:3000/admin')
            // await webDriver.sleep(2000)
        //     await webDriver.findElement(By.css('#controlled-tab-example-tab-shoes')).click()
        //     await webDriver.sleep(200)
        //     await webDriver.findElement(By.css('.admin-shoe-side-navtab>div:nth-child(3)')).click()
        //     await webDriver.sleep(200)
        //     await webDriver.findElement(By.name('name')).sendKeys(shoe.name)
        //     // await webDriver.findElement(By.name('name')).sendKeys(Key.TAB)
        //     // await webDriver.findElement(By.className('admin-textarea-input')).sendKeys(Keys.TAB)
        //     // await webDriver.findElement(By.className('admin-textarea-input')).clear()
        //     // await webDriver.findElement(By.className('admin-textarea-input')).sendKeys(shoe.description)
        //     await webDriver.findElement(By.name('price')).sendKeys(shoe.price)
        //     await webDriver.findElement(By.name('lastPrice')).sendKeys(shoe.lastPrice)
        //     await webDriver.findElement(By.name('category')).click()
        //     await webDriver.sleep(1100)
        //     // await webDriver.findElement(By.className('admin-select-category')).click()
        //     await webDriver.findElement(By.css('.admin-select-category>option:nth-child(1)')).click()
        //     await webDriver.findElement(By.css('.admin-select-subcategory>option:nth-child(1)')).click()
        //     await webDriver.findElement(By.css('.admin-select-gender>option:nth-child(1)')).click()
        //     await webDriver.findElement(By.css('.admin-select-season>option:nth-child(1)')).click()
        //     await webDriver.findElement(By.css('.admin-select-color>option:nth-child(1)')).click()
        //     await webDriver.findElement(By.css('.admin-select-size>option:nth-child(1)')).click()
        //     await webDriver.findElement(By.className('admin-radioinput-yes')).click()
        //     await webDriver.findElement(By.name('stock')).sendKeys(shoe.stock)
        //     await webDriver.findElement(By.className('sign-button')).click()
        //     await webDriver.sleep(500)
        //     const errorToast = await webDriver.findElement(By.className('rrt-middle-container')).getText()
        //     assert.strictEqual(errorToast,expectedErrorToast)
        //     webDriver.quit()

        // })

        it('uploading category from admin - Name of created category must match with name captured and uploaded by input on category component', async()=>{
            await webDriver.get('http://localhost:3000/signin')
            await webDriver.sleep(500)
            await webDriver.findElement(By.name('email')).sendKeys(user.email)
            await webDriver.findElement(By.name('password')).sendKeys(user.password)
            await webDriver.findElement(By.className('sign-button')).click()
            await webDriver.sleep(3000)
            await webDriver.get('http://localhost:3000/admin')
            await webDriver.sleep(1000)
            await webDriver.findElement(By.css('#controlled-tab-example-tab-category')).click()
            await webDriver.sleep(1000)
            await webDriver.findElement(By.className('text-input w-100 mt-2')).click()
            await webDriver.sleep(1000)
            await webDriver.findElement(By.className('text-input w-100 mt-2')).sendKeys(categoryRandom)
            await webDriver.sleep(1000)
            await webDriver.findElement(By.className('text-input w-100 mt-2')).clear()
            await webDriver.sleep(1000)
            await webDriver.findElement(By.className('admin-category-upload-button')).click()
            await webDriver.sleep(1000)
            let result = await webDriver.findElement(By.xpath(`//div[@class='mt-4 admin-category-tab-container container']/div[last()]`)).getText()
            assert.strictEqual(result,categoryRandom)

        })


    })
}
uploadCategoryTest()