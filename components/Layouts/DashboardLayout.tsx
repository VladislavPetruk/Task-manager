'use client';

import { ReactNode, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

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

interface UserResponse {
  username?: string;
  error?: AxiosError;
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get('/api/me');

    return {
      username: data.username,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      error,
    };
  }
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  console.log(47747447);

  const [user, setUser] = useState<string>('');

  // const [isCollapsed, setIsCollapsed] = useState(false);
  // const panelLeftRef = useRef<ImperativePanelHandle>(null);

  // const toggleCollapse = () => {
  //   if (panelLeftRef.current?.isCollapsed()) {
  //     panelLeftRef.current.expand();
  //   } else {
  //     panelLeftRef.current?.collapse();
  //   }
  // };
  console.log(user);

  // To do in future

  // const { push } = useRouter();

  useEffect(() => {
    // if(!!user.length) return;
    const fetchData = async () => {
      const { username, error } = await getUser();

      if (error || !username) {
        // push("/login");
        return;
      }
      setUser(username);
    };

    // call the function
    fetchData();

    // (async () => {
    //   const { user, error } = await getUser();
    //   console.log(user, error);

    // if (error) {
    //   push("/login");
    //   return;
    // }
    // })();
  }, []);

  return (
    <div className="grid overflow-hidden">
      <Header />
      <div className="max-h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={20}
            maxSize={50}
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
            // onClick={(e) => {
            //   e.stopPropagation();
            //   toggleCollapse();
            // }}
          />
          <ResizablePanel defaultSize={80}>
            <ScrollArea className="h-screen w-full">
              <main className="px-8 py-14">{children}</main>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
