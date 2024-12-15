import { SubmitArticleComponent } from "@/components/SubmitArticle/SubmitArticle";
import { Fragment } from "react";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Trang Gửi Yêu Cầu Đăng Tải Bài Báo`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const SubmitArticlePage = () => {
  return (
    <Fragment>
      <SubmitArticleComponent />
    </Fragment>
  );
};

export default SubmitArticlePage;
