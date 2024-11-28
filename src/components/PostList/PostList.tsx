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
import { Divider, Input, Pagination } from "antd";
// import { useGetPosts } from "@/hooks-query/queries/use-get-posts";
import { useEffect, useState } from "react";
import PostContextMenu from "../ContextMenu/ContextMenu";
import { usePostManagementContext } from "../UseContextProvider/PostManagementContext";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { useGetListPostForOrganizer } from "@/hooks-query/queries/use-get-posts-for-organizer";

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [nameSearch, setNameSearch] = useState<string>("");

  let params: ParamsGetListPost = {
    index: currentPage,
    pageSize,
    idSearch: "",
    nameSearch: nameSearch,
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
        <div className="mt-3">
          <Input
            type="text"
            placeholder="Nhập bài viết cần tìm kiếm..."
            className="h-10"
            value={nameSearch}
            onChange={(e) => {
              setNameSearch(e.target.value);
              refetchPosts();
            }}
          />
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
    pageSize: 100,
  };
  // USE PROVIDER CONTEXT
  const { isChange, setIsChange } = usePostManagementContext();

  // REACT QUERY - GET POSTS
  const { data, refetch } = useGetListPostForOrganizer(params);

  // REFETCH POSTS
  useEffect(() => {
    refetch();
  }, [isChange]);

  // RENDER UI
  return (
    <div className="w-full mt-3">
      <div className="mt-12 grid gap-4 divide-y md:grid-cols-2 md:divide-y-0 lg:grid-cols-3">
        {data?.data.items?.map((item, idx) => (
          <PostContextMenu post={item}>
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
