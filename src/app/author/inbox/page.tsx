import { MailBoxContainer } from "@/components/Inbox/MyMailContainer";
import { SendingMessage } from "@/components/Inbox/SendingMessage";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Gửi Email`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const AuthorInboxPage = () => {
  // return <SendingMessage />;
  return <MailBoxContainer />;
};
export default AuthorInboxPage;
