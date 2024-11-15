"use client";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { ArticleCardForGuest } from "../ArticleCard/ArticleCard";
import {
  ParamsGetAllArticleForSystem,
  useGetAllArticleForSystem,
} from "@/hooks-query/queries/use-get-article-for-system";

const HomepageArticleList = () => {
  let params: ParamsGetAllArticleForSystem = {
    index: 1,
    pageSize: 10,
    nameSearch: "",
    idSearch: "",
  };
  const {
    data: listPublicArticle,
    refetch: refetchListPublicArticle,
    isPending,
  } = useGetAllArticleForSystem(params);

  console.log("Checking public articles: ", listPublicArticle?.data.items);
  return (
    <div className="">
      {isPending ? <SpinnerLoading /> : ""}
      {listPublicArticle?.data.items.map((article, index) => {
        return <ArticleCardForGuest articleItem={article} key={article.id} />;
      })}
    </div>
  );
};
export { HomepageArticleList };
