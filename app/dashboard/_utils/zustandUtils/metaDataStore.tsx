import { create } from "zustand";
import { FieldType, PdfDataTypes } from "../types/metadata";

type State = {
  pdfData: PdfDataTypes;
  fields: FieldType[];
};

type Actions = {
  setPdfData: (pdfData: PdfDataTypes) => void;
  setFields: (fields: FieldType[]) => void;
};

const initialPdfData: PdfDataTypes = {
  id: "",
  pdf_name: "",
  company_name: "",
  pdf_category: "",
  pdf_sub_category: "",
  pdf_sub_sub_category: "",
  pdf_base64_img: "",
  multipage: false,
  hasTables: false,
  annoted_region: [],
};

const initialFieldValues: FieldType[] = [
  {
    value: "",
    type: "",
  },
];

export const useMetaDataStore = create<State & Actions>((set) => ({
  pdfData: initialPdfData,
  fields: initialFieldValues,
  setPdfData: (pdfData) => set(() => ({ pdfData })),
  setFields: (fields) => set(() => ({ fields })),
}));
