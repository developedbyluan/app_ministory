"use client";

import LoadingLogo from "@/components/SplashScreen/LoadingLogo";
import WelcomeText from "@/components/SplashScreen/WelcomeText";
import EnterAppButton from "@/components/SplashScreen/EnterAppButton";
import AppInstallButton from "@/components/SplashScreen/AppInstallButton";
import InstallAppOnIOSGuide from "@/components/SplashScreen/InstallAppOnIOSGuide";
import usePWA from "@/hooks/use-pwa";

import { redirect } from "next/navigation";
import { useEffect } from "react";

type SplashScreenProps = {
  hrefValue: string;
};

export default function SplashScreen({ hrefValue }: SplashScreenProps) {
  const {
    isOnline,
    isInstallable,
    isStandaloneDisplayMode,
    isIOS,
    handleInstallClick,
  } = usePWA();

  useEffect(() => {
    if (isStandaloneDisplayMode) {
      redirect(hrefValue);
    }
  }, [isStandaloneDisplayMode, hrefValue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
      <LoadingLogo />
      <WelcomeText />

      {isInstallable ? (
        <AppInstallButton
          onInstallClick={handleInstallClick}
          installText="Install"
        />
      ) : (
        !isStandaloneDisplayMode &&
        !isIOS && (
          <p className="flex flex-col gap-1 text-center text-xs text-green-300">
            <span>Hi Friend, go to your HomeScreen. </span>
            <span>The Mini Story App waits for you there.</span>
          </p>
        )
      )}

      {isIOS && !isStandaloneDisplayMode && <InstallAppOnIOSGuide />}

      {isOnline && isStandaloneDisplayMode && (
        <EnterAppButton hrefValue={hrefValue} />
      )}

      {!isOnline && (
        <p className="flex flex-col gap-1 text-center text-xs text-red-300">
          <span>Currently you cannot use the Mini Story App offline.</span>
          <span>Please connect to the internet to use it.</span>
        </p>
      )}
    </div>
  );
}
