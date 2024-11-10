"use client";
// import { redirect } from "next/navigation";

import LoadingLogo from "@/components/SplashScreen/LoadingLogo";
import WelcomeText from "@/components/SplashScreen/WelcomeText";
import EnterAppButton from "@/components/SplashScreen/EnterAppButton";

type SplashScreenProps = {
  hrefValue: string;
  isOnline: boolean;
};

export default function SplashScreen({
  hrefValue,
  isOnline,
}: SplashScreenProps) {
  // redirect("/upload-audio");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
      <LoadingLogo />
      <WelcomeText />
      <p>{isOnline ? "Online" : "Offline"}</p>
      <EnterAppButton hrefValue={hrefValue} />
    </div>
  );
}
