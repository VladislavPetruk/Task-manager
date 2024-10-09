import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { useLogout } from '@/app/api/logout';
import { MenuItem } from '@/constants/menu';

import { Button } from '../ui/button';

interface SidebarDesktopProps {
  menu: Array<MenuItem>;
}

// async function logOut(): Promise<any> {
//   try {
//     const { data } = await axios.get('/api/logout');

//     return {
//       username: data.username,
//     };
//   } catch (e) {
//     const error = e as AxiosError;

//     return {
//       error,
//     };
//   }
// }

export const SidebarDesktop = ({ menu }: SidebarDesktopProps) => {
  const { push } = useRouter();
  const { mutate } = useLogout({
    onMutate: () => {
      push('/login');
    },
  });
  const handleLogout = () => {
    mutate(null);
  };

  return (
    <div className="hidden h-full w-full gap-y-8 border-r bg-muted/40 p-8 md:grid md:grid-rows-[max-content_1fr_max-content]">
      <div className="text-3xl">Dashboard</div>
      <nav className="block items-start gap-y-3 text-sm font-medium">
        {menu.map((item) => (
          <Link
            href={item.link}
            className="flex items-center gap-3 rounded-lg text-xl text-muted-foreground transition-all hover:text-primary"
            key={item.label}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Button onClick={handleLogout}>
        <LogOut />
        Log Out
      </Button>
    </div>
  );
};
