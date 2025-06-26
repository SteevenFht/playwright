export class CartPage {
    private page: import('playwright').Page;
    private cartItems: import('playwright').Locator;
    private proceedToCheckoutButton: import('playwright').Locator;

    constructor(page: import('playwright').Page) {
        this.page = page;
        this.cartItems = page.locator('.sc-list-item-content');
        this.proceedToCheckoutButton = page.locator('input[name="proceedToRetailCheckout"]');
    }

    async getCartItems(): Promise<string[]> {
        return await this.cartItems.allTextContents();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async getfirstCartItemTitle(): Promise<string> {
        const firstCartItem = this.cartItems.first();
        return await firstCartItem.locator('.a-truncate-cut').innerText(); // Adjust the selector based on the actual structure of the cart item
    }
    
}
