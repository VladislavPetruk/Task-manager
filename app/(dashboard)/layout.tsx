import React from 'react';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { DashboardLayout } from '@/components/Layouts';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/shared/lib/utils';
import { ReactQueryClientProvider } from '@/shared/providers/ReactQueryClientProvider';

import '@/app/globals.css';

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const AppThemeProvider = dynamic(
  () => import('@/shared/providers/ThemeProvider'),
  {
    ssr: false,
  }
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get('theme')?.value || 'system';
  const session = await auth();

  return (
    <html lang="en" className="overscroll-none" suppressHydrationWarning>
      <body
        className={cn(`${inter.className} antialiased`)}
        suppressHydrationWarning
      >
        <SessionProvider session={session}>
          <ReactQueryClientProvider>
            <AppThemeProvider attribute="class" defaultTheme={theme}>
              <div></div>
            </AppThemeProvider>
            <Toaster />
            <DashboardLayout>{children}</DashboardLayout>
          </ReactQueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
