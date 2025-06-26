export class ProductPage {
    private page: import('playwright').Page;
    private addToCartButton: import('playwright').Locator;
    private cartButton: import('playwright').Locator;

    constructor(page: import('playwright').Page) {
        this.page = page;
        this.addToCartButton = page.locator('#add-to-cart-button');
        this.cartButton = page.locator('#nav-cart');
    }

    async addToCart() {
        await this.page.waitForSelector('#add-to-cart-button', { state: 'visible', timeout: 15000 });
        await this.addToCartButton.click();
    }


    async verifyProductAdded(): Promise<boolean> {
        const confirmationMessage = this.page.locator('#huc-v2-order-row-confirm-text');
        return await confirmationMessage.isVisible();
    }

    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }

    async getProductTitle(): Promise<string> {
        return this.page.locator('h1').innerText(); // Assuming the product title is within an <h1> element
    }

async getConfirmationMessage(): Promise<boolean> {
    const confirmationMessage = this.page.locator('#huc-v2-order-row-confirm-text'); // Updated locator to match the correct confirmation message element
    return await confirmationMessage.isVisible();
}

    
}
