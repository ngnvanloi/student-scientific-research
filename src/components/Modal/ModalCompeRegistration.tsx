"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { Alert, Button } from "antd";
import React, { useEffect, useState } from "react";
import DragFileUpload from "../UploadFile/DragFileUpload";
import { useGetCompetitionDetail } from "@/hooks-query/queries/use-get-competition";
import { useUploadFileMutation } from "@/hooks-query/mutations/use-upload-file-mutation";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import {
  ParamsRegisterCompetiton,
  useRegisterCompetitonMutation,
} from "@/hooks-query/mutations/use-register-competition";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { getSession, useSession } from "next-auth/react";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { CloseOutlined } from "@ant-design/icons";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  competitionID: number | any;
}

const ModalCompetitionRegistration = (props: IProps) => {
  const { data: session } = useSession();
  console.log("checking session in modal compe registration: ", session);
  const route = useRouter();
  const { toast } = useToast();
  const { isOpen, setIsOpen, competitionID } = props;
  const {
    mutate: notiMutation,
    isSuccess: isNotiSuccess,
    isError: isNotiError,
    error: notiError,
  } = useCreateNotificationMutation();
  // GET DATA
  const { data: competition, refetch: refetchData } =
    useGetCompetitionDetail(competitionID);

  // REFETCH DATA
  useEffect(() => {
    if (isOpen && competitionID > 0) {
      refetchData();
    }
  }, [competitionID, isOpen, refetchData]);
  // STATE
  const [file, setFile] = useState<File>();

  // REACT QUERY
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useRegisterCompetitonMutation((msg) => {
      setErrorMessage(msg);
    });
  const {
    mutate: fileMutation,
    isSuccess: fileIsSuccess,
    isError: fileIsError,
    error: fileError,
    isPending: fileIsPending,
  } = useUploadFileMutation();

  // HANDLE LOGIC
  const onSubmit = () => {
    console.log("checking competition details: ", competition?.data);
    console.log("checking file upload: ", file);
    const formDataUploadFile = new FormData();
    if (file) {
      formDataUploadFile.append("File", file);
    }
    formDataUploadFile.append(
      "FolderName",
      FolderNameUploadFirebase.RegistrationFormsFolder
    );

    // upload file, lấy url string
    fileMutation(formDataUploadFile, {
      onSuccess: (result) => {
        // alert("Upload file successfully");
        // gọi API đăng kí
        const paramsRegis: ParamsRegisterCompetiton = {
          competitionId: competitionID,
          filePath: result.data.toString(),
        };

        mutate(paramsRegis, {
          onSuccess: () => {
            toast({
              title: "Xác nhận thành công",
              variant: "default",
              description:
                "Bạn đã đăng kí tham gia cuộc thi thành công. Vui lòng chờ ban tổ chức phê duyệt",
            });
            // gửi thông báo cho ban tổ chức
            const paramsNoti: ParamsCreateNotification = {
              notificationContent: `${session?.user?.name} ${NotificationContentSample.NotificationType.registration.author} ${competition?.data.competitionName}, vui lòng kiểm tra thông tin`,
              notificationDate: new Date().toISOString(),
              recevierId: competition?.data.accountId || -1,
              notificationTypeId: 4,
              targetId: -1,
            };
            notiMutation(paramsNoti, {
              onSuccess: () => {
                console.log("Thông báo đã gửi đến ban tổ chức");
              },
              onError: (error) => {
                console.error("Lỗi khi gửi thông báo:", error);
              },
            });
            setErrorMessage(null);
            route.push("/competitions");
            setIsOpen(false);
            setFile(undefined);
          },
          onError: (error) => {
            console.error("Lỗi khi đăng kí cuộc thi:", error);
          },
        });
      },
      onError: (error) => {
        console.error("Lỗi khi upload file:", error);
      },
    });
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {isPending || fileIsPending ? <SpinnerLoading /> : ""}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-xl mx-auto px-4 ">
          <div className="bg-white rounded-md shadow-lg ">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                <strong> Đăng kí tham gia cuộc thi</strong>
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-2 text-[15.5px] leading-relaxed text-gray-500">
              <p className="mb-[10px] block text-base  text-dark dark:text-white">
                Bạn đang đăng kí tham gia cuộc thi{" "}
                <span className="font-semibold italic">
                  {competition?.data.competitionName}
                </span>
              </p>
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Gửi phiếu đăng kí
                </label>
                {/* <ClickFileUpload limit={1} multiple={false} setFile={setFile} /> */}
                <DragFileUpload limit={1} multiple={false} setFile={setFile} />
              </div>
            </Dialog.Description>
            {errorMessage && (
              <div className="m-4">
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
            <div className="flex items-center gap-3 p-4 border-t">
              <Dialog.Close asChild>
                <Button
                  onClick={() => onSubmit()}
                  className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
                >
                  Đăng kí
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 ">
                  Hủy
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalCompetitionRegistration };
