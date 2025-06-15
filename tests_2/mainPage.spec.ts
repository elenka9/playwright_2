import { test, expect, Page, Locator } from '@playwright/test';

//создаем интерфейс чтобы затипизировать список элементов (при добавлении новых элеменов н следовать этой структуре)
interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub icon',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discrord icon',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Lightmode icon',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search input',
  },
];

// Группируем тесты в группу 'тесты главной страницы'
test.describe('main page test', () => {
  // Применяем хук beforeEach чтобы убрать повторяющиеся действия
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  // проверка отображения элементов наигациии в header
  test('visibility header nav', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });
  // проверка названий элементов навигации в header
  test('text header nav', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия элемента ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });
  // проверка кликабельности элементов навигации в header
  test('attribute href header nav', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка атрибута href элемента ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    });
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
