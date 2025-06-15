import { test, expect } from '@playwright/test';

// Группируем тесты в группу 'тесты главной страницы'
test.describe('main page test', () => {
  // Применяем хук beforeEach чтобы убрать повторяющиеся действия
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  // проверка отображения элементов наигациии в header
  test('visibility header nav', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search (Ctrl+K)' })).toBeVisible();
  });
  // проверка названий элементов навигации в header
  test('text header nav', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
      'Playwright',
    );
    await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
    await expect(page.getByRole('link', { name: 'Community' })).toContainText('Community');
  });
  // проверка кликабельности элементов навигации в header
  test('attribute href header nav', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
    await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
      'href',
      '/docs/api/class-playwright',
    );
    await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/community/welcome',
    );
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute(
      'href',
      'https://github.com/microsoft/playwright',
    );
    await expect(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute(
      'href',
      'https://aka.ms/playwright/discord',
    );
  });
  // проверка переключателя темы: при клике дважды включается темная тема
  test('light mode theme switcher', async ({ page }) => {
    await page.getByLabel('Switch between dark and light').click();
    await page.getByLabel('Switch between dark and light').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
  // проверка заголовка: заголовок виден, содержит текст "Playwright..."
  test('heading exsists and have right text', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable end-to-end testing for modern web apps.',
    );
  });
  // проверка кнопки GET STARTED: кнопка видна, кнопка содержит текст "GET STARTED", кнопка кликабельна. метод soft позволяет проверить все тесты, даже если первые упали
  test('button GET STARTED', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('banner')).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
});
