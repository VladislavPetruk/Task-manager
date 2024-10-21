'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { LogOut } from 'lucide-react';

import { useLogout } from '@/app/api/logout';
import ThemeProvider from '@/providers/ThemeProvider';

import { CstmTooltip } from '../CstmTooltip';
import { ThemeToglle } from '../ThemeToggle';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';

export function Header() {
  const { theme } = useTheme();
  const router = useRouter();
  const { mutate } = useLogout({
    onMutate: () => {
      router.push('/login');
    },
  });

  const handleLogout = () => {
    mutate(null);
  };

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
          <Button size="icon" variant="ghost" onClick={handleLogout}>
            <LogOut size={32} />
          </Button>
        </CstmTooltip>

        {/* <SidebarModile menu={MENU_LIST} /> */}
      </div>
    </header>
  );
}
