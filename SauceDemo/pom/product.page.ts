import { Locator, Page } from "@playwright/test";

export class ProductPage{
    readonly page: Page
    readonly filterField: Locator
    readonly productList: Locator
    readonly productName: string

    constructor(page:Page){
        this.page = page;
        this.productName = '.inventory_item_name';
        this.filterField = page.getByTestId('product-sort-container');
        this.productList = page.getByTestId('inventory-list').locator(':scope > *');
    }

    async filter(filter: "hilo"|"lohi"|"az"|"za"){
        await this.filterField.selectOption(filter);
    }
    
    async getProductNth(n: number){
        return this.productList.nth(n);
    }

    async addNthProductCart(n: number){
        await this.productList.nth(n).locator('button').click();
    }

    async getNthProductName(n: number){
        return this.productList.nth(n).locator(this.productName).innerText();
    }
}