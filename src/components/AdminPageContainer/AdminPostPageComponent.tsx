"use client";

import { useState } from "react";
import { PostManagementContext } from "../UseContextProvider/PostManagementContext";
import { ModalAddNewPost } from "../Modal/ModalAddNewPost";
import { PostListForAdmin } from "../PostList/PostList";

const AdminPostPageComponent = () => {
  const [isChange, setIsChange] = useState<boolean>(false);
  return (
    <PostManagementContext.Provider value={{ isChange, setIsChange }}>
      <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
        <ModalAddNewPost />
        <div className="max-w-lg mt-3">
          <h1 className="text-3xl text-gray-800 font-semibold">
            Quản lý bài viết
          </h1>
          <p className="mt-3 text-gray-500">
            Công cụ tuyệt vời để cập nhật những thông tin liên quan đến quá
            trình tổ chức, quản lý và điều hành cuộc thi đến toàn thể sinh viên
            và người phản biện.
          </p>
        </div>
        <PostListForAdmin />
      </section>
    </PostManagementContext.Provider>
  );
};
export { AdminPostPageComponent };
