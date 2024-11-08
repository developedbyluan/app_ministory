import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ministorybeta.vercel.app"),
  title: "Mini Story App",
  description:
    "Mini Story App is a simple and easy-to-use audio player app tailored for Effortless English Learners taught by A.J. Hoge.",
  icons: {
    icon: [{ url: "/favicon.png", sizes: "256x256", type: "image/png" }],
    apple: [
      { url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mini Story App",
    startupImage: "/apple-splash-1206-2622.jpg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};
