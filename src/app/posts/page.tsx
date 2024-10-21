import { ModalAddNewPost } from "@/components/Modal/ModalAddNewPost";
import { PostList } from "@/components/PostList/PostList";
import { useSession } from "next-auth/react";

const PostPage = () => {
  return (
    <>
      <ModalAddNewPost />
      {/* <PostList /> */}
    </>
  );
};

export default PostPage;
