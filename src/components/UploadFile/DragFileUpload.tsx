import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";

interface IProps {
  limit: number;
  multiple?: boolean;
  fileList?: File[];
  setFileList?: React.Dispatch<React.SetStateAction<File[]>>;
  setFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
  setFilePreview?: React.Dispatch<React.SetStateAction<string>>;
}

const DragFileUpload: React.FC<IProps> = ({
  limit,
  multiple,
  fileList,
  setFileList,
  setFile,
  setFilePreview,
}) => {
  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    multiple: multiple,
    maxCount: limit,
    onRemove: (file: File) => {
      // Xử lý khi file bị xóa
      if (multiple && setFileList && fileList) {
        const newFileList = fileList.filter((item) => item.name !== file.name);
        setFileList(newFileList);
      }

      if (setFile && limit === 1) {
        setFile(undefined);
        setFilePreview?.("");
      }
    },
    beforeUpload: (file: File) => {
      // Nếu setFile và setFilePreview được truyền xuống, cập nhật file và preview
      if (setFile && limit === 1) {
        setFile(file);
        setFilePreview?.(file ? URL.createObjectURL(file) : "");
      }

      // Kiểm tra nếu có limit và fileList đã được truyền xuống
      if (fileList && setFileList && limit > 1) {
        setFileList((prevFileList) => {
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
    fileList: fileList?.map((file, index) => ({
      uid: String(index), // Tạo uid giả để antd nhận diện file
      name: file.name,
      status: "done",
      originFileObj: file, // Gán lại đối tượng File
    })),
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default DragFileUpload;
