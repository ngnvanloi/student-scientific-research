import { auth } from "@/auth";
import { OrganizerProfilePage } from "@/components/OrganizerProfilePage/OrganizerProfilePage";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Thông Tin Cá Nhân`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
export default function MyProfile() {
  return <OrganizerProfilePage />;
}
