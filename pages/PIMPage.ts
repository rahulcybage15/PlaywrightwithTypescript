import { test, Locator, Page, expect } from "playwright/test";
import { AssertUtils } from "../utils/assertUtils";

import { BasePage } from "../base/BasePage";
import { CommonPage } from "./CommonPage";

export class PIMPage extends BasePage{

    private commonPage: CommonPage;
    readonly page: Page;
    readonly buttonSave: Locator;
    readonly toastSuccessMessage: Locator;
    readonly addEmployeeButton : Locator;
    readonly firstnameInput: Locator;
    readonly lastnameInput: Locator;
    readonly middlenameInput: Locator;
    readonly empidInput: Locator;

    constructor(page: Page){
        
        super(page);
        this.page = page;
        this.commonPage = new CommonPage(page);
        this.buttonSave = page.locator('button[type="submit"]');
        this.toastSuccessMessage = page.locator('#oxd-toaster_1');
        this.addEmployeeButton = page.locator('.orangehrm-header-container button');
        this.firstnameInput = page.getByPlaceholder('First Name');
        this.lastnameInput = page.getByPlaceholder('Middle Name');
        this.middlenameInput = page.getByPlaceholder('Last Name');
        this.empidInput = page.getByPlaceholder('');
    }

    async clickOnEditButtonInTable(name: string){
        console.log("going to click on edit button");
        await this.commonPage.performTableActions(name,'i.bi-pencil-fill');
    }

    async selectGender(gender: string){
       const genderText = await this.getRadioButtonByLabel(this.page,gender);
       await this.clickOnElement(genderText);

    }

    async selectNationality(role: string){
        await this.selectFromDorpDownOption("Nationality",role);

    }

    async addEmployee(firstname: string,lastname: string, middlename: string, empid: number){

        await this.clickOnElement(this.addEmployeeButton);
        await this.typeText(this.firstnameInput,firstname);
        await this.typeText(this.middlenameInput,middlename);
        await this.typeText(this.lastnameInput,lastname);
        const empidtextbox =await this.getInputByLabel(this.page,'Employee Id');
        await this.typeText(empidtextbox,empid.toString());
        await this.clickOnElement(this.buttonSave);
        
    }

    async verifyEmpFirstName(firstname: string){
       const expectedName =  await this.getValueOrText(this.firstnameInput);
        expect(expectedName).toEqual(firstname);
    }



    

    
    
}