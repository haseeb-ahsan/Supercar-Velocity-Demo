import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

// Headings font, used via the --font-heading CSS variable
const playfairDisplay = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// Body font, used via the --font-body CSS variable
const montserrat = Montserrat({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Supercar Velocity | Luxury Performance. Exceptional Vehicles.',
  description:
    'Browse our curated collection of supercars, hypercars, and prestige vehicles. Arrange finance, reserve a vehicle, or speak to our sales team.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${playfairDisplay.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col bg-background text-text font-body'>
        <CurrencyProvider>
          <Navbar />
          <div className='flex-1'>{children}</div>
          <Footer />
          <WhatsAppButton />
        </CurrencyProvider>
      </body>
    </html>
  );
}
