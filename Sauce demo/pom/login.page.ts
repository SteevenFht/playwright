import { Locator, Page } from "@playwright/test";

export class LogInPage{
    readonly page: Page
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly loginButton: Locator

    constructor(page:Page){
        this.page = page;
        this.usernameField = page.getByTestId('username');
        this.passwordField = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
    }

    async login(username,password){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
    
}