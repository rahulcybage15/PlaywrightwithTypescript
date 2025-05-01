//import { HomePage } from "../pages/HomePage";
//import {test,expect, Page} from "playwright/test";
import{test} from '../base/BaseTest';
import dotenv from 'dotenv';
import { AssertUtils } from '../utils/assertUtils';
import { DataGenerator } from '../utils/DataGeneratorUtils';


dotenv.config();

test.describe('Admin page', () => {

    test('Go to Admin Page and add an employee @smoke', async ({page,adminPage, commonPage,homePage,dashboardPage}) => {
        
        const user = DataGenerator.generateUser();
        console.log(user.userEmail);
        await homePage.loginIntoApplication(process.env.USER!, process.env.PASSWORD!);
        await dashboardPage.goToAdminPage();
        await AssertUtils.pageContainsUrl(page,"admin");
        await adminPage.addEmployee();
        await adminPage.enterEmployeeName('A');
        await adminPage.enterUsername(user.userName);
        await adminPage.enterPassword(user.userPassword);
        await adminPage.enterConfirmPassword(user.userPassword);
        await adminPage.selectUserRoleForEmp("ESS");
        await adminPage.selectStatusForEmp("Enabled");
        await adminPage.clickOnSaveButton();
        await commonPage.isToastMessagePresent("Success");
        
    })
    
})
