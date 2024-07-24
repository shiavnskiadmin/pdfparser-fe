"use client";

import React, { useState } from "react";
import AnnotatePdf from "./annotatePdf";
import { useFileStore } from "../../_utils/zustandUtils/fileStore";
import { Label } from "@/components/ui/label";

type Props = {};

const AnnotationProcess = (props: Props) => {
  const { image } = useFileStore();

  return (
    <>
      {!image ? (
        <div className="flex items-center flex-col py-10">
          <Label className="text-lg font-semibold text-center">
            Wanna submit a template for annotation?
          </Label>
          <Label className="text-accent-foreground/80 text-base font-medium mt-2 max-w-[80%] text-center">
            start from step one filling the details for template 😉
          </Label>

          <Label className="text-muted-foreground text-xs font-normal mt-10 text-center">
            Ignore if you submitted the required template
          </Label>
        </div>
      ) : (
        <AnnotatePdf imgSrc={image} />
      )}
    </>
  );
};

export default AnnotationProcess;
