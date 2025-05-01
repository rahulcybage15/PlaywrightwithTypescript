import { test, Locator, Page, expect } from "playwright/test";
import { AssertUtils } from "../utils/assertUtils";

import { BasePage } from "../base/BasePage";

export class CommonPage extends BasePage{

    readonly page: Page;

    constructor(page: Page){
        super(page);
        this.page=page;

    }

    async navigateTo(menuName: string){
        const menu: Locator = this.page.locator(`ul >> li >> a >> text="${menuName}"`);
        await this.clickOnElement(menu);

    }

    async isToastMessagePresent(message:string):Promise<boolean>{
        const toastMessage = this.page.getByText(message,{exact: false});
        return await toastMessage.isVisible();
    }

    async performTableActions(cellText: string, action: string){

        const row = this.page.locator(`div.oxd-table-row:has(div:has-text("${cellText}"))`);
        const actionButton = row.locator(action);
        await actionButton.click();


    }


}
