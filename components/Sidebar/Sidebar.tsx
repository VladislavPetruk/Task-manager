'use client';

import { MenuItem } from './Sidebar.types';
import { SidebarDesktop } from './SidebarDesktop';
import { SidebarModile } from './SidebarModile';

const MENU_LIST: Array<MenuItem> = [
  {
    link: '/',
    label: 'All tasks',
  },
  {
    link: '/',
    label: 'In progress',
  },
  {
    link: '/',
    label: 'Completed',
  },
];

export const Sidebar = () => {
  return (
    <>
      <SidebarDesktop menu={MENU_LIST} />
      <SidebarModile menu={MENU_LIST} />
    </>
  );
};
