import { Alert, Button } from "antd";
import FormField from "../FormCard/FormInputField";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
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
import {
  ParamsCreateNotification,
  useCreateNotificationMutation,
} from "@/hooks-query/mutations/use-create-notification-mutation";
import { useForm } from "react-hook-form";
import { TFormSubmitResearchTopic } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderNameUploadFirebase } from "@/web-configs/folder-name-upload-firebase";
import { ModalAddContributor } from "../Modal/ModalAddContributorArticle";
import { useSession } from "next-auth/react";
import ClickFileUpload from "../UploadFile/ClickFileUpload";
import { Competition } from "@/types/Competition";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import {
  ParamsUpdateResearchTopic,
  useUpdateResearchTopicMutation,
} from "@/hooks-query/mutations/use-update-research-topic-mutation";
import { FormUpdateResearchTopicc } from "../FormCard/ZodSchema";
import {
  ParamsGetAllArticleForAuthorWithFilter,
  useGetAllArticleForAuthorWithFilter,
} from "@/hooks-query/queries/use-get-article-for-author-with-filter";
import DragFileUpload from "../UploadFile/DragFileUpload";
import { NotificationContentSample } from "@/lib/notification-content-sample ";
import { useGetCompetitionDetail } from "@/hooks-query/queries/use-get-competition";

interface IProps {
  competitionId: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  researchTopic: ResearchTopicWithContributors | undefined;
}
const FormUpdateAcceptance = (props: IProps) => {
  const { competitionId, setIsOpen, researchTopic, setIsLoadingSpinner } =
    props;
  const listTempContributor: CoAuthor[] = researchTopic?.author_ResearchTopics
    ? researchTopic.author_ResearchTopics
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
    "checking listTempContributor from form update research topic: ",
    listTempContributor
  );
  console.log(
    "=== checking respont author research topic: ",
    JSON.stringify(researchTopic?.author_ResearchTopics, null, 2)
  );
  const { data: session } = useSession();
  // STATE
  const [fileReport, setFileReport] = useState<File>();
  const [fileBudget, setFileBudget] = useState<File>();
  const [fileProduct, setFileProduct] = useState<File>();
  const [listContributors, setListContributors] =
    useState<CoAuthor[]>(listTempContributor);

  const { data: disciplines } = useGetListDiscipline();
  const [isOpen, setModalAddContributorIsOpen] = useState<boolean>(false);
  // lấy ra danh sách các bài báo đã public (bao gồm author và co-author)
  let params: ParamsGetAllArticleForAuthorWithFilter = {
    index: 1,
    pageSize: 100,
    acceptedForPublicationStatus: 1,
  };
  const { data: articles } = useGetAllArticleForAuthorWithFilter(params);

  console.log(
    ">>>>>>>>>> checking listTempContributor: ",
    JSON.stringify(listTempContributor, null, 2)
  );
  const { data: competitionDetail, refetch: refetchCompetitionDetail } =
    useGetCompetitionDetail(competitionId);
  useEffect(() => {
    refetchCompetitionDetail();
  }, [competitionId]);
  // TOAST
  const { toast } = useToast();
  // MUTATION DECLARE
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isSuccess, isError, error, isPending } =
    useUpdateResearchTopicMutation((msg) => {
      setErrorMessage(msg);
    });
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
  const listArticles: SelectItem[] | undefined = articles?.data.items.map(
    (item) => ({
      id: item.id,
      name: item.title,
    })
  );
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
      competitionId: competitionId,
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
    console.log("checking competition: ", competitionId);
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
        articleId: Number(data.articleId) || 0,
        disciplineId: Number(data.disciplineId) || 0,
        competitionId: competitionId || 0,
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
              description:
                "Bạn đã cập nhật thành công bản nghiệm thu, vui lòng chờ đợi ban tổ chức phê duyệt",
            });
            // gửi thông báo cho ban tổ chức
            let contentNoti =
              NotificationContentSample.NotificationType.acceptance.author
                .update + data.contentForUpdateAcceptance;
            // gửi thông báo cho người đăng kí
            const paramsNoti: ParamsCreateNotification = {
              notificationContent: session?.user?.name + contentNoti,
              notificationDate: new Date().toISOString(),
              recevierId: competitionDetail?.data.accountId || 0,
              notificationTypeId: 7,
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
            setErrorMessage(null);
            setFileBudget(undefined);
            setFileProduct(undefined);
            setFileReport(undefined);
            setListContributors([]);
            setIsOpen(false);
            // setIsLoadingSpinner(false);
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
    if (isPending || notiIsPending || fileProductIsPending) {
      setIsLoadingSpinner(true);
    } else {
      setIsLoadingSpinner(false);
    }
  }, [isPending, notiIsPending, fileProductIsPending, setIsLoadingSpinner]);

  return (
    <div className="h-full">
      {/* <div className="mt-1">
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
            href={researchTopic?.budgetFilePath}
          >
            File dự trù kinh phí
          </a>
        </div>
        {researchTopic?.productFilePath ? (
          <div>
            <a
              target="_blank"
              className="hover:text-blue-500 hover:underline"
              href={researchTopic?.productFilePath}
            >
              File sản phẩm
            </a>
          </div>
        ) : (
          ""
        )}
      </div> */}
      <div className="">
        <div>
          <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
            Cập nhật file sản phẩm
          </label>
          <DragFileUpload limit={1} multiple={false} setFile={setFileProduct} />
        </div>
      </div>
      <div className="mt-3">
        <label className="mb-[10px] block text-base font-bold text-dark dark:text-white">
          Nội dung cập nhật nghiệm thu
        </label>
        <FormField
          type="text"
          placeholder="Nhập nội dung cập nhật .."
          name="contentForUpdateAcceptance"
          register={register}
          error={errors.contentForUpdateAcceptance}
          isTextArea={true}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
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
        className="my-3"
        type="primary"
      >
        Cập nhật
      </Button>
    </div>
  );
};

export default FormUpdateAcceptance;
