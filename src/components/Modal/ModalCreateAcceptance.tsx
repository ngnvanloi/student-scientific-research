"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormCreateAcceptance } from "../FormCard/FormInputsData";
import { FormCreateAcceptanceSchema } from "../FormCard/ZodSchema";
import { Alert, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CloseOutlined } from "@ant-design/icons";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import {
  ParamsCreateAcceptance,
  useCreateAcceptanceMutation,
} from "@/hooks-query/mutations/use-create-acceptance";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ResearchTopicOverview from "../ResearchTopicAwaitingReviewPage/ResearchTopicAwaitingReviewPageDetails/ResearchTopicOverview";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { useSession } from "next-auth/react";
import { useGetCompetitionDetail } from "@/hooks-query/queries/use-get-competition";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  researchTopic: ResearchTopicWithContributors | undefined;
}
const ModalCreateAcceptance = (props: IProps) => {
  const { isOpen, setIsOpen, researchTopic } = props;
  const { data: session } = useSession();

  // MUTATION
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending, isSuccess, isError } = useCreateAcceptanceMutation(
    (msg) => {
      setErrorMessage(msg);
    }
  );
  const {
    mutate: notiMutation,
    isSuccess: isNotiSuccess,
    isError: isNotiError,
    error: notiError,
  } = useCreateNotificationMutation();
  const { data: competitionDetail, refetch } = useGetCompetitionDetail(
    researchTopic?.competitionId || 0
  );
  useEffect(() => {
    refetch();
  }, [researchTopic?.competitionId]);
  // STATE
  const { toast } = useToast();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormCreateAcceptance>({
    resolver: zodResolver(FormCreateAcceptanceSchema),
    defaultValues: {
      name: `[FINAL-${researchTopic?.id}]-${String(researchTopic?.nameTopic).toUpperCase()}`,
      researchTopicId: String(researchTopic?.id),
    },
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormCreateAcceptance) => {
    console.log("Check name: ", data.name);
    console.log("Check research topic id: ", data.researchTopicId);

    // GỌI API THÀNH LẬP HỘI ĐỒNG PHẢN BIỆN
    let requestBody: ParamsCreateAcceptance = {
      name: data.name,
      researchTopicId: Number(data.researchTopicId),
    };
    console.log(
      "checking param create acceptance: ",
      JSON.stringify(requestBody, null, 2)
    );
    mutate(requestBody, {
      onSuccess: () => {
        toast({
          title: "Thành công",
          variant: "default",
          description:
            "Chúc mừng bạn đã tạo nghiệm thu thành công. Thành quả của bạn sẽ được ban tổ chức và nhà trường phê duyệt. Vui lòng cập nhật hệ thống thường xuyên",
        });

        // Gửi thông báo cho ban tổ chức
        const paramsNoti: ParamsCreateNotification = {
          notificationContent: `${session?.user?.name} ${NotificationContentSample.NotificationType.acceptance.author.submit}`,
          notificationDate: new Date().toISOString(),
          recevierId: competitionDetail?.data.accountId || 0,
          notificationTypeId: 7,
          targetId: 0,
        };
        notiMutation(paramsNoti, {
          onSuccess: () => {
            console.log("Thông báo đã gửi");
          },
          onError: (error) => {
            console.error("Lỗi khi gửi thông báo:", error);
          },
        });
        // reset input fields
        reset({
          name: "",
        });
        setErrorMessage(null);
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Lỗi khi tạo nghiệm thu:", error);
      },
    });
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <div>
      {isPending ? <SpinnerLoading /> : ""}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-3xl mx-auto px-4 min-h-[200px] max-h-[690px] overflow-x-auto">
            <div className="bg-white rounded-md shadow-lg h-full  overflow-x-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <Dialog.Title className="text-lg font-medium text-gray-800 ">
                  <strong>
                    Tạo nghiệm thu cho đề tài {researchTopic?.nameTopic}
                  </strong>
                </Dialog.Title>
                <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                  <CloseModalIcon />
                </Dialog.Close>
              </div>
              <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="flex gap-2 items-center hover:cursor-pointer hover:text-blue-500 font-semibold">
                      <p>Nhấn vào đây để hiển thị/ẩn tổng quan đề tài</p>
                      {/* <CursorArrowRippleIcon width={20} /> */}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ResearchTopicOverview researchTopic={researchTopic} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                    onClick={handleSubmit(onSubmit, onError)}
                    className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
                  >
                    Tạo
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
    </div>
  );
};
export { ModalCreateAcceptance };
