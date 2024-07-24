import {
  StickyNote,
  Layers3 as Layers,
  PickaxeIcon,
  BrainCircuit,
} from "lucide-react";

export type Playlist = (typeof playlists)[number];

export const playlists = [
  {
    pathname: "/dashboard",
    icon: <StickyNote className="h-5 w-5" />,
    label: "Home List",
  },
  {
    pathname: "/dashboard/annotations",
    icon: <Layers className="h-5 w-5" />,
    label: "Annotations",
  },
  {
    pathname: "/dashboard/extract",
    icon: <PickaxeIcon className="h-5 w-5" />,
    label: "Extract",
  },
  {
    pathname: "/dashboard/train-resources",
    icon: <BrainCircuit className="h-5 w-5" />,
    label: "Train Resources",
  },
];
