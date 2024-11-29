"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import {
  TFormUpdateAuthor,
  TFormUpdateOrganizer,
} from "../FormCard/FormInputsData";
import { FormUpdateOrganizerSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Alert, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { useGetListFaculty } from "@/hooks-query/queries/use-get-faculties";
import { Organizer } from "@/types/Organizer";
import {
  ParamsUpdateOrganizerProfile,
  useUpdateOrganizerProfileMutation,
} from "@/hooks-query/mutations/use-update-organizer-profile-mutation";
import { CloseOutlined } from "@ant-design/icons";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
  organizer: Organizer | null;
}
const ModalUpdateOrganizerProfile = (props: IProps) => {
  const { isOpen, setIsOpen, organizer, setIsChange } = props;
  console.log("checking organizer update: ", organizer);

  const { data: faculties } = useGetListFaculty();
  const listFaculty: SelectItem[] | undefined = faculties?.data.map(
    (faculty) => ({
      id: faculty.id,
      name: faculty.facultyName,
    })
  );
  console.log("checking list faculty: ", listFaculty);
  // MUTATION
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending, isSuccess, isError } =
    useUpdateOrganizerProfileMutation((msg) => {
      setErrorMessage(msg);
    });
  const { toast } = useToast();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormUpdateOrganizer>({
    resolver: zodResolver(FormUpdateOrganizerSchema),
    defaultValues: {
      name: organizer?.name || "",
      email: organizer?.email || "",
      numberPhone: organizer?.numberPhone || "",
      facultyId: String(organizer?.facultyId) || "",
      description: organizer?.description || "",
    },
  });

  useEffect(() => {
    // Reset form mỗi khi `organizer` thay đổi
    if (organizer) {
      reset({
        name: organizer.name,
        email: organizer.email,
        numberPhone: organizer.numberPhone,
        facultyId: String(organizer.facultyId),
        description: organizer.description,
      });
    }
  }, [organizer, reset]);

  // HANDLE LOGIC
  const onSubmit = (data: TFormUpdateOrganizer) => {
    console.log("Check name: ", data.name);
    console.log("Check email: ", data.email);
    console.log("check phone: ", data.numberPhone);
    console.log("check faculty: ", data.facultyId);
    console.log("check description: ", data.description);

    // GỌI API CẬP NHẬT USER
    let bodyRequest: ParamsUpdateOrganizerProfile = {
      name: data.name,
      email: data.email,
      numberPhone: data.numberPhone,
      description: data.description,
      facultyId: Number(data.facultyId),
    };
    mutate(
      { data: bodyRequest },
      {
        onSuccess: () => {
          // alert("Update post successfully");
          toast({
            title: "Thông báo",
            variant: "default",
            description: "Bạn đã cập nhật thông tin cá nhân thành công",
          });
          setIsChange(true);
          setIsOpen(false);
          setErrorMessage(null);
        },
        onError: (error) => {
          console.error("Lỗi khi cập nhật profile: " + error);
        },
      }
    );
    // RESET FORM UPDATE
    reset({
      name: "",
      email: "",
      numberPhone: "",
      facultyId: "",
      description: "",
    });
    setIsOpen(false);
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 ">
          <div className="bg-white rounded-md shadow-lg ">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                <strong>Cập nhật thông tin ban tổ chức</strong>
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Tên ban tổ chức
                </label>
                <FormField
                  type="text"
                  placeholder="Cập nhật họ tên mới"
                  name="name"
                  register={register}
                  error={errors.name}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
              <div className="mt-5">
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
              <div className="grid grid-cols-1 gap-3">
                <FormSelect
                  name="facultyId"
                  items={listFaculty || []}
                  register={register}
                  error={errors.facultyId}
                  label="Khoa"
                  className="w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
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
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Giới thiệu
                </label>
                <FormField
                  type="text"
                  placeholder="Nhập giới thiệu ..."
                  name="description"
                  register={register}
                  error={errors.description}
                  isTextArea={true}
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
export { ModalUpdateOrganizerProfile };
