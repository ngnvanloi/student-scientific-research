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
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Organizer/review-committee?competitionId=${param.competitionId}&page=${param.page}&pageSize=${param.pageSize}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ReviewCouncilWithMembers>
  >;
}
