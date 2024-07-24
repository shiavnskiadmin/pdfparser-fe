"use client";

import StepperComponent from "@/components/ui/stepper";
import React from "react";
import { train_steps } from "../_data/train-resources-data";

type Props = {};

const TrainResourcesPage = (props: Props) => {
  return (
    <div className="pt-[3.8rem] px-10 flex flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Train Resources
            </h2>
            <p className="text-muted-foreground">
              Create your own category for annotation
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <StepperComponent steps={train_steps} />
        </div>
      </div>
    </div>
  );
};

export default TrainResourcesPage;
