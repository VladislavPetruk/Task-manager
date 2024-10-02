'use client';

import { useTheme } from 'next-themes';

// import { Switch } from '../ui/switch';
// export const ThemeToglle = () => {
//   const { setTheme, theme } = useTheme();
//   const isMounted = useIsMounted();
//   const onSwitchChange = () => {
//     if (theme === 'light') {
//       setTheme('dark');
//     }
//     if (theme === 'dark') {
//       setTheme('light');
//     }
//   };
//   console.log(isMounted);
// if (!isMounted) {
//   return null;
// }
//   return (
//     <Switch
//       checked={theme === 'dark'}
//       defaultChecked={theme === 'dark'}
//       onCheckedChange={onSwitchChange}
//     ></Switch>
//   );
// };
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMounted } from '@/hooks/useIsMounted';

export const ThemeToglle = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{theme} 1</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
