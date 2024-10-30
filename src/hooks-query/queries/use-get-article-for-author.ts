import {
  IDataRetrievedResponseFromAPI,
  IListDataResponseFromAPI,
} from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Article } from "@/types/Article";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";

// lấy bài báo đã public gồm bài không bao gồm danh sách tác giả
export const useGetAllArticleAuthor = () => {
  return useQuery<IDataRetrievedResponseFromAPI<Article>, Error>({
    queryKey: queryKeys.listAuthorArticle,
    queryFn: () => GetAllArticleAuthor(),
  });
};

export async function GetAllArticleAuthor(): Promise<
  IDataRetrievedResponseFromAPI<Article>
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Article/author`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataRetrievedResponseFromAPI<Article>;
}

// lấy bài báo đã public gồm bài ĐÃ bao gồm danh sách tác giả
export type ParamsGetPublictationArticleAuthor = {
  index: number;
  pageSize: number;
  nameSearch?: string;
  organizerName?: string;
};
// Hook để sử dụng useQuery cho việc lấy danh sách cuộc thi
export const useGetPublictationArticleAuthor = (
  params: ParamsGetPublictationArticleAuthor
) => {
  return useQuery<
    IDataRetrievedResponseFromAPI<
      IListDataResponseFromAPI<ArticleWithContributors>
    >,
    Error
  >({
    queryKey: queryKeys.listAuthorArticle,
    queryFn: () => GetPublictationArticleAuthor(params),
  });
};

export async function GetPublictationArticleAuthor(
  param: ParamsGetPublictationArticleAuthor
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
