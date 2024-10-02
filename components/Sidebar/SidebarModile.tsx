import { useState } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

import { MenuItem } from '@/constants/menu';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface SidebarDesktopProps {
  menu: Array<MenuItem>;
}

export const SidebarModile = ({ menu }: SidebarDesktopProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const triggerMenu = () => {
    if (!isMenuOpen) return;
    setIsMenuOpen(false);
  };

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild className="absolute left-3 top-3 md:hidden">
        <button>toggle</button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col md:hidden">
        <nav className="grid gap-2 text-lg font-medium">
          {menu.map((item) => (
            <Link
              href={item.link}
              className="flex items-center gap-3 rounded-lg text-xl text-muted-foreground"
              key={item.label}
              onClick={triggerMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button>
          <LogOut />
          Log Out
        </Button>
      </SheetContent>
    </Sheet>
  );
};
