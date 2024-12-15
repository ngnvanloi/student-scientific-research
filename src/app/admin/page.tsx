import { StatisticalPageForOrganizer } from "@/components/StatisticalPageForOrganizer/StatisticalPageForOrganizer";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Tổng Quan`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}

const AdminWorkSpacePage = () => {
  return <StatisticalPageForOrganizer />;
};
export default AdminWorkSpacePage;
