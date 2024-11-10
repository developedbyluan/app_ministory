"use client";
import { redirect } from "next/navigation";

import LoadingLogo from "@/components/SplashScreen/LoadingLogo";
import WelcomeText from "@/components/SplashScreen/WelcomeText";
import EnterAppButton from "@/components/SplashScreen/EnterAppButton";
import { useEffect } from "react";

type SplashScreenProps = {
  hrefValue: string;
  isOnline: boolean;
};

export default function SplashScreen({
  hrefValue,
  isOnline,
}: SplashScreenProps) {
  useEffect(() => {
    if (isOnline) setTimeout(() => redirect(hrefValue), 3000);
  }, [isOnline, hrefValue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
      <LoadingLogo />
      <WelcomeText />
      {isOnline ? (
        <EnterAppButton hrefValue={hrefValue} />
      ) : (
        <p>Mini Story App needs internet connection to work.</p>
      )}
    </div>
  );
}
