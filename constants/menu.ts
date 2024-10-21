import { LoaderCircle, LucideProps, NotebookPen, Trash } from 'lucide-react';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

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
    label: 'Active',
    icon: LoaderCircle,
  },
  {
    link: '/future',
    label: 'Future',
    icon: NotebookPen,
  },
  {
    link: '/completed',
    label: 'Completed',
    icon: Trash,
  },
  // {
  //   link: '/login',
  //   label: 'Login',
  // },
];
