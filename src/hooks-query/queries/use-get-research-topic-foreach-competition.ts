import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

export type ParamsGetListResearchTopicForeachCompetition = {
  competitionId: number;
  index: number;
  pageSize: number;
  reviewCommitteeId?: number;
  nameTopicSearch?: string;
  disciplineId?: number;
  acceptedForPublicationStatus?: number;
  ReviewAcceptanceStatus?: number;
};
// Hook để sử dụng useQuery cho việc lấy thông tin
export const useGetListResearchTopicForeachCompetition = (
  params: ParamsGetListResearchTopicForeachCompetition
) => {
  return useQuery<
    IDataResponseFromAPI<
      IListDataResponseFromAPI<ResearchTopicWithContributors>
    >,
    Error
  >({
    queryKey: queryKeys.listResearchTopicForeachCompetition(params),

    queryFn: () => GetListResearchTopicForeachCompetition(params),
  });
};

export async function GetListResearchTopicForeachCompetition(
  params: ParamsGetListResearchTopicForeachCompetition
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ResearchTopicWithContributors>>
> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/competition`;
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: params.index.toString(),
    pageSize: params.pageSize.toString(),
  });

  // Thêm các tham số khác nếu có
  if (
    params.reviewCommitteeId !== undefined &&
    params.reviewCommitteeId !== null
  ) {
    queryParams.append(
      "reviewCommitteeId",
      params.reviewCommitteeId.toString()
    );
  }
  if (params.nameTopicSearch) {
    queryParams.append("nameTopicSearch", params.nameTopicSearch);
  }
  if (params.disciplineId !== undefined && params.disciplineId !== null) {
    queryParams.append("disciplineId", params.disciplineId.toString());
  }
  if (
    params.acceptedForPublicationStatus !== null &&
    params.acceptedForPublicationStatus !== undefined
  ) {
    queryParams.append(
      "acceptedForPublicationStatus",
      params.acceptedForPublicationStatus.toString()
    );
  }
  if (
    params.ReviewAcceptanceStatus !== undefined &&
    params.ReviewAcceptanceStatus !== null
  ) {
    queryParams.append(
      "ReviewAcceptanceStatus",
      params.ReviewAcceptanceStatus.toString()
    );
  }

  const fullUrl = `${baseUrl}/${params.competitionId}?${queryParams.toString()}`;

  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });

  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ResearchTopicWithContributors>
  >;
}
