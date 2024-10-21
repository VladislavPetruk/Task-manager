import { ComponentProps } from 'react';
import Link from 'next/link';

import { MENU_LIST } from '@/constants/menu';

import { Collapsible } from '../ui/collapsible';
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '../ui/sidebar';

export const DashboardSidebar = ({
  ...props
}: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarMenu className="grid gap-y-4 py-8">
        {MENU_LIST.map((item) => (
          <Collapsible key={item.label} asChild className="group/collapsible">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.label} className="h-full">
                <Link
                  href={item.link}
                  className="flex w-full items-center gap-x-2"
                >
                  {item.icon && <item.icon size={26} className="shrink-0" />}
                  <span className="flex-1">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
      <SidebarRail />
    </Sidebar>
  );
};
