import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { clinic } from '@/lib/config';

const siteUrl = new URL(['https:', '', 'healthflowclinic.demo'].join('/'));

export const metadata: Metadata = {
  title: {
    default: `${clinic.name} | Care that moves with you`,
    template: `%s | ${clinic.name}`,
  },
  description: clinic.description,
  metadataBase: siteUrl,
  openGraph: {
    title: clinic.name,
    description: clinic.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: clinic.name,
    description: clinic.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-3 gap-2 rounded-2xl border border-white/60 bg-white/90 p-2 shadow-soft backdrop-blur-xl md:hidden">
          <a href={`tel:${clinic.phone}`} className="grid min-h-11 place-items-center text-[10px] font-bold text-navy">
            <span>☎</span>
            Call clinic
          </a>
          <a href="/appointment" className="grid min-h-11 place-items-center rounded-xl bg-navy text-[10px] font-bold text-white">
            Book now
          </a>
          <a href="/track" className="grid min-h-11 place-items-center text-[10px] font-bold text-navy">
            Track queue
          </a>
        </div>
        <Footer />
      </body>
    </html>
  );
}
