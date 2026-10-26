import{test as base} from "@playwright/test";


import{LoginPage} from "../Pages/loginpage";
import{ArticlePage} from "../Pages/articlepage";

type MyFixtures = {
   
    loginpage: LoginPage;
    articlepage: ArticlePage;
};

export const test = base.extend<MyFixtures>({
    loginpage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    articlepage: async ({ page }, use) => {
    
        await use(new ArticlePage(page));
    },

});