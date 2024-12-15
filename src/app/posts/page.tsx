import { ModalAddNewPost } from "@/components/Modal/ModalAddNewPost";
import { PostList } from "@/components/PostList/PostList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "HUIT SEMINAR- Thông Báo, Bài Viết Nổi Bật",
  description:
    "Khám phá và quản lý các hoạt động nghiên cứu khoa học tại Đại học Công Thương.",
};
const PostPage = () => {
  return (
    <>
      <PostList />
    </>
  );
};

export default PostPage;
