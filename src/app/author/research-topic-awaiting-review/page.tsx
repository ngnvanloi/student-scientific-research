import { TopicAwaitingReviewPageContainer } from "@/components/TopicAwaitingReviewPage/TopicAwaitingReviewPageContainer/TopicAwaitingReviewPageContainer";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Trang Theo Dõi Phản Biện Đề Tài`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const TopicAwaitingReviewPage = () => {
  return <TopicAwaitingReviewPageContainer />;
};
export default TopicAwaitingReviewPage;
