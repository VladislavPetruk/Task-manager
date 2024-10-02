import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

import { MenuItem } from '@/constants/menu';

import { Button } from '../ui/button';

interface SidebarDesktopProps {
  menu: Array<MenuItem>;
}

export const SidebarDesktop = ({ menu }: SidebarDesktopProps) => {
  return (
    <div className="hidden h-full w-full gap-y-8 border-r bg-muted/40 p-8 md:grid md:grid-rows-[max-content_1fr_max-content]">
      <div className="text-3xl">Dashboard</div>
      <nav className="block items-start gap-y-3 text-sm font-medium">
        {menu.map((item) => (
          <Link
            href={item.link}
            className="flex items-center gap-3 rounded-lg text-xl text-muted-foreground transition-all hover:text-primary"
            key={item.label}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Button>
        <LogOut />
        Log Out
      </Button>
    </div>
  );
};
