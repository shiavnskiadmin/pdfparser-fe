import { create } from "zustand";

type State = {
  image: string | null;
  file: string | null;
  filename: string;
  filetype: string;
  uploadFileName: string;
  fileList: any[];
};

type Action = {
  SetFile: (file: State["file"]) => void;
  SetImage: (file: State["image"]) => void;
  SetFileName: (filename: State["filename"]) => void;
  setFileType: (filetype: State["filetype"]) => void;
  setUploadFileName: (uploadFileName: State["uploadFileName"]) => void;
  setFileList: (fileList: State["fileList"]) => void;
};

export const useFileStore = create<State & Action>((set) => ({
  image: null,
  file: null,
  filename: "",
  filetype: "",
  uploadFileName: "",
  fileList: [],
  SetFile: (file) => set(() => ({ file: file })),
  SetFileName: (filename) => set(() => ({ filename: filename })),
  setFileType: (filetype) => set(() => ({ filetype: filetype })),
  setUploadFileName: (uploadFileName) =>
    set(() => ({ uploadFileName: uploadFileName })),
  setFileList: (fileList) => set(() => ({ fileList: fileList })),
  SetImage: (image) => set(() => ({ image: image })),
}));
