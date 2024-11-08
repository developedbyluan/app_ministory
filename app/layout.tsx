import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import { DataProvider } from "@/contexts/DataContext";

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

export const metadata: Metadata = {
  title: "Mini Story App",
  description:
    "Mini Story App is a simple and easy-to-use audio player app tailored for Effortless English Learners taught by A.J. Hoge.",
  icons: {
    icon: [{ url: "/favicon.png", sizes: "196x196", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
