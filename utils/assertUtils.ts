import { expect, Page } from "playwright/test";

export class AssertUtils{

   static async PageHaveUrl(page: Page,expectedUrl: string){
        await expect(page).toHaveURL(expectedUrl);
    }

    static async pageContainsUrl(page:Page,urlText: string){
        const currentUrl = page.url();
        expect(currentUrl).toContain(urlText);
    }
}