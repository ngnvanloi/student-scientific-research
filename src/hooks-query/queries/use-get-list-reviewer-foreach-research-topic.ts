import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ReviewCouncilWithMembers } from "@/types/ReviewCouncilWithMembers";

// lấy bài báo đã public ĐÃ bao gồm danh sách đồng tác giả
export type ParamsGetReviewCommitteeForEachResearchTopic = {
  researchTopicId: number;
  page: number;
  pageSize: number;
  idSearch?: number;
  nameSearch?: string;
};
export const useGetReviewCommitteeForEachResearchTopic = (
  params: ParamsGetReviewCommitteeForEachResearchTopic
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<ReviewCouncilWithMembers>>,
    Error
  >({
    queryKey: queryKeys.listReviewCommitteeForEachResearchTopic(params),

    queryFn: () => GetReviewCommitteeForEachResearchTopic(params),
  });
};

export async function GetReviewCommitteeForEachResearchTopic(
  param: ParamsGetReviewCommitteeForEachResearchTopic
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ReviewCouncilWithMembers>>
> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Organizer/review-committee/research-topic`;
  //
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    page: param.page.toString(),
    pageSize: param.pageSize.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.idSearch !== null && param.idSearch !== undefined) {
    queryParams.append("idSearch", param.idSearch.toString());
  }
  if (param.nameSearch) {
    queryParams.append("nameSearch", param.nameSearch);
  }

  const fullUrl = `${baseUrl}/${param.researchTopicId}?${queryParams.toString()}`;

  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ReviewCouncilWithMembers>
  >;
}
