"use client";

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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
      <LoadingLogo />
      <WelcomeText />
      {isOnline ? (
        <EnterAppButton hrefValue={hrefValue} />
      ) : (
        <p className="flex flex-col gap-1 text-center text-xs text-red-300">
          <span>Currently you cannot use the Mini Story App offline.</span>
          <span>Please connect to the internet to use it.</span>
        </p>
      )}
    </div>
  );
}
