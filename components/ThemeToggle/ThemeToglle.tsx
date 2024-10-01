import { useTheme } from 'next-themes';

import { useIsMounted } from '@/hooks/useIsMounted';

import { Switch } from '../ui/switch';

export const ThemeToglle = () => {
  const { setTheme, theme } = useTheme();
  const isMounted = useIsMounted();

  const onSwitchChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    }
    if (theme === 'dark') {
      setTheme('light');
    }
  };

  console.log(isMounted);

  if (!isMounted) {
    return null;
  }
  return (
    <Switch
      checked={theme === 'dark'}
      defaultChecked={theme === 'dark'}
      onCheckedChange={onSwitchChange}
    ></Switch>
  );
};
