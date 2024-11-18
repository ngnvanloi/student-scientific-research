"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import ResearchTopicOverview from "../ResearchTopicAwaitingReviewPage/ResearchTopicAwaitingReviewPageDetails/ResearchTopicOverview";
import { ReviewOverview } from "../TopicAwaitingReviewPage/TopicAwaitingReviewPageDetail/ReviewOverview";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import FormSelect from "../FormCard/FormSelectField";
import { useForm } from "react-hook-form";
import { TFormApprovalRegistration } from "../FormCard/FormInputsData";
import { FormApprovalRegistration } from "../FormCard/ZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import {
  ParamsApprovalReviewAcceptance,
  useApprovalReviewAcceptanceMutation,
} from "@/hooks-query/mutations/use-approval-review-acceptance-for-research-topic-mutation";
import { useSession } from "next-auth/react";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { useToast } from "@/hooks/use-toast";
import { Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  researchTopic:
    | ResearchTopicWithContributors
    | ResearchProjectTopic
    | undefined;
}
const approvalStatus = [
  { id: 1, name: "Phê duyệt" },
  { id: 2, name: "Từ chối" },
];
const ModalShowDetailReviewProcessing = (props: IProps) => {
  const { isOpen, setIsOpen, researchTopic } = props;
  const { data: session } = useSession();
  const { toast } = useToast();
  // quản lý trạng thái button phê duyệt
  const [timeLeft, setTimeLeft] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormApprovalRegistration>({
    resolver: zodResolver(FormApprovalRegistration),
  });

  // MUTATION
  const {
    mutate: notiMutation,
    isSuccess: isNotiSuccess,
    isError: isNotiError,
    error: notiError,
  } = useCreateNotificationMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: approvalRegisMutation, isPending } =
    useApprovalReviewAcceptanceMutation((msg) => {
      setErrorMessage(msg);
    });

  useEffect(() => {
    setIsDisabled(true);
    let targetTime = new Date(
      researchTopic?.review_Committees.dateEnd || ""
    ).getTime();

    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;

      if (difference <= 0) {
        setTimeLeft("00 ngày 00 giờ 00 phút 00 giây");
        setIsDisabled(false);
        clearInterval(timerInterval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(
          `${String(days).padStart(2, "0")} ngày ${String(hours).padStart(2, "0")} giờ ${String(minutes).padStart(2, "0")} phút ${String(seconds).padStart(2, "0")} giây`
        );
      }
    };

    const timerInterval = setInterval(updateCountdown, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timerInterval);
  }, [researchTopic]);

  // HANDLE REVIEW ACCEPTANCE
  const onSubmit = (data: TFormApprovalRegistration) => {
    console.log("checking approval status: ", data.approvalStatus);
    console.log(
      "checking typeof approval status: ",
      typeof data.approvalStatus
    );
    // tạo content cho noti
    let contentNoti = "";
    if (data.approvalStatus === "1") {
      contentNoti =
        session?.user?.name +
        " " +
        NotificationContentSample.NotificationType.reviewAcceptance.organizer
          .accept;
    } else if (data.approvalStatus === "2") {
      contentNoti =
        session?.user?.name +
        " " +
        NotificationContentSample.NotificationType.reviewAcceptance.organizer
          .reject;
    }

    // gửi request đến API phê duyệt đăng kí
    const bodyRequest: ParamsApprovalReviewAcceptance = {
      researchTopicId: researchTopic?.id || 0,
      reviewAcceptanceStatus: Number(data.approvalStatus),
    };
    approvalRegisMutation(bodyRequest, {
      onSuccess: () => {
        // alert("Phê duyệt thành công");
        toast({
          title: "Xác nhận",
          variant: "default",
          description: "Bạn đã phê duyệt đề tài thành công",
        });
        // gửi thông báo cho người đăng kí
        const paramsNoti: ParamsCreateNotification = {
          notificationContent: contentNoti,
          notificationDate: new Date().toISOString(),
          recevierId:
            researchTopic?.author_ResearchTopics.find((item) => {
              return (item.roleName = "author");
            })?.author.accountId || -1,
          notificationTypeId: 4,
          targetId: -1,
        };
        notiMutation(paramsNoti, {
          onSuccess: () => {
            console.log("Thông báo đã gửi");
          },
          onError: (error) => {
            console.error("Lỗi khi gửi thông báo:", error);
          },
        });
        setErrorMessage(null);
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Lỗi khi phê duyệt:", error);
      },
    });
    console.log(JSON.stringify(data));
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };
  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {isPending ? <SpinnerLoading /> : ""}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl mx-auto px-4 h-[690px] overflow-x-auto">
          <div className="bg-white rounded-md shadow-lg h-full  overflow-x-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Tiến độ phản biện cho đề tài: {researchTopic?.nameTopic}
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500 h-full">
              <div className="flex justify-between">
                <div>
                  <p>
                    Nếu đề tài đã đạt đủ yêu cầu, hãy tiến hành phê duyệt để tác
                    giả có thể tiến hành giai đoạn nghiệm thu
                  </p>
                  {researchTopic?.review_Committees.dateEnd && (
                    <div className="flex gap-3 font-semibold">
                      <p>Thời gian phản biện còn lại:</p>
                      <CountdownTimer
                        endDate={researchTopic?.review_Committees.dateEnd}
                      />
                    </div>
                  )}
                </div>

                {isDisabled ? (
                  <p className={`${isDisabled ? "hover:cursor-wait" : ""}`}></p>
                ) : (
                  <div className="flex gap-2">
                    <FormSelect
                      name="approvalStatus"
                      items={approvalStatus}
                      register={register}
                      error={errors.approvalStatus}
                      // label="Chọn tình trạng phê duyệt"
                      className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
                    />
                    <div>
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
                      <button
                        className="w-full p-2.5 flex-1 text-white bg-green-600 rounded-md ring-offset-2 ring-green-400 focus:ring-2 transition"
                        onClick={handleSubmit(onSubmit, onError)}
                      >
                        Phê duyệt
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <div className="mb-5 basis-1/2 px-3 py-2 border max-h-[700px] overflow-x-auto">
                  <ResearchTopicOverview researchTopic={researchTopic} />
                </div>
                <div className="basis-1/2 border px-3 py-2">
                  <p className="uppercase font-bold text-lg underline mb-3">
                    THÔNG TIN CHI TIẾT QUÁ TRÌNH PHẢN BIỆN
                  </p>
                  {researchTopic ? (
                    <ReviewOverview researchTopicDetail={researchTopic} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalShowDetailReviewProcessing };
