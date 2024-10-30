import { IDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";

export const useGetArticleDetail = (id: number) => {
  return useQuery<IDataResponseFromAPI<ArticleWithContributors>, Error>({
    queryKey: [queryKeys.articleDetail, id],
    queryFn: () => GetArticleDetail(id),
  });
};

export async function GetArticleDetail(
  id: number
): Promise<IDataResponseFromAPI<ArticleWithContributors>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Article?id=${id}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<ArticleWithContributors>;
}
