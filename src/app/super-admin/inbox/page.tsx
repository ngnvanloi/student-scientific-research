import { MailBoxContainer } from "@/components/Inbox/MyMailContainer";
import { SendingMessage } from "@/components/Inbox/SendingMessage";
export const metadata = {
  title: "Quản Trị Viên - Gửi Email",
  description: "Quản lý toàn bộ hệ thống nghiên cứu khoa học của nhà trường.",
};
const SuperAdminInboxPage = () => {
  // return <SendingMessage />;
  return <MailBoxContainer />;
};
export default SuperAdminInboxPage;
