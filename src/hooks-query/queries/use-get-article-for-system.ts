import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";

// lấy bài báo đã public ĐÃ bao gồm danh sách đồng tác giả
export type ParamsGetAllArticleForSystem = {
  index: number;
  pageSize: number;
  idSearch?: string;
  nameSearch?: string;
};
export const useGetAllArticleForSystem = (
  params: ParamsGetAllArticleForSystem
  //
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<ArticleWithContributors>>,
    Error
  >({
    queryKey: queryKeys.listForAdminArticle,
    queryFn: () => GetAllArticleForSystem(params),
  });
};

export async function GetAllArticleForSystem(
  param: ParamsGetAllArticleForSystem
): Promise<
  IDataResponseFromAPI<IListDataResponseFromAPI<ArticleWithContributors>>
> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Article/paging-system`;
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.idSearch) {
    queryParams.append("idSearch", param.idSearch);
  }
  if (param.nameSearch) {
    queryParams.append("nameSearch", param.nameSearch);
  }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;
  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });

  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ArticleWithContributors>
  >;
}
