import type { Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import { DataProvider } from "@/contexts/DataContext";

export { metadata } from "@/lib/metadata";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link
          rel="apple-touch-startup-image"
          href="/apple-splash-2048-2732.jpg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>
          <main>{children}</main>
          <Toaster />
        </DataProvider>
      </body>
    </html>
  );
}
