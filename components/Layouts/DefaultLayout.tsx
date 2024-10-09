'use client';

import { ReactNode, useLayoutEffect } from 'react';
// import { useRouter } from 'next/navigation';

interface LoginLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LoginLayoutProps) => {
  // const { push } = useRouter();
  useLayoutEffect(() => {
    // if(!!user.length) return;
    // const fetchData = async () => {
    //   const { username, error } = await getUser();
    //   if (!error) {
    //     push('/');
    //     return;
    //   }
    // };
    // // call the function
    // fetchData();
    // (async () => {
    //   const { user, error } = await getUser();
    //   console.log(user, error);
    // if (error) {
    //   push("/login");
    //   return;
    // }
    // })();
  }, []);

  // const { data, isLoading, isError } = useGetUser()

  // useEffect(() => {
  //   if(!!data && !isError) {
  //     push("/");
  //   }
  // }, [data, isError])

  // if(isLoading) return null;

  return (
    <div className="grid min-h-screen place-content-center overflow-hidden">
      <main className="px-8 py-14">{children}</main>
    </div>
  );
};
