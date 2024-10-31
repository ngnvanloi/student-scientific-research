"use client";

import {
  ParamsGetPublicationArticleForAdminIncludeContributor,
  useGetPublicationArticleForAdminIncludeContributor,
} from "@/hooks-query/queries/use-get-article-for-super-admin";
import { ArticleWithContributors } from "@/types/ArticleWithContributor";
import { ArticleCardForAdmin } from "../ArticleCard/ArticleCard";

const PendingApprovalArticle = () => {
  const params: ParamsGetPublicationArticleForAdminIncludeContributor = {
    index: 1,
    pageSize: 100,
    idSearch: "",
    nameSearch: "",
  };
  const { data } = useGetPublicationArticleForAdminIncludeContributor(params);
  const listArticleUnpublished: ArticleWithContributors[] | undefined =
    data?.data.items.filter(
      (item) => item.isAcceptedForPublication === false
    ) || [];

  console.log(
    "checking list article unpulished for admin: ",
    listArticleUnpublished
  );

  return (
    <div>
      {listArticleUnpublished.map((article, index) => {
        return <ArticleCardForAdmin articleItem={article} key={index} />;
      })}
    </div>
  );
};
export { PendingApprovalArticle };
