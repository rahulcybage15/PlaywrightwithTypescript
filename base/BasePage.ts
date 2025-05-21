import { Locator, Page } from "playwright/test";
import logger from "../utils/logger";

export class BasePage {

    protected logger = logger;
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateTo(url: string){
        this.logger.info(`navigating to: ${url}`);
        await this.page.goto(url);
    }

    async getPageTitle(){
        return this.page.title();
    }

    async getElement(selectorOrLocator: string | Locator): Promise<Locator>{
        const element = typeof selectorOrLocator === 'string'
        ? this.page.locator(selectorOrLocator) 
        : selectorOrLocator;
        return element;
        
    }

    async clickOnElement(selectorOrLocator: string | Locator): Promise<void>{
        //this.logger.info(`clicking on ${typeof selectorOrLocator === 'string' ? selectorOrLocator : '[Locator object]'}`);
        this.logger.info(`clicking on ${selectorOrLocator}`);
        const element = await this.getElement(selectorOrLocator);

        await element.click();

        // const element = typeof selectorOrLocator === 'string'
        // ? this.page.locator(selectorOrLocator) 
        // : selectorOrLocator;
        
        // await element.click();

    }

    async typeText(selectorOrLocator: string | Locator,text: any): Promise<void>{
        this.logger.info(`filling ${text} value in ${selectorOrLocator}`);
        await (await this.getElement(selectorOrLocator)).fill(text);
    //     const element = typeof selectorOrLocator === 'string'
    //     ? this.page.locator(selectorOrLocator)
    //     :selectorOrLocator;
    //    // await element.fill('');
    //     await element.fill(text);
    }
    async getValueOrText(selectorOrLocator : string |Locator):Promise<string>{
        try {
            const element = await this.getElement(selectorOrLocator);
        const tagname= await element.evaluate(el => el.tagName.toLowerCase());

        if(['input','textarea','select'].includes(tagname)){
            return await element.inputValue();
        }
        else {
            return await element.innerText();
        }
            
        } catch (error: any) {
            console.error(` Error in getValueOrText(): ${error.message}`);
            throw new Error(`Failed to retrieve text/value from element: ${selectorOrLocator}`);
        }
      // return await (await this.getElement(selectorOrLocator)).innerText();
    }

    async waitForElement(selectorOrLocator : string |Locator, timeout = 5000) {
        const ele = await this.getElement(selectorOrLocator);
        // const element = typeof selectorOrLocator === 'string'
        //     ? this.page.locator(selectorOrLocator)
        //     : selectorOrLocator;

        //     await element.waitFor({ state: 'visible', timeout });

        await ele.waitFor({state: 'visible', timeout});
    }

    async selectFromDorpDownOption(label:string,optionText:string){
        const dropdown = this.page.locator(`//label[contains(text(), '${label}')]/following::div[contains(@class, 'oxd-select-text')][1]`);
        await dropdown.click();
        const option = this.page.locator(`//div[@role='option' and normalize-space()='${optionText}']`);
        await option.click();
        
    }

    async getInputByLabel(page: Page, labelText: string){

        const labelLocator = page.locator(`label:has-text("${labelText}")`);
        const labelDiv = labelLocator.locator('..'); // move to parent div
        const inputLocator = labelDiv.locator('xpath=following-sibling::div//input');
        return inputLocator.first();

    }
    async getRadioButtonByLabel(page:Page, radioButtonText:string):Promise<Locator>{
        const radioButton = page.locator(`label:has-text("${radioButtonText}")`);
        return radioButton;
    }


}