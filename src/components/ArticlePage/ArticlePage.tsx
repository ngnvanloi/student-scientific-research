"use client";
import {
  ParamsGetPublicationArticleAuthorIncludeContributor,
  useGetPublicationArticleAuthorIncludeContributor,
} from "@/hooks-query/queries/use-get-article-for-author";
import { ArticleCardForGuest } from "../ArticleCard/ArticleCard";

const ArticlePageComponent = () => {
  let params: ParamsGetPublicationArticleAuthorIncludeContributor = {
    index: 1,
    pageSize: 100,
    nameSearch: "",
    organizerName: "",
  };
  const { data: listPublicArticle, refetch: refetchListPublicArticle } =
    useGetPublicationArticleAuthorIncludeContributor(params);

  console.log("Checking public articles: ", listPublicArticle?.data.items);
  return (
    <div className="">
      {listPublicArticle?.data.items.map((article, index) => {
        return <ArticleCardForGuest articleItem={article} key={article.id} />;
      })}
    </div>
  );
};
export { ArticlePageComponent };
