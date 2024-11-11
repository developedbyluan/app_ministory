"use client";

import LoadingLogo from "@/components/SplashScreen/LoadingLogo";
import WelcomeText from "@/components/SplashScreen/WelcomeText";
import EnterAppButton from "@/components/SplashScreen/EnterAppButton";

import usePWA from "@/hooks/use-pwa";

type SplashScreenProps = {
  hrefValue: string;
};

export default function SplashScreen({ hrefValue }: SplashScreenProps) {
  const {
    isOnline,
    isInstallable,
    isStandaloneDisplayMode,
    handleInstallClick,
  } = usePWA();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
      <LoadingLogo />
      <WelcomeText />

      {isInstallable ? (
        <button
          onClick={handleInstallClick}
          className="px-8 py-3 rounded-full bg-white text-black font-semibold text-lg tracking-wide shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Install
        </button>
      ) : (
        !isStandaloneDisplayMode && (
          <p className="flex flex-col gap-1 text-center text-xs text-green-300">
            <span>Hi Friend, go to your HomeScreen. </span>
            <span>The Mini Story App waits for you there.</span>
          </p>
        )
      )}

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
