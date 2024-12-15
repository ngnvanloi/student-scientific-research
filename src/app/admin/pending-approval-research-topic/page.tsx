import { PendingApprovalTopicPageComponent } from "@/components/ListRegistrationForEachCompetition/PendingApprovalResearchTopicPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Phê Duyệt Đề Tài`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const PendingApprovalTopicPage = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Chờ phê duyệt</TabsTrigger>
          <TabsTrigger value="accept">Chấp nhận</TabsTrigger>
          <TabsTrigger value="reject">Từ chối</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PendingApprovalTopicPageComponent isAccepted={0} />
        </TabsContent>
        <TabsContent value="accept">
          <PendingApprovalTopicPageComponent isAccepted={1} />
        </TabsContent>
        <TabsContent value="reject">
          <PendingApprovalTopicPageComponent isAccepted={2} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default PendingApprovalTopicPage;
