'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

import { useRole } from '@/shared/hooks';

// import { useRouter } from 'next/navigation';
// import { useGetUser } from '@/app/api/getUser';
// import { useLogout } from '@/app/api/logout';
import { DashboardSidebar } from '../DashboardSidebar';
import { FullScreenLoader } from '../FullScreenLoader';
// import { FullScreenLoader } from '../FullScreenLoader';
import { Header } from '../Header';
import { ScrollArea } from '../ui/scroll-area';
import { SidebarProvider } from '../ui/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const TaskHandlerDialog = dynamic(
  () => import('@/components/TaskHandlerDialog/TaskHandlerDialog'),
  {
    ssr: false,
  }
);

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const role = useRole();
  // const router = useRouter();

  // const { data, isLoading, isError } = useGetUser();
  // const { mutate } = useLogout();

  // useEffect(() => {
  //   if (isError) {
  //     mutate(null);
  //     router.push('/login');
  //   }
  // }, [isError]);

  if (!role) return <FullScreenLoader />;

  return (
    <SidebarProvider className="grid h-screen grid-rows-[max-content_1fr] overflow-hidden">
      <Header />
      <TaskHandlerDialog />
      <div className="flex items-start">
        <DashboardSidebar />
        <ScrollArea className="h-full max-h-[calc(100vh-56px)] w-full">
          <main className="px-8 py-14">{children}</main>
        </ScrollArea>
      </div>
    </SidebarProvider>
  );
};
