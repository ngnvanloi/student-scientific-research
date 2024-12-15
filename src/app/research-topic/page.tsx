import { ResearchTopicForSystem } from "@/components/ResearchTopicForSystem/ResearchTopicForSystem";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "HUIT SEMINAR - Đề Tài Nghiên Cứu Khoa Học",
  description:
    "Khám phá và quản lý các hoạt động nghiên cứu khoa học tại Đại học Công Thương.",
};
const ResearchTopicForSystemPage = () => {
  return <ResearchTopicForSystem />;
};
export default ResearchTopicForSystemPage;
