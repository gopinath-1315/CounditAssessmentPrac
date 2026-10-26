import{expect} from '@playwright/test';
import{test} from '../lib/fixtures/pagefixtures';
import * as testData from "../test data/input.json";

test.describe("Assignment Test", () => {

    test.beforeEach(async ({ page, loginpage }) => {
        await page.goto(testData.ui.baseUrl);
        await loginpage.login(testData.Login.Emailid, testData.Login.Password);
    })

    test("should login, create article, edit article, and delete article successfully", async ({ page, articlepage }) => {

        // create an article
        await articlepage.createArticle(testData.Article.Title, testData.Article.Description, testData.Article.Body, testData.Article.Tags);
        // navigate to home page
        await articlepage.navigateToHome();
        await expect(articlepage.home).toBeVisible();
        await expect(articlepage.articleLink(testData.Article.Title)).toBeVisible();
        // navigate to the created article
        await articlepage.navigateToArticle(testData.Article.Title);
        // verify the article content
        await expect(articlepage.articleTitle).toHaveText(testData.Article.Title);
        await expect(articlepage.articleBody).toContainText(testData.Article.Body);
        await expect(articlepage.articleTags).toContainText(testData.Article.Tags);

        // edit the article
        await articlepage.editArticle(testData.ArticleUpdate.Title, testData.ArticleUpdate.Description, testData.ArticleUpdate.Body, testData.ArticleUpdate.Tags);
        // verify the updated article content
        await expect(articlepage.articleTitle).toHaveText(testData.ArticleUpdate.Title);
        await expect(articlepage.articleBody).toContainText(testData.ArticleUpdate.Body);
        await expect(articlepage.articleTags).toContainText(testData.ArticleUpdate.Tags);

        // delete the article
        await articlepage.deleteArticle();
        await expect(page).toHaveURL(testData.ui.baseUrl);
    });
})
