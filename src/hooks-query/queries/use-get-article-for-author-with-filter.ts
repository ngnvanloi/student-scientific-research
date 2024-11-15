import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";

export type ParamsGetAllArticleForAuthorWithFilter = {
  index: number;
  pageSize: number;
  idSearch?: string;
  nameSearch?: string;
  acceptedForPublicationStatus: number;
  roleName?: string;
};
export const useGetAllArticleForAuthorWithFilter = (
  params: ParamsGetAllArticleForAuthorWithFilter
  //
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<ArticleWithContributors>>,
    Error
  >({
    queryKey: queryKeys.listForAdminArticle,
    queryFn: () => GetAllArticleForAuthorWithFilter(params),
  });
};

export async function GetAllArticleForAuthorWithFilter(
  param: ParamsGetAllArticleForAuthorWithFilter
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ArticleWithContributors>>
> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Article/paging-author`;
  //
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
    acceptedForPublicationStatus: param.acceptedForPublicationStatus.toString(),
  });

  // Thêm roleName nếu có giá trị
  if (param.roleName) {
    queryParams.append("roleName", param.roleName);
  }

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
