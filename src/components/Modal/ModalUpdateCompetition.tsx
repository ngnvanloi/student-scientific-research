"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormAddCompetition, TFormAddPost } from "../FormCard/FormInputsData";
import { FormAddCompetitonSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Alert, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useCompetitionManagementContext } from "../UseContextProvider/CompetitionManagementContext";
import {
  ParamsCreateCompetition,
  useCreateCompetitionMutation,
} from "@/hooks-query/mutations/use-create-competition-mutation";
import { useToast } from "@/hooks/use-toast";
import DateTimePicker from "../DatePicker/DateTimePicker";
import { CloseOutlined } from "@ant-design/icons";
import { Competition } from "@/types/Competition";
import { useUpdateCompetitionMutation } from "@/hooks-query/mutations/use-update-competition-mutation";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { ParamsGetListCompetition } from "@/hooks-query/queries/use-get-competitions";
import { queryKeys } from "@/hooks-query/queries/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { isDateGreaterThan, isPastDate } from "@/helper/extension-function";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  competition: Competition;
}
const ModalUpdateCompetition = (props: IProps) => {
  const { isOpen, setIsOpen, competition } = props;
  // STATE
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [dateStart, setDateStart] = useState<Date | undefined>(new Date());
  const [dateEnd, setDateEnd] = useState<Date | undefined>(new Date());
  const [dateEndSubmit, setDateEndSubmit] = useState<Date | undefined>(
    new Date()
  );
  // VALIDATION DATE
  const [errorDateStartMessage, setErrorDateStartMessage] = useState<
    string | null
  >(null);
  const [errorDateEndMessage, setErrorDateEndMessage] = useState<string | null>(
    null
  );
  const [errorDateEndSubmitMessage, setErrorDateEndSubmitMessage] = useState<
    string | null
  >(null);
  useEffect(() => {
    // // kiểm tra ngày bắt đầu
    // if (isPastDate(dateStart?.toISOString() || "")) {
    //   setErrorDateStartMessage("Ngày bắt đầu không thể nhỏ hơn ngày hiện tại");
    // } else {
    //   setErrorDateStartMessage(null);
    // }
    // kiểm tra ngày kết thúc
    // if (isPastDate(dateEnd?.toISOString() || "")) {
    //   setErrorDateEndMessage("Ngày kết thúc không thể hơn hơn ngày hiện tại");
    // } else
    if (isDateGreaterThan(dateStart || "", dateEnd || "")) {
      setErrorDateEndMessage("Ngày kết thúc không thể hơn hơn ngày bắt đầu");
    } else {
      setErrorDateEndMessage(null);
    }
    // kiểm tra hạn chốt nộp bài
    // if (isPastDate(dateEndSubmit?.toISOString() || "")) {
    //   setErrorDateEndSubmitMessage(
    //     "Ngày hạn chốt nộp đề tài không thể nhỏ hơn ngày hiện tại"
    //   );
    // } else
    if (
      isDateGreaterThan(dateEndSubmit || "", dateEnd || "") ||
      isDateGreaterThan(dateStart || "", dateEndSubmit || "")
    ) {
      setErrorDateEndSubmitMessage(
        "Hạn chốt nộp bài phải nằm trong khoảng thời gian bắt đầu và kết thúc cuộc thi"
      );
    } else {
      setErrorDateEndSubmitMessage(null);
    }
  }, [dateStart, dateEnd, dateEndSubmit]);
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useUpdateCompetitionMutation((msg) => {
      setErrorMessage(msg);
    });
  // State để điều khiển modal
  const { toast } = useToast();
  // USE PROVIDER CONTEXT
  const { setIsChange } = useCompetitionManagementContext();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<TFormAddCompetition>({
    resolver: zodResolver(FormAddCompetitonSchema),
    defaultValues: {
      competitionName: competition.competitionName,
      description: competition.description,
      destination: competition.destination,
    },
  });
  useEffect(() => {
    reset({
      competitionName: competition.competitionName,
      description: competition.description,
      destination: competition.destination,
    });
    setDateEndSubmit(new Date(competition?.dateEndSubmit));
    setDateStart(new Date(competition?.dateStart));
    setDateEnd(new Date(competition?.dateEnd));
  }, [competition]);
  // HANDLE LOGIC
  const onSubmit = (data: TFormAddCompetition) => {
    console.log("Check date start: ", typeof dateStart?.toISOString());
    console.log("Check date end: ", typeof dateEnd?.toISOString());
    if (
      // isPastDate(dateStart?.toISOString() || "") ||
      // isPastDate(dateEnd?.toISOString() || "") ||
      // isPastDate(dateEndSubmit?.toISOString() || "") ||
      isDateGreaterThan(dateStart || "", dateEnd || "") ||
      isDateGreaterThan(dateEndSubmit || "", dateEnd || "") ||
      isDateGreaterThan(dateStart || "", dateEndSubmit || "")
    ) {
      return;
    }
    // gọi API thêm Post
    let dataSender: ParamsCreateCompetition = {
      competitionName: data.competitionName,
      dateStart: dateStart?.toISOString(),
      dateEnd: dateEnd?.toISOString(),
      dateEndSubmit: dateEndSubmit?.toISOString(),
      description: data.description,
      destination: data.destination,
    };

    mutate(
      { id: competition.id, data: dataSender },
      {
        onSuccess: async () => {
          toast({
            title: "Thành công",
            variant: "default",
            description: "Bạn đã cập nhật thành công cuộc thi",
          });
          // setIsChange(true);
          let params: ParamsGetListCompetition = {
            index: 1,
            pageSize: 100,
          };
          await queryClient.refetchQueries({
            queryKey: queryKeys.listCompetition(params),
          });
          setIsOpen(false);
          setErrorMessage(null);
          setContent("");
          setDateStart(new Date());
          setDateEnd(new Date());
          setFile(undefined);
        },
        onError: (error) => {
          console.error("Lỗi khi tạo mới cuộc thi:", error);
        },
      }
    );
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {isPending ? <SpinnerLoading /> : ""}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 h-[620px] overflow-x-auto">
          <div className="bg-white rounded-md shadow-lg h-full  overflow-x-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                <strong>
                  Chỉnh sửa cuộc thi {competition.competitionName}
                </strong>
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <div className="grid grid-cols-3 gap-5">
                <div className="basis-1/3">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Ngày bắt đầu
                  </label>
                  <DateTimePicker date={dateStart} setDate={setDateStart} />
                  {errorDateStartMessage && (
                    <p className="text-red-500 error-message">
                      {errorDateStartMessage}
                    </p>
                  )}
                </div>
                <div className="basis-1/3">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Ngày kết thúc
                  </label>
                  <DateTimePicker date={dateEnd} setDate={setDateEnd} />
                  {errorDateEndMessage && (
                    <p className="text-red-500 error-message">
                      {errorDateEndMessage}
                    </p>
                  )}
                </div>
                <div className="basis-1/3">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Hạn chốt nộp đề tài
                  </label>
                  <DateTimePicker
                    date={dateEndSubmit}
                    setDate={setDateEndSubmit}
                  />
                  {errorDateEndSubmitMessage && (
                    <p className="text-red-500 error-message">
                      {errorDateEndSubmitMessage}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Tên cuộc thi
                </label>
                <FormField
                  type="text"
                  placeholder="Nhập tên cuộc thi"
                  name="competitionName"
                  register={register}
                  error={errors.competitionName}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>

              <div className="mt-5">
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Giới thiệu về cuộc thi
                </label>
                <FormField
                  type="text"
                  placeholder="Nhập tổng quan đề tài ..."
                  name="description"
                  register={register}
                  error={errors.description}
                  isTextArea={true}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Địa điểm tổ chức
                </label>
                <FormField
                  type="text"
                  placeholder="Nhập địa điểm tổ chức"
                  name="destination"
                  register={register}
                  error={errors.destination}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
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
                  Hủy
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export { ModalUpdateCompetition };
