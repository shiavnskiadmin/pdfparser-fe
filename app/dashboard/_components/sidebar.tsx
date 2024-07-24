"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Playlist } from "../_data/playlists";
import { LogOutIcon, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);

  return (
    <aside className={cn("h-full pt-12", className)}>
      <div className="space-y-8 py-4 flex flex-col h-full justify-between">
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1  p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  onClick={() => {
                    router.push(playlist.pathname);
                  }}
                  variant="ghost"
                  className={`w-full justify-start text-muted-foreground/80 flex items-center gap-x-3 font-normal ${
                    pathname == playlist.pathname &&
                    "bg-accent text-accent-foreground"
                  }`}
                >
                  <span>{playlist.icon}</span>
                  <span>{playlist.label}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="px-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground/80 hover:text-muted-foreground flex items-center gap-x-3 font-normal"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
          <Button
            variant="secondary"
            className="w-full mt-2 justify-start gap-x-3 font-normal text-muted-foreground hover:text-[#303030] dark:hover:text-[#c0c0c0]"
          >
            <LogOutIcon className="h-5 w-5" />
            Log out
          </Button>
        </div>
      </div>
    </aside>
  );
}
