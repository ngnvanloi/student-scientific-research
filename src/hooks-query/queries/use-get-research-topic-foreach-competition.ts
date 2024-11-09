import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

export type ParamsGetListResearchTopicForeachCompetition = {
  competitionId: number;
  index: number;
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
  param: ParamsGetListResearchTopicForeachCompetition
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ResearchTopicWithContributors>>
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/competition/${param.competitionId}?index=${param.index}&pageSize=${param.pageSize}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ResearchTopicWithContributors>
  >;
}
