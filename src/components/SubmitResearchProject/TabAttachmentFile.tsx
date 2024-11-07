"use client";

import { useState } from "react";
import DragFileUpload from "../UploadFile/DragFileUpload";
import { UploadFile } from "antd";

const TabAttachmentFile = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  return (
    //   productFilePath: string;
    //   reportFilePath: string;

    <div className="h-full">
      {/* <ClickFileUpload limit={1} multiple={false} setFile={setFile} /> */}
      <DragFileUpload limit={1} multiple={false} setFileList={setFileList} />
    </div>
  );
};
export default TabAttachmentFile;
