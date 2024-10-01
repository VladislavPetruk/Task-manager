'use client';

import { useTheme } from 'next-themes';

import ThemeProvider from '@/providers/ThemeProvider';

import { ThemeToglle } from '../ThemeToggle';

export function Header() {
  const { theme } = useTheme();
  return (
    <header className="p-3 text-center">
      <ThemeProvider attribute="class" defaultTheme={theme}>
        <ThemeToglle />
      </ThemeProvider>
    </header>
  );
}
