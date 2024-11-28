"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect } from "react";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { Button } from "antd";
import FormField from "../FormCard/FormInputField";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormRequestAcceptanceDeadline } from "../FormCard/FormInputsData";
import { FormRequestAcceptanceDeadlineSchema } from "../FormCard/ZodSchema";
import { useGetCompetitionDetail } from "@/hooks-query/queries/use-get-competition";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  researchTopic: ResearchTopicWithContributors | undefined;
}
const ModalRequestExtensionOfTheAcceptanceDeadline = (props: IProps) => {
  const { isOpen, setIsOpen, researchTopic } = props;
  const { data: session } = useSession();
  const { toast } = useToast();
  const { data: competitionDetail, refetch } = useGetCompetitionDetail(
    researchTopic?.competitionId || 0
  );
  useEffect(() => {
    refetch();
  }, [researchTopic, researchTopic?.competitionId]);
  // MUTATION NOTIFICATION
  const {
    mutate: notiMutation,
    isSuccess: isNotiSuccess,
    isError: isNotiError,
    error: notiError,
    isPending: notiIsPending,
  } = useCreateNotificationMutation();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormRequestAcceptanceDeadline>({
    resolver: zodResolver(FormRequestAcceptanceDeadlineSchema),
  });
  // HANDLE LOGIC
  const onSubmit = async (data: TFormRequestAcceptanceDeadline) => {
    let contentNoti =
      session?.user?.name +
      NotificationContentSample.NotificationType.extendAcceptanceDeadline
        .author +
      `${researchTopic?.nameTopic}. ` +
      "Nội dung nhắn gửi: " +
      data.message +
      ". Thời gian yêu cầu là " +
      data.month +
      " tháng";
    // gửi thông báo cho ban tổ chức
    const paramsNoti: ParamsCreateNotification = {
      notificationContent: contentNoti,
      notificationDate: new Date().toISOString(),
      recevierId: competitionDetail?.data.accountId || 0,
      notificationTypeId: 8,
      targetId: 0,
    };
    notiMutation(paramsNoti, {
      onSuccess: () => {
        console.log("Thông báo đã gửi");
        toast({
          title: "Thành công",
          variant: "default",
          description:
            "Bạn đã gửi yêu cầu gia hạn nghiệm thu thành công. Bạn sẽ nhận được phản hồi sớm nhất từ ban tổ chức, vui lòng kiểm tra thông báo thường xuyên",
        });
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Lỗi khi gửi thông báo:", error);
      },
    });
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };
  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {notiIsPending === true ? <SpinnerLoading /> : ""}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl mx-auto px-4 ">
          <div className="bg-white rounded-md shadow-lg ">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Phiếu xin gia hạn thời gian nghiệm thu cho đề tài{" "}
                {`${researchTopic?.nameTopic}`}
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 text-[15.5px] leading-relaxed text-gray-500 h-full">
              <div className="mt-3">
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Thời gian gia hạn đề tài
                </label>
                <FormField
                  type="text"
                  placeholder="3 tháng"
                  name="month"
                  register={register}
                  error={errors.month}
                  valueAsNumber={true}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
              <div className="mt-3">
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Nội dung nhắn gửi
                </label>
                <FormField
                  type="text"
                  placeholder="Kính gửi ban tổ chức, vì lí do ..."
                  name="message"
                  register={register}
                  error={errors.message}
                  isTextArea={true}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
              <Button
                onClick={handleSubmit(onSubmit, onError)}
                className="my-3"
                type="primary"
              >
                Gửi yêu cầu
              </Button>
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalRequestExtensionOfTheAcceptanceDeadline };
