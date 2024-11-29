import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { RegistrationForm } from "@/types/RegistrationForm";

export const useGetRegistrationCompetitionDetail = (id: number) => {
  return useQuery<IDataResponseFromAPI<RegistrationForm>, Error>({
    queryKey: queryKeys.registrationCompetitionDetail(id),
    queryFn: () => GetRegistrationCompetitionDetail(id),
  });
};

export async function GetRegistrationCompetitionDetail(
  id: number
): Promise<IDataResponseFromAPI<RegistrationForm>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/RegistrationForm/id?id=${id}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<RegistrationForm>;
}
