import { chromium } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const COOKIE_EXPIRY_DAYS = 1;
const DOMAIN = 'localhost';
const STORAGE_STATE_PATH = path.join(__dirname, '/state.json');

export default async function globalSetup() {
  if (!process.env.AUTH_SECRET) throw new Error('AUTH_SECRET is not defined');

  const payload = {
    id: '67471b65813e64c2154b4af8',
    role: 'USER',
  };

  let browser;
  let context;

  try {
    browser = await chromium.launch();

    context = await browser.newContext();

    const { encode } = await import('next-auth/jwt');

    const sessionToken = await encode({
      token: payload,
      secret: process.env.AUTH_SECRET,
      salt:
        process.env.NODE_ENV === 'production'
          ? '__Secure-authjs.session-token'
          : 'authjs.session-token',
    });

    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: sessionToken,
        domain: DOMAIN,
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        expires: Math.round(
          (Date.now() + 86400000 * COOKIE_EXPIRY_DAYS) / 1000
        ),
      },
    ]);

    await context.storageState({ path: STORAGE_STATE_PATH });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in global setup:', error.message);
    }

    throw error;
  } finally {
    await context?.close();
    await browser?.close();
  }
}

// async function globalSetup() {
//   // 1. Створюємо тестового користувача
//   const password = await hash('1q2w3e4r5t', 10);
//   const email = 'testuser@example.com';

//   const user = await prisma.user.upsert({
//     where: { email },
//     update: {},
//     create: {
//       username: 'testuser',
//       email,
//       password,
//       role: 'USER',
//       emailVerified: new Date(),
//     },
//   });

//   // 2. Генеруємо токен сесії, що буде пов’язаний із цим користувачем
//   // const sessionToken = 'test-session-token'; // Унікальний токен
//   // await prisma.token.create({
//   //   data: {
//   //     email: user.email,
//   //     token: sessionToken,
//   //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Термін дії 1 день
//   //     type: 'VERIFICATION', // або 'PASSWORD_RESET', залежно від логіки
//   //   },
//   // });

//   // 3. Встановлюємо шлях до файлу для збереження стану
//   const storagePath = path.resolve(__dirname, 'storageState.json');

//   // 4. Налаштовуємо Playwright для збереження стану сесії
//   const browser = await chromium.launch();
//   const context = await browser.newContext({ storageState: storagePath });

//   // 5. Додаємо кукі для імітації аутентифікації
//   await context.addCookies([
//     {
//       name: 'next-auth.session-token',
//       value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiQk5DaVZyN3JMWUhPSlh6cEZadnVNanp5SHl4RjItNWwteVBBQ3hWMUNITVFiNzliMTg1UlNfOXNPc2RYLWx0bWNvN0RSTDVGdTBMNXA4bnMxWHljNVEifQ..8A1A2EECWXHepPQwPYkCkA.6uYiaVRic9WrphNBT112CetkckGtp-HV7VROkEWJ2uO4-hRGdp5rvDuH8RtOSj_T27z-AQN6xXaFJaCVZKgRlEQKViZQLRXWaXNJ80J3keWOeos3Mww4Iw4ZJTY3mSbZjbqXK9BjSqChI9ld2oRddKCEx6qklag0LqTGf86ybn0LTGaKK3Lq6ZBc0s7P-',
//       domain: 'localhost',
//       path: '/',
//       httpOnly: true,
//       sameSite: 'Lax',
//       expires: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Термін дії в секундах
//     },
//   ]);

//   // 6. Зберігаємо стан сесії
//   await context.storageState({ path: storagePath });
//   await browser.close();
// }

// export default globalSetup;
