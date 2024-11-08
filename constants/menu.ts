import {
  ChartArea,
  ClipboardList,
  ListPlus,
  LucideProps,
  Settings,
  Trash2,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type MenuItem = {
  link: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

export const USER_MENU_LIST: Array<MenuItem> = [
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
];

export const SUBSCRIBER_MENU_LIST: Array<MenuItem> = [
  {
    link: '/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export const ADMIN_MENU_LIST: Array<MenuItem> = [
  {
    link: '/analytics',
    label: 'Analytics',
    icon: ChartArea,
  },
];
