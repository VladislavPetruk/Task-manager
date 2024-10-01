import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[max-content_1fr_max-content] overflow-hidden">
      <Header />
      <Sidebar />
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start"></main>
      <Footer />
    </div>
  );
}
