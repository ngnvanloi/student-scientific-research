import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Statistic } from "@/types/Statistic";

export type ParamsGetStatisticForOrganizer = {
  CompetitionId: number;
  Year: number;
  DisciplineId: number;
};
export const useGetStatisticForOrganizer = (
  params: ParamsGetStatisticForOrganizer
) => {
  return useQuery<IDataResponseFromAPI<Statistic>, Error>({
    queryKey: [
      queryKeys.statisticForOrganizer,
      params.CompetitionId,
      params.Year,
      params.DisciplineId,
    ],
    queryFn: () => GetStatisticForOrganizer(params),
  });
};

export async function GetStatisticForOrganizer(
  data: ParamsGetStatisticForOrganizer
): Promise<IDataResponseFromAPI<Statistic>> {
  console.log("checking params: ", JSON.stringify(data, null, 2));
  const response = await communityRequest<IDataResponseFromAPI<Statistic>>(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Statistic/statistics`,
    {
      method: "POST",
      data,
    }
  );
  return response as unknown as IDataResponseFromAPI<Statistic>;
}
