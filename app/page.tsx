"use client";

import SplashScreen from "@/components/SplashScreen";
import usePWA from "@/hooks/use-pwa";

export default function HomePage() {
  const { isOnline } = usePWA();
  return <SplashScreen hrefValue="/upload-audio" isOnline={isOnline} />;
}
