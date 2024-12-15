import { AdminPostPageComponent } from "@/components/AdminPageContainer/AdminPostPageComponent";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Quản Lý Bài Viết`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const AdminPostPage = () => {
  return <AdminPostPageComponent />;
};
export default AdminPostPage;
