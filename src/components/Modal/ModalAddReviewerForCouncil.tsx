"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import {
  TFormAddContributor,
  TFormAddReviewer,
} from "../FormCard/FormInputsData";
import {
  FormAddContributorSchema,
  FormAddReviewerSchema,
} from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { DatePicker } from "../DatePicker/DatePicker";
import { useToast } from "@/hooks/use-toast";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { CoAuthor } from "@/types/CoAuthor";
import { ReviewBoardMembers } from "@/types/ReviewBoardMembers";
import DateTimePicker from "../DatePicker/DateTimePicker";
import {
  getDefaultDateOfBirth,
  isValidBirthDate,
} from "@/helper/extension-function";

const gender: SelectItem[] = [
  { id: "Nam", name: "Nam" },
  { id: "Nữ", name: "Nữ" },
  { id: "Khác", name: "Khác" },
];

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListReviewer: React.Dispatch<React.SetStateAction<ReviewBoardMembers[]>>;
}
const ModalAddReviewerForCouncil = (props: IProps) => {
  const { isOpen, setIsOpen, setListReviewer } = props;

  // STATE
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    getDefaultDateOfBirth()
  );
  // SHOW ERROR DATE
  const [errorDateMessage, setErrorDateMessage] = useState<string | null>(null);
  useEffect(() => {
    if (!isValidBirthDate(dateOfBirth?.toISOString() || "")) {
      setErrorDateMessage(
        "Vui lòng nhập ngày sinh hợp lệ (Người truy cập hệ thống phải đủ 18 tuổi)"
      );
    } else {
      setErrorDateMessage(null);
    }
  }, [dateOfBirth]);

  const { toast } = useToast();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormAddReviewer>({
    resolver: zodResolver(FormAddReviewerSchema),
    defaultValues: {
      sex: "Nam",
    },
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormAddReviewer) => {
    console.log("Check date of birth: ", dateOfBirth?.toISOString());
    console.log("Check name: ", data.name);
    console.log("Check email: ", data.email);
    console.log("Check gender: ", data.sex);
    console.log("check phone: ", data.numberPhone);
    console.log("check description: ", data.description);
    if (!isValidBirthDate(dateOfBirth?.toISOString() || "")) {
      return;
    }

    // thêm đồng tác giả và danh sách
    let contributor: ReviewBoardMembers = {
      name: data.name,
      email: data.email,
      numberPhone: data.numberPhone,
      dateOfBirth: dateOfBirth?.toISOString() || "",
      sex: data.sex || "Khác",
      description: data.description || "",
    };
    setListReviewer((prev: ReviewBoardMembers[]) => {
      return [...prev, contributor];
    });
    reset({
      name: "",
      email: "",
      numberPhone: "",
      sex: "Khác",
      description: "",
    });
    setIsOpen(false);
    setDateOfBirth(new Date());
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 h-[635px] overflow-x-auto">
          <div className="bg-white rounded-md shadow-lg h-full  overflow-x-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                <strong>Thêm người phản biện</strong>
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Tên người phản biện
                </label>
                <FormField
                  type="text"
                  placeholder="Nhập tên người phản biện"
                  name="name"
                  register={register}
                  error={errors.name}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="basis-1/2">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Ngày sinh
                  </label>
                  <DateTimePicker date={dateOfBirth} setDate={setDateOfBirth} />
                  {errorDateMessage && (
                    <p className="text-red-500 error-message">
                      {errorDateMessage}
                    </p>
                  )}
                </div>
                <FormSelect
                  name="sex"
                  items={gender || []}
                  register={register}
                  error={errors.sex}
                  label="Giới tính"
                  className="relative basis-1/2 z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Email
                  </label>
                  <FormField
                    type="text"
                    placeholder="Nhập email ..."
                    name="email"
                    register={register}
                    error={errors.email}
                    className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                  />
                </div>
                <div>
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Số điện thoại
                  </label>
                  <FormField
                    type="text"
                    placeholder="Nhập số điện thoại ..."
                    name="numberPhone"
                    register={register}
                    error={errors.numberPhone}
                    className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                  />
                </div>
              </div>
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Mô tả
                </label>
                <FormField
                  type="text"
                  placeholder="Nhập mô tả ..."
                  name="description"
                  register={register}
                  error={errors.description}
                  isTextArea={true}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
            </Dialog.Description>
            <div className="flex items-center gap-3 p-4 border-t">
              <Dialog.Close asChild>
                <Button
                  onClick={handleSubmit(onSubmit, onError)}
                  className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 "
                >
                  Thêm
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
export { ModalAddReviewerForCouncil };
