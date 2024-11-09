"use client";

import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import { FolderOpenIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface IProps {
  researchTopic: ResearchTopicWithContributors;
  isAssignment: boolean;
}
const ResearchTopicComponentForAdmin = (props: IProps) => {
  const { researchTopic, isAssignment } = props;
  return (
    <div className="flex gap-3 border p-3 mb-2">
      <div>
        <span className="block text-sm font-bold text-blue-900">
          {researchTopic.nameTopic}
        </span>
        <span className="flex gap-2 text-sm text-gray-600 mt-2">
          <UserGroupIcon width={20} />
          Nhóm tác giả:{" "}
          {researchTopic.coAuthors?.map((item) => item.name).join(", ")}
        </span>
        <p className="text-sm text-gray-600 mt-3 flex gap-2">
          <FolderOpenIcon width={20} /> {researchTopic.disciplineName}
        </p>
      </div>
      <div>{isAssignment ? <p>Đã phân công</p> : <p>Chưa phân công</p>}</div>
    </div>
  );
};
export { ResearchTopicComponentForAdmin };
