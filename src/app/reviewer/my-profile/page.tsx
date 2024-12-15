import { auth } from "@/auth";
import { ReviewerProfilePage } from "@/components/ReviewerProfilePage/ReviewerProfilePage";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Thông Tin Cá Nhân`,
    description:
      "Người phản biện tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
export default function MyProfile() {
  return <ReviewerProfilePage />;
}
