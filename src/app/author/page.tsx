import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Cá Nhân`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const AuthorWorkSpace = () => {
  return <div>AuthorWorkSpace</div>;
};
export default AuthorWorkSpace;
