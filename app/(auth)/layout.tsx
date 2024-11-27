import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import { DefaultLayout } from '@/components/Layouts';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/shared/lib/utils';
import { ReactQueryClientProvider } from '@/shared/providers/ReactQueryClientProvider';

import '@/app/globals.css';

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(`${inter.className} antialiased`)}
        suppressHydrationWarning
      >
        <ReactQueryClientProvider>
          <DefaultLayout>{children}</DefaultLayout>
          <Toaster />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
