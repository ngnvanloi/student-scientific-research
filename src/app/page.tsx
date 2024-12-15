import { HomePage } from "@/components/HomePage/HomePage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "HUIT SEMINAR - Nền Tảng Nghiên Cứu Khoa Học Của Sinh Viên Trường Đại Học Công Thương TP Hồ Chí Minh",
  description:
    "Khám phá và quản lý các hoạt động nghiên cứu khoa học tại Đại học Công Thương.",
};
export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
