import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Technexus Registration Portal',
  description: '6th Edition TECHNEXus – Upskilling & Learning for Students',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F59E0B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='4' y='4' width='16' height='16' rx='2' /><rect x='9' y='9' width='6' height='6' /><line x1='9' y1='1' x2='9' y2='4' /><line x1='15' y1='1' x2='15' y2='4' /><line x1='9' y1='20' x2='9' y2='23' /><line x1='15' y1='20' x2='15' y2='23' /><line x1='20' y1='9' x2='23' y2='9' /><line x1='20' y1='14' x2='23' y2='14' /><line x1='1' y1='9' x2='4' y2='9' /><line x1='1' y1='14' x2='4' y2='14' /></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
