'use client'; // Mark as client component

import { useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'; // Import usePathname
import "./globals.css";
import BottomNavigation from '@/components/ui/navigation/BottomNavigation';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"], // Regular and Semibold
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeTab, setActiveTab] = useState<'home' | 'notifications'>('home');
  const pathname = usePathname(); // Get current route

  const handleTabChange = (tab: 'home' | 'notifications') => {
    setActiveTab(tab);
  };

  // Determine if BottomNavigation should be shown. 
  // It shouldn't be shown on the finalization page, nor on the class selection page (as per its mockup).
  const hideNavigation = pathname === '/finalization' || pathname === '/class-selection' || pathname === '/';

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div style={{ flexGrow: 1, paddingBottom: hideNavigation ? '0' : '60px' }}>
          {children}
        </div>
        {!hideNavigation && (
          <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </body>
    </html>
  );
}
