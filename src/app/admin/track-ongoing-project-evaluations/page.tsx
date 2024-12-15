import { TopicsAreBeingAccepted } from "@/components/TopicsAreBeingAccepted/TopicIsBeingAccepted";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Danh Sách Đề Tài Đủ Điều Kiện Nghiệm Thu`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const TrackOngoingProjectEvaluationsPage = () => {
  return <TopicsAreBeingAccepted />;
};
export default TrackOngoingProjectEvaluationsPage;
