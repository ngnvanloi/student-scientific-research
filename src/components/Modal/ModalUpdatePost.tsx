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
import React, { useEffect, useState } from "react";
import ClickFileUpload from "../UploadFile/ClickFileUpload";
import { DatePicker } from "../DatePicker/DatePicker";
import { usePostManagementContext } from "../UseContextProvider/PostManagementContext";
import { useGetPostDetail } from "@/hooks-query/queries/use-get-post";
import {
  ParamsUpdatePost,
  useUpdatePostMutation,
} from "@/hooks-query/mutations/use-update-post-mutation";
import { useToast } from "@/hooks/use-toast";
import DateTimePicker from "../DatePicker/DateTimePicker";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postID: number;
}
const ModalUpdatePost = (props: IProps) => {
  // STATE
  const { isOpen, setIsOpen, postID } = props;
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [fileList, setFileList] = useState<File[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { mutate, isSuccess, isError, error } = useUpdatePostMutation();
  const { toast } = useToast();
  // USE PROVIDER CONTEXT
  const { setIsChange } = usePostManagementContext();

  // POST DETAILS
  let { data: post, refetch: refetchData } = useGetPostDetail(postID);
  console.log("checking post details: ", JSON.stringify(post, null, 2));

  // REFETCH DATA
  useEffect(() => {
    if (isOpen && postID > 0) {
      refetchData();
    }
  }, [postID, isOpen, refetchData]);
  useEffect(() => {
    if (post) {
      setContent(post.data.content);
      setDate(new Date(post.data.dateUpLoad));
      if (post.data.filePath) {
        setFile(new File([post.data.filePath], post.data.filePath));
      }
    }
  }, [post]);

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
    // console.log("Check title: ", JSON.stringify(data.title));
    // console.log("Check file: ", JSON.stringify(fileList[0]));
    // console.log("Check content: ", content);
    // console.log("Check date: ", date);

    // gọi API thêm Post
    const formData = new FormData();
    formData.append("id", postID.toString());
    if (file) {
      formData.append("NewFilePath", file);
    }
    mutate(
      {
        params: {
          Title: data.title,
          Content: content,
          DateUpload: date, // Ngày có thể là chuỗi hoặc Date
          FilePath: post?.data.filePath, // FilePath nếu có
        },
        data: formData, // FormData chứa nội dung cập nhật
      },
      {
        onSuccess: () => {
          // alert("Update post successfully");
          toast({
            title: "Thông báo",
            variant: "default",
            description: "Chúc mừng! Bạn đã cập nhật bài viết thành công",
          });
          setIsChange(true);
          setIsOpen(false);

          setContent("");
          setDate(new Date());
          setFile(undefined);
        },
        onError: (error) => {
          console.error("Lỗi khi cập nhật bài viết:", error);
        },
      }
    );
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
