import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalSettingsProvider } from '@/context/GlobalSettingsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CustomBlock Studio',
  description: 'Local environment for designing UI component blocks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-slate-50 overflow-hidden`}>
        <GlobalSettingsProvider>
          {children}
        </GlobalSettingsProvider>
      </body>
    </html>
  );
}
