"use client";

import { useState } from "react";
import DragFileUpload from "../UploadFile/DragFileUpload";
import { Alert, Button } from "antd";
import { useRestoreDatabaseMutation } from "@/hooks-query/mutations/use-restore-database";
import { CloseOutlined } from "@ant-design/icons";
import { useToast } from "@/hooks/use-toast";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";

const RestoreDatabase = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useRestoreDatabaseMutation((msg) => {
      setErrorMessage(msg);
    });

  // handle logic
  const onSubmit = () => {
    const formData = new FormData();
    if (file) {
      formData.append("BackupFile", file);
    }
    mutate(formData, {
      onSuccess: (result) => {
        toast({
          title: "Thành công",
          variant: "default",
          description: "Chúc mừng! Cơ sở dữ liệu của bạn đã được phục hồi",
        });
      },
      onError: (error) => {
        console.error("Error: " + error);
      },
    });
  };
  return (
    <div>
      {isPending ? <SpinnerLoading /> : ""}
      <DragFileUpload limit={1} multiple={false} setFile={setFile} />
      {errorMessage && (
        <div className="mt-4">
          <Alert
            message="Oops! Đã có lỗi xảy ra"
            description={errorMessage}
            type="error"
            closable={{
              "aria-label": "close",
              closeIcon: <CloseOutlined />,
            }}
            onClose={() => setErrorMessage(null)}
            showIcon
          />
        </div>
      )}
      <Button
        onClick={() => onSubmit()}
        className="mt-4 px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
      >
        Phục hồi
      </Button>
    </div>
  );
};
export { RestoreDatabase };
