"use client";

import { useState } from "react";
import DragFileUpload from "../UploadFile/DragFileUpload";
import { UploadFile } from "antd";

const TabAttachmentFile = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  return (
    //   productFilePath: string;
    //   reportFilePath: string;

    <div>
      <DragFileUpload
        limit={2}
        fileList={fileList}
        setFileList={setFileList}
        mutiple={true}
      />
    </div>
  );
};
export default TabAttachmentFile;
