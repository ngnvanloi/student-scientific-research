import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingAssignmentResearchTopic } from "../ListResearchTopicForEachCompetition/PendingAssignmentResearchTopic";
const ProjectReviewerAssignmentPageContainer = () => {
  // chia là 2 tab: đã phân công và chưa phân công phản biện cho đề tài
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pending">Chưa phân công</TabsTrigger>
        <TabsTrigger value="accept">Đã phân công</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <PendingAssignmentResearchTopic reviewCommitteeId={-1} />
      </TabsContent>
      <TabsContent value="accept">
        <PendingAssignmentResearchTopic reviewCommitteeId={1} />
      </TabsContent>
    </Tabs>
  );
};
export { ProjectReviewerAssignmentPageContainer };
