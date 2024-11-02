"use client";
import {
  ParamsGetPublicationArticleAuthorIncludeContributor,
  useGetPublicationArticleAuthorIncludeContributor,
} from "@/hooks-query/queries/use-get-article-for-author";
import { ArticleCardForGuest } from "../ArticleCard/ArticleCard";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { Pagination } from "antd";
import { useState } from "react";

const ArticlePageComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const params: ParamsGetPublicationArticleAuthorIncludeContributor = {
    index: currentPage,
    pageSize,
    nameSearch: "",
    organizerName: "",
  };

  const {
    data: listPublicArticle,
    refetch: refetchListPublicArticle,
    isPending,
  } = useGetPublicationArticleAuthorIncludeContributor(params);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5);
    refetchListPublicArticle(); // Refetch khi đổi trang
  };

  return (
    <div>
      <div className="">
        {isPending ? <SpinnerLoading /> : null}
        {listPublicArticle?.data.items.map((article) => (
          <ArticleCardForGuest articleItem={article} key={article.id} />
        ))}
      </div>
      <div className="mt-5">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          align="center"
          total={listPublicArticle?.data.totalCount || 0} // Tổng số bài báo
          onChange={handlePageChange}
          showSizeChanger
          style={{ textAlign: "center" }}
        />
      </div>
    </div>
  );
};

export { ArticlePageComponent };
