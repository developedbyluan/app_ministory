"use client";

import SplashScreen from "@/components/SplashScreen";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Link
        className="text-blue-500 fixed top-4 left-4 text-sm"
        href="/free-sample"
      >
        free sample
      </Link>
      <SplashScreen hrefValue="/upload-audio" />
    </div>
  );
}
