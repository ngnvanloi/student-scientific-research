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
import React, { useEffect, useState } from "react";
import ClickFileUpload from "../UploadFile/ClickFileUpload";
import { usePostManagementContext } from "../UseContextProvider/PostManagementContext";
import {
  ParamsUpdatePost,
  useUpdatePostMutation,
} from "@/hooks-query/mutations/use-update-post-mutation";
import { useToast } from "@/hooks/use-toast";
import DateTimePicker from "../DatePicker/DateTimePicker";
import { CloseOutlined } from "@ant-design/icons";
import { string } from "zod";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import { useUploadFileMutation } from "@/hooks-query/mutations/use-upload-file-mutation";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { DEFAULT_RICHTEXTEDITOR_LENGTH } from "@/lib/enum";
import { useQueryClient } from "@tanstack/react-query";
import { ParamsGetListPostForOrganizer } from "@/hooks-query/queries/use-get-posts-for-organizer";
import { queryKeys } from "@/hooks-query/queries/query-keys";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post;
}
const ModalUpdatePost = (props: IProps) => {
  // STATE
  const { isOpen, setIsOpen, post } = props;
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, error, isPending } =
    useUpdatePostMutation((msg) => {
      setErrorMessage(msg);
    });
  const { toast } = useToast();
  const {
    mutate: fileMutation,
    isSuccess: fileIsSuccess,
    isError: fileIsError,
    error: fileError,
    isPending: fileIsPending,
  } = useUploadFileMutation();
  // USE PROVIDER CONTEXT
  const { setIsChange } = usePostManagementContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setDate(new Date(post.dateUpLoad));
      reset({
        title: post?.title || "",
      });
      if (post.filePath) {
        setFile(new File([post.filePath], post.filePath));
      }
    }
  }, [post]);

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormAddPost>({
    resolver: zodResolver(FormAddPostSchema),
    defaultValues: {
      title: post?.title || "",
    },
  });
  const uploadFile = (mutation: any, formData: any) => {
    return new Promise<string>((resolve, reject) => {
      mutation(formData, {
        onSuccess: (result: any) => {
          // Kiểm tra result.data có là chuỗi không, nếu không thì trả về chuỗi rỗng
          if (typeof result.data === "string") {
            resolve(result.data);
          } else {
            reject(new Error("Invalid file URL"));
          }
        },
        onError: (error: any) => reject(error),
      });
    });
  };
  // HANDLE LOGIC
  const onSubmit = async (data: TFormAddPost) => {
    if (content === "" || content.length <= DEFAULT_RICHTEXTEDITOR_LENGTH) {
      setErrorMessage(
        `Nội dung bài viết chưa đảm bảo độ dài cần thiết (tối thiểu ${DEFAULT_RICHTEXTEDITOR_LENGTH} chữ)`
      );
    } else {
      // GỌI API UPLOAD FILE
      const formDataUploadFile = new FormData();
      if (file) {
        formDataUploadFile.append("File", file);
        formDataUploadFile.append(
          "FolderName",
          FolderNameUploadFirebase.PostFolder
        );
      }
      try {
        // Khởi tạo các promise upload file nếu file tồn tại
        const fileUploadPromises = [
          file
            ? uploadFile(fileMutation, formDataUploadFile)
            : Promise.resolve(""),
        ];

        // Thực hiện các promise upload file đồng thời và đợi tất cả hoàn tất
        const [filePath] = await Promise.all(fileUploadPromises);

        // gọi API thêm Post
        let params: ParamsUpdatePost = {
          Title: data.title,
          Content: content,
          DateUpload: date,
          FilePath: filePath || post.filePath || "",
        };
        mutate(
          {
            id: post.id,
            data: params,
          },
          {
            onSuccess: async () => {
              // alert("Update post successfully");
              toast({
                title: "Thông báo",
                variant: "default",
                description: "Chúc mừng! Bạn đã cập nhật bài viết thành công",
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
            },
            onError: (error) => {
              console.error("Lỗi khi cập nhật bài viết:", error);
            },
          }
        );
      } catch (error) {
        console.error("Lỗi khi upload file:", error);
      }
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors);
  };

  // RENDER UI
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {/* <Dialog.Trigger className="w-32 py-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
        Thêm bài viết
      </Dialog.Trigger> */}
      {isPending || fileIsPending ? <SpinnerLoading /> : ""}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 " />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl mx-auto px-4 ">
          <div className="bg-white rounded-md shadow-lg ">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Cập nhật bài viết
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
              {post?.filePath ? (
                <div className="mt-5">
                  <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                    File đính kèm trước đó:
                  </label>
                  <a href={post?.filePath}>Xem tại đây</a>
                </div>
              ) : (
                ""
              )}
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
export { ModalUpdatePost };
