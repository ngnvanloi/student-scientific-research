"use client";
import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { Button } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormSubmitResearchProjectTabOveriew } from "../FormCard/FormInputsData";
import { FormTabOverviewSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import FormSelect from "../FormCard/FormSelectField";

interface IProps {
  overViewFields: TFormSubmitResearchProjectTabOveriew | undefined;
  setOverviewFields: React.Dispatch<
    React.SetStateAction<TFormSubmitResearchProjectTabOveriew | undefined>
  >;
}
// Example items (you can replace this with Category, Discipline, etc.)
const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
];
const TabOverview = (props: IProps) => {
  const { overViewFields, setOverviewFields } = props;
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormSubmitResearchProjectTabOveriew>({
    resolver: zodResolver(FormTabOverviewSchema),
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormSubmitResearchProjectTabOveriew) => {
    console.log(JSON.stringify(data));
    setOverviewFields(data);
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  return (
    <div>
      <section className="py-12 dark:bg-dark">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <DefaultColumn>
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Cuộc thi
              </label>
              <FormField
                type="text"
                placeholder="Tên cuộc thi tham gia"
                name="competitionID"
                register={register}
                error={errors.competitionID}
                valueAsNumber
                className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
              />
            </DefaultColumn>

            <DefaultColumn>
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Mã đề tài
              </label>
              <FormField
                type="text"
                placeholder="Mã đề tài"
                name="researchProject_ID"
                register={register}
                valueAsNumber
                error={errors.researchProject_ID}
                className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
              />
            </DefaultColumn>

            <DefaultColumn>
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Ngày đăng tải
              </label>
              <FormField
                type="text"
                placeholder="Ngày đăng tải mặc định"
                name="researchProject_DateUpload"
                register={register}
                error={errors.researchProject_DateUpload}
                className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
              />
            </DefaultColumn>

            <DefaultColumn>
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Tên đề tài
              </label>
              <FormField
                type="text"
                placeholder="Nhập tên đề tài ..."
                name="researchProject_Name"
                register={register}
                error={errors.researchProject_Name}
                className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
              />
            </DefaultColumn>

            <DefaultColumn>
              <FormSelect
                name="articleID"
                items={categories}
                register={register}
                error={errors.articleID}
                label="Bài báo (nếu có)"
                className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
              />
            </DefaultColumn>

            <DefaultColumn>
              <FormSelect
                name="disciplineID"
                items={categories}
                register={register}
                error={errors.disciplineID}
                label="Lĩnh vực"
                className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
              />
            </DefaultColumn>

            <DefaultColumn>
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Tổng quan đề tài
              </label>
              <FormField
                type="text"
                placeholder="Nhập tổng quan đề tài ..."
                name="researchProject_Description"
                register={register}
                error={errors.researchProject_Description}
                isTextArea={true}
                className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
              />
            </DefaultColumn>

            <Button onClick={handleSubmit(onSubmit, onError)}>Next step</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default TabOverview;

interface IProp {
  children: React.ReactNode;
}
const DefaultColumn = ({ children }: IProp) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-12">{children}</div>
    </div>
  );
};
