import { CloseOutlined } from "@ant-design/icons";
import { Alert, Button } from "antd";
import FormField from "../FormCard/FormInputField";
import { Acceptance } from "@/types/Acceptance";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  ParamsApprovedAcceptanceForOrganizer,
  useApprovedAcceptanceForOrganizerMutation,
} from "@/hooks-query/mutations/use-approved-acceptance-for-organizer";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { TFormApprovedAcceptance } from "../FormCard/FormInputsData";
import { FormApprovedAcceptanceSchema } from "../FormCard/ZodSchema";
import { useGetCompetitionDetail } from "@/hooks-query/queries/use-get-competition";
import FormSelect from "../FormCard/FormSelectField";
import {
  ParamsApprovedAcceptanceForSuperAdmin,
  useApprovedAcceptanceForSuperAdminMutation,
} from "@/hooks-query/mutations/use-approved-acceptance-for-super-admin";

interface IProps {
  acceptance: Acceptance | undefined;
  setIsLoadingSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const approvalStatus = [
  { id: 1, name: "Phê duyệt" },
  { id: 2, name: "Từ chối" },
];
const ApprovalAcceptanceForSuperAdmin = (props: IProps) => {
  const { acceptance, setIsLoadingSpinner, setIsOpen } = props;
  const { data: session } = useSession();
  const { toast } = useToast();

  const { data: competitionDetails, refetch } = useGetCompetitionDetail(
    acceptance?.researchTopic.competitionId || 0
  );
  useEffect(() => {
    refetch();
  }, [acceptance?.researchTopic.competitionId]);
  // MUTATION DECLARE
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useApprovedAcceptanceForSuperAdminMutation((msg) => {
      setErrorMessage(msg);
    });

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
  } = useForm<TFormApprovedAcceptance>({
    resolver: zodResolver(FormApprovedAcceptanceSchema),
  });

  // HANDLE LOGIC
  const onSubmit = async (data: TFormApprovedAcceptance) => {
    if (Number(data.isAccepted) === 0) {
      setErrorMessage("Bạn phải chọn tình trạng phê duyệt");
    } else {
      try {
        // Tạo request body từ kết quả mutation
        const requestBody: ParamsApprovedAcceptanceForSuperAdmin = {
          AcceptedForPublicationStatus: Number(data.isAccepted),
        };
        // Gọi API
        mutate(
          { id: Number(acceptance?.id), params: requestBody },
          {
            onSuccess: () => {
              toast({
                title: "Thành công",
                variant: "default",
                description:
                  "Bạn đã cập nhật thành công bản nghiệm thu, vui lòng chờ đợi ban tổ chức phê duyệt",
              });
              toast({
                title: "Thông báo",
                variant: "default",
                description:
                  "Bạn đã phê duyệt nghiệm thu thành công. Tác giả và ban tổ chức sẽ nhận được thông báo sớm nhất",
              });
              // gửi noti cho ban tổ chức
              const paramsNotii: ParamsCreateNotification = {
                notificationContent:
                  `${
                    Number(data.isAccepted) === 1
                      ? NotificationContentSample.NotificationType
                          .approvedAcceptance.admin.forOrganizer.accept
                      : NotificationContentSample.NotificationType
                          .approvedAcceptance.admin.forOrganizer.reject
                  }` +
                  ". Nội dung nhận xét: " +
                  data.description,
                notificationDate: new Date().toISOString(),
                recevierId: competitionDetails?.data.accountId || 0,
                notificationTypeId: 9,
                targetId: 0,
              };
              notiMutation(paramsNotii, {
                onSuccess: () => {
                  console.log("Thông báo đã gửi");
                },
                onError: (error) => {
                  console.error("Lỗi khi gửi thông báo:", error);
                },
              });
              // gửi thông báo cho tác giả
              const paramsNoti: ParamsCreateNotification = {
                notificationContent:
                  `${
                    Number(data.isAccepted) === 1
                      ? NotificationContentSample.NotificationType
                          .approvedAcceptance.admin.forAuthor.accept
                      : NotificationContentSample.NotificationType
                          .approvedAcceptance.admin.forAuthor.reject
                  }` +
                  ". Nội dung nhận xét: " +
                  data.description,
                notificationDate: new Date().toISOString(),
                recevierId:
                  acceptance?.researchTopic.author_ResearchTopics.find(
                    (item) => item.roleName === "author"
                  )?.author.accountId || 0,
                notificationTypeId: 9,
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
              // Reset các field input và file
              reset({
                description: "",
              });
              setErrorMessage(null);
              setIsOpen(false);
            },
            onError: (error) => {
              console.error("Lỗi khi tạo phê duyệt nghiệm thu:", error);
            },
          }
        );
      } catch (error) {
        console.error("Lỗi khi upload file:", error);
      }
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  useEffect(() => {
    if (isPending || notiIsPending) {
      setIsLoadingSpinner(true);
    } else {
      setIsLoadingSpinner(false);
    }
  }, [isPending, notiIsPending, setIsLoadingSpinner]);
  return (
    <div>
      <div>
        <FormSelect
          name="isAccepted"
          items={approvalStatus}
          register={register}
          error={errors.isAccepted}
          label="Chọn tình trạng phê duyệt"
          className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
        />
      </div>
      <div className="mt-3">
        <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
          Nhận xét
        </label>
        <FormField
          type="text"
          placeholder="Nhập nhận xét đánh giá..."
          name="description"
          register={register}
          error={errors.description}
          isTextArea={true}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
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
        Cập nhật
      </Button>
    </div>
  );
};
export { ApprovalAcceptanceForSuperAdmin };
