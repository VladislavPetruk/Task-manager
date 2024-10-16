'use client';

import { ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// import { AxiosError } from 'axios';
import { useGetUser } from '@/app/api/getUser';
import { useLogout } from '@/app/api/logout';

import { FullScreenLoader } from '../FullScreenLoader';
// import {
//   ImperativePanelGroupHandle,
//   ImperativePanelHandle,
// } from 'react-resizable-panels';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import { ScrollArea } from '../ui/scroll-area';

interface DashboardLayoutProps {
  children: ReactNode;
}

const UpdateTaskDialog = dynamic(
  () => import('@/components/UpdateTaskDialog/UpdateTaskDialog'),
  {
    ssr: false,
  }
);

// async function getUser(): Promise<UserResponse> {
//   try {
//     const { data } = await axios.get('/api/getUser');

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

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  // console.log(47747447);

  // const [user, setUser] = useState<string>('');

  // const [isCollapsed, setIsCollapsed] = useState(false);
  // const panelLeftRef = useRef<ImperativePanelHandle>(null);

  // const toggleCollapse = () => {
  //   if (panelLeftRef.current?.isCollapsed()) {
  //     panelLeftRef.current.expand();
  //   } else {
  //     panelLeftRef.current?.collapse();
  //   }
  // };
  // console.log(user);

  // To do in future

  const router = useRouter();

  const { data, isLoading, isError } = useGetUser();
  const { mutate } = useLogout();

  useEffect(() => {
    if (isError) {
      mutate(null);
      router.push('/login');
    }
  }, [isError]);

  // useEffect(() => {
  //   // if(!!user.length) return;
  //   const fetchData = async () => {
  //     const { username, error } = await getUser();

  //     if (error || !username) {
  //       push("/login");
  //       return;
  //     }
  //     setUser(username);
  //   };

  //   // call the function
  //   fetchData();

  //   // (async () => {
  //   //   const { user, error } = await getUser();
  //   //   console.log(user, error);

  //   // if (error) {
  //   //   push("/login");
  //   //   return;
  //   // }
  //   // })();
  // }, []);

  if (isLoading || !data) return <FullScreenLoader />;

  return (
    <div className="grid h-screen grid-rows-[max-content_1fr] overflow-hidden">
      <Header />
      <UpdateTaskDialog />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={20}
          maxSize={50}
          className="max-md:hidden"
          // collapsible={true}
          // collapsedSize={0}
          // ref={panelLeftRef}
          // onCollapse={() => setIsCollapsed(true)}
          // onExpand={() => setIsCollapsed(false)}
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="max-md:hidden"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   toggleCollapse();
          // }}
        />
        <ResizablePanel defaultSize={80}>
          <ScrollArea className="w-full">
            <main className="h-full px-8 py-14">{children}</main>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
