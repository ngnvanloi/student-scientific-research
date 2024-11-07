"use client";
import { useGetVersionOfResearchProjectTopicDetail } from "@/hooks-query/queries/use-get-versions-of-research-topic-detail";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import * as Tabs from "@radix-ui/react-tabs";
import FormReviewTopic from "./FormReviewTopic";
interface IProps {
  researchTopicID: number;
}
const FormReviewResearchTopic = () => {
  // render số tab với các phiên bản bài báo
  const { data: versionOfResearch } =
    useGetVersionOfResearchProjectTopicDetail(1);
  console.log("checking version of research: ", versionOfResearch?.data);
  // với mỗi version, kiểm tra versionID và ReviewerID đã tồn tại trong bảng RevierForm chưa
  //    -> nếu chưa: hiển thị form phản biện
  //    -> ngược lại, hiển thị kết quả phản biện

  type TabItem = {
    icon: JSX.Element;
    name: string;
    contentElement: JSX.Element;
  };
  let tabItems: TabItem[] =
    versionOfResearch?.data.map((version, index) => {
      return {
        icon: <FolderOpenIcon width={"20px"} />,
        name: `version ${index + 1}`,
        contentElement: <FormReviewTopic version={version} />,
      };
    }) || [];

  return (
    <Tabs.Root
      className="max-w-screen-xl mx-auto px-4 md:px-8"
      defaultValue="Overview"
    >
      <Tabs.List
        className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
        aria-label="Manage your account"
      >
        {tabItems.map((item, idx) => (
          <Tabs.Trigger
            key={idx}
            className="group outline-none py-1.5 border-b-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
            value={item.name}
          >
            <div className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
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
export default FormReviewResearchTopic;
