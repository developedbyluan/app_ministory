import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import TabNavigation from "@/components/TabNavigation";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-svh px-10">
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Effortless English Book
              </p>
              <h3 className="text-2xl font-bold">The Race MS</h3>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            aria-label={`Start 1 minute training session for The Race MS`}
            asChild
          >
            <Link
              href="/free-sample"
              className="flex justify-center items-center"
            >
              <PlayCircle size={24} aria-hidden="true" />
              Start Training
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <TabNavigation currentTab="/" />
    </div>
  );
}
