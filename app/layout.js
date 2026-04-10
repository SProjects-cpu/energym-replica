import { Oswald, Abel, Roboto, Permanent_Marker } from 'next/font/google';
import './globals.css';

const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });
const abel = Abel({ weight: '400', subsets: ['latin'], variable: '--font-abel', display: 'swap' });
const roboto = Roboto({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-roboto', display: 'swap' });
const permanentMarker = Permanent_Marker({ weight: '400', subsets: ['latin'], variable: '--font-marker', display: 'swap' });

export const metadata = {
  title: 'Energym - Human Power: On',
  description: 'Energym convert the energy from your workouts into clean useable electrical power. Introducing the RE:GEN - the world\'s first smart fitness bike that captures and converts your workout into clean, useable, electrical energy.',
  openGraph: {
    title: 'Energym - Human Power: On',
    description: 'Introducing the RE:GEN - the world\'s first smart fitness bike that generates clean energy.',
    url: 'https://energym.io/',
    siteName: 'Energym',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energym - Human Power: On',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${abel.variable} ${roboto.variable} ${permanentMarker.variable}`}>
      <body>{children}</body>
    </html>
  );
}
