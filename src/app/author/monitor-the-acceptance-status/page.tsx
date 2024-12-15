import { MonitorTheAcceptanceStatus } from "@/components/MonitorTheAcceptanceStatus/MonitorTheAcceptanceStatus";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Trang Theo Dõi Tình Trạng Phê Duyệt Nghiệm Thu`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const MonitorTheAcceptanceStatusPage = () => {
  return <MonitorTheAcceptanceStatus />;
};
export default MonitorTheAcceptanceStatusPage;
