import { ResetPassword } from "@/components/ResetPassword/ResetPassword";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Cập Nhật Mật Khẩu`,
    description:
      "Người phản biện tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const ResetPasswordPage = () => {
  return (
    <div>
      <ResetPassword />
    </div>
  );
};
export default ResetPasswordPage;
