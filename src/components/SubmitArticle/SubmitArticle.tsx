"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormSubmitArticle } from "../FormCard/FormInputsData";
import { FormSubmitArticle } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import Tags from "../Tags/Tags";
import DragFileUpload from "../UploadFile/DragFileUpload";
import { DatePicker } from "../DatePicker/DatePicker";
import { useGetListDiscipline } from "@/hooks-query/queries/use-get-discipline";

const SubmitArticleComponent = () => {
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [file, setFile] = useState<File>();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: disciplines } = useGetListDiscipline();

  const listDiscipline: SelectItem[] | undefined = disciplines?.data.map(
    (discipline) => ({
      id: discipline.id,
      name: discipline.disciplineName,
    })
  );
  //   console.log("checking list discipline: ", listDiscipline);

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormSubmitArticle>({
    resolver: zodResolver(FormSubmitArticle),
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormSubmitArticle) => {
    console.log("checking title and discipline: ", JSON.stringify(data));
    console.log("checking date: ", date);
    console.log("checking description: ", description);
    console.log("checking keywords: ", keywords);
    console.log("checking file: ", file);
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  return (
    <div>
      <section className="py-3 dark:bg-dark">
        <div className="">
          <div className="">
            <div className="">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Ngày đăng tải
              </label>
              <DatePicker date={date} setDate={setDate} />
            </div>

            <div className="mt-4">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Tên bài báo
              </label>
              <FormField
                type="text"
                placeholder="Nhập tên bài báo ..."
                name="title"
                register={register}
                error={errors.title}
                className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
              />
            </div>

            <div className="mt-4 ">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Tổng quan bài báo
              </label>
              <div className="max-h-[300px] overflow-auto border-b border-b-[#ccc] shadow-inner">
                <RichTextEditor
                  content={description || ""}
                  setContent={setDescription}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Từ khóa
              </label>
              <Tags tags={keywords} setTags={setKeywords} />
            </div>

            <div className="mt-4">
              <FormSelect
                name="disciplineId"
                items={listDiscipline || []}
                register={register}
                error={errors.disciplineId}
                label="Lĩnh vực"
                className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
              />
            </div>
            <div className="mt-4">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                File bài báo đính kèm
              </label>
              <DragFileUpload limit={1} multiple={false} setFile={setFile} />
            </div>

            {/* <div className="mt-4">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Tổng quan bài báo
              </label>
              <FormField
                type="text"
                placeholder="Nhập tổng quan bài báo ..."
                name="description"
                register={register}
                error={errors.description}
                isTextArea={true}
                className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
              />
            </div> */}

            <Button onClick={handleSubmit(onSubmit, onError)} className="mt-4">
              Gửi yêu cầu đăng tải
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export { SubmitArticleComponent };
