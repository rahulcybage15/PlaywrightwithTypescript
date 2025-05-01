import { test, Locator, Page, expect } from "playwright/test";
import { AssertUtils } from "../utils/assertUtils";

import { BasePage } from "../base/BasePage";
import { CommonPage } from "./CommonPage";

export class PIMPage extends BasePage{

    private commonPage: CommonPage;
    readonly page: Page;
    readonly buttonAdd : Locator;
    readonly inputEmployeeName : Locator;
    readonly inputPassword : Locator;
    readonly inputConfirmPassword: Locator;
    //readonly inputUserName: Locator;
    readonly buttonSaveNSearch: Locator;
    readonly toastSuccessMessage: Locator;

    constructor(page: Page){
        
        super(page);
        this.page = page;
        this.commonPage = new CommonPage(page);
        this.buttonAdd = page.locator('.orangehrm-header-container button');
        this.inputEmployeeName = page.getByPlaceholder('Type for hints...');
        this.inputPassword = page.getByLabel('Password');
        this.inputConfirmPassword = page.getByLabel('Confirm Password');
       // this.inputUserName = page.locator('label:has-text("Username")').locator('..').locator('xpath=following-sibling::div//input');
        this.buttonSaveNSearch = page.locator('button[type="submit"]');
        this.toastSuccessMessage = page.locator('#oxd-toaster_1');
    }

    async clickOnEditButtonInTable(name: string){
        console.log("going to click on edit button");
        await this.commonPage.performTableActions(name,"i.bi-pencil-fill");
    }

    async selectGender(gender: string){
       const genderText = await this.getRadioButtonByLabel(this.page,gender);
       await this.clickOnElement(genderText);

    }

    async selectNationality(role: string){
        await this.selectFromDorpDownOption("Nationality",role);

    }



    

    
    
}