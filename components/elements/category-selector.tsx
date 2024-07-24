"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  categories?: string[];
  onValueChange?: (value: string) => void;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

const CategorySelector = ({
  categories,
  onValueChange,
  placeholder,
  disabled,
  className,
}: Props) => {
  return (
    <Select onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue className={className} placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((category, index) => (
          <SelectItem key={index} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
