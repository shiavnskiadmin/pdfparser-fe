"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import { AddLabelDialog } from "./addLabelDialog";
import "cropperjs/dist/cropper.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMetaDataStore } from "../../_utils/zustandUtils/metaDataStore";
import { useFileStore } from "../../_utils/zustandUtils/fileStore";
import { Icons } from "@/components/theme/icons";
import { AxiosConn } from "@/configs/axios";

type Props = {
  imgSrc: any;
};

const AnnotatePdf = ({ imgSrc }: Props) => {
  const router = useRouter();
  const { pdfData, setPdfData } = useMetaDataStore();
  const {
    SetFile,
    SetFileName,
    setFileList,
    setFileType,
    setUploadFileName,
    SetImage,
  } = useFileStore();
  var image: HTMLImageElement | undefined;
  const [selectedArea, setSelectedArea] = useState<any | null>(null);
  const [annotations, setAnnotations] = useState<any>([]);
  const [submition, SetSubmition] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: image?.width,
    height: image?.height,
  });
  const [count, setCount] = useState(0);
  const cropperRef = useRef<any>(null);
  let axiosInstance = AxiosConn();

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
    image = document.createElement("img");
    image.src = imageUrl;

    image.onload = () => {
      setImageDimensions({ width: image?.width, height: image?.height });
    };
    SetSubmition(true);
  }, []);

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropData = cropperRef.current.cropper.getCropBoxData();
      setSelectedArea(cropData);
    }
  };

  const saveData = async () => {
    let savaDataObj;
    if (imgSrc.length !== count + 1) {
      setAnnotations([]);
      setCount(count + 1);
      return; // Exit early if condition is met
    } else {
      savaDataObj = pdfData;

      console.log("pdf data that sent", pdfData);
      setIsLoading(true);
    }

    try {
      let resp = await axiosInstance.post("/template", savaDataObj);

      emptyPdfData();
      if (resp.status === 200) {
        setTimeout(() => {
          setIsLoading(false);
          toast.success(resp.data.body);
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

  const handleOk = () => {
    handleAnnotationAdd();
  };

  const handleAnnotationAdd = () => {
    if (selectedArea) {
      if (text) {
        const annotation = { ...selectedArea, text };
        let selectedAreaObj = {
          ...selectedArea,
          x: selectedArea.left,
          y: selectedArea.top,
        };
        delete selectedAreaObj.left;
        delete selectedAreaObj.top;
        let objData = {
          labelName: text,
          coordinates: selectedAreaObj,
          page: count + 1,
        };

        setPdfData({
          ...pdfData,
          annoted_region: [...pdfData.annoted_region, objData],
        });
        setAnnotations([...annotations, annotation]);
        setSelectedArea(null);
        setText("");
      }
    }
  };

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
      hasTables: false,
      multipage: false,
    });

    setFileList([]);
    SetFile(null);
    setFileType("");
    SetFileName("");
    setUploadFileName("");
    SetImage(null);
  };

  console.log("here is image", imgSrc);
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

  return (
    <div className="w-full py-10">
      {/* cropper */}
      <div className="relative inline-block">
        <div className="border-[1.5px] inline-block border-solid border-black">
          <Cropper
            src={imageUrl} //iamge url
            style={{
              width: imageDimensions.width, //image dimentions
              height: imageDimensions.height, //imagedimensions.height
            }}
            zoomable={false}
            viewMode={1}
            initialAspectRatio={16 / 7}
            crop={handleCrop}
            ref={cropperRef}
          />
        </div>

        {selectedArea && (
          <div
            style={{
              left: selectedArea.left,
              top: selectedArea.top,
              width: selectedArea.width,
              height: selectedArea.height,
            }}
            className="absolute border-[2px] m-0 border-dashed border-red-500 pointer-events-none"
          />
        )}

        {annotations.map((annotation: any, index: any) => (
          <div>
            <div
              key={index}
              style={{
                position: "absolute",
                left: annotation.left,
                top: annotation.top - 35,
                backgroundColor: "rgb(15 1 1 / 68%)",
                borderRadius: "10px",
                color: "red",
                padding: "5px",
              }}
            >
              {annotation.text}
            </div>

            <div
              key={index}
              style={{
                position: "absolute",
                left: annotation.left,
                top: annotation.top,
                width: annotation.width,
                height: annotation.height,
                border: "2px solid red",
                borderRadius: "5px",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-x-2">
        <AddLabelDialog
          text={text}
          setText={setText}
          handleOK={handleOk}
          selectedArea={selectedArea}
        />
        <div>
          <Button
            disabled={!submition}
            variant="default"
            onClick={() => saveData()}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save {imgSrc.length !== count + 1 ? "& Next" : ""}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnotatePdf;
