"use client";
import PostCard from "@/components/PostCard/PostCard";
import { useGetPosts } from "@/hooks-query/queries/use-get-posts";
import { Suspense } from "react";

const PostList = () => {
  const { data: posts, refetch: refetchPosts } = useGetPosts();

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
      {posts?.map((post, index) => {
        return <PostCard post={post} key={index} />;
      })}
    </div>
  );
};

export { PostList };
