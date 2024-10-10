import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { MenuItem } from '@/constants/menu';

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
      <SheetTrigger asChild className="md:hidden">
        <Menu size={32} />
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
      </SheetContent>
    </Sheet>
  );
};
