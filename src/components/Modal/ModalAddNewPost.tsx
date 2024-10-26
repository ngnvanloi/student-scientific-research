"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormAddPost } from "../FormCard/FormInputsData";
import { FormAddPostSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Button } from "antd";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import React, { useState } from "react";
import ClickFileUpload from "../UploadFile/ClickFileUpload";
import { DatePicker } from "../DatePicker/DatePicker";
import {
  ParamsCreatePost,
  useCreatePostMutation,
} from "@/hooks-query/mutations/use-create-post-mutation";
import DragFileUpload from "../UploadFile/DragFileUpload";
import { usePostManagementContext } from "../UseContextProvider/PostManagementContext";
import { useUploadFileMutation } from "@/hooks-query/mutations/use-upload-file-mutation";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import { ParamsRegisterCompetiton } from "@/hooks-query/mutations/use-register-competition";

const ModalAddNewPost = () => {
  // STATE
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { mutate, isSuccess, isError, error } = useCreatePostMutation();
  const {
    mutate: fileMutation,
    isSuccess: fileIsSuccess,
    isError: fileIsError,
    error: fileError,
  } = useUploadFileMutation();
  // State để điều khiển modal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // USE PROVIDER CONTEXT
  const { setIsChange } = usePostManagementContext();
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
    const formDataUploadFile = new FormData();
    if (file) {
      formDataUploadFile.append("File", file);
    }
    formDataUploadFile.append(
      "FolderName",
      FolderNameUploadFirebase.PostFolder
    );
    fileMutation(formDataUploadFile, {
      onSuccess: (result) => {
        alert("Upload file successfully");
        // gọi API thêm Post
        let bodyRequest: ParamsCreatePost = {
          title: data.title,
          content: content,
          dateUpload: date?.toISOString(),
          filePath: result.data,
        };
        mutate(bodyRequest, {
          onSuccess: () => {
            alert("Create post successfully");
            setIsChange(true);
            setIsOpen(false);

            setContent("");
            setDate(new Date());
            setFile(undefined);
          },
          onError: (error) => {
            console.error("Lỗi khi xóa bài viết:", error);
          },
        });
      },
      onError: (error) => {
        console.error("Lỗi khi upload file:", error);
      },
    });
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className="w-32 py-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
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
                />
                {/* <DragFileUpload
                  limit={3}
                  fileList={fileList}
                  setFileList={setFileList}
                  multiple={true}
                /> */}
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
