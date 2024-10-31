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
};
export const useGetPublicationArticleForAdminIncludeContributor = (
  params: ParamsGetPublicationArticleForAdminIncludeContributor
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
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Article/paging-admin?index=${param.index}&pageSize=${param.pageSize}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<ArticleWithContributors>
  >;
}
