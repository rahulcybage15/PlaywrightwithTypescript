import { test, Locator, Page, expect } from "playwright/test";
import { AssertUtils } from "../utils/assertUtils";

import { BasePage } from "../base/BasePage";
import { CommonPage } from "./CommonPage";

export class DashboardPage extends BasePage{

    private commonPage: CommonPage;
    
    readonly page: Page;
    readonly textUserName : Locator;
    readonly textDashboard : Locator;
    readonly buttonCollapseSidePanel : Locator;
    //readonly linkAdmin: Locator;

    constructor(page: Page){
        
        super(page);
        this.page = page;
        this.commonPage = new CommonPage(page);
        this.textUserName = page.locator('.oxd-userdropdown-name');
        this.textDashboard = page.locator('.oxd-topbar-header-title span h6');
        this.buttonCollapseSidePanel = page.locator('.oxd-main-menu-search button');
        //this.linkAdmin = page.locator('a[href="/web/index.php/admin/viewAdminModule"]');
    }

    async collapseSidePanelOnDashboard(){
       // await this.buttonCollapseSidePanel.click();
       await this.waitForElement(this.buttonCollapseSidePanel)
        await this.clickOnElement(this.buttonCollapseSidePanel);
    }

    async goToAdminPage(){
        await this.commonPage.navigateTo("Admin");
        // await this.clickOnElement(this.linkAdmin);
    }

    async goToPIMPage(){
        await this.commonPage.navigateTo("PIM");
    }

    async assertDashBoardPage(){
        const element  = await this.textDashboard.textContent();
        await expect(element).toContain('Dashboard');
    }

    // async gotoDashboard(username: string, password:string){

    //     await this.typeText(this.inputUserName,username);
    //     await this.typeText(this.inputPassword,password);
    //     await this.clickOnElement(this.buttonLogin);
        
    // }

    async verifyUserIsLoggedIn(){

        // const element = await this.getText(this.textUserName);
        // expect(element).toContain(username);
        //;
        await expect(this.textUserName).toBeVisible();


    }

    async verifyUserIsOnDashboard(){

        //console.log("url is:::"+process.env.DASHBOARD_URL);
        await AssertUtils.PageHaveUrl(this.page,process.env.DASHBOARD_URL!);
    }


    
}