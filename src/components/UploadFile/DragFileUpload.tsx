import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Button } from "antd";
import type { GetProp, UploadFile } from "antd";

interface IProps {
  limit: number;
  mutiple?: boolean;
  // upload multi file
  fileList?: UploadFile[];
  setFileList?: React.Dispatch<React.SetStateAction<UploadFile[]>>;

  // upload single file
  setFile?: React.Dispatch<React.SetStateAction<UploadFile<any> | undefined>>;
  setFilePreview?: React.Dispatch<React.SetStateAction<string>>;
}

const DragFileUpload = (propss: IProps) => {
  const { Dragger } = Upload;
  const { mutiple, fileList, setFileList, setFilePreview, setFile, limit } =
    propss;

  const props: UploadProps = {
    name: "file",
    multiple: mutiple,
    maxCount: limit,
    onRemove: (file) => {
      // // MULTIPLE FILE
      if (mutiple && mutiple === true && fileList && setFileList) {
        const index = fileList?.indexOf(file);
        const newFileList = fileList ? fileList.slice() : [];
        if (index !== undefined && index !== -1) {
          newFileList.splice(index, 1);
        }
        setFileList?.(newFileList);
      }

      // SINGLE FILE
      if (setFile && limit === 1) {
        setFile?.(undefined);
        setFilePreview?.("");
      }
    },

    beforeUpload: (file) => {
      // Nếu setFile và setFilePreview được truyền xuống, cập nhật file và preview
      if (setFile && limit === 1) {
        setFile(file);
        setFilePreview?.(file ? URL.createObjectURL(file) : "");
      }

      //Kiểm tra nếu có limit và fileList đã được truyền xuống
      if (fileList && setFileList && limit > 1) {
        setFileList?.((prevFileList) => {
          // Nếu số lượng file vượt quá limit, loại bỏ file đầu tiên
          const updatedFileList = [...(prevFileList || [])];
          if (updatedFileList.length >= limit) {
            updatedFileList.shift(); // Loại bỏ phần tử đầu tiên
          }
          updatedFileList.push(file); // Thêm file mới vào cuối danh sách
          return updatedFileList;
        });
      }

      return false; // Ngăn không cho tự động upload
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    fileList,
  };
  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </>
  );
};

export default DragFileUpload;
