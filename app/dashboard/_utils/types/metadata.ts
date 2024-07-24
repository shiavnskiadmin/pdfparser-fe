export interface Annotation {
  x: number;
  y: number;
}

export interface AnnotatedRegion {
  [key: string]: string | number | Annotation;
}

export interface PdfDataTypes {
  id: string;
  pdf_name: string;
  company_name: string;
  pdf_category: string;
  pdf_sub_category: string;
  pdf_sub_sub_category: string;
  pdf_base64_img: string;
  multipage: boolean;
  hasTables: boolean;
  annoted_region: AnnotatedRegion[];
  [key: string]: string | boolean | number | AnnotatedRegion[];
}

export type FieldType = {
  value: string;
  type: string | number | boolean;
};
