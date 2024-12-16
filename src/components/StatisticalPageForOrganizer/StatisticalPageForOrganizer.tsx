"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Overview,
  StatisticRateForEachCompetition,
} from "./ComponentRelated/overview";
import {
  ParamsGetStatisticForOrganizer,
  useGetStatisticForOrganizer,
} from "@/hooks-query/queries/use-get-statistic-for-organizer";
import {
  ParamsGetListCompetition,
  useGetListCompetitionAdmin,
} from "@/hooks-query/queries/use-get-competitions";
import {
  ParamsGetStatisticForOrganizerForMultiCompetition,
  useGetStatisticsForMultipleCompetitions,
} from "@/hooks-query/queries/use-get-statistic-for-multi-competitions";
import FormSelect, { SelectItem } from "../FormCard/FormSelectField";
import { useForm, useWatch } from "react-hook-form";
import { TFormFilter } from "../FormCard/FormInputsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAddContributorSchema } from "../FormCard/ZodSchema";
import { useEffect } from "react";
import {
  ClipboardDocumentCheckIcon,
  NewspaperIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { RecentArticle } from "./ComponentRelated/recent-article";
import { formatToVND } from "@/helper/extension-function";

const StatisticalPageForOrganizer = () => {
  // lấy dữ liệu theo combobox cuộc thi
  let params: ParamsGetStatisticForOrganizer = {
    CompetitionId: 3,
    Year: 0,
    DisciplineId: 0,
  };
  const { data: statisticForOrganizer, refetch: refetchStatisticForOrganizer } =
    useGetStatisticForOrganizer(params);

  // lấy ra id của các cuộc thi do ban tổ chức quản lý
  let paramsCompe: ParamsGetListCompetition = {
    index: 1,
    pageSize: 99,
  };
  const { data: listCompetition, refetch: refetchListCompetition } =
    useGetListCompetitionAdmin(paramsCompe);
  const competitionIds: number[] =
    listCompetition?.data.items.map((item) => {
      return item.id;
    }) || [];
  // lưu một mảng A chứa thông tin của một cuộc thi và tỉ lệ của các đề tài theo cấu trúc StatisticRateForEachCompetition
  let paramsStatisticForMultiComp: ParamsGetStatisticForOrganizerForMultiCompetition =
    {
      competitionIds,
      year: 0,
      disciplineId: 0,
    };
  const results = useGetStatisticsForMultipleCompetitions(
    paramsStatisticForMultiComp
  );
  // Kiểm tra kết quả
  let dataStatistic: StatisticRateForEachCompetition[] = [];
  results.forEach((result, index) => {
    if (result.isLoading) {
      console.log(`Loading competition ${competitionIds[index]}`);
    } else if (result.isError) {
      console.error(
        `Error fetching competition ${competitionIds[index]}`,
        result.error
      );
    } else {
      dataStatistic[index] = {
        competitionName:
          result.data?.data.competitionStatistics.competition[0]
            .competitionName || "",
        SuccessfulReviewRate:
          result.data?.data.researchFieldStatistics.successfulReviewRate || 0,
        FacultyApprovalForPublicationRate:
          result.data?.data.researchFieldStatistics.facultyApprovedTopicsRate ||
          0,
        PublishedTopicsRate:
          result.data?.data.researchFieldStatistics.publishedTopicsRate || 0,
      };
    }
  });
  console.log("checking dataStatistic for chart: ", dataStatistic);

  // list competition
  const competitions: SelectItem[] | undefined =
    listCompetition?.data.items.map((item) => ({
      id: item.id,
      name: item.competitionName,
    }));
  // react hook form

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    control,
  } = useForm<TFormFilter>({
    resolver: zodResolver(FormAddContributorSchema),
  });

  // refetch danh sách đề tài theo selected
  // Sử dụng useWatch để theo dõi sự thay đổi của competitionId
  let selectedCompetitionId = useWatch({
    control,
    name: "competitionId",
  });

  // fetch danh sách đề tài theo selectedCompetitionId
  useEffect(() => {
    if (selectedCompetitionId) {
      params.CompetitionId = Number(selectedCompetitionId);
      refetchStatisticForOrganizer();
    }
  }, [selectedCompetitionId, refetchStatisticForOrganizer]);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Thống kê</h2>
            <div className="flex items-center space-x-2 max-w-[500px]">
              <FormSelect
                name="competitionId"
                items={competitions || []}
                register={register}
                error={errors.competitionId}
                className="w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2"
              />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="analytics">Phân tích</TabsTrigger>
              <TabsTrigger value="reports">Báo cáo</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 ">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* THỐNG KÊ CUỘC THI */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Thống kê cuộc thi
                    </CardTitle>
                    <TrophyIcon width={16} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +
                      {
                        statisticForOrganizer?.data.competitionStatistics
                          .totalCompetition
                      }
                    </div>
                    <p className="text-[13px] text-muted-foreground">
                      Đang diễn ra:{" "}
                      {
                        statisticForOrganizer?.data.competitionStatistics
                          .ongoingCompetition
                      }
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      Sắp diễn ra:{" "}
                      {
                        statisticForOrganizer?.data.competitionStatistics
                          .upcomingCompetition
                      }
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      Kết thúc:{" "}
                      {
                        statisticForOrganizer?.data.competitionStatistics
                          .finishedCompetition
                      }
                    </p>
                  </CardContent>
                </Card>
                {/* THỐNG KÊ ĐỀ TÀI */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Thống kê đề tài
                    </CardTitle>
                    <NewspaperIcon width={16} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +
                      {
                        statisticForOrganizer?.data.researchFieldStatistics
                          .totalResearchTopic
                      }
                    </div>
                    <p className="text-[13px] text-muted-foreground">
                      Đề tài chờ phê duyệt:{" "}
                      {
                        statisticForOrganizer?.data.researchFieldStatistics
                          .totalFacultyPendingReviewTopics
                      }
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      Đề tài đã phê duyệt:{" "}
                      {
                        statisticForOrganizer?.data.researchFieldStatistics
                          .totalFacultyApprovedTopics
                      }
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      Đề tài đã công khai:{" "}
                      {
                        statisticForOrganizer?.data.researchFieldStatistics
                          .totalPublishedTopics
                      }
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      Bài báo đính kèm:{" "}
                      {
                        statisticForOrganizer?.data.articleStatistics
                          .totalArticle
                      }
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      Tổng kinh phí:{" "}
                      {formatToVND(
                        statisticForOrganizer?.data.researchFieldStatistics
                          .totalBudgets || ""
                      )}
                    </p>
                  </CardContent>
                </Card>
                {/* THỐNG KÊ HỘI ĐỒNG PHẢN BIỆN */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Hội đồng phản biện
                    </CardTitle>
                    <UserGroupIcon width={16} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +
                      {
                        statisticForOrganizer?.data.reviewCommitteeStatistics
                          .totalReviewCommittee
                      }
                    </div>
                    <p className="text-[13px] text-muted-foreground">
                      {`Tổng số thành viên: ${statisticForOrganizer?.data.reviewCommitteeStatistics.totalReviewer}`}
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      {`Tỉ lệ tham gia phản biện: ${Math.round(statisticForOrganizer?.data.reviewCommitteeStatistics.reviewerParticipationRate || 0)}%`}
                    </p>
                  </CardContent>
                </Card>
                {/* THỐNG KÊ PHIẾU ĐĂNG KÍ */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Phiếu đăng kí tham gia
                    </CardTitle>
                    <ClipboardDocumentCheckIcon width={16} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +
                      {
                        statisticForOrganizer?.data.registrationFormStatistics
                          .totalRegistrationForm
                      }
                    </div>
                    <p className="text-[13px] text-muted-foreground">
                      {`Đăng kí thành công: ${
                        statisticForOrganizer?.data.registrationFormStatistics
                          .approvedRegistrationForm
                      } / 
                        ${
                          statisticForOrganizer?.data.registrationFormStatistics
                            .totalRegistrationForm
                        } (${Math.round(statisticForOrganizer?.data.registrationFormStatistics.successfulRegistrationRate || 0)}%)`}
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      {`Chờ phê duyệt: ${
                        statisticForOrganizer?.data.registrationFormStatistics
                          .pendingRegistrationForm
                      } `}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Tổng quan</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={dataStatistic} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Bài báo khoa học</CardTitle>
                    <CardDescription>
                      Bài báo khoa học cho từng cuộc thi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentArticle
                      listArticle={
                        statisticForOrganizer?.data.articleStatistics.article
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <p>Tranh phân tích</p>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <p>Trang báo cáo thống kê</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export { StatisticalPageForOrganizer };
