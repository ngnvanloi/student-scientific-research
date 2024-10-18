import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ClickFileUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    // Tạo mảng metadata của các file
    const fileMetadata = fileList.map((file) => ({
      uid: file.uid,
      name: file.name,
      type: file.type,
      size: file.size,
      url: `localhost:8000/uploadfiles/${file.url}`,
    }));

    setUploading(true);
    console.log("----> check list file: ", fileList);
    // Gửi metadata file dưới dạng JSON thay vì FormData
    fetch("http://localhost:8000/uploadfiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: fileMetadata, // Gửi metadata của file
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};

export default ClickFileUpload;
