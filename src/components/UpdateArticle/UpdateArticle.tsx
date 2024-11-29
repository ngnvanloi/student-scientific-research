import { Alert, Button } from "antd";
import FormField from "../FormCard/FormInputField";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import DragFileUpload from "../UploadFile/DragFileUpload";
import {
  columns,
  DataTableAddContributors,
} from "../DataTable/DataTableAddCoAuthor";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGetListDiscipline } from "@/hooks-query/queries/use-get-discipline";
import { CoAuthor } from "@/types/CoAuthor";
import { useToast } from "@/hooks/use-toast";
import { useUploadFileMutation } from "@/hooks-query/mutations/use-upload-file-mutation";
import { useForm } from "react-hook-form";
import { TFormUpdateArticle } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import { ModalAddContributor } from "../Modal/ModalAddContributorArticle";
import { useSession } from "next-auth/react";
import { FormUpdateArticlee } from "../FormCard/ZodSchema";
import {
  ParamsUpdateArticle,
  useUpdateArticleMutation,
} from "@/hooks-query/mutations/use-update-article-mutation";
import { useGetArticleDetail } from "@/hooks-query/queries/use-get-article-detail";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";
import Tags from "../Tags/Tags";
import DateTimePicker from "../DatePicker/DateTimePicker";
import { DEFAULT_RICHTEXTEDITOR_LENGTH } from "@/lib/enum";

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  articleItem: ArticleWithContributors | undefined;
}
const FormUpdateArticle = (props: IProps) => {
  const { setIsOpen, articleItem, setIsLoadingSpinner } = props;
  const { data } = useGetArticleDetail(articleItem?.id || 0);
  const article: ArticleWithContributors | undefined = data?.data;
  const listTempContributor: CoAuthor[] = article?.author_Articles
    ? article.author_Articles
        .filter((item) => item.roleName === "co-author")
        .map((item) => ({
          name: item.author.name,
          email: item.author.email,
          numberPhone: item.author.numberPhone,
          dateOfBirth: item.author.dateOfBirth,
          sex: item.author.sex,
          roleName: "co-author",
        }))
    : [];

  console.log(
    "===== checking article for updating: ",
    JSON.stringify(data, null, 2)
  );
  console.log(
    "===== checking list contributors of article for updating: ",
    JSON.stringify(listTempContributor, null, 2)
  );

  const {
    mutate: fileArticleMutation,
    isSuccess: fileArticleIsSuccess,
    isError: fileArticleIsError,
    error: fileArticleError,
    isPending: fileArticleIsPending,
  } = useUploadFileMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    mutate: mutate,
    isSuccess: isSuccess,
    isError: isError,
    error: error,
    isPending: isPending,
  } = useUpdateArticleMutation((msg) => {
    setErrorMessage(msg);
  });
  console.log(
    ">>>>>>>>>> checking listTempContributor: ",
    JSON.stringify(listTempContributor, null, 2)
  );
  // TOAST
  const { toast } = useToast();
  const { data: session } = useSession();
  // STATE
  const [description, setDescription] = useState<string>(
    article?.description || ""
  );
  const listKeywords = article?.keyWord.split(",").map((item) => item.trim());
  console.log("============= checking listKeywords: ", listKeywords);
  const [keywords, setKeywords] = useState<string[]>(listKeywords || []);
  const [fileArticle, setFileArticle] = useState<File>();
  const [date, setDate] = useState<Date | undefined>(
    new Date(article?.dateUpload || "")
  );
  const [listContributors, setListContributors] =
    useState<CoAuthor[]>(listTempContributor);

  const { data: disciplines } = useGetListDiscipline();
  const [isModalAddContributorIsOpen, setModalAddContributorIsOpen] =
    useState<boolean>(false);
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
  } = useForm<TFormUpdateArticle>({
    resolver: zodResolver(FormUpdateArticlee),
    defaultValues: {
      title: article?.title,
      disciplineId: String(article?.disciplineId),
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
  const onSubmit = async (data: TFormUpdateArticle) => {
    // console.log("checking title: ", data.title);
    // console.log("checking disciplineId: ", data.disciplineId);
    // console.log("checking keywords previous: ", listKeywords);
    // console.log("checking keywords: ", keywords);
    // console.log("checking list Contributors: ", listContributors);
    if (
      description === "" ||
      description.length <= DEFAULT_RICHTEXTEDITOR_LENGTH
    ) {
      setErrorMessage(
        `Nội dung bài viết chưa đảm bảo độ dài cần thiết (tối thiểu ${DEFAULT_RICHTEXTEDITOR_LENGTH} chữ)`
      );
    } else {
      // GỌI API UPLOAD FILE
      const formDataUploadFileArticle = new FormData();
      if (fileArticle) {
        formDataUploadFileArticle.append("File", fileArticle);
        formDataUploadFileArticle.append(
          "FolderName",
          FolderNameUploadFirebase.ArticleFolder
        );
      }
      try {
        // Khởi tạo các promise upload file nếu file tồn tại
        const fileUploadPromises = [
          fileArticle
            ? uploadFile(fileArticleMutation, formDataUploadFileArticle)
            : Promise.resolve(""),
        ];

        // Thực hiện các promise upload file đồng thời và đợi tất cả hoàn tất
        const [articleFilePath] = await Promise.all(fileUploadPromises);
        console.log(
          "=========== checking articleFilePath before: ",
          articleFilePath
        );
        // Tạo request body từ kết quả mutation
        const requestBody: ParamsUpdateArticle = {
          title: data.title,
          description: description,
          keywords: keywords,
          filePath: articleFilePath || article?.filePath || "",
          dateUpload: date || "",
          disciplineId:
            Number(data.disciplineId) === -1 ? 0 : Number(data.disciplineId),
          coAuthors: listContributors,
        };

        // Gọi API
        mutate(
          { id: article?.id || 0, params: requestBody },
          {
            onSuccess: () => {
              toast({
                title: "Thành công",
                variant: "default",
                description: "Chúc mừng! Bạn đã cập nhật thành công bài báo",
              });
              // Reset các field input và file
              reset({
                title: "",
                disciplineId: "",
              });
              setErrorMessage(null);
              setFileArticle(undefined);
              setListContributors([]);
              setIsOpen(false);
            },
            onError: (error) => {
              console.error("Lỗi khi cập nhật bài báo:", error);
            },
          }
        );
      } catch (error) {
        console.error("Lỗi khi upload file:", error);
      }
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };
  useEffect(() => {
    // Kiểm tra nếu bất kỳ trạng thái pending nào đang là true
    if (isPending || fileArticleIsPending) {
      setIsLoadingSpinner(true);
    } else {
      setIsLoadingSpinner(false);
    }
  }, [isPending, fileArticleIsPending, setIsLoadingSpinner]);

  return (
    <div className="h-full">
      <div className="">
        <div className="">
          <div className="">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Ngày đăng tải
            </label>
            <DateTimePicker date={date} setDate={setDate} />
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
                isOpen={isModalAddContributorIsOpen}
                setIsOpen={setModalAddContributorIsOpen}
                setListContributors={setListContributors}
              />
              <Button
                className="bg-green-600 text-white"
                onClick={() => setModalAddContributorIsOpen(true)}
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
              File bài báo đính kèm cũ
            </label>
            <div>
              <a
                href={articleItem?.filePath}
                target="_blank"
                className="hover:text-blue-500"
              >
                Xem bài báo cũ tại đây
              </a>
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Cập nhật file bài báo (nếu có)
            </label>
            <DragFileUpload
              limit={1}
              multiple={false}
              setFile={setFileArticle}
            />
          </div>

          {errorMessage && (
            <div className="mt-4">
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

          <Button
            onClick={handleSubmit(onSubmit, onError)}
            className="my-4"
            type="primary"
          >
            Cập nhật bài báo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormUpdateArticle;
