import { PendingApprovalArticle } from "@/components/PendingApprovalArticle/PendingApprovalArticle";
export const metadata = {
  title: "Quản Trị Viên - Trang Phê Duyệt Bài Báo",
  description: "Quản lý toàn bộ hệ thống nghiên cứu khoa học của nhà trường.",
};
const PendingApprovalArticlePage = () => {
  return (
    <div>
      <PendingApprovalArticle />
    </div>
  );
};
export default PendingApprovalArticlePage;
