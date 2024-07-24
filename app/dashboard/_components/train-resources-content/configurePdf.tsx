"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { useFileStore } from "../../_utils/zustandUtils/fileStore";
import { toast } from "sonner";
import { getBase64 } from "./helpers";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/theme/icons";
import { Delete } from "lucide-react";
import Image from "next/image";
import { PreviewUploadedImage } from "./previewUploadedImage";
import { useMetaDataStore } from "../../_utils/zustandUtils/metaDataStore";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

type Props = {};

const ConfigurePdf = (props: Props) => {
  const {
    file,
    fileList,
    filetype,
    uploadFileName,
    SetFile,
    SetFileName,
    setFileList,
    setFileType,
    setUploadFileName,
    SetImage,
  } = useFileStore();
  const { pdfData, setPdfData } = useMetaDataStore();
  const [submition, SetSubmition] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formRef = useRef<any>(null);
  const fileInputRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const handleFileChange = async (file: any) => {
    SetSubmition(true);
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

  const removeUploadedFile = (
    SetFileName: any,
    setFileList: any,
    SetFile: any,
    setFileType: any,
    setUploadFileName: any,
    SetSubmition: any
  ) => {
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
    setIsLoading(true);
  };

  const handleImageUpload = (data: any) => {
    SetFileName(data.fileName);
    SetImage(data.uploadedImage);
  };

  return (
    <div className="min-h-40 w-full px-5 py-10 flex flex-col items-center justify-center">
      <form ref={formRef} name="upload document">
        {file ? (
          <>
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
                <Label className="w-[300px] mt-2 font-normal">
                  {uploadFileName}
                </Label>
              </>
            )}

            <div className="mt-2 flex items-center gap-x-2">
              {filetype !== "video/mp4" && (
                <PreviewUploadedImage file={file} fileType={filetype} />
              )}

              <Button
                onClick={() =>
                  removeUploadedFile(
                    SetFileName,
                    setFileList,
                    SetFile,
                    setFileType,
                    setUploadFileName,
                    SetSubmition
                  )
                }
                variant="destructive"
                size={"icon"}
                className="h-min w-min p-2"
              >
                <Delete className="h-5 w-5" />
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setPdfData({
                    ...pdfData,
                    pdf_name: uploadFileName,
                  });
                }}
                disabled={uploadFileName === pdfData.pdf_name || !submition}
                className="text-xs bg-opacity-80"
                variant={"default"}
                size="sm"
              >
                use default filename
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pdf">select your pdf</Label>
              <Input
                type="file"
                id="inputFile"
                name="inputFile"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
                accept="image/png, image/jpeg,image/jpg,application/pdf"
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>

            <div className="mt-2 w-full max-w-sm h-36 border border-dashed flex items-center justify-center rounded-md">
              <Label>Drag your pdf here</Label>
            </div>
          </>
        )}

        <Button
          disabled={!submition}
          variant={"secondary"}
          size={"sm"}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();

            setTimeout(() => {
              setIsLoading(false);
              toast.success("Uploaded successfully!! ");
              SetSubmition(false);
            }, 1300);
          }}
          className="w-full mt-2 bg-accent/20 hover:bg-accent/30 disabled:cursor-not-allowed"
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          upload pdf
        </Button>
      </form>
    </div>
  );
};

export default ConfigurePdf;
