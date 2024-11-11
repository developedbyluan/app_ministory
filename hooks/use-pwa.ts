"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
};

export default function usePWA() {
  const [isOnline, setIsOnline] = useState(true);
  const [isInstallable, setIsInstallable] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (typeof navigator === "undefined") return;

    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service worker registration successful", registration);
      })
      .catch((error) => {
        console.log("Service worker registration failed", error);
      });

    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Add to HomeScreen
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setIsInstallable(true);
      setInstallPrompt(event);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    const handleAppInstalled = () => {
      setIsInstallable(false);
    };

    window.addEventListener(
      "appinstalled",
      handleAppInstalled as EventListener
    );

    setIsInstalled(window.matchMedia("(display-mode: standalone)").matches);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
      window.removeEventListener(
        "appinstalled",
        handleAppInstalled as EventListener
      );
    };
  }, []);

  function handleInstallClick() {
    if (!installPrompt) return;

    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        setIsInstallable(false);
      }
      setInstallPrompt(null);
    });
  }

  return { isOnline, isInstallable, handleInstallClick, isInstalled };
}
