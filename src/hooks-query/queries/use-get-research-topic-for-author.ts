import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";

// lấy bài báo đã public ĐÃ bao gồm danh sách đồng tác giả
export type ParamsGetListResearchTopicForAuthorByRolename = {
  roleName: string;
  index: number;
  pageSize: number;
  nameTopicSearch?: string;
  acceptedForPublicationStatus?: number;
  ReviewAcceptanceStatus?: number;
  competitionId?: number;
};
export const useGetListResearchTopicForAuthorByRolename = (
  params: ParamsGetListResearchTopicForAuthorByRolename
) => {
  return useQuery<
    IDataResponseFromAPI<
      IListDataResponseFromAPI<ResearchTopicWithContributors>
    >,
    Error
  >({
    queryKey: [
      queryKeys.listAuthorResearchTopic,
      params.index,
      params.pageSize,
    ],
    queryFn: () => GetListResearchTopicForAuthorByRolename(params),
  });
};

export async function GetListResearchTopicForAuthorByRolename(
  param: ParamsGetListResearchTopicForAuthorByRolename
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ResearchTopicWithContributors>>
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/author?roleName=${param.roleName}&index=${param.index}&pageSize=${param.pageSize}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ResearchTopicWithContributors>
  >;
}
