"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormAddCompetition, TFormAddPost } from "../FormCard/FormInputsData";
import { FormAddCompetitonSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Alert, Button } from "antd";
import React, { useState } from "react";
import { useCompetitionManagementContext } from "../UseContextProvider/CompetitionManagementContext";
import {
  ParamsCreateCompetition,
  useCreateCompetitionMutation,
} from "@/hooks-query/mutations/use-create-competition-mutation";
import { useToast } from "@/hooks/use-toast";
import DateTimePicker from "../DatePicker/DateTimePicker";
import { CloseOutlined, CloseSquareFilled } from "@ant-design/icons";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { useQueryClient } from "@tanstack/react-query";
import { ParamsGetListCompetition } from "@/hooks-query/queries/use-get-competitions";
import { queryKeys } from "@/hooks-query/queries/query-keys";

const ModalAddNewCompetition = () => {
  // STATE
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [fileList, setFileList] = useState<File[]>([]);
  const [dateStart, setDateStart] = useState<Date | undefined>(new Date());
  const [dateEnd, setDateEnd] = useState<Date | undefined>(new Date());
  const [dateEndSubmit, setDateEndSubmit] = useState<Date | undefined>(
    new Date()
  );

  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useCreateCompetitionMutation((msg) => {
      setErrorMessage(msg);
    });
  // State để điều khiển modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast();
  // USE PROVIDER CONTEXT
  const { setIsChange } = useCompetitionManagementContext();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormAddCompetition>({
    resolver: zodResolver(FormAddCompetitonSchema),
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormAddCompetition) => {
    console.log("Check date start: ", typeof dateStart?.toISOString());
    console.log("Check date end: ", typeof dateEnd?.toISOString());

    // gọi API thêm Post
    let dataSender: ParamsCreateCompetition = {
      competitionName: data.competitionName,
      dateStart: dateStart?.toISOString(),
      dateEnd: dateEnd?.toISOString(),
      dateEndSubmit: dateEndSubmit?.toISOString(),
      description: data.description,
      destination: data.destination,
    };

    mutate(dataSender, {
      onSuccess: async () => {
        toast({
          title: "Thành công",
          variant: "default",
          description:
            "Chúc mừng! Cuộc thi đã được thiết lập, đừng quên triển khai đến sinh viên và quản lý tiến độ.",
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
    });
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {isPending ? <SpinnerLoading /> : ""}
      <Dialog.Trigger className="w-32 py-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
        Tạo cuộc thi mới
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 h-[620px] overflow-x-auto">
          <div className="bg-white rounded-md shadow-lg h-full  overflow-x-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                <strong>Tạo cuộc thi mới</strong>
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
                </div>
                <div className="basis-1/3">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Ngày kết thúc
                  </label>
                  <DateTimePicker date={dateEnd} setDate={setDateEnd} />
                </div>
                <div className="basis-1/3">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Hạn chốt nộp đề tài
                  </label>
                  <DateTimePicker
                    date={dateEndSubmit}
                    setDate={setDateEndSubmit}
                  />
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
                  Create
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
  );
};
export { ModalAddNewCompetition };
