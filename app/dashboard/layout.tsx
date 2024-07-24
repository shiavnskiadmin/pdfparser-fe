// import type { Metadata } from "next";
// import { Menu } from "./components/menu";
// import { playlists } from "./data/playlists";
// import { Sidebar } from "./components/sidebar";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export const metadata: Metadata = {
//   title: "PDF anotator | Dashboard",
//   description: "this is a pdf annotator",
// };

// export default function DashboardLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <main>
//       <div className="hidden h-screen md:flex md:flex-col">
//         <Menu />
//         <div className="flex-1">
//           <div className="bg-background h-full">
//             {/* <div className="grid lg:grid-cols-5 h-full">
//               <Sidebar playlists={playlists} className="hidden lg:block" />
//               <div className="col-span-3 lg:col-span-4 lg:border-l">
//                 <div className="h-full px-4 py-6 lg:px-8 ">{children}</div>
//               </div>
//             </div> */}

//             <div className="flex h-full">
//               <Sidebar
//                 playlists={playlists}
//                 className="hidden lg:block min-w-[300px]"
//               />
//               <ScrollArea className="flex-1 max-h-screen lg:border-l pt-[10vh]">
//                 {/* <div className="px-4 py-6 lg:px-8 ">{children}</div> */}
//                 {children}
//               </ScrollArea>
//               {/* <div className="lg:border-l flex-[0.8] overflow-hidden">
//                 <div className="px-4 py-6 lg:px-8 ">{children}</div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="h-screen flex items-center justify-center md:hidden">
//         <Label>use large screen to view dashboard</Label>
//       </div>
//     </main>
//   );
// }

import type { Metadata } from "next";
import { Menu } from "./_components/menu";
import { playlists } from "./_data/playlists";
import { Sidebar } from "./_components/sidebar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "PDF anotator | Dashboard",
  description: "this is a pdf annotator",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Toaster position="top-center" />
      <Menu />
      <div className="flex h-screen">
        <Sidebar playlists={playlists} className="min-w-[250px]" />
        <div className="relative h-full border-l overflow-y-auto hide-scrollbar w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
