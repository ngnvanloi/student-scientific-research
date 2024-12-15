import { LoginForm } from "@/components/FormLogin/LoginForm";
import { getProfile } from "@/hooks-query/queries/use-get-user-profile";
import { authenticate } from "@/lib/actions";
import { setAuthToken } from "@/web-configs/community-api";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "HUIT SEMINAR - Trang Đăng Nhập",
  description:
    "Khám phá và quản lý các hoạt động nghiên cứu khoa học tại Đại học Công Thương.",
};
const LoginPage = () => {
  return <LoginForm />;
};
export default LoginPage;
