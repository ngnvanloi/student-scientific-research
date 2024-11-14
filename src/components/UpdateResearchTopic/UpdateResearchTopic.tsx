import { Button } from "antd";
import FormField from "../FormCard/FormInputField";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import DragFileUpload from "../UploadFile/DragFileUpload";
import {
  columns,
  DataTableAddContributors,
} from "../DataTable/DataTableAddCoAuthor";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGetListDiscipline } from "@/hooks-query/queries/use-get-discipline";
import { CoAuthor } from "@/types/CoAuthor";
import { useToast } from "@/hooks/use-toast";
import {
  ParamsSubmitResearchTopic,
  useSubmitResearchTopicMutation,
} from "@/hooks-query/mutations/use-submit-research-topic";
import { useUploadFileMutation } from "@/hooks-query/mutations/use-upload-file-mutation";
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { useForm } from "react-hook-form";
import { TFormSubmitResearchTopic } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import { ModalAddContributor } from "../Modal/ModalAddContributorArticle";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { useSession } from "next-auth/react";
import ClickFileUpload from "../UploadFile/ClickFileUpload";
import { useGetArticleAuthorByPublicationNoneContributor } from "@/hooks-query/queries/use-get-article-for-author";
import { Competition } from "@/types/Competition";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import { string } from "zod";
import {
  ParamsUpdateResearchTopic,
  useUpdateResearchTopicMutation,
} from "@/hooks-query/mutations/use-update-research-topic-mutation";
import { FormUpdateResearchTopicc } from "../FormCard/ZodSchema";

interface IProps {
  competition: Competition | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  researchTopic: ResearchTopicWithContributors | undefined;
}
const FormUpdateResearchTopic = (props: IProps) => {
  const { competition, setIsOpen, researchTopic, setIsLoadingSpinner } = props;
  const listTempContributor: CoAuthor[] = researchTopic?.coAuthors
    ? researchTopic.coAuthors
        .filter((item) => item.roleName === "co-author")
        .map((item) => ({
          name: item.name,
          email: item.email,
          numberPhone: item.numberPhone,
          dateOfBirth: item.dateOfBirth,
          sex: item.sex,
          roleName: item.roleName,
        }))
    : [];

  const { data: session } = useSession();
  // STATE
  const [fileReport, setFileReport] = useState<File>();
  const [fileBudget, setFileBudget] = useState<File>();
  const [fileProduct, setFileProduct] = useState<File>();
  const [listContributors, setListContributors] =
    useState<CoAuthor[]>(listTempContributor);

  const { data: disciplines } = useGetListDiscipline();
  const [isOpen, setModalAddContributorIsOpen] = useState<boolean>(false);
  const { data: articles } =
    useGetArticleAuthorByPublicationNoneContributor(true);

  console.log(
    ">>>>>>>>>> checking listTempContributor: ",
    JSON.stringify(listTempContributor, null, 2)
  );
  // TOAST
  const { toast } = useToast();
  // MUTATION DECLARE
  const { mutate, isSuccess, isError, error, isPending } =
    useUpdateResearchTopicMutation();
  const {
    mutate: fileReportMutation,
    isSuccess: fileIsSuccess,
    isError: fileIsError,
    error: fileError,
    isPending: fileIsPending,
  } = useUploadFileMutation();
  const {
    mutate: fileProductMutation,
    isSuccess: fileProductIsSuccess,
    isError: fileProductIsError,
    error: fileProductError,
    isPending: fileProductIsPending,
  } = useUploadFileMutation();
  const {
    mutate: fileBudgetMutation,
    isSuccess: fileBudgetIsSuccess,
    isError: fileBudgetIsError,
    error: fileBudgetError,
    isPending: fileBudgetIsPending,
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
  const listArticles: SelectItem[] | undefined = articles?.data.map((item) => ({
    id: item.articleId,
    name: item.title,
  }));
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TFormSubmitResearchTopic>({
    resolver: zodResolver(FormUpdateResearchTopicc),
    defaultValues: {
      nameTopic: researchTopic?.nameTopic,
      description: researchTopic?.description,
      target: researchTopic?.target,
      achievedResults: researchTopic?.achievedResults,
      budget: researchTopic?.budget,
      projectDuration: researchTopic?.projectDuration,
      supervisor: researchTopic?.supervisor,
      summary: researchTopic?.summary,
      productFilePath: researchTopic?.productFilePath,
      budgetFilePath: researchTopic?.budgetFilePath,
      reportFilePath: researchTopic?.reportFilePath,
      articleId: String(researchTopic?.articleId),
      disciplineId: String(researchTopic?.disciplineId),
      competitionId: competition?.id,
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
  const onSubmit = async (data: TFormSubmitResearchTopic) => {
    console.log("checking name topic: ", data.nameTopic);
    console.log("checking description: ", data.description);
    console.log("checking target: ", data.target);
    console.log("checking summary: ", data.summary);
    console.log("checking duration: ", data.projectDuration);
    console.log("checking budget: ", data.budget);
    console.log("checking gvhd: ", data.supervisor);
    console.log("checking discipline: ", data.disciplineId);
    console.log("checking article: ", data.articleId);
    console.log("checking competition: ", competition?.id);
    console.log("checking file budget: ", fileBudget);
    console.log("checking file report: ", fileReport);
    console.log("checking file product: ", fileProduct);
    console.log("checking list Contributors: ", listContributors);

    // GỌI API UPLOAD FILE
    const formDataUploadFileBudget = new FormData();
    const formDataUploadFileProduct = new FormData();
    const formDataUploadFileReport = new FormData();
    if (fileBudget) {
      formDataUploadFileBudget.append("File", fileBudget);
      formDataUploadFileBudget.append(
        "FolderName",
        FolderNameUploadFirebase.BudgetFileFolder
      );
    }
    if (fileProduct) {
      formDataUploadFileProduct.append("File", fileProduct);
      formDataUploadFileProduct.append(
        "FolderName",
        FolderNameUploadFirebase.ProductFileFolder
      );
    }
    if (fileReport) {
      formDataUploadFileReport.append("File", fileReport);
      formDataUploadFileReport.append(
        "FolderName",
        FolderNameUploadFirebase.ReportFileFolder
      );
    }
    try {
      // Khởi tạo các promise upload file nếu file tồn tại
      const fileUploadPromises = [
        fileBudget
          ? uploadFile(fileBudgetMutation, formDataUploadFileBudget)
          : Promise.resolve(""),
        fileProduct
          ? uploadFile(fileProductMutation, formDataUploadFileProduct)
          : Promise.resolve(""),
        fileReport
          ? uploadFile(fileReportMutation, formDataUploadFileReport)
          : Promise.resolve(""),
      ];

      // Thực hiện các promise upload file đồng thời và đợi tất cả hoàn tất
      const [budgetFilePath, productFilePath, reportFilePath] =
        await Promise.all(fileUploadPromises);

      // Tạo request body từ kết quả mutation
      const requestBody: ParamsUpdateResearchTopic = {
        nameTopic: data.nameTopic,
        description: data.description,
        target: data.target,
        achievedResults: data.achievedResults,
        budget: data.budget,
        projectDuration: data.projectDuration,
        supervisor: data.supervisor,
        summary: data.description,
        productFilePath:
          productFilePath || researchTopic?.productFilePath || "",
        budgetFilePath: budgetFilePath || researchTopic?.budgetFilePath || "",
        reportFilePath: reportFilePath || researchTopic?.reportFilePath || "",
        articleId: Number(data.articleId) || -1,
        disciplineId: Number(data.disciplineId) || -1,
        competitionId: competition?.id || -1,
        coAuthors: listContributors,
      };

      // Gọi API
      mutate(
        { id: researchTopic?.id || 0, params: requestBody },
        {
          onSuccess: () => {
            toast({
              title: "Thành công",
              variant: "default",
              description: "Chúc mừng! Bạn đã cập nhật thành công đề tài",
            });
            // Reset các field input và file
            reset({
              disciplineId: "",
              nameTopic: "",
              description: "",
              target: "",
              achievedResults: "",
              budget: 0,
              projectDuration: 0,
              supervisor: "",
              summary: "",
              articleId: "",
              competitionId: 0,
            });
            setFileBudget(undefined);
            setFileProduct(undefined);
            setFileReport(undefined);
            setListContributors([]);
            setIsOpen(false);

            // // Gửi thông báo cho ban tổ chức
            // const paramsNoti: ParamsCreateNotification = {
            //   notificationContent: `${session?.user?.name} ${NotificationContentSample.NotificationType.researchTopic.author}`,
            //   notificationDate: new Date().toISOString(),
            //   recevierId: competition?.accountId || -1,
            //   notificationTypeId: 2,
            //   targetId: -1,
            // };
            // notiMutation(paramsNoti, {
            //   onSuccess: () => {
            //     console.log("Thông báo đã gửi");
            //   },
            //   onError: (error) => {
            //     console.error("Lỗi khi gửi thông báo:", error);
            //   },
            // });
          },
          onError: (error) => {
            console.error("Lỗi khi tạo bài báo:", error);
          },
        }
      );
    } catch (error) {
      console.error("Lỗi khi upload file:", error);
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS", errors); // Kiểm tra các lỗi của form
  };
  useEffect(() => {
    // Kiểm tra nếu bất kỳ trạng thái pending nào đang là true
    if (
      isPending ||
      fileIsPending ||
      fileBudgetIsPending ||
      notiIsPending ||
      fileProductIsPending
    ) {
      setIsLoadingSpinner(true);
    } else {
      setIsLoadingSpinner(false);
    }
  }, [
    isPending,
    fileIsPending,
    fileBudgetIsPending,
    notiIsPending,
    fileProductIsPending,
    setIsLoadingSpinner,
  ]);

  return (
    <div className="h-full">
      <div className="">
        <div>
          <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
            Tên đề tài
          </label>
          <FormField
            type="text"
            placeholder="Nhập tên đề tài..."
            name="nameTopic"
            register={register}
            error={errors.nameTopic}
            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <div className="">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Kinh phí
            </label>
            <FormField
              type="text"
              placeholder="Nhập kinh phí ..."
              name="budget"
              register={register}
              valueAsNumber
              error={errors.budget}
              className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
            />
          </div>
          <div className="">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Thời gian nghiệm thu
            </label>
            <FormField
              type="text"
              placeholder="12"
              name="projectDuration"
              register={register}
              valueAsNumber
              error={errors.projectDuration}
              className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
            />
          </div>
          <div className="flex-1">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Giáo viên hướng dẫn
            </label>
            <FormField
              type="text"
              placeholder="Nhập tên giáo viên hướng dẫn ..."
              name="supervisor"
              register={register}
              error={errors.supervisor}
              className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
            />
          </div>
        </div>
        <div className="mt-3">
          <FormSelect
            name="articleId"
            items={listArticles || []}
            register={register}
            error={errors.articleId}
            label="Bài báo (nếu có)"
            className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
          />
        </div>
        <div className="mt-3">
          <FormSelect
            name="disciplineId"
            items={listDiscipline || []}
            register={register}
            error={errors.disciplineId}
            label="Lĩnh vực"
            className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
          />
        </div>
        <div className="mt-3">
          <div className="">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Tổng quan đề tài
            </label>
            <FormField
              type="text"
              placeholder="Nhập tổng quan đề tài ..."
              name="description"
              register={register}
              error={errors.description}
              isTextArea={true}
              className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
            />
          </div>
          <div className="">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Mục tiêu đề tài
            </label>
            <FormField
              type="text"
              placeholder="Nhập mục tiêu đề tài ..."
              name="target"
              register={register}
              error={errors.target}
              isTextArea={true}
              className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
            />
          </div>
          <div className="">
            <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
              Kết quả đạt được
            </label>
            <FormField
              type="text"
              placeholder="Nhập kết quả đạt được ..."
              name="achievedResults"
              register={register}
              error={errors.achievedResults}
              isTextArea={true}
              className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center justify-items-center mb-3">
          <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
            Thêm thành viên tham gia
          </label>
          <ModalAddContributor
            isOpen={isOpen}
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
      <div className="mt-3">
        <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
          Các file đã nộp trước đó
        </label>
        <div>
          <a
            target="_blank"
            className="hover:text-blue-500 hover:underline"
            href={researchTopic?.reportFilePath}
          >
            File thuyết minh
          </a>
        </div>
        <div>
          <a
            target="_blank"
            className="hover:text-blue-500 hover:underline"
            href={researchTopic?.productFilePath}
          >
            File sản phẩm
          </a>
        </div>
        <div>
          <a
            target="_blank"
            className="hover:text-blue-500 hover:underline"
            href={researchTopic?.budgetFilePath}
          >
            File dự trù kinh phí
          </a>
        </div>
      </div>
      <div className="flex gap-4 mt-3">
        <div>
          <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
            Cập nhật file thuyết minh (nếu cần)
          </label>
          <ClickFileUpload limit={1} multiple={false} setFile={setFileReport} />
        </div>
        <div>
          <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
            Cập nhật file sản phẩm (nếu cần)
          </label>
          <ClickFileUpload
            limit={1}
            multiple={false}
            setFile={setFileProduct}
          />
        </div>
        <div>
          <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
            Cập nhật file dự trù kinh phí (nếu cần)
          </label>
          <ClickFileUpload limit={1} multiple={false} setFile={setFileBudget} />
        </div>
      </div>
      <Button
        onClick={handleSubmit(onSubmit, onError)}
        className="my-3"
        type="primary"
      >
        Cập nhật
      </Button>
    </div>
  );
};

interface IProp {
  children: React.ReactNode;
}
const div = ({ children }: IProp) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-12">{children}</div>
    </div>
  );
};

export default FormUpdateResearchTopic;
