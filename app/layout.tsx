import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'DEMO | Insurance Triage Evolved',
  description: 'AI-driven triage engine analyzing and prioritizing insurance claims.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-white text-slate-900 antialiased min-h-screen flex flex-col selection:bg-indigo-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
