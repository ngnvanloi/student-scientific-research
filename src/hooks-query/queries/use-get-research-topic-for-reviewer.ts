import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

// lấy bài báo đã public ĐÃ bao gồm danh sách đồng tác giả
export type ParamsGetListResearchTopicForReviewer = {
  index: number;
  pageSize: number;
  isStatus: number;

  idSearch?: number;
  nameTopicSearch?: string;
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
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/review`;
  //
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
    isStatus: param.isStatus.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.idSearch) {
    queryParams.append("idSearch", param.idSearch.toString());
  }
  if (param.nameTopicSearch) {
    queryParams.append("nameTopicSearch", param.nameTopicSearch);
  }
  if (param.competitionId) {
    queryParams.append("competitionId", param.competitionId.toString());
  }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;
  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ResearchTopicWithContributors>
  >;
}
