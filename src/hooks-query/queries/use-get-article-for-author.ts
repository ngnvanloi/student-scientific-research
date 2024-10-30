import {
  IDataRetrievedResponseFromAPI,
  IListDataResponseFromAPI,
} from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Article } from "@/types/Article";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";

// lấy bài báo phân loại theo publication, không bao gồm danh sách tác giả
export const useGetArticleAuthorByPublicationNoneContributor = (
  isAcceptedForPublication: boolean
) => {
  return useQuery<IDataRetrievedResponseFromAPI<Article>, Error>({
    queryKey: [queryKeys.listAuthorArticle, isAcceptedForPublication],
    queryFn: () =>
      GetArticleAuthorByPublicationNoneContributor(isAcceptedForPublication),
  });
};

export async function GetArticleAuthorByPublicationNoneContributor(
  isAcceptedForPublication: boolean
): Promise<IDataRetrievedResponseFromAPI<Article>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Article/author?isAcceptedForPublication=${isAcceptedForPublication}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataRetrievedResponseFromAPI<Article>;
}

// lấy bài báo đã public ĐÃ bao gồm danh sách đồng tác giả
export type ParamsGetPublicationArticleAuthorIncludeContributor = {
  index: number;
  pageSize: number;
  nameSearch?: string;
  organizerName?: string;
};
export const useGetPublicationArticleAuthorIncludeContributor = (
  params: ParamsGetPublicationArticleAuthorIncludeContributor
) => {
  return useQuery<
    IDataRetrievedResponseFromAPI<
      IListDataResponseFromAPI<ArticleWithContributors>
    >,
    Error
  >({
    queryKey: queryKeys.listAuthorArticle,
    queryFn: () => GetPublicationArticleAuthorIncludeContributor(params),
  });
};

export async function GetPublicationArticleAuthorIncludeContributor(
  param: ParamsGetPublicationArticleAuthorIncludeContributor
): Promise<
  IDataRetrievedResponseFromAPI<
    IListDataResponseFromAPI<ArticleWithContributors>
  >
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Article/paging-user?index=${param.index}&pageSize=${param.pageSize}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataRetrievedResponseFromAPI<
    IListDataResponseFromAPI<ArticleWithContributors>
  >;
}
