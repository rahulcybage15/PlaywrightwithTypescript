//import { HomePage } from "../pages/HomePage";
//import {test,expect, Page} from "playwright/test";
import{test} from '../base/BaseTest';
import dotenv from 'dotenv';
import { AssertUtils } from '../utils/assertUtils';
import { DataGenerator } from '../utils/DataGeneratorUtils';
import { Page } from 'playwright/test';


dotenv.config();

test.describe('Admin page', () => {

    let PIMPage: Page;
    test('Go to PIM page and perform actions @smoke', async ({page,adminPage, commonPage,homePage,dashboardPage,PIMpage}) => {
        
        const user = DataGenerator.generateUser();
        //const PIMPage = new PIMPage(page);
        console.log(user.userEmail);
        await homePage.loginIntoApplication(process.env.USER!, process.env.PASSWORD!);
        await dashboardPage.goToPIMPage();
        await PIMpage.clickOnEditButtonInTable("Amelia");
        await AssertUtils.pageContainsUrl(page,"viewPersonalDetails");
        await PIMpage.selectGender("Female");
        await PIMpage.selectNationality("Indian");
    })
    
})
