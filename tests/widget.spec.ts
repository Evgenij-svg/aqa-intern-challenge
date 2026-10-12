import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    console.log('URL:', page.url());
    console.log('кнопок виджета:', await page.locator('[data-test="openWidget"]').count());
    await page.screenshot({ path: 'debug.png', fullPage: true });

    // close cookies popup
    await page.click('._UCHI_COOKIE__button');
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('closes', async ({page}) => {
    await widgetPage.openWidget();
    
    await widgetPage.closeWidget();

    await expect(widgetPage.getWidgetBody()).not.toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    const articles = await widgetPage.getPopularArticles();

    await widgetPage.getPopularArticles().first().click();

    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });
});
