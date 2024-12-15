import { auth } from "@/auth";
import { AuthorProfilePage } from "@/components/AuthorProfilePage/AuthorProfilePage";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Trang Thông Tin Cá Nhân`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
export default function MyProfile() {
  return <AuthorProfilePage />;
}
