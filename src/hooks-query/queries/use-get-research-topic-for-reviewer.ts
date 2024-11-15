import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

// lấy bài báo đã public ĐÃ bao gồm danh sách đồng tác giả
export type ParamsGetListResearchTopicForReviewer = {
  index: number;
  pageSize: number;
  idSearch?: number;
  nameTopicSearch?: string;
  isStatus: number;
  competitionId?: number;
};
export const useGetListResearchTopicForReviewer = (
  params: ParamsGetListResearchTopicForReviewer
) => {
  return useQuery<
    IDataResponseFromAPI<
      IListDataResponseFromAPI<ResearchTopicWithContributors>
    >,
    Error
  >({
    queryKey: [
      queryKeys.listReviewerResearchTopic,
      params.index,
      params.pageSize,
      params.isStatus,
    ],
    queryFn: () => GetListResearchTopicForReviewer(params),
  });
};

export async function GetListResearchTopicForReviewer(
  param: ParamsGetListResearchTopicForReviewer
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ResearchTopicWithContributors>>
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/review?index=${param.index}&pageSize=${param.pageSize}&isStatus=${param.isStatus}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ResearchTopicWithContributors>
  >;
}
