import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

export const useGetCompetitionDetail = (id: number) => {
  return useQuery<IDataResponseFromAPI<Competition>, Error>({
    queryKey: queryKeys.competitionDetail,
    queryFn: () => GetCompetitionDetail(id),
  });
};

export async function GetCompetitionDetail(
  id: number
): Promise<IDataResponseFromAPI<Competition>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/competitions?id=${id}`,
    {
      method: "GET",
      //   data: id,
    }
  );
  return response as unknown as IDataResponseFromAPI<Competition>;
}
