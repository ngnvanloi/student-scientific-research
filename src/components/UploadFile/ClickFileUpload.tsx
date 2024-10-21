import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadProps } from "antd";

interface IProps {
  limit: number;
  multiple?: boolean;
  fileList?: File[]; // Thay đổi từ UploadFile[] thành File[]
  setFileList?: React.Dispatch<React.SetStateAction<File[]>>; // Thay đổi từ UploadFile[] thành File[]
  setFile?: React.Dispatch<React.SetStateAction<File | undefined>>; // Thay đổi từ UploadFile thành File
  setFilePreview?: React.Dispatch<React.SetStateAction<string>>;
}

const ClickFileUpload: React.FC<IProps> = ({
  limit,
  multiple,
  fileList,
  setFileList,
  setFile,
  setFilePreview,
}) => {
  const handleChange = (info: any) => {
    const { file, fileList: newFileList } = info;

    // Cập nhật file cho upload single
    if (setFile && limit === 1) {
      setFile(file as File); // Ép kiểu sang File
      setFilePreview?.(file ? URL.createObjectURL(file) : "");
    }

    // Cập nhật danh sách file cho upload multiple
    if (multiple && setFileList) {
      // Chuyển đổi fileList từ UploadFile sang File
      const files = newFileList.map((f: any) => f.originFileObj) as File[];
      setFileList(files);
    }
  };

  const handleRemove = (file: File) => {
    // Xử lý khi file bị xóa
    if (multiple && setFileList && fileList) {
      const newFileList = fileList.filter((item) => item.name !== file.name);
      setFileList(newFileList);
    }

    if (setFile && limit === 1) {
      setFile(undefined);
      setFilePreview?.("");
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: multiple,
    maxCount: limit,
    onChange: handleChange,
    onRemove: handleRemove,
    fileList: fileList?.map((file, index) => ({
      uid: String(index), // Tạo uid giả để antd nhận diện file
      name: file.name,
      status: "done",
      originFileObj: file, // Gán lại đối tượng File
    })),
    beforeUpload: () => false, // Ngăn không cho tự động upload file
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>File đính kèm</Button>
    </Upload>
  );
};

export default ClickFileUpload;
