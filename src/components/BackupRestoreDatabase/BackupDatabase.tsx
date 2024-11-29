"use client";

import { BACKUP_DIRECTION } from "@/lib/file-direction";
import { useState } from "react";
import FormSelect from "../FormCard/FormSelectField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormCard/FormInputField";
import { Alert, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  ParamsCreateBackupFile,
  useCreateBackupFileMutation,
} from "@/hooks-query/mutations/use-create-backup";
import { TFormCreateBackup } from "../FormCard/FormInputsData";
import { FormCreateBackupSchema } from "../FormCard/ZodSchema";
import { useToast } from "@/hooks/use-toast";
import { formatDirectionPath } from "@/helper/extension-function";

const BackupTypes = [
  { id: 1, name: "Full Backup (Sao lưu toàn bộ)" },
  { id: 2, name: "Differential Backup (Sao lưu vi sai)" },
  { id: 3, name: "Transaction Log Backup (Sao lưu log giao dịch)" },
];
const BackupDatabase = () => {
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useCreateBackupFileMutation((msg) => {
      setErrorMessage(msg);
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormCreateBackup>({
    resolver: zodResolver(FormCreateBackupSchema),
    defaultValues: {
      backupType: "1",
      backupPath: BACKUP_DIRECTION,
    },
  });

  const onSubmit = async (data: TFormCreateBackup) => {
    if (Number(data.backupType) === 0) {
      setErrorMessage("Vui lòng chọn kiểu sao lưu dữ liệu");
    } else {
      console.log("checking backupPath: ", data.backupPath);
      console.log(
        "checking backupType: ",
        formatDirectionPath(data.backupPath)
      );
      try {
        // Tạo request body từ kết quả mutation
        const requestBody: ParamsCreateBackupFile = {
          backupType: Number(data.backupType),
          backupPath: formatDirectionPath(data.backupPath),
          description: "Sao lưu cơ sở dữ liệu",
        };

        // Gọi API
        mutate(requestBody, {
          onSuccess: () => {
            toast({
              title: "Thành công",
              variant: "default",
              description:
                "Bạn đã tạo file back up thành công, để thực hiện việc backup, truy cập vào đường dẫn " +
                data.backupPath,
            });
            // Reset các field input và file
            reset({
              backupType: "1",
              backupPath: BACKUP_DIRECTION,
            });
            setErrorMessage(null);
          },
          onError: (error) => {
            console.error("Lỗi khi tạo file backup:", error);
          },
        });
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  return (
    <div className="">
      <div>
        <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
          Nhập đường dẫn
        </label>
        <FormField
          type="text"
          placeholder="Nhập đường dẫn chứa file backup (ví dụ: D://)"
          name="backupPath"
          register={register}
          error={errors.backupPath}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
        />
      </div>
      <div className="mt-3">
        <FormSelect
          name="backupType"
          items={BackupTypes}
          register={register}
          error={errors.backupType}
          label="Chọn kiểu sao lưu"
          className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
        />
      </div>
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
        onClick={handleSubmit(onSubmit, onError)}
        className="my-3"
        type="primary"
      >
        Tạo file backup
      </Button>
    </div>
  );
};
export { BackupDatabase };
