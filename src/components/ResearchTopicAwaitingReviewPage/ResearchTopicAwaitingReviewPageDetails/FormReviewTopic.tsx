"use client";

import { VersionOfResearchProjectTopic } from "@/types/VersionOfResearchProjectTopic";
import { useGetListFaculty } from "@/hooks-query/queries/use-get-faculties";
import { useGetListConclude } from "@/hooks-query/queries/use-get-conclude";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "antd";
import FormSelect, { SelectItem } from "@/components/FormCard/FormSelectField";
import { TFormReviewTopic } from "@/components/FormCard/FormInputsData";
import { FormReviewTopicSchema } from "@/components/FormCard/ZodSchema";
import FormField from "@/components/FormCard/FormInputField";
import { HistoryUpdateResearchTopic } from "@/types/HistoryUpdateResearchTopic";
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
import { useToast } from "@/hooks/use-toast";
import { SpinnerLoading } from "@/components/SpinnerLoading/SpinnerLoading";

interface IProps {
  version: HistoryUpdateResearchTopic;
  accountID: number;
}

const FormReviewTopic = (props: IProps) => {
  const { version, accountID } = props;
  const { data: session } = useSession();
  const { toast } = useToast();
  const { data: concludes } = useGetListConclude();
  const listConclude: SelectItem[] | undefined = concludes?.data.map(
    (item) => ({
      id: item.id,
      name: item.result,
    })
  );
  // với mỗi version, kiểm tra versionID và ReviewerID đã tồn tại trong bảng RevierForm chưa
  //    -> nếu chưa: hiển thị form phản biện
  //    -> ngược lại, hiển thị kết quả phản biện
  console.log("checking version: ", JSON.stringify(version, null, 2));
  const accountIdToCheck = 10;

  const hasReviewed = version.review_Forms.some(
    (form) => form.reviewer?.accountId === accountIdToCheck
  );

  const { mutate, isPending, isError, isSuccess } =
    useSubmitReviewFormMutation();
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
  } = useForm<TFormReviewTopic>({
    resolver: zodResolver(FormReviewTopicSchema),
    defaultValues: {},
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormReviewTopic) => {
    console.log("Check content: ", data.content);
    console.log("Check concludeID: ", data.concludeId);

    // GỌI API PHẢN BIỆN
    let params: ParamsSubmitReviewForm = {
      content: data.content,
      history_Update_ResearchTopicId: version.id,
      concludeId: Number(data.concludeId),
    };
    mutate(params, {
      onSuccess: () => {
        let notiContent = `${session?.user?.name} ${NotificationContentSample.NotificationType.reviewProcess.reviewer}. Nội dung phản biện: ${data.content}`;
        // gửi thông báo cho người đăng kí
        const paramsNoti: ParamsCreateNotification = {
          notificationContent: notiContent,
          notificationDate: new Date().toISOString(),
          recevierId: accountID,
          notificationTypeId: 3,
          targetId: -1,
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
      },
      onError: (error) => {
        console.error("Lỗi khi gửi thông báo:", error);
      },
    });
    console.log(params);
    // RESET FORM UPDATE
    reset({});
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  return (
    <div>
      {notiIsPending || isPending ? <SpinnerLoading /> : ""}
      <div>
        <h4 className="font-semibold mb-2">Nội dung chỉnh sửa của version:</h4>
        <p className="text-justify">{version.summary}</p>
      </div>
      {hasReviewed ? (
        <div>
          <p className="font-semibold mt-3">Nội dung phản biện trước đó</p>
          <p>
            {version.review_Forms.map((item) => {
              return (
                <div>
                  <p>{item.content}</p>
                  <p className="mt-3 font-semibold">
                    Kết luận: {item.conclude.result}
                  </p>
                </div>
              );
            })}
          </p>
        </div>
      ) : (
        <div>
          <h4 className="font-semibold mb-2">
            Phần nhận xét của người phản biện:
          </h4>
          <div>
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Nhận xét
            </label>
            <FormField
              type="text"
              placeholder="Nhập nhận xét ..."
              name="content"
              register={register}
              error={errors.content}
              isTextArea={true}
              className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
            />
          </div>
          <div>
            <FormSelect
              name="concludeId"
              items={listConclude || []}
              register={register}
              error={errors.concludeId}
              label="Kết luận"
              className="relative basis-1/2 z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
            />
          </div>
          <div className="mt-3">
            <Button
              onClick={handleSubmit(onSubmit, onError)}
              className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default FormReviewTopic;
