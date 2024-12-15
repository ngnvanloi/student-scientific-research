import { ArticlePageComponent } from "@/components/ArticlePage/ArticlePage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "HUIT SEMINAR - Bài Báo Khoa Học",
  description:
    "Khám phá và quản lý các hoạt động nghiên cứu khoa học tại Đại học Công Thương.",
};
const ArticlePage = () => {
  return (
    <div>
      <ArticlePageComponent />
    </div>
  );
};
export default ArticlePage;
