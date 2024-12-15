import { ProjectReviewerAssignmentPageContainer } from "@/components/ProjectReviewerAssignmentPageContainer/ProjectReviewerAssignmentPageContainer";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Phân Công Phản Biện Đề Tài`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const ProjectReviewerAssignmentPage = () => {
  return <ProjectReviewerAssignmentPageContainer />;
};
export default ProjectReviewerAssignmentPage;
