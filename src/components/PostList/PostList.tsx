"use client";
import PostCard, { PostCardForAdmin } from "@/components/PostCard/PostCard";
import {
  GetListPost,
  ParamsGetListPost,
  useGetListPost,
} from "@/hooks-query/queries/use-get-posts";
import { Divider } from "antd";
// import { useGetPosts } from "@/hooks-query/queries/use-get-posts";
import { Suspense, useEffect, useState } from "react";
import PostContextMenu from "../ContextMenu/ContextMenu";
import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks-query/queries/query-keys";
import { usePostManagementContext } from "../UseContextProvider/PostManagementContext";

const PostList = () => {
  let params: ParamsGetListPost = {
    index: 1,
    pageSize: 8,
  };
  const { data: posts, refetch: refetchPosts } = useGetListPost(params);

  return (
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
export { PostList, PostListForAdmin };
