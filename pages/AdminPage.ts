import { test, Locator, Page, expect } from "playwright/test";
import { AssertUtils } from "../utils/assertUtils";

import { BasePage } from "../base/BasePage";

export class AdminPage extends BasePage{

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
        // this.pageElements = {
        //     addButton: '.orangehrm-header-container button',
        //     inputEmployeeName: locatorHelper.getByPlaceholder('Type for hints...'),

        // };
        this.buttonAdd = page.locator('.orangehrm-header-container button');
        this.inputEmployeeName = page.getByPlaceholder('Type for hints...');
        this.inputPassword = page.getByLabel('Password');
        this.inputConfirmPassword = page.getByLabel('Confirm Password');
       // this.inputUserName = page.locator('label:has-text("Username")').locator('..').locator('xpath=following-sibling::div//input');
        this.buttonSaveNSearch = page.locator('button[type="submit"]');
        this.toastSuccessMessage = page.locator('#oxd-toaster_1');
    }

    

    async addEmployee(){
        await this.clickOnElement(this.buttonAdd);
    }

    async enterEmployeeName(empName: string){

        await this.typeText(this.inputEmployeeName,empName);
         const ele = this.page.getByRole('option').first().filter({hasNotText:'Searching....'})
        // .allTextContents();
        // console.log("names are:"+ele);
        // await this.page.locator('oxd-autocomplete-dropdown')
        // .filter({hasText:'Ravi M B'}).click();
        await this.waitForElement(ele);

        await ele.click();
    }

    async enterUsername(userName: string){
        const element  = await this.getInputByLabel(this.page,"Username")
        await this.typeText(element,userName);
    }

    async verfiySuccessToastIsPresent(){

        const message = await this.toastSuccessMessage.isVisible();
        console.log(message);
    }




    // async enterUserName(userName: string){
    //    // await this.inputUserName.waitFor({state:'visible'});
    //     await this.typeText(this.inputUserName,userName);
    // }
    async enterPassword(pass: string){
        const element  = await this.getInputByLabel(this.page,"Password")
        await this.typeText(element,pass);
       // await this.typeText(this.inputPassword,pass);
    }
    async enterConfirmPassword(pass: string){
        const element  = await this.getInputByLabel(this.page,"Confirm Password")
        await this.typeText(element,pass);
        //await this.typeText(this.inputConfirmPassword,pass);
    }

    async clickOnSaveButton(){
        await this.clickOnElement(this.buttonSaveNSearch);
    }

    async selectUserRoleForEmp(role: string){
        await this.selectFromDorpDownOption("User Role",role);

    }

    async selectStatusForEmp(status: string){
        await this.selectFromDorpDownOption("Status",status);

    }
    
}