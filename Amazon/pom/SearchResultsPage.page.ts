export class SearchResultsPage {
    private page: import('playwright').Page;
    private productTitles: import('playwright').Locator;
    private cartButton: import('playwright').Locator;
    private sortByDropdown: import('playwright').Locator;

    constructor(page: import('playwright').Page) {
        this.page = page;
        this.productTitles = page.locator('.a-color-state a-text-bold');
        this.cartButton = page.locator('#nav-cart');
        this.sortByDropdown = page.locator('a-dropdown-button');
        
    }

    async getProductTitles(): Promise<string[]> {
        return await this.productTitles.allTextContents();
    }

    async clickOnProduct(index: number) {
        const products = await this.productTitles.elementHandles();
        if (index < products.length) {
            await products[index].click();
        } else {
            throw new Error('Product index out of bounds');
        }
    }

    async selectFirstProduct(): Promise<void> {
        const firstProduct = this.page.locator('.s-main-slot .s-result-item').first();
        await firstProduct.click();
    }

    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }

}