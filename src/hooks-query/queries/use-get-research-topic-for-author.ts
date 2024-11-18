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
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/ResearchTopic/author`;
  //
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    roleName: param.roleName,
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.nameTopicSearch) {
    queryParams.append("nameTopicSearch", param.nameTopicSearch);
  }
  if (
    param.acceptedForPublicationStatus !== undefined &&
    param.acceptedForPublicationStatus !== null
  ) {
    queryParams.append(
      "acceptedForPublicationStatus",
      param.acceptedForPublicationStatus.toString()
    );
  }
  if (
    param.ReviewAcceptanceStatus !== null &&
    param.ReviewAcceptanceStatus !== undefined
  ) {
    queryParams.append(
      "ReviewAcceptanceStatus",
      param.ReviewAcceptanceStatus.toString()
    );
  }
  if (param.competitionId !== null && param.competitionId !== undefined) {
    queryParams.append("competitionId", param.competitionId.toString());
  }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;
  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ResearchTopicWithContributors>
  >;
}
