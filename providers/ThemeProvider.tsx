'use client';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { ReactNode, useEffect } from 'react';
import { setCookie } from 'cookies-next';

interface NextThemesProviderProps extends ThemeProviderProps {
  children: ReactNode | null;
}

function ThemeProviderHelper() {
  const { theme } = useTheme();

  useEffect(() => {
    setCookie('theme', theme, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      path: '/',
    });
  }, [theme]);

  return null;
}

export default function ThemeProvider({
  children,
  ...props
}: NextThemesProviderProps) {
  return (
    <NextThemesProvider enableColorScheme enableSystem {...props}>
      <ThemeProviderHelper />
      {children || null}
    </NextThemesProvider>
  );
}
