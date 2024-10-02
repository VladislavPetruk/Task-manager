'use client';

import { ReactNode } from 'react';

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

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  // const panelLeftRef = useRef<ImperativePanelHandle>(null);

  // const toggleCollapse = () => {
  //   if (panelLeftRef.current?.isCollapsed()) {
  //     panelLeftRef.current.expand();
  //   } else {
  //     panelLeftRef.current?.collapse();
  //   }
  // };

  // To do in future

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
