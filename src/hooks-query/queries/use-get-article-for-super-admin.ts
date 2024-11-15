import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";

// lấy bài báo đã public ĐÃ bao gồm danh sách đồng tác giả
export type ParamsGetPublicationArticleForAdminIncludeContributor = {
  index: number;
  pageSize: number;
  idSearch?: string;
  nameSearch?: string;
  acceptedForPublicationStatus: number;
};
export const useGetPublicationArticleForAdminIncludeContributor = (
  params: ParamsGetPublicationArticleForAdminIncludeContributor
  //
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<ArticleWithContributors>>,
    Error
  >({
    queryKey: queryKeys.listForAdminArticle,
    queryFn: () => GetPublicationArticleForAdminIncludeContributor(params),
  });
};

export async function GetPublicationArticleForAdminIncludeContributor(
  param: ParamsGetPublicationArticleForAdminIncludeContributor
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ArticleWithContributors>>
> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Article/paging-admin`;

  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
    acceptedForPublicationStatus: param.acceptedForPublicationStatus.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.idSearch) {
    queryParams.append("idSearch", param.idSearch);
  }
  if (param.nameSearch) {
    queryParams.append("nameSearch", param.nameSearch);
  }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;

  const response = await communityRequest<
    IDataResponseFromAPI<IListDataResponseFromAPI<ArticleWithContributors>>
  >(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ArticleWithContributors>
  >;
}
