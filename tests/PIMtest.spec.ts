
import{test} from '../base/BaseTest';
import dotenv from 'dotenv';
import { AssertUtils } from '../utils/assertUtils';
import { DataGenerator } from '../utils/DataGeneratorUtils';
import { Page } from 'playwright/test';


dotenv.config();

test.describe('PIM page test cases', () => {

  //  let PIMPage: Page;
    test('Go to PIM page and perform actions @smoke', async ({page,adminPage, commonPage,homePage,dashboardPage,PIMpage}) => {
        
        const user = DataGenerator.generateUser();
        console.log(user.userEmail);
        await homePage.loginIntoApplication(process.env.USER!, process.env.PASSWORD!);
        await dashboardPage.goToPIMPage();
        await PIMpage.clickOnEditButtonInTable("Amelia");
        await AssertUtils.pageContainsUrl(page,"viewPersonalDetails");
        await PIMpage.selectGender("Female");
        await PIMpage.selectNationality("Indian");
    }),

    test.only('Go to PIM page and add an employee @Regression', async ({page,adminPage, commonPage,homePage,dashboardPage,PIMpage}) => {
        
        const emp = DataGenerator.generateUser();
        const empFirstName = DataGenerator.generateUser().empFirstName;
        //console.log(user.userEmail);
        await homePage.loginIntoApplication(process.env.USER!, process.env.PASSWORD!);
        await dashboardPage.goToPIMPage();
        await PIMpage.addEmployee(empFirstName,emp.empMiddleName,emp.empLastName,emp.empId);
        await page.waitForTimeout(10000);
        await AssertUtils.pageContainsUrl(page,"viewPersonalDetails");
        await PIMpage.verifyEmpFirstName(empFirstName);

    })
    
})
