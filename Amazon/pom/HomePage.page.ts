export class HomePage {
    private page: import('playwright').Page;
    private acceptCookiesButton: import('playwright').Locator;
    private searchBox: import('playwright').Locator;
    private searchButton: import('playwright').Locator;
    private cartButton: import('playwright').Locator;
    constructor(page: import('playwright').Page) {
        this.page = page;
        this.acceptCookiesButton = page.locator('#sp-cc-accept');
        this.searchBox = page.locator('#twotabsearchtextbox');
        this.searchButton = page.locator('#nav-search-submit-button');
        this.cartButton = page.locator('#nav-cart');
    }

    async navigateToAmazon() {
        await this.page.goto('https://www.amazon.fr/');
    }

    async acceptCookies() {
        await this.page.waitForTimeout(1000); // Wait for the page to load
        await this.acceptCookiesButton.click();
    }

    async searchProduct(productName: string) {
        await this.searchBox.fill(productName);
        await this.searchButton.click();
    }

    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }
}


