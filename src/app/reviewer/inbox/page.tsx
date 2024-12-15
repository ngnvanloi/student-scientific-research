import { MailBoxContainer } from "@/components/Inbox/MyMailContainer";
import { SendingMessage } from "@/components/Inbox/SendingMessage";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Gửi Email`,
    description:
      "Người phản biện tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const ReviewerInboxPage = () => {
  // return <SendingMessage />;
  return <MailBoxContainer />;
};
export default ReviewerInboxPage;
