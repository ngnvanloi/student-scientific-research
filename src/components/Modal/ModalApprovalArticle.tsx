import {
  ParamsUpdateRegistrationForm,
  useApprovalRegistrationFormMutation,
} from "@/hooks-query/mutations/use-update-registration-status-mutation";
import * as Dialog from "@radix-ui/react-dialog";
import { Fragment, useState } from "react";
import FormSelect from "../FormCard/FormSelectField";
import { useForm } from "react-hook-form";
import { FormApprovalRegistration } from "../FormCard/ZodSchema";
import { TFormApprovalRegistration } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { useSession } from "next-auth/react";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { useGetRegistrationCompetitionDetail } from "@/hooks-query/queries/use-get-registration-competition-detail";
import {
  ParamsUpdateArticleForPublic,
  useApprovalArticleForPublicMutation,
} from "@/hooks-query/mutations/use-update-article-article-mutation";
import { useGetArticleDetail } from "@/hooks-query/queries/use-get-article-detail";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  articleID: number;
}
const approvalStatus = [
  { id: 1, name: "Phê duyệt" },
  { id: 2, name: "Từ chối" },
];
const ModalApprovalArticle = (props: IProps) => {
  // STATE
  const { isOpen, setIsOpen, articleID } = props;
  const { toast } = useToast();
  const { data: session } = useSession();
  // GET DATA
  const { data: articleDetail } = useGetArticleDetail(articleID);
  const {
    mutate: notiMutation,
    isSuccess: isNotiSuccess,
    isError: isNotiError,
    error: notiError,
  } = useCreateNotificationMutation();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormApprovalRegistration>({
    resolver: zodResolver(FormApprovalRegistration),
  });

  // POST DETAILS
  console.log("check articleID: ", articleID);

  // HANDLE LOGIC
  const approvalArticleMutation = useApprovalArticleForPublicMutation();

  // HANDLE LOGIC
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
        NotificationContentSample.NotificationType.article.admin.accept;
    } else if (data.approvalStatus === "2") {
      contentNoti =
        NotificationContentSample.NotificationType.article.admin.reject;
    }

    // gửi request đến API phê duyệt đăng kí
    let approvl = 0;
    if (data.approvalStatus === "1") {
      approvl = 1;
    }
    if (data.approvalStatus === "2") {
      approvl = 2;
    }
    const bodyRequest: ParamsUpdateArticleForPublic = {
      AcceptedForPublicationStatus: approvl,
    };
    approvalArticleMutation.mutate(
      { id: articleID, requestbody: bodyRequest },
      {
        onSuccess: () => {
          // alert("Phê duyệt thành công");
          toast({
            title: "Xác nhận",
            variant: "default",
            description:
              "Bài báo đã được phê duyệt thành công! Tác giả sẽ được thông báo sớm nhất có thể",
          });
          // gửi thông báo cho người đăng kí
          const paramsNoti: ParamsCreateNotification = {
            notificationContent: "Nhà trường " + contentNoti,
            notificationDate: new Date().toISOString(),
            // recevierId: articleDetail?.data.accountID || -1,
            recevierId:
              articleDetail?.data?.author_Articles?.find(
                (author) => author.roleName === "author"
              )?.author.accountId || -1,
            notificationTypeId: 1,
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
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Lỗi khi phê duyệt:", error);
        },
      }
    );
    console.log(JSON.stringify(data));
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  // RENDER UI
  return (
    <Fragment>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
            <div className="bg-white rounded-md shadow-lg px-4 py-6">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-lg font-medium text-gray-800">
                  <div className="font-bold text-yellow-500">
                    Phê duyệt bài báo
                  </div>
                </Dialog.Title>
                <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Dialog.Close>
              </div>
              <Dialog.Description className="mt-3 text-sm leading-relaxed text-left text-gray-500">
                Vui lòng cân nhắc chất lượng bài báo và phê duyệt để bài báo
                được đăng tải lên hệ thống
              </Dialog.Description>
              <br />
              <FormSelect
                name="approvalStatus"
                items={approvalStatus}
                register={register}
                error={errors.approvalStatus}
                label="Chọn tình trạng phê duyệt"
                className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
              />
              <div className="items-center gap-2 mt-3 text-sm sm:flex">
                <div>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-yellow-600 rounded-md ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={handleSubmit(onSubmit, onError)}
                  >
                    Cập nhật
                  </button>
                </div>
                <div>
                  <button
                    aria-label="Close"
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Fragment>
  );
};
export { ModalApprovalArticle };
