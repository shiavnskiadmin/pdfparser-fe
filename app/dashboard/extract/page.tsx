"use client";

import React, { useEffect, useRef, useState } from "react";
import PdfSelector from "../_components/extract-data-content/pdfSelector";
import { PdfDataTypes } from "../_utils/types/metadata";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PreviewUploadedImage } from "../_components/train-resources-content/previewUploadedImage";
import { useFileStore } from "../_utils/zustandUtils/fileStore";
import { Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { useMetaDataStore } from "../_utils/zustandUtils/metaDataStore";
import { pdfjs } from "react-pdf";
import {
  // beforeUpload,
  getBase64,
  // handleSubmit,
  // removeUploadedFile,
} from "../_components/train-resources-content/helpers";
import { Icons } from "@/components/theme/icons";
import axios from "axios";
import { AxiosConn } from "@/configs/axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

type Props = {};

const ExtractPage = (props: Props) => {
  const {
    image,
    file,
    filetype,
    uploadFileName,
    SetFileName,
    setUploadFileName,
    SetImage,
    fileList,
    setFileList,
    SetFile,
    setFileType,
  } = useFileStore();
  const { pdfData, setPdfData } = useMetaDataStore();
  const [submition, SetSubmition] = useState<boolean>(false);
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [extractLoad, SetExtractLoad] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [selectdata, setSelectData] = useState<PdfDataTypes | null>(null);
  const [data, setData] = useState<any>([]);

  let axiosInstance = AxiosConn();
  const formRef = useRef<any>(null);
  const fileInputRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  let imgSrc: any = image;

  useEffect(() => {
    if (imgSrc) {
      convertToBase64();
      console.log("image");
      const imageUrl = URL.createObjectURL(
        imgSrc.length == 1 ? imgSrc[0] : imgSrc[count]
      );
      console.log("imageUrl:", imageUrl);
      setImageUrl(imageUrl);
      SetSubmition(true);
    }
    return () => {
      if (imgSrc) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imgSrc, count]);

  useEffect(() => {
    setPdfData({
      ...pdfData,
      id: selectdata?.id as string,
      pdf_category: selectdata?.pdf_category as string,
      pdf_sub_category: selectdata?.pdf_sub_category as string,
      pdf_sub_sub_category: selectdata?.pdf_sub_sub_category as string,
      company_name: selectdata?.company_name as string,
    });
  }, [selectdata]);

  const convertToBase64 = () => {
    const reader = new FileReader();
    reader.readAsDataURL(imgSrc.length === 1 ? imgSrc[0] : imgSrc[count]);
    reader.onload = () => {
      if (reader.result) {
        console.log("called: ", reader.result);
        // setBase64Img(reader.result as string);
        setPdfData({
          ...pdfData,
          pdf_base64_img: reader.result as string,
        });
      }
    };
  };

  const handleFileChange = async (file: any) => {
    const form = formRef.current;

    console.log(form);

    const uploadFile = file.target.files[0];
    // console.log("file:", file.target.files[0].name.split(".")[0]);
    SetFileName(file.target.files[0].name);
    setUploadFileName(file.target.files[0].name.split(".")[0]);

    if (uploadFile.type === "application/pdf") {
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result as ArrayBufferLike);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        console.log("number of pages:", pdf.numPages);

        const newFileObj: any[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.0 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext: any = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          canvas.toBlob(async (blob: any) => {
            let resp = beforeUpload(file.target.files[0]);

            if (resp) {
              blob.preview = await getBase64(blob);
              blob.page = i;
              newFileObj.push(blob);

              console.log("newFileObj:", newFileObj);
              setFileList(newFileObj.sort((a, b) => a.page - b.page));
              SetFile(URL.createObjectURL(blob));

              const file = blob;

              setFileType(blob.type);
            }
          }, "image/jpeg");
        }

        // Set the filename to the name of the first page's image
        if (newFileObj.length > 0) {
          SetFileName(newFileObj[0].name);
        }
      };

      fileReader.readAsArrayBuffer(uploadFile);
    } else if (
      uploadFile.type === "image/jpeg" ||
      uploadFile.type === "image/png" ||
      uploadFile.type === "image/jpg"
    ) {
      // Do something with the image file (JPEG file)
      console.log(uploadFile);
      let resp = beforeUpload(file.target.files[0]);
      if (resp) {
        // console.log("setFileName 184:", uploadFile.name.split(".")[0]);
        SetFileName(uploadFile.name);
        setUploadFileName(uploadFile.name.split(".")[0]);
        uploadFile.preview = await getBase64(uploadFile);
        let newFileObj = [];
        newFileObj.push(uploadFile);
        setFileList(newFileObj);
        SetFile(URL.createObjectURL(uploadFile));
        const file = uploadFile;
        setFileType(uploadFile.type);
      }
    } else {
      console.log("Invalid file format. Please upload a PDF or JPEG file.");
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isvideo = file.type === "video/mp4";
    const ispdf = file.type === "application/pdf";
    const isLt5M = file.size / 1024 / 1024 < 5;
    const isLt16M = file.size / 1024 / 1024 < 16;
    const isLt10 = file.size / 1024 / 1024 < 10;

    if (isJpgOrPng) {
      if (!isLt5M) {
        toast.error("Image must smaller than 5MB!");
        return false;
      }
    } else if (isvideo) {
      if (!isLt16M) {
        toast.error("Video must smaller than 16MB!");
        return false;
      }
    } else if (ispdf) {
      if (!isLt10) {
        toast.error("PDF must smaller than 10MB!");
        return false;
      }
    } else {
      toast.error("You can only upload JPG/PNG/MP4 file!");
      return false;
    }
    return true;
  };

  const removeUploadedFile = () => {
    setFileList([]);
    SetFile(null);
    setFileType("");
    SetFileName("");
    setUploadFileName("");
    SetSubmition(false);
  };

  const handleSubmit = async () => {
    let data = {
      uploadedImage: fileList,
      fileName: uploadFileName,
    };
    handleImageUpload(data);
    SetSubmition(true);
  };

  const handleImageUpload = (data: any) => {
    SetFileName(data.fileName);
    SetImage(data.uploadedImage);
  };

  console.log("this is pdf data", pdfData);

  const emptyPdfData = () => {
    setPdfData({
      id: "",
      pdf_name: "",
      company_name: "",
      pdf_category: "",
      pdf_sub_category: "",
      pdf_sub_sub_category: "",
      pdf_base64_img: "",
      annoted_region: [],
    });

    setFileList([]);
    SetFile(null);
    setFileType("");
    SetFileName("");
    setUploadFileName("");
    SetImage(null);
  };

  const extractData = async () => {
    let savaDataObj;
    if (imgSrc.length !== count + 1) {
      setCount(count + 1);
      return; // Exit early if condition is met
    } else {
      savaDataObj = {
        templateId: pdfData.id,
        pdf_base64_img: pdfData.pdf_base64_img,
      };
      SetExtractLoad(true);
    }

    try {
      let resp = await axiosInstance.post("extract_text", savaDataObj);

      emptyPdfData();
      if (resp.status === 200) {
        setTimeout(() => {
          SetExtractLoad(false);
          SetIsLoading(true);
          toast.success(resp.data.message);
          console.log(resp.data.data);
          setData(resp.data.data);
          SetSubmition(false);
        }, 1300);
      } else {
        toast.error(`Error! ${resp.data.body}`);
      }
    } catch (error: any) {
      // Handle errors
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error(`Error! ${error.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        toast.error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        toast.error(`Error! ${error.message}`);
      }
    }
  };

  return (
    <Card className="pt-[3.8rem] h-full w-full px-10 flex flex-col outline-none border-none">
      <CardHeader className="px-7">
        <CardTitle>Extract Data</CardTitle>
        <CardDescription>Effortlessly extract your data</CardDescription>
      </CardHeader>

      {!selectdata ? (
        <PdfSelector selectdata={selectdata} setSelectData={setSelectData} />
      ) : (
        <>
          {!isLoading ? (
            <CardContent className="flex flex-row-reverse">
              <div className="flex-1">
                {file ? (
                  <div className="flex flex-col items-center">
                    {(filetype == "image/png" || filetype == "image/jpeg") && (
                      <div className="relative h-[200px] w-[300px]">
                        <Image src={file} fill alt={"Source image"} />
                      </div>
                    )}

                    {filetype == "application/pdf" && (
                      <div className="relative h-[200px] w-[300px]">
                        <Image src={file} fill alt={"Source image"} />
                      </div>
                    )}

                    {uploadFileName && (
                      <>
                        <Label className="w-[300px] mt-2 font-normal text-center">
                          {uploadFileName}
                        </Label>
                      </>
                    )}

                    <div className="mt-2 flex items-center gap-x-2">
                      {filetype !== "video/mp4" && (
                        <PreviewUploadedImage file={file} fileType={filetype} />
                      )}

                      <Button
                        onClick={() => removeUploadedFile()}
                        variant="destructive"
                        size={"icon"}
                        className="h-min w-min p-2"
                      >
                        <Delete className="h-5 w-5" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                        disabled={submition}
                        className="text-xs bg-opacity-80"
                        variant={"default"}
                        size="sm"
                      >
                        save file
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setPdfData({
                            ...pdfData,
                            pdf_name: uploadFileName,
                          });
                        }}
                        disabled={
                          uploadFileName === pdfData.pdf_name || submition
                        }
                        className="text-xs bg-opacity-80"
                        variant={"ghost"}
                        size="sm"
                      >
                        use default filename
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label className="text-lg" htmlFor="pdf">
                        Select your file
                      </Label>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        hidden
                        className="mt-1"
                        accept="image/png, image/jpeg,image/jpg,application/pdf"
                      />
                      <canvas ref={canvasRef} style={{ display: "none" }} />
                    </div>

                    <div className="mt-2 w-full max-w-sm h-40 border border-dashed flex items-center justify-center rounded-md">
                      <Label>Drag your pdf here</Label>
                    </div>
                  </>
                )}
              </div>

              <div className="flex-1 ">
                <div className="me-20">
                  <Label className="text-lg" htmlFor="pdf">
                    Select your file
                  </Label>
                  <Input
                    value={pdfData.pdf_name}
                    onChange={(e) => {
                      setPdfData({
                        ...pdfData,
                        pdf_name: e.target.value,
                      });
                    }}
                    className="mt-2 h-[40px]"
                    placeholder="Enter your pdf name"
                  />
                </div>

                <Button
                  disabled={!submition}
                  onClick={extractData}
                  className="mt-2"
                >
                  {extractLoad && (
                    <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  Extract {imgSrc?.length !== count + 1 ? "& Next" : ""}
                </Button>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              {data?.map((d: any, index: any) => (
                <div key={index}>
                  <p>
                    <strong>Label Name:</strong> {d.labelName}
                  </p>
                  <p>
                    <strong>Page:</strong> {d.page}
                  </p>
                  <p>
                    <strong>Extracted Data:</strong> {d.extracted_data}
                  </p>
                </div>
              ))}
            </CardContent>
          )}
        </>
      )}
    </Card>
  );
};

export default ExtractPage;
