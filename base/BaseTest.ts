import 'allure-playwright';
import {test as baseTest} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { CommonPage } from '../pages/CommonPage';
import { PIMPage } from '../pages/PIMPage';


type MyFixtures={
    homePage: HomePage;
    dashboardPage: DashboardPage;
    adminPage: AdminPage;
    commonPage: CommonPage;
    PIMpage: PIMPage;
};

export const test = baseTest.extend<MyFixtures>({
    homePage: async ({page},use) =>{
        const homePage = new HomePage(page);
        await homePage.navigateTo(process.env.BASE_URL!);
        await use(homePage);
    },

    dashboardPage: async ({page},use)=>{
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },
    adminPage: async({page},use) =>{
        const adminPage = new AdminPage(page);
        await use(adminPage);
    },
    commonPage: async({page},use) =>{
        const commonPage = new CommonPage(page);
        await use(commonPage);
    },
    PIMpage: async({page},use) =>{
        const PIMpage = new PIMPage(page);
        await use(PIMpage);
    }

})