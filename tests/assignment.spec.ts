import{expect} from '@playwright/test';
import{test} from '../lib/fixtures/pagefixtures';
import * as testData from "../test data/input.json";

test.describe.configure({ mode: 'serial' });

test.describe("Writing Article for test", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(testData.ui.baseUrl);
    })

    test("should login successfully", async ({ articlepage }) => {
        await expect(articlepage.newarticle).toBeVisible();
    });

    test("should create one new my own article", async ({ articlepage }) => {
        await articlepage.createArticle(testData.Article.Title, testData.Article.Description, testData.Article.Body, testData.Article.Tags);
        await articlepage.navigateToHome();
        await expect(articlepage.home).toBeVisible();
        await expect(articlepage.articleLink(testData.Article.Title)).toBeVisible();
        await articlepage.navigateToArticle(testData.Article.Title);
        await expect(articlepage.articleTitle).toHaveText(testData.Article.Title);
        await expect(articlepage.articleBody).toContainText(testData.Article.Body);
        await expect(articlepage.articleTags).toContainText(testData.Article.Tags);
    });

    test("should modify the article", async ({ articlepage }) => {
        await articlepage.navigateToHome();
        await articlepage.navigateToArticle(testData.Article.Title);
        await articlepage.editArticle(testData.ArticleUpdate.Title, testData.ArticleUpdate.Description, testData.ArticleUpdate.Body, testData.ArticleUpdate.Tags);
        await expect(articlepage.articleTitle).toHaveText(testData.ArticleUpdate.Title);
        await expect(articlepage.articleBody).toContainText(testData.ArticleUpdate.Body);
        await expect(articlepage.articleTags).toContainText(testData.ArticleUpdate.Tags);
    });

    test("should finally delete the article", async ({ page, articlepage }) => {
        await articlepage.navigateToHome();
        await articlepage.navigateToArticle(testData.ArticleUpdate.Title);
        await articlepage.deleteArticle();
        await expect(page).toHaveURL(testData.ui.baseUrl);
    });
})
