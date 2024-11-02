"use client";
import PostCard, {
  PostCardForAdmin,
  PostCardForHomepage,
} from "@/components/PostCard/PostCard";
import {
  GetListPost,
  ParamsGetListPost,
  useGetListPost,
} from "@/hooks-query/queries/use-get-posts";
import { Divider, Pagination } from "antd";
// import { useGetPosts } from "@/hooks-query/queries/use-get-posts";
import { Suspense, useEffect, useState } from "react";
import PostContextMenu from "../ContextMenu/ContextMenu";
import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks-query/queries/query-keys";
import { usePostManagementContext } from "../UseContextProvider/PostManagementContext";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  let params: ParamsGetListPost = {
    index: currentPage,
    pageSize,
  };
  const {
    data: posts,
    refetch: refetchPosts,
    isPending,
  } = useGetListPost(params);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 3);
    refetchPosts(); // Refetch khi đổi trang
  };
  return (
    <div>
      {isPending ? <SpinnerLoading /> : ""}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 pb-28">
        <div className="max-w-md">
          <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl">
            Xem thông báo
          </h1>
          <p className="text-gray-600 mt-2">
            We're currently looking talent software engineers, and designers to
            help us in our missions and to grow up.
          </p>
        </div>
        {posts?.data.items?.map((post, index) => {
          return (
            <div>
              <PostCard post={post} key={index} />
              <Divider style={{ borderColor: "#ccc" }} />
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          align="center"
          total={posts?.data.totalCount || 0} // Tổng số bài báo
          onChange={handlePageChange}
          showSizeChanger
          style={{ textAlign: "center" }}
        />
      </div>
    </div>
  );
};

const PostListForAdmin = () => {
  // PARAMS
  let params: ParamsGetListPost = {
    index: 1,
    pageSize: 8,
  };
  // USE PROVIDER CONTEXT
  const { isChange, setIsChange } = usePostManagementContext();

  // REACT QUERY - GET POSTS
  const { data, refetch } = useGetListPost(params);

  // REFETCH POSTS
  useEffect(() => {
    refetch();
  }, [isChange]);

  // RENDER UI
  return (
    <div className="w-full mt-3">
      <div className="mt-12 grid gap-4 divide-y md:grid-cols-2 md:divide-y-0 lg:grid-cols-3">
        {data?.data.items?.map((item, idx) => (
          <PostContextMenu postID={item.id}>
            <PostCardForAdmin key={idx} post={item} />
          </PostContextMenu>
        ))}
      </div>
    </div>
  );
};
const PostListForHomepage = () => {
  // PARAMS
  let params: ParamsGetListPost = {
    index: 1,
    pageSize: 5,
  };

  // REACT QUERY - GET POSTS
  const { data, refetch } = useGetListPost(params);

  // RENDER UI
  return (
    <div className="w-full mt-3 divide-y md:divide-y-0 flex flex-col gap-3">
      {data?.data.items?.map((item, idx) => (
        <PostCardForHomepage key={idx} post={item} />
      ))}
    </div>
  );
};
export { PostList, PostListForAdmin, PostListForHomepage };
