"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SetStateAction, useState } from "react";

interface AddLabelProp {
  selectedArea: object | null | any;
  handleOK: () => void;
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
}

export function AddLabelDialog({
  text,
  setText,
  selectedArea,
  handleOK,
}: AddLabelProp) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          style={{ width: "100px" }}
          disabled={!selectedArea}
        >
          Add Label
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Label</DialogTitle>
          <DialogDescription>
            Select the area and add label accordingly
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              label
            </Label>
            <Input
              value={text}
              id="label"
              onChange={(e) => setText(e.target.value)}
              placeholder="this is ...."
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => {
                setText("");
                handleOK();
              }}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
