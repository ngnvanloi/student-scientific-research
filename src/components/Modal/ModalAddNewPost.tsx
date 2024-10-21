"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormAddPost } from "../FormCard/FormInputsData";
import { FormAddPostSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Button, UploadFile } from "antd";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import React, { useEffect, useState } from "react";
import ClickFileUpload from "../UploadFile/ClickFileUpload";
import { DatePicker } from "../DatePicker/DatePicker";
import {
  ParamsCreatePost,
  useCreatePostMutation,
} from "@/hooks-query/mutations/use-create-post-mutation";
import { useSession } from "next-auth/react";
import DragFileUpload from "../UploadFile/DragFileUpload";

const ModalAddNewPost = () => {
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [fileList, setFileList] = useState<File[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { mutate, isSuccess, isError, error } = useCreatePostMutation();

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TFormAddPost>({
    resolver: zodResolver(FormAddPostSchema),
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormAddPost) => {
    console.log("Check title: ", JSON.stringify(data.title));
    console.log("Check file: ", JSON.stringify(fileList[0]));
    console.log("Check content: ", content);
    console.log("Check date: ", date);

    // gọi API thêm Post
    const formData = new FormData();
    formData.append("Title", data.title);
    formData.append("Content", content);
    formData.append("DateUpload", new Date("2024-07-21").toISOString());
    if (file) {
      formData.append("FilePath", file);
    }

    mutate(formData);
    if (isSuccess) {
      console.log("Create post successfully");
      setContent("");
      setFile(undefined);
      setDate(undefined);
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-32 mx-auto py-2 ml-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
        Thêm bài viết
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 ">
          <div className="bg-white rounded-md shadow-lg ">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Tạo mới bài viết
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <CloseModalIcon />
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Ngày đăng
                </label>
                <DatePicker date={date} setDate={setDate} />
              </div>
              <div>
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Tiêu đề
                </label>
                <FormField
                  type="text"
                  placeholder="Nhập tiêu đề bài viết"
                  name="title"
                  register={register}
                  error={errors.title}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>

              <div className="mt-5">
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Nội dung bài viết
                </label>
                <RichTextEditor
                  content={content || ""}
                  setContent={setContent}
                />
              </div>
              <div>
                <ClickFileUpload
                  limit={1} // Chỉ cho phép 1 file
                  multiple={false} // Không cho phép chọn nhiều file
                  setFile={setFile} // Cập nhật file đã chọn
                  // setFileList={setFileList} // Cập nhật danh sách file
                />
                <DragFileUpload
                  limit={3}
                  fileList={fileList}
                  setFileList={setFileList}
                  multiple={true}
                />
              </div>
            </Dialog.Description>
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
export { ModalAddNewPost };
