const {Builder, By, Key} = require('selenium-webdriver')
const assert = require('assert')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())


const user= {
    email : "packie2304@gmail.com",
    password: "Matias@2022"
}

function uploadCategoryTest(){
    describe('Testing function to upload category from admin panel - compares the string input given to the one created on a div tag', function (){
        this.timeout(35000)
        let randomString = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
        const categoryRandom = `Category Test ${randomString}`
        let webDriver = new Builder().forBrowser('chrome').build()
        webDriver.manage().window().maximize()

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

function editCategoryTest(){
    const addedTest = " fl"
    describe('Testing function to edit category from admin panel - compares the given input to the response received from database ', function (){
        this.timeout(35000)


        let webDriver = new Builder().forBrowser('chrome').build()
        webDriver.manage().window().maximize()
        it('editing category from admin - Name of edited category must match with name captured and edited by input on category component', async()=>{
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
            let currentCategory = await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/p`)).getText()
            await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[2]/img[2]`)).click()
            await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/input`)).click()
            await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/input`)).sendKeys(addedTest)
            await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/input`)).sendKeys(Key.ENTER)
            await webDriver.sleep(2000)
            let result = await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/p`)).getText()
            assert.strictEqual(result,`${currentCategory}${addedTest}`)

        })


    })
}

function deleteCategoryTest(){
    const addedTest = " fl"
    describe('Testing function to delete category from admin panel - first, it creates one, then delete, then check if there is a named category as the one created initially ', function (){
        this.timeout(35000)


        let webDriver = new Builder().forBrowser('chrome').build()
        webDriver.manage().window().maximize()
        it('delete category from admin - Name of deleted category must match with name captured and edited by input on category component', async()=>{
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
            let currentCategory = await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/p`)).getText()
            await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[2]/img[2]`)).click()
            await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/input`)).click()
            await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/input`)).sendKeys(addedTest)
            await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/input`)).sendKeys(Key.ENTER)
            await webDriver.sleep(2000)
            let result = await webDriver.findElement(By.xpath(`//*[@id='controlled-tab-example-tabpane-category']/div/div/div[1]/div[1]/div/div[1]/p`)).getText()
            assert.strictEqual(result,`${currentCategory}${addedTest}`)
           
        })


    })
}


// uploadCategoryTest()
// editCategoryTest()