"use client";

import { formatDate } from "@/helper/extension-function";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import {
  CalendarDateRangeIcon,
  FolderOpenIcon,
  IdentificationIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ModalShowDetailReviewProcessing } from "../Modal/ModalShowDetailReviewProcessing";
import { useState } from "react";
import { ModalShowDetailAcceptanceOfResearchTopic } from "../Modal/ModalShowDetailAcceptanceOfResearchTopic";
import { Button } from "antd";
import { ModalUpdateResearchTopicForAcceptance } from "../Modal/ModalUpdateResearchTopicForAcceptance";
import { ModalCreateAcceptance } from "../Modal/ModalCreateAcceptance";

interface IProps {
  researchTopic: ResearchTopicWithContributors | undefined;
}
const ResearchTopicCardForAdmin = (props: IProps) => {
  const { researchTopic } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="border rounded-md py-3 px-4 flex mb-3 gap-x-2">
      <div className="flex-1">
        <p className="font-semibold text-lg text-blue-900">
          {researchTopic?.nameTopic}
        </p>
        <p className="flex gap-2 mt-2">
          <FolderOpenIcon width={16} />
          {researchTopic?.disciplineName}
        </p>
        <p className="flex gap-2 mt-1">
          <IdentificationIcon width={16} />
          {researchTopic?.supervisor}
        </p>
        <p className="flex gap-2 mt-1">
          <CalendarDateRangeIcon width={16} />
          {formatDate(researchTopic?.review_Committees.dateStart || "") +
            " ->" +
            formatDate(researchTopic?.review_Committees.dateEnd || "")}
        </p>
      </div>
      <div
        className="hover:cursor-pointer hover:text-blue-500 gap-2 hover:underline mt-1"
        onClick={() => setIsOpen(true)}
      >
        Xem tình trạng phản biện
      </div>
      <ModalShowDetailReviewProcessing
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        researchTopic={researchTopic}
      />
    </div>
  );
};

const ResearchTopicCardForAuthorWithAcceptance = (props: IProps) => {
  const { researchTopic } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  return (
    <div className="border rounded-md py-3 px-4 flex mb-3 gap-x-2">
      <div className="flex-1">
        <p className="font-semibold text-lg text-blue-900">
          {researchTopic?.nameTopic}
        </p>
        <p className="flex gap-2 mt-2">
          <FolderOpenIcon width={16} />
          {researchTopic?.disciplineName}
        </p>
        <p className="flex gap-2 mt-1">
          <UserGroupIcon width={16} />
          {researchTopic?.author_ResearchTopics
            ?.map((author) => author.author.name)
            .join(", ")}
        </p>
        <p className="flex gap-2 mt-1">
          Nghiệm thu từ ngày:
          <CalendarDateRangeIcon width={16} />
          {formatDate(researchTopic?.dateStart || "") +
            " ->" +
            formatDate(researchTopic?.dateEnd || "")}
        </p>
      </div>
      <div className="flex flex-col">
        <Button
          className="hover:cursor-pointer hover:text-blue-500 gap-2 mt-1"
          onClick={() => setIsOpen(true)}
        >
          Đề xuất nghiệm thu
        </Button>
        <Button
          className="hover:cursor-pointer hover:text-blue-500 gap-2 mt-1"
          onClick={() => setIsModalUpdateOpen(true)}
        >
          Chỉnh sửa đề tài
        </Button>
        <Button
          className="hover:cursor-pointer hover:text-blue-500 gap-2 mt-1"
          onClick={() => setIsOpen(true)}
        >
          Gửi yêu cầu gia hạn
        </Button>
      </div>
      <ModalCreateAcceptance
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        researchTopic={researchTopic}
      />
      <ModalUpdateResearchTopicForAcceptance
        competitionId={researchTopic?.competitionId || 0}
        researchTopic={researchTopic}
        isOpen={isModalUpdateOpen}
        setIsOpen={setIsModalUpdateOpen}
      />
    </div>
  );
};
export { ResearchTopicCardForAdmin, ResearchTopicCardForAuthorWithAcceptance };
