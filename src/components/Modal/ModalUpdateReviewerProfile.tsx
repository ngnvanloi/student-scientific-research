"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import FormField from "../FormCard/FormInputField";
import { Alert, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { useGetListFaculty } from "@/hooks-query/queries/use-get-faculties";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import DateTimePicker from "../DatePicker/DateTimePicker";
import { CloseOutlined } from "@ant-design/icons";
import { Reviewer } from "@/types/Reviewer";
import {
  ParamsUpdateReviewerProfile,
  useUpdateReviewerProfileMutation,
} from "@/hooks-query/mutations/use-update-reviewer-profile-mutation";
import {
  TFormUpdateAuthor,
  TFormUpdateReviewer,
} from "../FormCard/FormInputsData";
import {
  FormUpdateAuthorSchema,
  FormUpdateReviewerSchema,
} from "../FormCard/ZodSchema";

const gender: SelectItem[] = [
  { id: "Nam", name: "Nam" },
  { id: "Nữ", name: "Nữ" },
  { id: "Khác", name: "Khác" },
];
const academicDegrees: SelectItem[] = [
  //Cử nhân, Thạc sĩ, Tiến sĩ
  { id: "Cử nhân", name: "Cử nhân" },
  { id: "Thạc sĩ", name: "Thạc sĩ" },
  { id: "Tiến sĩ", name: "Tiến sĩ" },
];
const academicRanks: SelectItem[] = [
  // Giảng viên, Phó Giáo sư, Giáo sư
  { id: "Giảng viên", name: "Giảng viên" },
  { id: "Phó Giáo sư", name: "Phó Giáo sư" },
  { id: "Giáo sư", name: "Giáo sư" },
];
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
  reviewer: Reviewer | null;
}
const ModalUpdateReviewerProfile = (props: IProps) => {
  const { isOpen, setIsOpen, reviewer, setIsChange } = props;
  console.log("checking reviewer update: ", reviewer);
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending, isSuccess, isError } =
    useUpdateReviewerProfileMutation((msg) => {
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
  } = useForm<TFormUpdateReviewer>({
    resolver: zodResolver(FormUpdateReviewerSchema),
    defaultValues: {
      name: reviewer?.name || "",
      email: reviewer?.email || "",
      numberPhone: reviewer?.numberPhone || "",
      dateOfBirth: reviewer?.dateOfBirth,
      sex: reviewer?.sex || "Nam",
      facultyId: String(reviewer?.facultyId) || "0",
      academicDegree: reviewer?.academicDegree || "Unknow",
      academicRank: reviewer?.academicRank || "Unknow",
    },
  });

  useEffect(() => {
    // Reset form mỗi khi `reviewer` thay đổi
    if (reviewer) {
      reset({
        name: reviewer.name,
        email: reviewer.email,
        numberPhone: reviewer.numberPhone,
        sex: reviewer.sex,
        facultyId: String(reviewer.facultyId),
        dateOfBirth: reviewer.dateOfBirth,
      });
      setDateOfBirth(
        reviewer.dateOfBirth ? new Date(reviewer.dateOfBirth) : undefined
      );
    }
  }, [reviewer, reset]);

  // HANDLE LOGIC
  const onSubmit = (data: TFormUpdateReviewer) => {
    console.log("Check date of birth: ", dateOfBirth?.toISOString());
    console.log("Check name: ", data.name);
    console.log("Check email: ", data.email);
    console.log("Check gender: ", data.sex);
    console.log("check phone: ", data.numberPhone);
    console.log("check faculty: ", data.facultyId);

    // tham số cập nhật reviewer
    let requestBody: ParamsUpdateReviewerProfile = {
      name: data.name,
      email: data.email,
      numberPhone: data.numberPhone,
      dateOfBirth: dateOfBirth?.toISOString() || "",
      sex: data.sex || "Nam",
      facultyId: Number(data.facultyId) === -1 ? 0 : Number(data.facultyId),
      academicDegree: data.academicDegree || "Unknow",
      academicRank: data.academicRank || "Unknow",
    };
    mutate(
      { data: requestBody },
      {
        onSuccess: () => {
          toast({
            title: "Thông báo",
            variant: "default",
            description: "Bạn đã cập nhật thông tin cá nhân thành công",
          });
          setErrorMessage(null);
          setIsChange(true);
          setIsOpen(false);
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
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="basis-1/2">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    Ngày sinh
                  </label>
                  <DateTimePicker date={dateOfBirth} setDate={setDateOfBirth} />
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
                <FormSelect
                  name="academicDegree"
                  items={academicDegrees || []}
                  register={register}
                  error={errors.academicDegree}
                  label="Học vị"
                  className="relative basis-1/2 z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
                />
                <FormSelect
                  name="academicRank"
                  items={academicRanks || []}
                  register={register}
                  error={errors.academicRank}
                  label="Học hàm"
                  className="relative basis-1/2 z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
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
export { ModalUpdateReviewerProfile };
