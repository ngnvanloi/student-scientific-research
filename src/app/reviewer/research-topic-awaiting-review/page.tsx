import { ResearchTopicAwaitingReviewPageContainer } from "@/components/ResearchTopicAwaitingReviewPage/ResearchTopicAwaitingReviewPageContainer/ResearchTopicAwaitingReviewPageContainer";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Danh Sách Đề Tài Chờ Phản Biện`,
    description:
      "Người phản biện tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const ResearchTopicAwaitingReview = () => {
  return <ResearchTopicAwaitingReviewPageContainer />;
};
export default ResearchTopicAwaitingReview;
