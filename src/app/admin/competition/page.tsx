import { AdminCompetitionPageComponent } from "@/components/AdminPageContainer/AdminCompetitionPageComponent";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Quản Lý Cuộc Thi`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const AdminCompetitionPage = () => {
  return (
    <div>
      <AdminCompetitionPageComponent />
    </div>
  );
};
export default AdminCompetitionPage;
