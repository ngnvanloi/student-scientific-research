"use client";
import { useGetArticleAuthorByPublicationNoneContributor } from "@/hooks-query/queries/use-get-article-for-author";
import { ArticleCardForAuthor } from "../ArticleCard/ArticleCard";
import { Article } from "@/types/Article";
import { Divider } from "antd";
import { useState } from "react";
import { ArticleManagementContext } from "../UseContextProvider/ArticleManagementContext";

const ArticleListContainerForAuthor = () => {
  const [isChange, setIsChange] = useState<boolean>(false);

  const { data } = useGetArticleAuthorByPublicationNoneContributor(true);
  const { data: dataa } =
    useGetArticleAuthorByPublicationNoneContributor(false);
  console.log(
    "checking useGetArticleAuthorByPublicationNoneContributor = true: ",
    data?.data
  );
  let listArticlePublic: Article[] | undefined = data?.data;
  let listArticleUnpublic: Article[] | undefined = dataa?.data;
  return (
    <ArticleManagementContext.Provider value={{ isChange, setIsChange }}>
      <div>
        <Divider style={{ borderColor: "#383838" }} orientation="left">
          Đã công bố
        </Divider>
        <div className="grid gap-x-5 gap-y-5 m:grid-cols-2 lg:grid-cols-3">
          {listArticlePublic?.map((article, index) => {
            return (
              <ArticleCardForAuthor
                key={index}
                articleItem={article}
                isAcceptedForPublication={true}
              />
            );
          })}
        </div>
        <Divider style={{ borderColor: "#383838" }} orientation="left">
          Chờ phê duyệt
        </Divider>
        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 mt-5">
          {listArticleUnpublic?.map((article, index) => {
            return (
              <ArticleCardForAuthor
                key={index}
                articleItem={article}
                isAcceptedForPublication={false}
              />
            );
          })}
        </div>
      </div>
    </ArticleManagementContext.Provider>
  );
};

export { ArticleListContainerForAuthor };
