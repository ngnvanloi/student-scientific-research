"use client";
import { ArticleCardForGuest } from "../ArticleCard/ArticleCard";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { Input, Pagination } from "antd";
import { useState } from "react";
import {
  ParamsGetAllArticleForSystem,
  useGetAllArticleForSystem,
} from "@/hooks-query/queries/use-get-article-for-system";

const ArticlePageComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [nameSearch, setNameSearch] = useState<string>("");

  const params: ParamsGetAllArticleForSystem = {
    index: currentPage,
    pageSize,
    idSearch: "",
    nameSearch: nameSearch,
  };

  const {
    data: listPublicArticle,
    refetch: refetchListPublicArticle,
    isPending,
  } = useGetAllArticleForSystem(params);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5);
    refetchListPublicArticle(); // Refetch khi đổi trang
  };

  return (
    <div>
      {isPending ? <SpinnerLoading /> : null}
      <div>
        <Input
          type="text"
          placeholder="Nhập bài báo cần tìm kiếm..."
          className="h-10"
          value={nameSearch}
          onChange={(e) => {
            setNameSearch(e.target.value);
            refetchListPublicArticle();
          }}
        />
      </div>
      <div className="mt-3">
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
