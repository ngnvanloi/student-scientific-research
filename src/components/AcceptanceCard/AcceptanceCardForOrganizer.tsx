"use client";
import { formatDate } from "@/helper/extension-function";
import { Acceptance } from "@/types/Acceptance";
import {
  CalendarDateRangeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Button, Tag } from "antd";
import { useState } from "react";
import { ModalUpdateAcceptance } from "../Modal/ModalUpdateAcceptance";
import { ModalShowDetailAcceptanceOfResearchTopic } from "../Modal/ModalShowDetailAcceptanceOfResearchTopic";
import { ModalApprovedAcceptanceForOrganizer } from "../Modal/ModalApprovedAcceptanceForOrganizer";

interface IProps {
  acceptance: Acceptance | undefined;
}
const AcceptanceCardForOrganizer = (props: IProps) => {
  const { acceptance } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  return (
    <div className="border rounded-md py-3 px-4 flex mb-3 gap-x-2 border-l-4 border-l-blue-900">
      <div className="flex-1">
        <p className="font-semibold text-lg text-blue-900">
          {acceptance?.name}
        </p>
        <p className="flex gap-2 mt-1 items-center">
          <UserGroupIcon width={20} />
          {acceptance?.researchTopic?.author_ResearchTopics
            ?.map((author) => author.author.name)
            .join(", ")}
        </p>
        <p className="flex gap-2 mt-1 items-center">
          <CalendarDateRangeIcon width={20} />
          {formatDate(acceptance?.dateAcceptance || "")}
        </p>
        <div className="flex mt-3">
          <div>
            <Tag
              color={
                acceptance?.facultyAcceptedStatus === 1
                  ? "blue"
                  : acceptance?.facultyAcceptedStatus === 2
                    ? "volcano"
                    : "yellow"
              }
              key={1}
            >
              {acceptance?.facultyAcceptedStatus === 1
                ? "Phê duyệt bởi cấp Khoa"
                : acceptance?.facultyAcceptedStatus === 2
                  ? "Đã bị từ chối bởi cấp Khoa"
                  : "Đang chờ Khoa phê duyệt"}
            </Tag>
          </div>
          <div>
            <Tag
              color={
                acceptance?.acceptedForPublicationStatus === 1
                  ? "blue"
                  : acceptance?.acceptedForPublicationStatus === 2
                    ? "volcano"
                    : "yellow"
              }
              key={1}
            >
              {acceptance?.acceptedForPublicationStatus === 1
                ? "Phê duyệt bởi cấp Trường"
                : acceptance?.acceptedForPublicationStatus === 2
                  ? "Đã bị từ chối bởi cấp Trường"
                  : "Đang chờ Nhà trường phê duyệt"}
            </Tag>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Button
          className="hover:cursor-pointer hover:text-blue-500 gap-2 mt-1"
          onClick={() => setIsOpen(true)}
        >
          Xem chi tiết
        </Button>
        {acceptance?.facultyAcceptedStatus === 1 ? (
          ""
        ) : (
          <>
            <Button
              className="hover:cursor-pointer hover:text-blue-500 gap-2 mt-1"
              onClick={() => setIsModalUpdateOpen(true)}
            >
              Phê duyệt nghiệm thu
            </Button>
          </>
        )}
      </div>
      <ModalShowDetailAcceptanceOfResearchTopic
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        acceptance={acceptance}
      />
      <ModalApprovedAcceptanceForOrganizer
        acceptance={acceptance}
        isOpen={isModalUpdateOpen}
        setIsOpen={setIsModalUpdateOpen}
      />
    </div>
  );
};
export { AcceptanceCardForOrganizer };
