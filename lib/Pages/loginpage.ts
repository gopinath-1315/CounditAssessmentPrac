import{Page,Locator} from '@playwright/test';
export class LoginPage {
    readonly loginLink: Locator;
    readonly emailid: Locator;
    readonly password: Locator;
    readonly loginbutton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.loginLink = page.locator('a[routerlink="/login"]');
        this.emailid = page.locator('input[placeholder="Email"]');
        this.password = page.locator('input[placeholder="Password"]');
        this.loginbutton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.error-messages');
    }

    async login(emailid: string, password: string) {
        await this.loginLink.click();
        await this.emailid.fill(emailid);
        await this.password.fill(password);
        await this.loginbutton.click();
    }
}