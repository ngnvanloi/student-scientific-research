"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormUpdateAuthor } from "../FormCard/FormInputsData";
import { FormUpdateAuthorSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { DatePicker } from "../DatePicker/DatePicker";
import { useToast } from "@/hooks/use-toast";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { CoAuthor } from "@/types/CoAuthor";
import { Author } from "@/types/Author";
import { useGetListFaculty } from "@/hooks-query/queries/use-get-faculties";
import {
  ParamsUpdateAuthorProfile,
  useUpdateAuthorProfileMutation,
} from "@/hooks-query/mutations/use-update-author-profile-mutation";
import { string } from "zod";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";

const gender: SelectItem[] = [
  { id: "Nam", name: "Nam" },
  { id: "Nữ", name: "Nữ" },
  { id: "Khác", name: "Khác" },
];
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
  author: Author | null;
}
const ModalUpdateProfile = (props: IProps) => {
  const { isOpen, setIsOpen, author, setIsChange } = props;
  console.log("checking author update: ", author);
  //   const { data: disciplines } = useQuery("disciplines", () =>
  //     fetchDisciplines()
  //   );
  const { data: faculties } = useGetListFaculty();
  const listFaculty: SelectItem[] | undefined = faculties?.data.map(
    (faculty) => ({
      id: faculty.id,
      name: faculty.facultyName,
    })
  );
  // STATE
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(new Date());

  // MUTATION
  const { mutate, isPending, isSuccess, isError } =
    useUpdateAuthorProfileMutation();
  const { toast } = useToast();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormUpdateAuthor>({
    resolver: zodResolver(FormUpdateAuthorSchema),
    defaultValues: {
      name: author?.name || "",
      email: author?.email || "",
      numberPhone: author?.numberPhone || "",
      dateOfBirth: author?.dateOfBirth,
      sex: author?.sex || "Nam",
      facultyId: author?.facultyId || 0,
    },
  });

  useEffect(() => {
    // Reset form mỗi khi `author` thay đổi
    if (author) {
      reset({
        name: author.name,
        email: author.email,
        numberPhone: author.numberPhone,
        sex: author.sex,
        facultyId: author.facultyId,
        dateOfBirth: author.dateOfBirth,
      });
      setDateOfBirth(
        author.dateOfBirth ? new Date(author.dateOfBirth) : undefined
      );
    }
  }, [author, reset]);

  // HANDLE LOGIC
  const onSubmit = (data: TFormUpdateAuthor) => {
    console.log("Check date of birth: ", dateOfBirth?.toISOString());
    console.log("Check name: ", data.name);
    console.log("Check email: ", data.email);
    console.log("Check gender: ", data.sex);
    console.log("check phone: ", data.numberPhone);
    console.log("check faculty: ", data.facultyId);

    // thêm đồng tác giả và danh sách
    let requestBody: ParamsUpdateAuthorProfile = {
      name: data.name,
      email: data.email,
      numberPhone: data.numberPhone,
      dateOfBirth: dateOfBirth?.toISOString() || "",
      sex: data.sex || "Nam",
      internalCode: "unknown",
      facultyId: data.facultyId ? (data.facultyId as number) : 0,
    };
    mutate(
      { data: requestBody },
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
        },
        onError: (error) => {
          alert("Lỗi khi cập nhật profile: " + error);
        },
      }
    );
    // RESET FORM UPDATE
    reset({
      name: "",
      email: "",
      numberPhone: "",
      sex: "",
      facultyId: "",
      dateOfBirth: "",
    });
    setIsOpen(false);
    setDateOfBirth(new Date());
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {isPending ? <SpinnerLoading /> : ""}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 ">
          <div className="bg-white rounded-md shadow-lg ">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                <strong>Cập nhật thông tin cá nhân</strong>
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Họ tên
                </label>
                <FormField
                  type="text"
                  placeholder="Cập nhật họ tên mới"
                  name="name"
                  register={register}
                  error={errors.name}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="basis-1/2">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Ngày sinh
                  </label>
                  <DatePicker date={dateOfBirth} setDate={setDateOfBirth} />
                </div>
                <FormSelect
                  name="sex"
                  items={gender || []}
                  register={register}
                  error={errors.sex}
                  label="Giới tính"
                  className="relative basis-1/2 z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
                />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <FormSelect
                  name="facultyId"
                  items={listFaculty || []}
                  register={register}
                  error={errors.facultyId}
                  label="Khoa"
                  className="w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
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
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
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
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
            </Dialog.Description>
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
export { ModalUpdateProfile };
