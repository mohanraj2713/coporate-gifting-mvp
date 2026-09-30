import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GiftFlow - Modern Corporate Gifting Platform',
  description: 'Enterprise corporate gifting solutions for campaigns, recipient management, and delivery tracking.',
};

import { StoreProvider } from '@/components/StoreProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <StoreProvider>
          <Sidebar>{children}</Sidebar>
        </StoreProvider>
      </body>
    </html>
  );
}
