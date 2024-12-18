"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";

import {
  ParamsSubmitReviewForm,
  useSubmitReviewFormMutation,
} from "@/hooks-query/mutations/use-submit-review-form-for-topic-version";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { useSession } from "next-auth/react";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paramsSubmitReviewForm: ParamsSubmitReviewForm;
  accountID: number;
  researchTopicID: number;
}
const ModalConfirmReviewTopic = (props: IProps) => {
  // STATE
  const {
    isOpen,
    setIsOpen,
    paramsSubmitReviewForm,
    accountID,
    researchTopicID,
  } = props;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  // HANDLE LOGIC
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending, isError, isSuccess } = useSubmitReviewFormMutation(
    (msg) => {
      setErrorMessage(msg);
    }
  );
  const {
    mutate: notiMutation,
    isSuccess: isNotiSuccess,
    isError: isNotiError,
    error: notiError,
    isPending: notiIsPending,
  } = useCreateNotificationMutation();

  const handleOnConfirm = () => {
    console.log("checking accountID: ", accountID);
    console.log("checking paramsSubmitReviewForm: ", paramsSubmitReviewForm);
    console.log("checking researchTopicID: ", researchTopicID);
    mutate(paramsSubmitReviewForm, {
      onSuccess: () => {
        let notiContent = `${session?.user?.name} ${NotificationContentSample.NotificationType.reviewProcess.reviewer}. Nội dung phản biện: ${paramsSubmitReviewForm.content}`;
        // gửi thông báo cho người đăng kí
        const paramsNoti: ParamsCreateNotification = {
          notificationContent: notiContent,
          notificationDate: new Date().toISOString(),
          recevierId: accountID,
          notificationTypeId: 3,
          targetId: researchTopicID,
        };
        notiMutation(paramsNoti, {
          onSuccess: () => {
            toast({
              title: "Thành công",
              variant: "default",
              description: `Bạn đã gửi thông báo thành công, vui lòng cập nhật hệ thống liên tục khi có phản hồi mới nhất từ tác giả`,
            });
          },
          onError: (error) => {
            console.error("Lỗi khi gửi thông báo:", error);
          },
        });
        setErrorMessage(null);
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Lỗi khi gửi thông báo:", error);
      },
    });
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {notiIsPending || isPending ? <SpinnerLoading /> : ""}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 w-full max-w-lg">
          <div className="bg-white rounded-md shadow-lg px-4 py-6 sm:flex">
            <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-indigo-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-indigo-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <Dialog.Title className="text-lg font-medium text-gray-800">
                <div className="font-bold text-indigo-500 text-lg">
                  Thông báo xác nhận
                </div>
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                <p>
                  Bạn có chắc chắn muốn thực hiện việc phản biện phiên bản đề
                  tài này hay không ? Việc xác nhận sẽ không thể hoàn tác, vui
                  lòng cân nhắc trước khi thực hiện thao tác
                </p>
                <p className="mt-2">
                  Nội dung phản biện: {paramsSubmitReviewForm.content}
                </p>
              </Dialog.Description>
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
              <div className="items-center gap-2 mt-3 text-sm sm:flex">
                <div>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => handleOnConfirm()}
                  >
                    Xác nhận
                  </button>
                </div>
                <div>
                  <button
                    aria-label="Close"
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalConfirmReviewTopic };
