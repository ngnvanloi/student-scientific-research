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

import {
  columns,
  DataTableAddContributors,
} from "../DataTable/DataTableAddCoAuthor";
import { CoAuthor } from "@/types/CoAuthor";
import { PlusOutlined } from "@ant-design/icons";
import { ModalAddContributor } from "../Modal/ModalAddContributorArticle";
import {
  ParamsSubmitArticle,
  useSubmitArticleMutation,
} from "@/hooks-query/mutations/use-submit-article";
import { useUploadFileMutation } from "@/hooks-query/mutations/use-upload-file-mutation";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import { useToast } from "@/hooks/use-toast";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { useSession } from "next-auth/react";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";

const SubmitArticleComponent = () => {
  const { data: session } = useSession();
  // STATE
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [file, setFile] = useState<File>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [listContributors, setListContributors] = useState<CoAuthor[]>([]);
  const { data: disciplines } = useGetListDiscipline();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TOAST
  const { toast } = useToast();
  // MUTATION DECLARE
  const { mutate, isSuccess, isError, error } = useSubmitArticleMutation();
  const {
    mutate: fileMutation,
    isSuccess: fileIsSuccess,
    isError: fileIsError,
    error: fileError,
    isPending: fileIsPending,
  } = useUploadFileMutation();
  const {
    mutate: notiMutation,
    isSuccess: isNotiSuccess,
    isError: isNotiError,
    error: notiError,
    isPending: notiIsPending,
  } = useCreateNotificationMutation();
  const listDiscipline: SelectItem[] | undefined = disciplines?.data.map(
    (discipline) => ({
      id: discipline.id,
      name: discipline.disciplineName,
    })
  );
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
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
    console.log("checking list Contributors: ", listContributors);
    // GỌI API UPLOAD FILE
    const formDataUploadFile = new FormData();
    if (file) {
      formDataUploadFile.append("File", file);
      formDataUploadFile.append(
        "FolderName",
        FolderNameUploadFirebase.ArticleFolder
      );
    }

    fileMutation(formDataUploadFile, {
      onSuccess: (result) => {
        // alert("Upload file successfully");
        // TẠO REQUEST BODY
        const requestBody: ParamsSubmitArticle = {
          title: data.title ? data.title : "",
          description: description,
          keywords: keywords,
          filePath: result.data,
          dateUpload: date?.toISOString() ? date.toISOString() : "",
          disciplineId: data?.disciplineId,
          coAuthors: listContributors,
        };

        // GỌI API upload bài báo
        mutate(requestBody, {
          onSuccess: () => {
            toast({
              title: "Thành công",
              variant: "default",
              description:
                "Chúc mừng! Bài báo của bạn đã được gửi đến quản trị viên, vui lòng chờ kết quả phê duyệt",
            });
            // reset input fields
            reset({
              title: "",
              disciplineId: 0,
            });
            setDescription("");
            setFile(undefined);
            setKeywords([]);
            setListContributors([]);
            setDate(new Date());

            // gửi thông báo cho super admin
            const paramsNoti: ParamsCreateNotification = {
              notificationContent: `${session?.user?.name} ${NotificationContentSample.NotificationType.article.author}`,
              notificationDate: new Date().toISOString(),
              // recevierId: articleDetail?.data.accountID || -1,
              recevierId: 1,
              notificationTypeId: 1,
              targetId: -1,
            };
            notiMutation(paramsNoti, {
              onSuccess: () => {
                console.log("Thông báo đã gửi");
              },
              onError: (error) => {
                console.error("Lỗi khi gửi thông báo:", error);
              },
            });
          },
          onError: (error) => {
            console.error("Lỗi khi tạo bài báo:", error);
          },
        });
      },
      onError: (error) => {
        console.error("Lỗi khi upload file:", error);
      },
    });
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };

  // console.log("cheking preview list contributors:", listContributors);
  return (
    <div>
      {fileIsPending ? <SpinnerLoading /> : ""}
      {notiIsPending ? <SpinnerLoading /> : ""}
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
                className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
              />
            </div>

            <div className="mt-4 ">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                Tổng quan bài báo
              </label>
              <div className="max-h-[300px] overflow-auto border-b border-b-[#ccc]">
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
                className="w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center justify-items-center mb-3">
                <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                  Thêm đồng tác giả
                </label>
                <ModalAddContributor
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  setListContributors={setListContributors}
                />
                <Button
                  className="bg-green-600 text-white"
                  onClick={() => setIsOpen(true)}
                >
                  <PlusOutlined />
                  Thêm
                </Button>
              </div>
              <DataTableAddContributors
                columns={columns}
                data={listContributors}
                setData={setListContributors}
              />
            </div>
            <div className="mt-4">
              <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
                File bài báo đính kèm
              </label>
              <DragFileUpload limit={1} multiple={false} setFile={setFile} />
            </div>

            <Button
              onClick={handleSubmit(onSubmit, onError)}
              className="mt-4"
              type="primary"
            >
              Gửi yêu cầu đăng tải
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export { SubmitArticleComponent };
