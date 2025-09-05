import type { Metadata } from 'next';
import { Montserrat, Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/providers/SessionProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin']
});

const robotoMono = Roboto_Mono({
  variable: '--font-robotoMono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Pesto',
  description: 'Pesto is a platform for finding the perfect appetizers'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.variable} ${roboto.variable} ${robotoMono.variable} antialiased bg-surface`}
      >
        <SessionProvider>
          <div className='flex flex-col items-start justify-start h-screen w-full max-w-desktop mx-auto px-[4.5rem] max-tablet:px-[2rem] my-[4.5rem] max-tablet:my-[2rem]'>
            <div className='w-full flex flex-col items-start justify-start gap-24'>
              <Header />
              <main className='w-full flex flex-col items-start justify-start gap-24'>
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
