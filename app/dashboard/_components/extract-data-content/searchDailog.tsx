"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchTemplate from "./searchTemplate";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

type Props = {};

const SearchDailog = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="relative">
          <SearchIcon className="h-4 w-4 text-muted-foreground/80 absolute top-[12px] left-[10px]" />
          <Input
            placeholder="Search your template"
            className="min-w-[300px] px-10 cursor-pointer"
          />
          <p className="text-sm text-muted-foreground absolute top-[8px] right-[10px]">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 leading-none font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-sm leading-none">⌘</span>K
            </kbd>
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <SearchTemplate />
      </DialogContent>
    </Dialog>
  );
};

export default SearchDailog;
