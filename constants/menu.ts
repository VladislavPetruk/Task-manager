export type MenuItem = {
  link: string;
  label: string;
};

export const MENU_LIST: Array<MenuItem> = [
  {
    link: '/',
    label: 'Active',
  },
  {
    link: '/future',
    label: 'Future',
  },
  {
    link: '/history',
    label: 'History',
  },
];
