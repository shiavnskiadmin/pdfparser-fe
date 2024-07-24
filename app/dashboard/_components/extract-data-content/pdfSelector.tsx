"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import SearchDailog from "./searchDailog";
import { metaDataCategories } from "../../_data/data";
import CategorySelector from "@/components/elements/category-selector";
import axios from "axios";
import { PdfDataTypes } from "../../_utils/types/metadata";
import { useMetaDataStore } from "../../_utils/zustandUtils/metaDataStore";
import { AxiosConn } from "@/configs/axios";

type Props = {
  selectdata: PdfDataTypes | null;
  setSelectData: React.Dispatch<React.SetStateAction<PdfDataTypes | null>>;
};

const PdfSelector = ({ selectdata, setSelectData }: Props) => {
  const [categoryData, setCategoryData] = useState({
    category: "",
    subCategory: "",
    subSubCategory: "",
  });
  const [tableData, setTableData] = useState<PdfDataTypes[] | null>(null);
  let axiosInstance = AxiosConn();

  useEffect(() => {
    (async () => {
      let resp = await axiosInstance.get("/template");

      setTableData(resp.data);
    })();
  }, []);

  const categories: string[] = Object.keys(metaDataCategories);

  const subcategories: string[] =
    categoryData.category.length !== 0
      ? Object.keys(metaDataCategories[categoryData.category])
      : [];

  const subsubCategories: string[] =
    categoryData.subCategory?.length !== 0
      ? Object.values(
          metaDataCategories[categoryData.category][categoryData.subCategory]
        )
      : [];

  const handleSelect = (key: number) => {
    if (tableData) {
      setSelectData(tableData[key]);
    }
  };

  return (
    <CardContent>
      <div className="flex items-center justify-between w-full mb-4">
        <SearchDailog />

        <div className="flex items-center gap-x-2 w-full max-w-lg">
          <CategorySelector
            onValueChange={(data) => {
              setCategoryData({
                ...categoryData,
                category: data,
                subCategory: "",
              });
            }}
            placeholder={
              categoryData.category.length != 0
                ? categoryData.category
                : "Select Category"
            }
            categories={categories}
          />

          {/* Add Select dropdowns for categories, subcategories, and sub-subcategories */}
          <CategorySelector
            onValueChange={(data) => {
              setCategoryData({
                ...categoryData,
                subCategory: data,
                subSubCategory: "",
              });
            }}
            placeholder={
              categoryData.subCategory.length != 0
                ? categoryData.subCategory
                : "Select Subcategory"
            }
            disabled={categoryData.category.length === 0}
            categories={subcategories}
          />

          <CategorySelector
            onValueChange={(data) => {
              setCategoryData({
                ...categoryData,
                subSubCategory: data,
              });
            }}
            placeholder={
              categoryData.subSubCategory.length != 0
                ? categoryData.subSubCategory
                : "Select Sub Subcategory"
            }
            categories={subsubCategories}
            disabled={categoryData.subCategory.length === 0}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-accent/0">
            <TableHead>Company name</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead className="hidden sm:table-cell">Sub Category</TableHead>
            <TableHead className="hidden md:table-cell">
              Sub-subcategory
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData?.map((data, i) => (
            <TableRow
              onClick={() => handleSelect(i)}
              className="cursor-pointer"
              key={i}
            >
              <TableCell>
                <div className="font-medium">{data.company_name}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {data.pdf_category}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {/* <Badge className="text-xs" variant="secondary">
                      Fulfilled
                    </Badge> */}
                <div className="font-medium">{data.pdf_sub_category}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="font-medium">{data.pdf_sub_sub_category}</div>
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default PdfSelector;
