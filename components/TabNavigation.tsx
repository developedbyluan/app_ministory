"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-homepage";
import { PlayCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TabNavigation({ currentTab }: { currentTab: string }) {
  const router = useRouter();

  function handleTabChange(value: string) {
    router.push(value);
  }

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger className="col-start-1" value="/">
            <PlayCircle size={16} className="mr-2" />
            <span>Continue Training</span>
          </TabsTrigger>
          <TabsTrigger className="col-start-2" value="/upload-audio">
            <PlusCircle size={16} className="mr-2" />
            <span>Import Lesson</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
