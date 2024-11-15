"use client";

import {
  ParamsGetPublicationArticleForAdminIncludeContributor,
  useGetPublicationArticleForAdminIncludeContributor,
} from "@/hooks-query/queries/use-get-article-for-super-admin";
import { ArticleCardForAdmin } from "../ArticleCard/ArticleCard";

const PendingApprovalArticle = () => {
  const params: ParamsGetPublicationArticleForAdminIncludeContributor = {
    index: 1,
    pageSize: 100,
    idSearch: "",
    nameSearch: "",
    acceptedForPublicationStatus: 0,
  };
  const { data: listPendingArticle } =
    useGetPublicationArticleForAdminIncludeContributor(params);

  return (
    <div>
      {listPendingArticle?.data.items.map((article, index) => {
        return <ArticleCardForAdmin articleItem={article} key={index} />;
      })}
    </div>
  );
};
export { PendingApprovalArticle };
