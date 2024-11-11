"use client";

import LoadingLogo from "@/components/SplashScreen/LoadingLogo";
import WelcomeText from "@/components/SplashScreen/WelcomeText";
import EnterAppButton from "@/components/SplashScreen/EnterAppButton";

import usePWA from "@/hooks/use-pwa";

type SplashScreenProps = {
  hrefValue: string;
};

export default function SplashScreen({ hrefValue }: SplashScreenProps) {
  const { isOnline, isInstallable, isInstalled, handleInstallClick } = usePWA();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
      <LoadingLogo />
      <WelcomeText />
      {isOnline && isInstalled ? (
        <EnterAppButton hrefValue={hrefValue} />
      ) : isInstalled ? (
        <p className="flex flex-col gap-1 text-center text-xs text-red-300">
          <span>Currently you cannot use the Mini Story App offline.</span>
          <span>Please connect to the internet to use it.</span>
        </p>
      ) : isInstallable ? (
        <button onClick={handleInstallClick}>Install</button>
      ) : (
        <p className="flex flex-col gap-1 text-center text-xs text-red-300">
          <span>You cannot install this app.</span>
          <span>
            Your device does not support it or you have it installed already.
          </span>
        </p>
      )}
    </div>
  );
}
