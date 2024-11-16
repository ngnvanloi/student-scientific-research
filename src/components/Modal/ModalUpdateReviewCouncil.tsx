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
import { DatePicker } from "../DatePicker/DatePicker";
import { useToast } from "@/hooks/use-toast";
import { ModalAddReviewerForCouncil } from "./ModalAddReviewerForCouncil";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { ReviewBoardMembers } from "@/types/ReviewBoardMembers";
import {
  columns,
  DataTableAddReviewer,
} from "../DataTable/DataTableAddReviewer";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import {
  ParamsUpdateReviewCouncil,
  useUpdateReviewCouncilMutation,
} from "@/hooks-query/mutations/use-update-review-council";
import { ReviewCouncilWithMembers } from "@/types/ReviewCouncilWithMembers";
import DateTimePicker from "../DatePicker/DateTimePicker";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reviewCouncil: ReviewCouncilWithMembers | undefined;
}
const ModalUpdateReviewCouncil = (props: IProps) => {
  const { isOpen, setIsOpen, reviewCouncil } = props;
  console.log("==== checking reviewCouncil update: ", reviewCouncil);
  // MUTATION
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending, isSuccess, isError } =
    useUpdateReviewCouncilMutation((msg) => {
      setErrorMessage(msg);
    });

  const listReviewPreviously: ReviewBoardMembers[] =
    reviewCouncil?.reviewBoardMembers.map((item) => {
      return {
        name: item.name,
        email: item.email,
        numberPhone: item.numberPhone,
        dateOfBirth: item.dateOfBirth,
        sex: item.sex,
        description: item.description,
      };
    }) || [];
  // STATE
  const [listReviewer, setListReviewer] =
    useState<ReviewBoardMembers[]>(listReviewPreviously);
  const [dateStart, setDateStart] = useState<Date | undefined>(
    reviewCouncil?.dateStart ? new Date(reviewCouncil.dateStart) : undefined
  );
  const [dateEnd, setDateEnd] = useState<Date | undefined>(
    reviewCouncil?.dateEnd ? new Date(reviewCouncil.dateEnd) : undefined
  );
  const [isModalAddReviewer, setModalAddReviewer] = useState<boolean>(false);
  useEffect(() => {
    const updatedListReviewers =
      reviewCouncil?.reviewBoardMembers.map((item) => ({
        name: item.name,
        email: item.email,
        numberPhone: item.numberPhone,
        dateOfBirth: item.dateOfBirth,
        sex: item.sex,
        description: item.description,
      })) || [];
    setListReviewer(updatedListReviewers);

    // Cập nhật dateStart và dateEnd
    console.log("========check dateStart: ", reviewCouncil?.dateStart);
    console.log("========check dateEnd: ", reviewCouncil?.dateEnd);
    setDateStart(
      reviewCouncil?.dateStart ? new Date(reviewCouncil.dateStart) : undefined
    );
    setDateEnd(
      reviewCouncil?.dateEnd ? new Date(reviewCouncil.dateEnd) : undefined
    );
    // cập nhật reviewCommitteeName
    if (reviewCouncil) {
      reset({
        name: reviewCouncil.reviewCommitteeName || "",
      });
    }
  }, [reviewCouncil]);
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
    defaultValues: {
      name: reviewCouncil?.reviewCommitteeName || "",
    },
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormEstablishReviewCouncil) => {
    console.log("Check name review council: ", data.name);
    console.log("Check list reviewzers: ", listReviewer);
    console.log("Check reviewCouncilID: ", reviewCouncil?.id);

    // GỌI API THÀNH LẬP HỘI ĐỒNG PHẢN BIỆN
    let requestBody: ParamsUpdateReviewCouncil = {
      reviewCommitteeName: data.name,
      dateStart: dateStart?.toISOString() || "",
      dateEnd: dateEnd?.toISOString() || "",
      reviewBoardMembers: listReviewer,
    };
    mutate(
      { id: reviewCouncil?.id || 0, params: requestBody },
      {
        onSuccess: () => {
          toast({
            title: "Thành công",
            variant: "default",
            description: "Hội đồng phản biện đã được cập nhật thành công",
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
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Lỗi khi cập nhật hội đồng phản biện:", error);
        },
      }
    );
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
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 ">
            <div className="bg-white rounded-md shadow-lg ">
              <div className="flex items-center justify-between p-4 border-b">
                <Dialog.Title className="text-lg font-medium text-gray-800 ">
                  <strong>
                    Cập nhật hội đồng phản biện{" "}
                    {reviewCouncil?.reviewCommitteeName}
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
                  </div>
                  <div className="basis-1/2">
                    <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                      Ngày kết thúc phản biện
                    </label>
                    <DateTimePicker date={dateEnd} setDate={setDateEnd} />
                  </div>
                </div>
                <div className="flex justify-between items-center justify-items-center mb-3 mt-3">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Thêm đồng tác giả
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
                    Cập nhật
                  </Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 ">
                    Cancel
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
export { ModalUpdateReviewCouncil };
