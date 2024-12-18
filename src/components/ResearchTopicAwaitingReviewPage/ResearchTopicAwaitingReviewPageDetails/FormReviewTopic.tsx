"use client";
import { useGetListConclude } from "@/hooks-query/queries/use-get-conclude";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button } from "antd";
import FormSelect, { SelectItem } from "@/components/FormCard/FormSelectField";
import { TFormReviewTopic } from "@/components/FormCard/FormInputsData";
import { FormReviewTopicSchema } from "@/components/FormCard/ZodSchema";
import FormField from "@/components/FormCard/FormInputField";
import { HistoryUpdateResearchTopic } from "@/types/HistoryUpdateResearchTopic";
import { ParamsSubmitReviewForm } from "@/hooks-query/mutations/use-submit-review-form-for-topic-version";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { ModalConfirmReviewTopic } from "@/components/Modal/ModalConfirmReviewTopic";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";

interface IProps {
  version: HistoryUpdateResearchTopic;
  accountID: number;
  researchTopicID: number;
  reviewAcceptanceStatus: number;
  researchTopic?: ResearchProjectTopic;
}

const FormReviewTopic = (props: IProps) => {
  const {
    version,
    accountID,
    researchTopicID,
    reviewAcceptanceStatus,
    researchTopic,
  } = props;
  const { data: session } = useSession();
  const { toast } = useToast();
  const { data: concludes } = useGetListConclude();
  const listConclude: SelectItem[] | undefined = concludes?.data.map(
    (item) => ({
      id: item.id,
      name: item.result,
    })
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [paramsSender, setParamsSender] = useState<ParamsSubmitReviewForm>({
    content: "",
    history_Update_ResearchTopicId: 0,
    concludeId: 0,
  });
  // với mỗi version, kiểm tra versionID và ReviewerID đã tồn tại trong bảng RevierForm chưa
  //    -> nếu chưa: hiển thị form phản biện
  //    -> ngược lại, hiển thị kết quả phản biện
  console.log("checking version: ", JSON.stringify(version, null, 2));
  const accountIdToCheck = session?.user?.accountId;

  const hasReviewed = version.review_Forms.some(
    (form) => form.reviewer?.accountId === accountIdToCheck
  );

  console.log(
    "Checking owner review version: ",
    JSON.stringify(version.review_Forms, null, 2)
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    setIsDisabled(true);
    let targetTime = new Date(
      researchTopic?.review_Committees?.dateEnd || ""
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
    if (Number(data.concludeId) === 0) {
      setErrorMessage("Vui lòng chọn kết luận để hoàn tất việc phản biện");
    } else {
      console.log("Check content: ", data.content);
      console.log("Check concludeID: ", data.concludeId);

      // GỌI API PHẢN BIỆN
      let params: ParamsSubmitReviewForm = {
        content: data.content,
        history_Update_ResearchTopicId: version.id,
        concludeId: Number(data.concludeId),
      };
      setParamsSender(params);
      setIsOpen(true);

      // RESET FORM UPDATE
      // reset({});
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  return (
    <div>
      <div>
        <h4 className="font-semibold mb-2 text-base">
          Nội dung chỉnh sửa của version:
        </h4>
        <p className="text-justify max-h-[290px] overflow-x-auto">
          {version.summary}
        </p>
      </div>
      {hasReviewed ||
      reviewAcceptanceStatus === 1 ||
      reviewAcceptanceStatus === 2 ||
      !isDisabled ? (
        <div>
          <p className="font-semibold mt-3 text-base">
            Nội dung phản biện trước đó:{" "}
          </p>
          <p>
            {version.review_Forms
              .filter((item) => item.reviewer.accountId === accountIdToCheck)
              .map((filteredItem) => (
                <div key={filteredItem.id}>
                  <p>{filteredItem.content}</p>
                  <p className="mt-3 font-semibold">
                    Kết luận: {filteredItem.conclude.result}
                  </p>
                </div>
              ))}
          </p>
        </div>
      ) : (
        <div>
          <h4 className="font-semibold mt-3 mb-2 text-base">
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
            {errorMessage && (
              <div className="my-3">
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
              className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
            >
              Gửi đi
            </Button>
            <ModalConfirmReviewTopic
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              paramsSubmitReviewForm={paramsSender}
              accountID={accountID}
              researchTopicID={researchTopicID}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default FormReviewTopic;
