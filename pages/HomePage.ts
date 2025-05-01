import { test, Locator, Page, expect } from "playwright/test";
import { AssertUtils } from "../utils/assertUtils";

import { BasePage } from "../base/BasePage";

export class HomePage extends BasePage{

    readonly page: Page;
    readonly inputUserName : Locator;
    readonly inputPassword : Locator;
    readonly buttonLogin : Locator;
    readonly textInvalidCreds: Locator;

    constructor(page: Page){
        
        super(page);
        this.page = page;
        this.inputUserName = page.getByPlaceholder('Username');
        this.inputPassword = page.getByPlaceholder('Password');
        this.buttonLogin = page.locator('button[type="submit"]');
        this.textInvalidCreds = page.locator('.oxd-alert-content p');
    }

    async loginIntoApplication(username: string, password:string){

        await this.typeText(this.inputUserName,username);
        await this.typeText(this.inputPassword,password);
        await this.clickOnElement(this.buttonLogin);
        
    }

    async verifyUrlAfterLogin(){
        console.log("url is:::"+process.env.DASHBOARD_URL);
        await AssertUtils.PageHaveUrl(this.page,process.env.DASHBOARD_URL!);
    }

    async verifyInCaseOfInvalidLogin(message:string){
      const text =  await this.getText(this.textInvalidCreds);
      expect(text).toContain(message);

    }


    
}