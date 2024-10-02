'use client';

import { useTheme } from 'next-themes';
import { MonitorCog, Moon, Sun, SunMoon } from 'lucide-react';

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
// import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMounted } from '@/hooks/useIsMounted';

import {
  Tooltip,
  // TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const ThemeToglle = () => {
  const { setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger>
              <SunMoon />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Toogle theme</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <Moon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <MonitorCog />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
