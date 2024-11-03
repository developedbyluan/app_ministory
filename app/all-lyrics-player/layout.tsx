import { Suspense } from "react";

export default function AllLyricsPlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="max-w-screen-sm mx-auto">{children}</main>
    </Suspense>
  );
}
