'use client';

import { useTheme } from 'next-themes';

import { MENU_LIST } from '@/constants/menu';
import ThemeProvider from '@/providers/ThemeProvider';

import { SidebarModile } from '../Sidebar/SidebarModile';
import { ThemeToglle } from '../ThemeToggle';

export function Header() {
  const { theme } = useTheme();
  return (
    <header className="fixed z-10 flex h-14 w-full items-center justify-end p-3">
      <SidebarModile menu={MENU_LIST} />
      <ThemeProvider attribute="class" defaultTheme={theme}>
        <ThemeToglle />
      </ThemeProvider>
    </header>
  );
}
