import { Locator, Page } from "@playwright/test";

export class CheckoutPage{
    readonly page: Page
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly zipCodeField: Locator

    constructor(page:Page){
        this.page = page;
        this.firstNameField = page.getByTestId('firstName');
        this.lastNameField = page.getByTestId('lastName');
        this.zipCodeField = page.getByTestId('postalCode');
    }

    async goToCheckout(){
        await this.page.getByTestId('checkout').click();
    }

    async fillForm(firstName="Raphael",lastName="Darras",zipCode="59000"){
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.fill(zipCode);
    }
    
    async continueCheckout(){
        await this.page.getByTestId('continue').click();
    }
}