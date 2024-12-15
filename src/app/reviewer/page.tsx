import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Trang Tổng Quan`,
    description:
      "Người phản biện tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const ReviewerWorkSpace = () => {
  return <div>ReviewerWorkSpace</div>;
};
export default ReviewerWorkSpace;
