import React from "react";
import { FileSliders, FileCog, Braces, HardDriveUpload } from "lucide-react";
import { StepItem } from "@/components/stepper";
import {
  AnnotatePdf,
  ConfigurePdf,
  SetupMetaData,
} from "../_components/train-resources-content";
import AnnotationProcess from "../_components/train-resources-content/annotationProcess";

interface TrainStepItem extends StepItem {
  //   add more according options according to steps
  content?: React.ReactNode;
}

export const train_steps: TrainStepItem[] = [
  {
    id: 1,
    label: "Setup Metadata",
    description: "Set up metadata for your sample.",
    icon: Braces,
    content: <SetupMetaData />,
  },
  {
    id: 2,
    label: "Upload your pdf",
    description: "Upload a PDF file here",
    icon: HardDriveUpload,
    content: <ConfigurePdf />,
  },
  {
    id: 3,
    label: "Annotate Places to Your Sample",
    description: "Add annotations to specific places in your sample.",
    icon: FileCog,
    content: <AnnotationProcess />,
  },
];
