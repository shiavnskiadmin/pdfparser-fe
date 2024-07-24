"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import { useFileStore } from "../../_utils/zustandUtils/fileStore";

interface AddLabelProp {
  file: string;
  fileType: string;
}

export function PreviewUploadedImage({ file, fileType }: AddLabelProp) {
  const { filename } = useFileStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size={"icon"} className="h-min w-min p-2">
          <EyeIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-min py-10">
        {(fileType == "image/png" || fileType == "image/jpeg") && (
          <div className="relative h-[400px] w-[600px]">
            <Image src={file} fill alt={"Source image"} />
          </div>
        )}

        {fileType == "application/pdf" && (
          <div className="h-[600px] overflow-scroll">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={file} />
            </Worker>
          </div>
        )}

        <Label className="mt-2">{filename}</Label>
      </DialogContent>
    </Dialog>
  );
}
