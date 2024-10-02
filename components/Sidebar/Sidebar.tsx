'use client';

import { MENU_LIST } from '@/constants/menu';

import { SidebarDesktop } from './SidebarDesktop';

export const Sidebar = () => {
  return <SidebarDesktop menu={MENU_LIST} />;
};
