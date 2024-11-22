import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ListPublicResearchTopic } from "./ListPublicResearchTopic";

const ListPublicResearchTopicWrapper = () => {
  return (
    <div>
      <Tabs defaultValue="isAcceptedForPublication" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="isAcceptedForPublication">
            Nhà trường phê duyệt
          </TabsTrigger>
          <TabsTrigger value="facultyAcceptedStatus">
            Khoa phê duyệt
          </TabsTrigger>
        </TabsList>
        <TabsContent value="isAcceptedForPublication">
          <ListPublicResearchTopic
            facultyAcceptedStatus={1}
            acceptedForPublicationStatus={1}
          />
        </TabsContent>
        <TabsContent value="facultyAcceptedStatus">
          <ListPublicResearchTopic
            facultyAcceptedStatus={1}
            acceptedForPublicationStatus={3}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export { ListPublicResearchTopicWrapper };
