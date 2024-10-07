import { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="grid min-h-screen place-content-center overflow-hidden">
      <main className="px-8 py-14">{children}</main>
    </div>
  );
};
