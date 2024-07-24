"use client";

import React from "react";

type Props = {};

const AnnotationsPage = (props: Props) => {
  return (
    <div className="pt-[3.8rem] px-10 flex flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Your Annotations
            </h2>
            <p className="text-muted-foreground">
              Organize and Analyze your annotations
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AnnotationsPage;
