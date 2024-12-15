import { ArticleListContainerForAuthor } from "@/components/ArticleList/ArticleList";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Bài Báo Khoa Học Của Tôi`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const MyArticlePage = () => {
  return (
    <div>
      <ArticleListContainerForAuthor />
    </div>
  );
};

export default MyArticlePage;
