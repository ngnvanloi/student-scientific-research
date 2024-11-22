import { IDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Acceptance } from "@/types/Acceptance";

export const useGetAcceptanceDetail = (id: number) => {
  return useQuery<IDataResponseFromAPI<Acceptance>, Error>({
    queryKey: queryKeys.acceptanceDetail,
    queryFn: () => GetAcceptanceDetail(id),
  });
};

export async function GetAcceptanceDetail(
  id: number
): Promise<IDataResponseFromAPI<Acceptance>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Acceptance/${id}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<Acceptance>;
}
