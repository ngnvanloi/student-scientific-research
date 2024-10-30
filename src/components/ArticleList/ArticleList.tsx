"use client";
import { useGetAllArticleAuthor } from "@/hooks-query/queries/use-get-article-for-author";
import { ArticleCardForAuthor } from "../ArticleCard/ArticleCard";
import { Article } from "@/types/Article";

const ArticleListContainerForAuthor = () => {
  const { data } = useGetAllArticleAuthor();
  console.log("checking useGetAllArticleAuthor: ", data?.data);
  let listArticle: Article[] | undefined = data?.data;
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {listArticle?.map((article, index) => {
        return <ArticleCardForAuthor key={index} articleItem={article} />;
      })}
    </div>
  );
};

export { ArticleListContainerForAuthor };
