"use client";

import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Minus, Plus } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { metaDataCategories } from "../../_data/data";
import { useMetaDataStore } from "../../_utils/zustandUtils/metaDataStore";
import CategorySelector from "@/components/elements/category-selector";
import { v4 as uuid } from "uuid";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
type Props = {};

const SetupMetaData = (props: Props) => {
  const { pdfData, setPdfData } = useMetaDataStore();

  const categories: any[] = Object.keys(metaDataCategories);

  useEffect(() => {
    setPdfData({
      ...pdfData,
      id: uuid(),
    });
  }, []);

  const subcategories: any[] =
    pdfData.pdf_category && metaDataCategories[pdfData.pdf_category]
      ? Object.keys(metaDataCategories[pdfData.pdf_category as string])
      : [];

  const subsubCategories: any[] =
    pdfData.pdf_category &&
    pdfData.pdf_sub_category &&
    metaDataCategories[pdfData.pdf_category]?.[pdfData.pdf_sub_category]
      ? Object.values(
          metaDataCategories[pdfData.pdf_category][pdfData.pdf_sub_category]
        )
      : [];

  // Function to add a new metadata field
  // const addField = () => {
  //   setFields([...fields, { value: "", type: "" }]);
  // };

  // // Function to remove the last added metadata field
  // const removeField = () => {
  //   if (fields.length > 1) {
  //     const newFields = [...fields];
  //     newFields.pop();
  //     setFields(newFields);
  //   }
  // };

  // const handleFieldChange = (index: number, value: string, type: string) => {
  //   const newFields = [...fields];
  //   let newType: string | number | boolean;

  //   if (type === " ") {
  //     newType = type.replace(/\s/g, "");
  //   } else if (type === "false") {
  //     newType = false;
  //   } else {
  //     newType = parseInt(type);
  //   }

  //   newFields[index] = { value, type: newType };
  //   setFields(newFields);
  // };

  console.log("pdfData:", pdfData);

  return (
    <div className="min-h-40 w-full px-5 py-3">
      <div className="flex items-center gap-x-2">
        <Input
          onChange={(e) => {
            setPdfData({
              ...pdfData,
              pdf_name: e.target.value,
            });
          }}
          placeholder="Pdf name"
        />
        <Input
          onChange={(e) => {
            setPdfData({
              ...pdfData,
              company_name: e.target.value,
            });
          }}
          placeholder="Company name"
        />
      </div>
      <div className="flex items-center gap-x-2 my-2">
        {/* Add Select dropdowns for categories, subcategories, and sub-subcategories */}
        <CategorySelector
          onValueChange={(data) => {
            setPdfData({
              ...pdfData,
              pdf_category: data,
              pdf_sub_category: "",
            });
          }}
          placeholder={"Select Category"}
          categories={categories}
        />

        {/* Add Select dropdowns for categories, subcategories, and sub-subcategories */}
        <CategorySelector
          onValueChange={(data) => {
            setPdfData({
              ...pdfData,
              pdf_sub_category: data,
              pdf_sub_sub_category: "",
            });
          }}
          placeholder={"Select Subcategory"}
          disabled={pdfData.pdf_category?.length === 0}
          categories={subcategories}
        />
      </div>

      <div className="flex items-center gap-x-2 my-2">
        <CategorySelector
          onValueChange={(data) => {
            setPdfData({
              ...pdfData,
              pdf_sub_sub_category: data,
            });
          }}
          placeholder={"Select Sub Subcategory"}
          categories={subsubCategories}
          disabled={pdfData.pdf_sub_category?.length === 0}
        />

        <div className="flex items-center gap-x-4 min-w-max ms-12">
          <Switch
            onCheckedChange={() => {
              setPdfData({
                ...pdfData,
                multipage: !pdfData.multipage,
              });
            }}
          />
          <Label>Multipage PDF</Label>
        </div>
        <div className="flex items-center gap-x-4 flex-1 min-w-max ms-10">
          <Switch
            onCheckedChange={() => {
              setPdfData({
                ...pdfData,
                hasTables: !pdfData.hasTables,
              });
            }}
          />
          <Label>PDF contains tables</Label>
        </div>
      </div>

      {/* Render metadata fields */}
      {/* {fields.map((field, index) => (
        <div key={index} className="mt-2 flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <Input
              value={field.value}
              onChange={(e) => handleFieldChange(index, e.target.value, "")}
              placeholder="Custom metadata"
            />
            <Select
              onValueChange={(data) => {
                // need to set this value to the field
                handleFieldChange(index, field.value, data);
              }}
              disabled={field.value.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder={"Field type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">String</SelectItem>
                <SelectItem value={String(0)}>Number</SelectItem>
                <SelectItem value={String(false)}>Boolean</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {index === fields.length - 1 && ( // Show remove button only for the last field
            <div className="flex items-center gap-x-2">
              <Button
                type="button"
                onClick={removeField}
                size="icon"
                variant="secondary"
                className="h-min w-min p-2 bg-accent/50"
              >
                <Minus className="h-3 w-3" />
              </Button>

              <Button
                type="button"
                variant="default"
                size="icon"
                className="h-min w-min p-2"
                onClick={addField}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      ))} */}
    </div>
  );
};

export default SetupMetaData;
