import React from 'react';
import Link from 'next/link';

import { MenuItem } from './Sidebar.types';
import { useToast } from '@/hooks/useToast';

interface SidebarDesktopProps {
  menu: Array<MenuItem>;
}

export const SidebarDesktop = ({ menu }: SidebarDesktopProps) => {
  const { toast } = useToast()
  return (
    <div className="fixed inset-0 z-10 hidden h-full w-80 border-r bg-muted/40 p-8 md:block">
      <div className="mb-6 text-3xl">Dashboard</div>
      <nav className="grid items-start gap-y-3 text-sm font-medium">
        {menu.map((item) => (
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg text-xl text-muted-foreground transition-all hover:text-primary"
            key={item.label}
            onClick={() => {
              toast({
                title: item.label,
                description: item.label,
              })
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
