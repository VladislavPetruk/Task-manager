import { ComponentProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logoImage from '@/app/logo.svg';
import {
  ADMIN_MENU_LIST,
  SUBSCRIBER_MENU_LIST,
  USER_MENU_LIST,
} from '@/constants/menu';
import { useRole } from '@/hooks';

import { Collapsible } from '../ui/collapsible';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '../ui/sidebar';

export const DashboardSidebar = ({
  ...props
}: ComponentProps<typeof Sidebar>) => {
  const role = useRole();
  const menu =
    role === 'ADMIN'
      ? [...USER_MENU_LIST, ...SUBSCRIBER_MENU_LIST, ...ADMIN_MENU_LIST]
      : role === 'SUBSCRIBER'
        ? [...USER_MENU_LIST, ...SUBSCRIBER_MENU_LIST]
        : USER_MENU_LIST;

  return (
    <Sidebar collapsible="icon" className="py-2" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Link
                href="/"
                className="flex items-center gap-x-2 text-2xl leading-10"
              >
                <Image src={logoImage} width={24} height={24} alt="Logo" />
                Logo
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarMenu className="grid gap-y-4 py-14">
        {menu.map((item) => (
          <Collapsible key={item.label} asChild className="group/collapsible">
            <SidebarMenuItem className="px-2">
              <SidebarMenuButton tooltip={item.label} className="h-full">
                <Link
                  href={item.link}
                  className="flex w-full items-center gap-x-2"
                >
                  {item.icon && <item.icon size={28} className="shrink-0" />}
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
