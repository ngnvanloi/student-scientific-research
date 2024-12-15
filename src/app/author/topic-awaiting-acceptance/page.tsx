import { TopicAwaitingAcceptanceForAuthor } from "@/components/TopicAwaitingAcceptance/TopicAwaitingAcceptance";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Trang Danh Sách Đề Tài Chờ Nghiệm Thu`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const TopicAwaitingAcceptancePage = () => {
  return (
    <div>
      <TopicAwaitingAcceptanceForAuthor />
    </div>
  );
};

export default TopicAwaitingAcceptancePage;
