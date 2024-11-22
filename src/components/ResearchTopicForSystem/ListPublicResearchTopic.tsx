"use client";
import { Acceptance } from "@/types/Acceptance";
import { useListPubicResearchTopicContext } from "./ListPublicResearchTopicContext";
import { PublicResearchTopicCard } from "./PublicResearchTopic";
import { useEffect } from "react";

interface IProps {
  acceptedForPublicationStatus: number;
  facultyAcceptedStatus: number;
}
const ListPublicResearchTopic = (props: IProps) => {
  const { acceptedForPublicationStatus, facultyAcceptedStatus } = props;
  // USE PROVIDER CONTEXT
  const {
    paramsFilter,
    setParamsFilter,
    listPublicResearchTopic,
    setListPublicResearchTopic,
  } = useListPubicResearchTopicContext();

  // cập nhật lại params
  useEffect(() => {
    console.log(
      "paramsFilter NEW: ",
      acceptedForPublicationStatus,
      facultyAcceptedStatus
    );

    const newParamsFilter = {
      ...paramsFilter,
      acceptedForPublicationStatus,
      facultyAcceptedStatus,
    };

    // Cập nhật state hoặc context
    setParamsFilter(newParamsFilter);
  }, [acceptedForPublicationStatus, facultyAcceptedStatus]);

  // RENDER UI
  return (
    <div className="px-3 py-4">
      {listPublicResearchTopic?.map((item) => {
        return <PublicResearchTopicCard acceptance={item} key={item.id} />;
      })}
    </div>
  );
};
export { ListPublicResearchTopic };
