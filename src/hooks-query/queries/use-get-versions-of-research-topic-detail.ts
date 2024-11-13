import { IDataRetrievedResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { VersionOfResearchProjectTopic } from "@/types/VersionOfResearchProjectTopic";

export const useGetVersionOfResearchProjectTopicDetail = (id: number) => {
  //
  return useQuery<
    IDataRetrievedResponseFromAPI<VersionOfResearchProjectTopic>,
    Error
  >({
    queryKey: [queryKeys.versionOfResearchTopic, id],
    queryFn: () => GetVersionOfResearchProjectTopicDetail(id),
  });
};

export async function GetVersionOfResearchProjectTopicDetail(
  id: number
): Promise<IDataRetrievedResponseFromAPI<VersionOfResearchProjectTopic>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/version-topic/${id}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataRetrievedResponseFromAPI<VersionOfResearchProjectTopic>;
}
