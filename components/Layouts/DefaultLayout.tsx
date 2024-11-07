'use client';

import { ReactNode } from 'react';
// import { useRouter } from 'next/navigation';

// import { useGetUser } from '@/app/api/getUser';

// import { FullScreenLoader } from '../FullScreenLoader';

interface LoginLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LoginLayoutProps) => {
  // const router = useRouter();
  // const { data, isLoading, isError } = useGetUser();

  // useEffect(() => {
  //   if (!!data && !isError) {
  //     router.push('/');
  //   }
  // }, [data, isError]);

  // if (isLoading || !!data) return <FullScreenLoader />;

  return (
    <div className="grid min-h-screen place-content-center overflow-hidden">
      <main className="h-full px-8 py-14">{children}</main>
    </div>
  );
};
