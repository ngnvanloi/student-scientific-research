import { SignUpForm } from "@/components/FormSignUp/FormSignUp";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "HUIT SEMINAR- Đăng Kí Tài Khoản",
  description:
    "Khám phá và quản lý các hoạt động nghiên cứu khoa học tại Đại học Công Thương.",
};
const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
