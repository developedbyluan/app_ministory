"use client";

import SplashScreen from "@/components/SplashScreen";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Link href="/free-sample">free sample</Link>
      <SplashScreen hrefValue="/upload-audio" />
    </div>
  );
}
