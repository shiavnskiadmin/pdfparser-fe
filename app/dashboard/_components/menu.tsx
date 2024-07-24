"use client";

import ToggleMode from "@/components/elements/toggle-ui-mode";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function Menu() {
  return (
    <Menubar className="border-t-0 backdrop-filter backdrop-blur-sm dark:bg-black/10 bg-white/10 border-x-0 border-b fixed top-0 rounded-none px-2 py-2 w-full justify-between lg:px-4 z-[99999]">
      <p className="text-[24px] font-medium leading-none">Dashboard</p>
      <ToggleMode />
    </Menubar>
  );
}
