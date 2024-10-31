"use client";

import {
  ParamsGetPublicationArticleForAdminIncludeContributor,
  useGetPublicationArticleForAdminIncludeContributor,
} from "@/hooks-query/queries/use-get-article-for-super-admin";

const PendingApprovalArticle = () => {
  const params: ParamsGetPublicationArticleForAdminIncludeContributor = {
    index: 1,
    pageSize: 100,
    idSearch: "",
    nameSearch: "",
  };
  const { data } = useGetPublicationArticleForAdminIncludeContributor(params);
  console.log("checking list article for admin: ", data);
  return <div>PendingApprovalArticle</div>;
};
export { PendingApprovalArticle };
