import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

export type ParamsGetListResearchTopicForeachCompetition = {
  competitionId: number;
  index: number;
  reviewCommitteeId?: number;
  pageSize: number;
  nameTopicSearch?: string;
  disciplineId?: number;
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
    queryKey: [
      queryKeys.listResearchTopicForeachCompetition,
      params.competitionId,
      params.index,
      params.pageSize,
    ],
    queryFn: () => GetListResearchTopicForeachCompetition(params),
  });
};

export async function GetListResearchTopicForeachCompetition(
  params: ParamsGetListResearchTopicForeachCompetition
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ResearchTopicWithContributors>>
> {
  // Xây dựng URL dựa trên các tham số có sẵn
  let url = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/competition/${params.competitionId}?index=${params.index}&pageSize=${params.pageSize}`;

  // Thêm reviewCommitteeId nếu có
  if (
    params.reviewCommitteeId !== undefined &&
    params.reviewCommitteeId !== null
  ) {
    url += `&reviewCommitteeId=${params.reviewCommitteeId}`;
  }

  // Thêm disciplineId nếu có
  if (params.disciplineId !== undefined && params.disciplineId !== null) {
    url += `&disciplineId=${params.disciplineId}`;
  }

  const response = (await communityRequest)(url, {
    method: "GET",
  });

  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ResearchTopicWithContributors>
  >;
}
