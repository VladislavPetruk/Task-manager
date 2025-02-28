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

const userEmail = 'testuser@gmail.com';
const userPassword = '1q2w3e4r5t';

test.describe(
  'authenticated user',
  {
    tag: [
      '@Tests',
      '@UnauthenticatedUser',
      '@LoginUser',
      '@UI',
      '@FrontendTest',
    ],
  },
  () => {
    test.beforeEach(async ({ context }) => {
      await context.clearCookies();
    });
    test('can access to main page', async ({ page }) => {
      await page.goto('/login');

      const emailInput = page.getByTestId('login-email');
      const passwordInput = page.getByTestId('login-password');

      await emailInput.fill(userEmail);
      await page.waitForTimeout(100);

      await passwordInput.fill(userPassword);
      await page.waitForTimeout(100);

      // Hack for webkit browser
      const emailValue = await emailInput.inputValue();
      if (emailValue !== userEmail) {
        await emailInput.fill(userEmail);
      }

      const signinButton = page.getByTestId('login-submit');
      signinButton.click();

      await page.waitForURL('/');
      await expect(
        page.getByRole('heading', { name: 'Current tasks' })
      ).toBeVisible();
    });
  }
);

test.describe(
  'Unauthenticated user',
  {
    tag: ['@Tests', '@UnauthenticatedUser', '@UI', '@FrontendTest'],
  },
  () => {
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
  }
);

// On future...

// test(
//   'Backend Test - Auth Login',
//   {
//     tag: [
//       '@Tests',
//       '@AuthUser',
//       '@Login',
//       '@API',
//       '@BackendTest',
//     ],
//   },
//   async ({ request }) => {
//     const response = await request.post('/auth/login', {
//       data: {
//         username: userEmail,
//         password: userPassword,
//       },
//     });

//     expect(response.status()).toBe(200);
//   }
// );
