"use client";

import React from "react";
import { UserNav } from "./_components/user-nav";
import { DataTable } from "./_components/data-table/data-table";
import { tasks } from "./_data/tasks";
import { columns } from "./_components/data-table/columns";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="pt-[3.8rem] px-10 flex flex-col">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="delay-75 text-2xl font-bold tracking-tight">Documents</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your saved documents!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  );
};

export default DashboardPage;
