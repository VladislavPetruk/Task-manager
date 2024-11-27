'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { LogOut } from 'lucide-react';

import { logOut } from '@/app/actions/authActions';
import ThemeProvider from '@/shared/providers/ThemeProvider';

import { CstmTooltip } from '../CstmTooltip';
import { ThemeToglle } from '../ThemeToggle';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="flex h-14 w-full items-center justify-between px-6 py-3 shadow">
      <Link href="/" className="logo pointer-events-none opacity-0">
        {' '}
        {/*  fix */}
        Dashboard
      </Link>
      <div className="inline-flex items-center gap-x-2 lg:gap-x-4">
        <SidebarTrigger />
        <ThemeProvider attribute="class" defaultTheme={theme}>
          <ThemeToglle />
        </ThemeProvider>
        <CstmTooltip label="Logout">
          <Button size="icon" variant="ghost" onClick={async () => logOut()}>
            <LogOut size={32} />
          </Button>
        </CstmTooltip>

        {/* <SidebarModile menu={USER_MENU_LIST} /> */}
      </div>
    </header>
  );
}
