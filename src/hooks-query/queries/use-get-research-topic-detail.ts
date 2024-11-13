import { IDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";

export const useGetResearchProjectTopicDetail = (id: number) => {
  return useQuery<IDataResponseFromAPI<ResearchProjectTopic>, Error>({
    queryKey: [queryKeys.researchTopicDetail, id],
    queryFn: () => GetResearchProjectTopicDetail(id),
  });
};

export async function GetResearchProjectTopicDetail(
  id: number
): Promise<IDataResponseFromAPI<ResearchProjectTopic>> {
  //
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/${id}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<ResearchProjectTopic>;
}
