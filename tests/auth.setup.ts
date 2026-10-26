import { test as setup, expect } from '@playwright/test';
import { authFile } from '../playwright.config';
import * as testData from '../test data/input.json';

setup('login and save session', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('Email').fill(testData.Login.Emailid)

     await page.getByPlaceholder('Password').fill(testData.Login.Password)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible()
    
    await page.context().storageState({ path: authFile })
})
