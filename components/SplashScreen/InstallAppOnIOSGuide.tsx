import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function InstallAppOnnIOSGuide() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="px-8 py-3 rounded-full bg-white text-black font-semibold text-lg tracking-wide shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 flex items-center gap-2">
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
          <span>Install</span>
        </DialogTrigger>
        <DialogContent aria-describedby="install-app-on-ios-guide">
          <DialogHeader>
            <DialogTitle>Add to HomeScreen</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-sm text-muted-foreground animate-fade-in">
            <p>To install this app on your iOS device:</p>
            <ol className="list-decimal list-inside mt-2">
              <li>
                Tap the share button <span aria-label="share icon">⎋</span> in
                Safari
              </li>
              <li>
                Scroll down and tap &quot;Add to Home Screen&quot;{" "}
                <span aria-label="plus icon">➕</span>
              </li>
              <li>Tap &quot;Add&quot; in the top right corner</li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
