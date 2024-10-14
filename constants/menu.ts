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
    link: '/completed',
    label: 'Completed',
  },
  // {
  //   link: '/login',
  //   label: 'Login',
  // },
];
