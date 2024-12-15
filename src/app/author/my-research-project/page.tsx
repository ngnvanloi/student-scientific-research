import { MyResearchTopic } from "@/components/MyResearchTopic/MyResearchTopic";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Đề Tài Nghiên Cứu Của Tôi`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const MyResearchTopicPage = () => {
  return <MyResearchTopic />;
};
export default MyResearchTopicPage;
