"use client";
import { useGetVersionOfResearchProjectTopicDetail } from "@/hooks-query/queries/use-get-versions-of-research-topic-detail";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import * as Tabs from "@radix-ui/react-tabs";
import FormReviewTopic from "./FormReviewTopic";
import { ResearchProjectTopic } from "@/types/ResearchProjectTopic";
interface IProps {
  setFileVersionUrl: React.Dispatch<React.SetStateAction<string>>;
  researchTopicDetail: ResearchProjectTopic;
  accountID: number;
}
const TabsReviewForAllVersionOfResearchTopic = (props: IProps) => {
  const { setFileVersionUrl, researchTopicDetail, accountID } = props;
  console.log(
    " ===================> Version Research topic details: ",
    researchTopicDetail.history_Update_ResearchTopics
  );
  // render số tab với các phiên bản bài báo
  console.log(
    "checking version of research: ",
    researchTopicDetail.history_Update_ResearchTopics
  );

  type TabItem = {
    icon: JSX.Element;
    name: string;
    contentElement: JSX.Element;
    newFilePath: string;
  };
  let tabItems: TabItem[] =
    researchTopicDetail.history_Update_ResearchTopics.map((version, index) => {
      return {
        icon: <FolderOpenIcon width={"20px"} />,
        name: `version ${index + 1}`,
        contentElement: (
          <FormReviewTopic
            version={version}
            accountID={accountID}
            researchTopicID={researchTopicDetail.id}
          />
        ),
        newFilePath: version.newReportFilePath,
      };
    }) || [];

  return (
    <Tabs.Root
      className="max-w-screen-xl mx-auto px-4 md:px-8"
      orientation="vertical"
    >
      <Tabs.List
        className="w-full border-b flex items-center gap-x-3 overflow-x-auto scrollbar-hide text-sm"
        aria-label="Manage your account"
      >
        {tabItems.map((item, idx) => (
          <Tabs.Trigger
            key={idx}
            className="group outline-none py-1.5 border-b-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
            value={item.name}
            onClick={() => setFileVersionUrl(`${item.newFilePath}`)}
          >
            <div className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium whitespace-nowrap">
              {item.icon}
              {item.name}
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabItems.map((item, idx) => (
        <Tabs.Content key={idx} className="py-6" value={item.name}>
          {item.contentElement}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
export default TabsReviewForAllVersionOfResearchTopic;
