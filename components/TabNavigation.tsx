"use client";

import { PlayCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TabNavigation({ currentTab }: { currentTab: string }) {
  const router = useRouter();

  function handleTabChange(value: string) {
    router.push(value);
  }

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="bg-background border-t">
        <div className="w-full grid grid-cols-2">
          <button
            onClick={() => handleTabChange("/")}
            className={`flex items-center justify-center py-3 px-4 ${
              currentTab === "/"
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted/50"
            }`}
          >
            <PlayCircle size={16} className="mr-2" />
            <span>Continue Training</span>
          </button>
          <button
            onClick={() => handleTabChange("/upload-audio")}
            className={`flex items-center justify-center py-3 px-4 ${
              currentTab === "/upload-audio"
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted/50"
            }`}
          >
            <PlusCircle size={16} className="mr-2" />
            <span>Import Lesson</span>
          </button>
        </div>
      </div>
    </div>
  );
}
