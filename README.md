# [My first playwright test](https://github.com/elenka9/playwright_2/blob/main/playwright.config.ts)


*☝️ клик, чтобы посмотреть*


## Test Automation Project


**Language:** Type Script


**About project**: Учусь писать тесты на Playwright+Type Script.


*Объект тестирования*: [HEADER главной страницы Playwright](https://playwright.dev/)


*Инструмент:*  Playwright - это библиотека Node.js для автоматизации Chromium, Firefox и WebKit с помощью одного API


Модифицируем этоn [код](https://github.com/elenka9/playwright_1/blob/main/tests/mainPage.spec.ts), [делаем его масштабируемым](https://github.com/elenka9/playwright_2/blob/main/tests/mainPage.spec.ts)

- создала интерфейс, чтобы затипизировать список элементов
- создала переменную элементы (const = elements), чтобы сделать код расширяемым и добавлять новые элементы при необходимости
- убрала повторяющиеся действия за счет метода forEach, который последовательно перебирает все элементы массива, что сокращает код
- добавила title для каждого шага с пмощью фкункции test.step. Она разбивает сложные тесты на более понятные шаги, улучшая читабельность и отчетность.
