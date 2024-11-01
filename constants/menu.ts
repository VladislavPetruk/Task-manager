import { ClipboardList, ListPlus, LucideProps, Trash2 } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type MenuItem = {
  link: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

export const MENU_LIST: Array<MenuItem> = [
  {
    link: '/',
    label: 'Current',
    icon: ClipboardList,
  },
  {
    link: '/scheduled',
    label: 'Scheduled',
    icon: ListPlus,
  },
  {
    link: '/archived',
    label: 'Archived',
    icon: Trash2,
  },
  // {
  //   link: '/login',
  //   label: 'Login',
  // },
];
