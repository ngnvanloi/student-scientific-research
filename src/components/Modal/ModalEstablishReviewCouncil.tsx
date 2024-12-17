"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormEstablishReviewCouncil } from "../FormCard/FormInputsData";
import { FormEstablishReviewCouncil } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Alert, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { Competition } from "@/types/Competition";
import { ModalAddReviewerForCouncil } from "./ModalAddReviewerForCouncil";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { ReviewBoardMembers } from "@/types/ReviewBoardMembers";
import {
  columns,
  DataTableAddReviewer,
} from "../DataTable/DataTableAddReviewer";
import {
  ParamsEstablishReviewCouncil,
  useEstablishReviewCouncilMutation,
} from "@/hooks-query/mutations/use-establish-review-council";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import DateTimePicker from "../DatePicker/DateTimePicker";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks-query/queries/query-keys";
import { ParamsGetListReviewCouncilForEachCompetition } from "@/hooks-query/queries/use-get-review-council-each-competition";
import { isDateGreaterThan, isPastDate } from "@/helper/extension-function";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  competition: Competition | undefined;
}
const ModalEstablishReviewCouncil = (props: IProps) => {
  const { isOpen, setIsOpen, competition } = props;
  const queryClient = useQueryClient();
  // MUTATION
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending, isSuccess, isError } =
    useEstablishReviewCouncilMutation((msg) => {
      setErrorMessage(msg);
    });
  // STATE
  const [listReviewer, setListReviewer] = useState<ReviewBoardMembers[]>([]);
  const [isModalAddReviewer, setModalAddReviewer] = useState<boolean>(false);
  const [dateStart, setDateStart] = useState<Date | undefined>(new Date());
  const [dateEnd, setDateEnd] = useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today;
  });
  const { toast } = useToast();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormEstablishReviewCouncil>({
    resolver: zodResolver(FormEstablishReviewCouncil),
  });
  // VALIDATION DATE
  const [errorDateStartMessage, setErrorDateStartMessage] = useState<
    string | null
  >(null);
  const [errorDateEndMessage, setErrorDateEndMessage] = useState<string | null>(
    null
  );
  useEffect(() => {
    // kiểm tra ngày bắt đầu
    // if (isPastDate(dateStart?.toISOString() || "")) {
    //   setErrorDateStartMessage(
    //     "Ngày bắt đầu phản biện không thể nhỏ hơn ngày hiện tại"
    //   );
    // } else {
    //   setErrorDateStartMessage(null);
    // }
    // kiểm tra ngày kết thúc
    if (isPastDate(dateEnd?.toISOString() || "")) {
      setErrorDateEndMessage(
        "Ngày kết thúc phản biện không thể hơn hơn ngày hiện tại"
      );
    } else if (isDateGreaterThan(dateStart || "", dateEnd || "")) {
      setErrorDateEndMessage(
        "Ngày kết thúc phản biện không thể hơn hơn ngày bắt đầu phản biện"
      );
    } else {
      setErrorDateEndMessage(null);
    }
  }, [dateStart, dateEnd]);

  // HANDLE LOGIC
  const onSubmit = (data: TFormEstablishReviewCouncil) => {
    console.log("Check name review council: ", data.name);
    console.log("Check list reviewzers: ", listReviewer);
    console.log("Check competitionID: ", competition?.id);
    if (
      // isPastDate(dateStart?.toISOString() || "") ||
      isPastDate(dateEnd?.toISOString() || "") ||
      isDateGreaterThan(dateStart || "", dateEnd || "")
    ) {
      return;
    }
    // GỌI API THÀNH LẬP HỘI ĐỒNG PHẢN BIỆN
    let requestBody: ParamsEstablishReviewCouncil = {
      reviewCommitteeName: data.name,
      competitionId: competition?.id || 0,
      dateStart: dateStart?.toISOString() || "",
      dateEnd: dateEnd?.toISOString() || "",
      reviewBoardMembers: listReviewer,
    };
    mutate(requestBody, {
      onSuccess: async () => {
        toast({
          title: "Thành công",
          variant: "default",
          description: "Hội đồng phản biện đã được tạo thành công",
        });
        // reset input fields
        reset({
          name: "",
        });
        setErrorMessage(null);
        setListReviewer([]);
        setDateStart(new Date());
        setDateEnd(() => {
          const today = new Date();
          today.setDate(today.getDate() + 7);
          return today;
        });
        // refetch dữ liệu
        let params: ParamsGetListReviewCouncilForEachCompetition = {
          competitionId: competition?.id || 0,
          page: 1,
          pageSize: 10,
        };
        await queryClient.refetchQueries({
          queryKey: [queryKeys.listReviewCouncilForEachCompetition, params],
        });
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Lỗi khi thành lập hội đồng phản biện:", error);
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
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 h-[550px] overflow-x-auto">
            <div className="bg-white rounded-md shadow-lg h-full overflow-x-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <Dialog.Title className="text-lg font-medium text-gray-800 ">
                  <strong>
                    Thành lập hội đồng phản biện cho cuộc thi{" "}
                    {competition?.competitionName}
                  </strong>
                </Dialog.Title>
                <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                  <CloseModalIcon />
                </Dialog.Close>
              </div>
              <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                <div>
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Tên hội đồng phản biện
                  </label>
                  <FormField
                    type="text"
                    placeholder="Nhập tên hội đồng phản biện"
                    name="name"
                    register={register}
                    error={errors.name}
                    className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="basis-1/2">
                    <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                      Ngày bắt đầu phản biện
                    </label>
                    <DateTimePicker date={dateStart} setDate={setDateStart} />
                    {errorDateStartMessage && (
                      <p className="text-red-500 error-message">
                        {errorDateStartMessage}
                      </p>
                    )}
                  </div>
                  <div className="basis-1/2">
                    <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                      Ngày kết thúc phản biện
                    </label>
                    <DateTimePicker date={dateEnd} setDate={setDateEnd} />
                    {errorDateEndMessage && (
                      <p className="text-red-500 error-message">
                        {errorDateEndMessage}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center justify-items-center mb-3 mt-3">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Thêm người phản biện
                  </label>
                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => setModalAddReviewer(true)}
                  >
                    <PlusOutlined />
                    Thêm
                  </Button>
                </div>
                <div>
                  <ModalAddReviewerForCouncil
                    isOpen={isModalAddReviewer}
                    setIsOpen={setModalAddReviewer}
                    setListReviewer={setListReviewer}
                  />
                  <DataTableAddReviewer
                    columns={columns}
                    data={listReviewer}
                    setData={setListReviewer}
                  />
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
export { ModalEstablishReviewCouncil };
