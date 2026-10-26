import{Page,Locator} from '@playwright/test';
export class ArticlePage  {
    readonly page: Page;
    readonly newarticle: Locator;
    readonly title: Locator;
    readonly about: Locator;
    readonly article: Locator;
    readonly tag: Locator;
    readonly publishbutton: Locator;
    readonly errorMessage: Locator;
    readonly home: Locator;
    readonly deleteButton: Locator;
    readonly editButton: Locator;
    readonly articleTitle: Locator;
    readonly articleBody: Locator;
    readonly articleTags: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newarticle = page.locator('a[routerlink="/editor"]');
        this.title = page.locator('input[formcontrolname="title"]');
        this.about = page.locator('input[formcontrolname="description"]');
        this.article = page.locator('textarea[formcontrolname="body"]');
        this.tag=page.locator('input[placeholder="Enter tags"]');
        this.publishbutton = page.getByRole('button', { name: 'Publish Article' });
        this.errorMessage = page.locator('.error-messages');
        this.home = page.getByRole('link', { name: 'Home' });
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
        this.editButton = page.getByRole('link', { name: 'Edit Article' }).first();
        // article view page
        this.articleTitle = page.locator('.banner h1');
        this.articleBody = page.locator('.article-content');
        this.articleTags = page.locator('.article-content .tag-list');
    }

    // preview card on the home feed for the given article title
    articleLink(title: string): Locator {
        return this.page.locator('.preview-link', { has: this.page.getByRole('heading', { name: title, exact: true }) });
    }

    async createArticle(title: string, Description: string, body: string, tag: string) {
        await this.newarticle.click();
        await this.title.fill(title);
        await this.about.fill(Description);
        await this.article.fill(body);
        await this.tag.fill(tag);
        await this.publishbutton.click();
        // wait for the article to be saved before moving on
        await this.page.waitForURL(/\/article\//);
    }

    async navigateToHome() {
        await this.home.click();
    }
    async navigateToArticle(title: string) {
        await this.articleLink(title).click();
    }

    async editArticle(title: string, Description: string, body: string, tag: string) {
        await this.editButton.click();
        await this.title.fill(title);
        await this.about.fill(Description);
        await this.article.fill(body);
        await this.tag.fill(tag);
        await this.publishbutton.click();
        // wait for the updated article to be saved
        await this.page.waitForURL(/\/article\//);
    }

    async deleteArticle() {
        await this.deleteButton.click();
    }

}
