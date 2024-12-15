import { TrackOngoingProjectEvaluations } from "@/components/TrackOngoingProjectEvaluations/TrackOngoingProjectEvaluations";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Phê Duyệt Nghiệm Thu`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const AcceptancePendingApprovalPage = () => {
  return <TrackOngoingProjectEvaluations />;
};
export default AcceptancePendingApprovalPage;
