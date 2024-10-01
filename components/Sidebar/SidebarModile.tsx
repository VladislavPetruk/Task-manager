import React from 'react';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

import { MenuItem } from './Sidebar.types';

interface SidebarDesktopProps {
  menu: Array<MenuItem>;
}

export const SidebarModile = ({ menu }: SidebarDesktopProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="absolute left-3 top-3 md:hidden">
        <button>toggle</button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col md:hidden">
        <nav className="grid gap-2 text-lg font-medium">
          {menu.map((item) => (
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
              key={item.label}
            >
              <span className="sr-only">{item.label}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
