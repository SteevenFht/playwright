import { Locator, Page } from "@playwright/test";

export class CartPage{
    readonly page: Page
    readonly productList: Locator
    readonly productName: string

    constructor(page:Page){
        this.page = page;
        this.productName = '.inventory_item_name';
        this.productList = page.getByTestId('inventory-item');
    }

    async goToCart(){
        await this.page.getByTestId('shopping-cart-link').click();
    }

    async getNthProductCart(n: number){
        return this.productList.nth(n);
    }

    async getNthProductNameCart(n: number){
        return this.productList.nth(n).locator(this.productName).innerText();
    }
    
}