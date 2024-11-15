import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ReviewCouncilWithMembers } from "@/types/ReviewCouncilWithMembers";

export type ParamsGetListReviewCouncilForEachCompetition = {
  competitionId: number;
  page: number;
  pageSize: number;
  idSearch?: string;
  nameSearch?: string;
};
export const useGetListReviewCouncilForEachCompetition = (
  params: ParamsGetListReviewCouncilForEachCompetition
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<ReviewCouncilWithMembers>>,
    Error
  >({
    queryKey: [
      queryKeys.listReviewCouncilForEachCompetition,
      params.competitionId,
    ],
    queryFn: () => GetListReviewCouncilForEachCompetition(params),
  });
};

export async function GetListReviewCouncilForEachCompetition(
  param: ParamsGetListReviewCouncilForEachCompetition
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ReviewCouncilWithMembers>>
> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Organizer/review-committee`;
  //
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    page: param.page.toString(),
    pageSize: param.pageSize.toString(),
    competitionId: param.competitionId.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.idSearch) {
    queryParams.append("idSearch", param.idSearch);
  }
  if (param.nameSearch) {
    queryParams.append("nameSearch", param.nameSearch);
  }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;
  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ReviewCouncilWithMembers>
  >;
}
