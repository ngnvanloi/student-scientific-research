"use client";
import { CloseModalIcon } from "@/assets/svg/close.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { TFormAddPost } from "../FormCard/FormInputsData";
import { FormAddPostSchema } from "../FormCard/ZodSchema";
import FormField from "../FormCard/FormInputField";
import { Alert, Button } from "antd";
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
import { useToast } from "@/hooks/use-toast";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import DateTimePicker from "../DatePicker/DateTimePicker";
import { CloseOutlined } from "@ant-design/icons";
import { DEFAULT_RICHTEXTEDITOR_LENGTH } from "@/lib/enum";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks-query/queries/query-keys";
import { ParamsGetListPostForOrganizer } from "@/hooks-query/queries/use-get-posts-for-organizer";

const ModalAddNewPost = () => {
  // STATE
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError, error, isPending } =
    useCreatePostMutation((msg) => {
      setErrorMessage(msg);
    });
  const {
    mutate: fileMutation,
    isSuccess: fileIsSuccess,
    isError: fileIsError,
    error: fileError,
    isPending: fileIsPending,
  } = useUploadFileMutation();
  // State để điều khiển modal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // USE PROVIDER CONTEXT
  const { setIsChange, isChange } = usePostManagementContext();
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormAddPost>({
    resolver: zodResolver(FormAddPostSchema),
  });

  // HANDLE LOGIC
  const onSubmit = (data: TFormAddPost) => {
    if (content === "" || content.length <= DEFAULT_RICHTEXTEDITOR_LENGTH) {
      setErrorMessage(
        `Nội dung bài viết chưa đảm bảo độ dài cần thiết (tối thiểu ${DEFAULT_RICHTEXTEDITOR_LENGTH} chữ)`
      );
    } else {
      const formDataUploadFile = new FormData();
      if (file) {
        formDataUploadFile.append("File", file);
        formDataUploadFile.append(
          "FolderName",
          FolderNameUploadFirebase.PostFolder
        );
      }
      fileMutation(formDataUploadFile, {
        onSuccess: (result) => {
          // alert("Upload file successfully");
          // gọi API thêm Post
          let bodyRequest: ParamsCreatePost = {
            title: data.title,
            content: content,
            dateUpload: date?.toISOString(),
            filePath: result.data,
          };
          mutate(bodyRequest, {
            onSuccess: async () => {
              toast({
                title: "Thành công",
                variant: "default",
                description:
                  "Chúc mừng! Bài viết đã được tạo thành công và đăng tải trên hệ thống, bạn có thể kiểm tra hoặc chỉnh sửa nếu cần.",
              });
              // setIsChange(!isChange);
              setIsOpen(false);
              let params: ParamsGetListPostForOrganizer = {
                index: 1,
                pageSize: 100,
              };
              await queryClient.refetchQueries({
                queryKey: queryKeys.listPost(params),
              });

              setContent("");
              setDate(new Date());
              setFile(undefined);

              reset({
                title: "",
              });
            },
            onError: (error) => {
              console.error("Lỗi khi tạo bài viết:", error);
            },
          });
        },
        onError: (error) => {
          // console.error("Lỗi khi upload file:", error);
          // alert("Create post without file");
          // gọi API thêm Post
          let bodyRequest: ParamsCreatePost = {
            title: data.title,
            content: content,
            dateUpload: date?.toISOString(),
            // filePath: "",
          };
          mutate(bodyRequest, {
            onSuccess: async () => {
              toast({
                title: "Thành công",
                variant: "default",
                description:
                  "Chúc mừng! Bài viết đã được tạo thành công và đăng tải trên hệ thống, bạn có thể kiểm tra hoặc chỉnh sửa nếu cần.",
              });
              // setIsChange(true);
              let params: ParamsGetListPostForOrganizer = {
                index: 1,
                pageSize: 100,
              };
              await queryClient.refetchQueries({
                queryKey: queryKeys.listPost(params),
              });
              setIsOpen(false);
              setErrorMessage(null);
              setContent("");
              setDate(new Date());
              setFile(undefined);
              reset({
                title: "",
              });
            },
            onError: (error) => {
              console.error("Lỗi khi tạo bài viết:", error);
            },
          });
        },
      });
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {isPending || (fileIsPending && <SpinnerLoading />)}
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
                <DateTimePicker date={date} setDate={setDate} />
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
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
                />
              </div>

              <div className="mt-5">
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Nội dung bài viết
                </label>
                <div className="max-h-[300px] overflow-auto border-b border-b-[#ccc] shadow-inner">
                  <RichTextEditor
                    content={content || ""}
                    setContent={setContent}
                  />
                </div>
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
export { ModalAddNewPost };
