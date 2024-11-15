"use client";
import { ArticleCardForAuthor } from "../ArticleCard/ArticleCard";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { ArticleManagementContext } from "../UseContextProvider/ArticleManagementContext";
import {
  ParamsGetAllArticleForAuthorWithFilter,
  useGetAllArticleForAuthorWithFilter,
} from "@/hooks-query/queries/use-get-article-for-author-with-filter";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";

const ArticleListContainerForAuthor = () => {
  const [isChange, setIsChange] = useState<boolean>(false);
  let params: ParamsGetAllArticleForAuthorWithFilter = {
    index: 1,
    pageSize: 100,
    acceptedForPublicationStatus: 3,
    roleName: "author",
  };
  const { data: listArticle, refetch } =
    useGetAllArticleForAuthorWithFilter(params);

  console.log(
    "checking list article for author: ",
    JSON.stringify(listArticle, null, 2)
  );

  // Lọc các bài báo dựa trên trạng thái phê duyệt
  let pendingArticles: ArticleWithContributors[] | undefined =
    listArticle?.data.items.filter(
      (article) => article.acceptedForPublicationStatus === 0
    );

  let approvedArticles: ArticleWithContributors[] | undefined =
    listArticle?.data.items.filter(
      (article) => article.acceptedForPublicationStatus === 1
    );

  let rejectedArticles: ArticleWithContributors[] | undefined =
    listArticle?.data.items.filter(
      (article) => article.acceptedForPublicationStatus === 2
    );

  // refetch data
  useEffect(() => {
    refetch();
  }, [isChange]);

  // render UI
  return (
    <ArticleManagementContext.Provider value={{ isChange, setIsChange }}>
      <div>
        <Divider style={{ borderColor: "#383838" }} orientation="left">
          Đã công bố
        </Divider>
        <div className="grid gap-x-5 gap-y-5 m:grid-cols-2 lg:grid-cols-3">
          {approvedArticles?.map((article, index) => {
            return (
              <ArticleCardForAuthor
                key={index}
                articleItem={article}
                isAcceptedForPublication={1}
              />
            );
          })}
        </div>
        <Divider style={{ borderColor: "#383838" }} orientation="left">
          Chờ phê duyệt
        </Divider>
        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 mt-5">
          {pendingArticles?.map((article, index) => {
            return (
              <ArticleCardForAuthor
                key={index}
                articleItem={article}
                isAcceptedForPublication={0}
              />
            );
          })}
        </div>
        <Divider style={{ borderColor: "#383838" }} orientation="left">
          Từ chối
        </Divider>
        <div className="grid gap-x-5 gap-y-5 m:grid-cols-2 lg:grid-cols-3">
          {rejectedArticles?.map((article, index) => {
            return (
              <ArticleCardForAuthor
                key={index}
                articleItem={article}
                isAcceptedForPublication={2}
              />
            );
          })}
        </div>
      </div>
    </ArticleManagementContext.Provider>
  );
};

export { ArticleListContainerForAuthor };
