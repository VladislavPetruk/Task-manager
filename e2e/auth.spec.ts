import { test, expect } from '@playwright/test';

// test.describe('Authenticated user', () => {
//   test('can access current page', async ({ page }) => {
//     await page.goto('/login');

//     // Виконуємо вхід
//     await page.fill('input[type="email"]', 'testuser@example.com');
//     await page.fill('input[type="password"]', '1q2w3e4r5t');
//     await page.click('button[type="submit"]');

//     // Перевіряємо, чи успішно увійшли
//     await expect(page).toHaveURL('/');
//   });
// });

// test('Тест з використанням тестового користувача', async ({ page }) => {
//   await page.goto('/login');

//   // Виконуємо вхід
//   await page.fill('input[type="email"]', 'testuser@example.com');
//   await page.fill('input[type="password"]', '1q2w3e4r5t');
//   await page.click('button[type="submit"]');

//   // Перевіряємо, чи успішно увійшли
//   await expect(page).toHaveURL('/');  // замініть на URL, куди перенаправляється користувач після входу
// });

test.describe('authenticated user', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });
  test('can access to menu', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.getByRole('textbox', { name: /email/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });

    await emailInput.fill('testuser@gmail.com');
    await passwordInput.fill('1q2w3e4r5t');

    const signinButton = page.getByRole('button', { name: /login/i });
    signinButton.click();

    await page.waitForURL('/');
    await expect(page.getByRole('link', { name: 'Current' })).toBeVisible();
  });
});

test.describe('Unauthenticated user', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });
  test('can access login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
  });
  test('can access registration page', async ({ page }) => {
    await page.goto('/registration');
    await expect(
      page.getByRole('heading', { name: /registration/i })
    ).toBeVisible();
  });
});
