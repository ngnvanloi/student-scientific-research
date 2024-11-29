import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ReviewCouncilWithMembers } from "@/types/ReviewCouncilWithMembers";

export const useGetReviewCouncilDetail = (id: number) => {
  return useQuery<IDataResponseFromAPI<ReviewCouncilWithMembers>, Error>({
    queryKey: queryKeys.reviewCouncilDetail(id),
    queryFn: () => GetReviewCouncilDetail(id),
  });
};

export async function GetReviewCouncilDetail(
  id: number
): Promise<IDataResponseFromAPI<ReviewCouncilWithMembers>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Organizer/review-committee/${id}`,
    {
      method: "GET",
      //   data: id,
    }
  );
  return response as unknown as IDataResponseFromAPI<ReviewCouncilWithMembers>;
}
