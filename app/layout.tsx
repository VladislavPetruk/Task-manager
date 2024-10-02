import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const AppThemeProvider = dynamic(() => import('@/providers/ThemeProvider'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Your metadata title',
  description: 'Your metadata description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get('theme')?.value || 'system';

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(`${inter.className} antialiased`)}
        suppressHydrationWarning
      >
        <AppThemeProvider attribute="class" defaultTheme={theme}>
          <div></div>
        </AppThemeProvider>
        {children}
      </body>
    </html>
  );
}
