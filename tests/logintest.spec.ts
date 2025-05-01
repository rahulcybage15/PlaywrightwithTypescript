//import { HomePage } from "../pages/HomePage";
//import {test,expect, Page} from "playwright/test";
import{test} from '../base/BaseTest';
import dotenv from 'dotenv';

dotenv.config();

test.describe('login', () => {


    test('with valid creds @smoke', async ({homePage,dashboardPage}) => {
        
        await homePage.loginIntoApplication(process.env.USER!, process.env.PASSWORD!);
        await homePage.verifyUrlAfterLogin();
        await dashboardPage.verifyUserIsLoggedIn();
        await dashboardPage.assertDashBoardPage();
        await dashboardPage.collapseSidePanelOnDashboard();
        
    })

    test('Login with invalid creds @smoke', async ({ homePage }) => {

        await homePage.loginIntoApplication(process.env.USER!, process.env.WRONG_PASSWORD!);
        await homePage.verifyInCaseOfInvalidLogin(process.env.INVALID_CREDS!);
        
    })
    
    
})
