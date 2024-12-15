import { CompetitionList } from "@/components/CompetitionList/CompetitionList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "HUIT SEMINAR- Danh Sách Cuộc Thi",
  description:
    "Khám phá và quản lý các hoạt động nghiên cứu khoa học tại Đại học Công Thương.",
};
const CompetitionPage = () => {
  return <CompetitionList />;
};

export default CompetitionPage;
