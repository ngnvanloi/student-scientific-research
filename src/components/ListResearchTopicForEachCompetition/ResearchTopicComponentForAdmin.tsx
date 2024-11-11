"use client";

import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import { FolderOpenIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Button } from "antd";
import { useState } from "react";
import { ModalReviewAssignment } from "../Modal/ModalReviewAssignment";

interface IProps {
  researchTopic: ResearchTopicWithContributors;
  reviewCommitteeId: number;
}
const ResearchTopicComponentForAdmin = (props: IProps) => {
  const { researchTopic, reviewCommitteeId } = props;
  const [toggleModalAssignment, setToggleModalAssignment] =
    useState<boolean>(false);

  return (
    <div className="flex gap-3 border p-3 mb-2 justify-between">
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
      <div>
        {reviewCommitteeId === 1 ? (
          <div className="flex flex-col gap-2">
            <p>Đã phân công: {researchTopic.review_CommitteeId}</p>
            <Button onClick={() => setToggleModalAssignment(true)}>
              Thay đổi
            </Button>
          </div>
        ) : (
          <Button onClick={() => setToggleModalAssignment(true)}>
            Phân công
          </Button>
        )}
        <ModalReviewAssignment
          isOpen={toggleModalAssignment}
          setIsOpen={setToggleModalAssignment}
          competitionId={researchTopic.competitionId || 0}
          researchTopic={researchTopic}
        />
      </div>
    </div>
  );
};
export { ResearchTopicComponentForAdmin };
