"use client";

import FormField from "@/components/FormCard/FormInputField";
import { TFormSubmitNewTopicVersion } from "@/components/FormCard/FormInputsData";
import { FormSubmitNewTopicVersion } from "@/components/FormCard/ZodSchema";
import { SpinnerLoading } from "@/components/SpinnerLoading/SpinnerLoading";
import DragFileUpload from "@/components/UploadFile/DragFileUpload";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import {
  ParamsSubmitNewVersionResearchTopic,
  useSubmitNewVersionResearchTopicMutation,
} from "@/hooks-query/mutations/use-submit-new-version-research-topic";
import { useUploadFileMutation } from "@/hooks-query/mutations/use-upload-file-mutation";
import { useToast } from "@/hooks/use-toast";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import { CloseOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  researchTopicDetail: ResearchProjectTopic;
}
const SubmitNewResearchTopicVersion = (props: IProps) => {
  const { researchTopicDetail } = props;
  const { data: session } = useSession();
  const [fileReport, setFileReport] = useState<File>();
  const [fileProduct, setFileProduct] = useState<File>();
  const { toast } = useToast();
  // REACT QUERY MUTATION
  const {
    mutate: fileReportMutation,
    isSuccess: fileIsSuccess,
    isError: fileIsError,
    error: fileError,
    isPending: fileIsPending,
  } = useUploadFileMutation();
  const {
    mutate: fileProductMutation,
    isSuccess: fileProductIsSuccess,
    isError: fileProductIsError,
    error: fileProductError,
    isPending: fileProductIsPending,
  } = useUploadFileMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, isPending } =
    useSubmitNewVersionResearchTopicMutation((msg) => {
      setErrorMessage(msg);
    });
  const [isDisabled, setIsDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    setIsDisabled(true);
    let targetTime = new Date(
      researchTopicDetail?.review_Committees?.dateEnd || ""
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
  }, [researchTopicDetail]);
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
    reset,
  } = useForm<TFormSubmitNewTopicVersion>({
    resolver: zodResolver(FormSubmitNewTopicVersion),
  });
  const uploadFile = (mutation: any, formData: any) => {
    return new Promise<string>((resolve, reject) => {
      mutation(formData, {
        onSuccess: (result: any) => {
          if (typeof result.data === "string") {
            resolve(result.data);
          } else {
            reject(new Error("Invalid file URL"));
          }
        },
        onError: (error: any) => reject(error),
      });
    });
  };

  console.log(
    "checking researchTopicDetail.history_Update_ResearchTopics: ",
    JSON.stringify(
      researchTopicDetail.review_Committees.reviewBoardMembers,
      null,
      2
    )
  );
  // ON SUBMIT
  const onSubmit = async (data: TFormSubmitNewTopicVersion) => {
    console.log("checking ID topic version: ", researchTopicDetail.id);
    console.log("checking summary topic version: ", data.summary);
    // GỌI API UPLOAD FILE
    const formDataUploadFileProduct = new FormData();
    const formDataUploadFileReport = new FormData();
    if (fileProduct) {
      formDataUploadFileProduct.append("File", fileProduct);
      formDataUploadFileProduct.append(
        "FolderName",
        FolderNameUploadFirebase.ProductFileFolder
      );
    }
    if (fileReport) {
      formDataUploadFileReport.append("File", fileReport);
      formDataUploadFileReport.append(
        "FolderName",
        FolderNameUploadFirebase.ReportFileFolder
      );
    }
    try {
      // Khởi tạo các promise upload file nếu file tồn tại
      const fileUploadPromises = [
        fileProduct
          ? uploadFile(fileProductMutation, formDataUploadFileProduct)
          : Promise.resolve(""),
        fileReport
          ? uploadFile(fileReportMutation, formDataUploadFileReport)
          : Promise.resolve(""),
      ];

      // Thực hiện các promise upload file đồng thời và đợi tất cả hoàn tất
      const [productFilePath, reportFilePath] =
        await Promise.all(fileUploadPromises);

      // GỌI API TẠO VERSION MỚI
      let params: ParamsSubmitNewVersionResearchTopic = {
        researchTopicId: researchTopicDetail.id,
        newReportFilePath: reportFilePath || "",
        newProductFilePath: productFilePath || "",
        summary: data.summary || "",
      };
      mutate(params, {
        onSuccess: () => {
          toast({
            title: "Thành công",
            variant: "default",
            description:
              "Bạn vừa cập nhật đề tài thành công, vui lòng theo dõi thông báo cho quá trình phản biện",
          });
          // Reset các field input và file
          reset({
            summary: "",
          });
          setErrorMessage(null);
          setFileProduct(undefined);
          setFileReport(undefined);

          // noti content
          let notiContent = `${session?.user?.name} ${NotificationContentSample.NotificationType.reviewProcess.author}. Nội dung chỉnh sửa: ${data.summary}`;
          // lấy ra danh sách các reviewer và gửi thông báo lần lượt
          researchTopicDetail.review_Committees.reviewBoardMembers.map(
            (item, index) => {
              const paramsNoti: ParamsCreateNotification = {
                notificationContent: notiContent,
                notificationDate: new Date().toISOString(),
                recevierId: item.accountId || 0,
                notificationTypeId: 3,
                targetId: researchTopicDetail.id,
              };
              notiMutation(paramsNoti, {
                onSuccess: () => {
                  toast({
                    title: "Thành công",
                    variant: "default",
                    description: `Bạn đã gửi thông báo thành công đến người phản biện: ${item.name}`,
                  });
                },
                onError: (error) => {
                  console.error("Lỗi khi gửi thông báo:", error);
                },
              });
            }
          );
        },
        onError: (error) => {
          console.error("Lỗi khi tạo bài báo:", error);
        },
      });
      // Tạo request body từ kết quả mutation
    } catch (error) {
      console.error("Lỗi khi upload file:", error);
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };
  // UI
  return (
    <div>
      {isDisabled ? (
        <div className="px-3 py-2">
          {isPending || fileIsPending || fileProductIsPending ? (
            <SpinnerLoading />
          ) : (
            ""
          )}

          <div className="">
            <div className="mt-2">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                File thuyết minh
              </label>
              <DragFileUpload
                limit={1}
                multiple={false}
                setFile={setFileReport}
              />
            </div>
            <div className="mt-2">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                File sản phẩm (nếu có)
              </label>
              <DragFileUpload
                limit={1}
                multiple={false}
                setFile={setFileProduct}
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Tổng quan chỉnh sửa
            </label>
            <FormField
              type="text"
              placeholder="Nhập tổng quan nội dung chỉnh sửa ..."
              name="summary"
              register={register}
              error={errors.summary}
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
            Xác nhận
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export { SubmitNewResearchTopicVersion };
