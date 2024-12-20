"use client";
import { Acceptance } from "@/types/Acceptance";
import { useEffect } from "react";
import { useListAcceptanceContext } from "./ListAcceptanceContext";
import { AcceptanceCardForOrganizer } from "../AcceptanceCard/AcceptanceCardForOrganizer";

const ListAcceptanceForStatistic = () => {
  // CONTEXT
  const {
    paramsFilter,
    setParamsFilter,
    listPublicResearchTopic,
    setListPublicResearchTopic,
  } = useListAcceptanceContext();

  // RENDER UI
  return (
    <div className="px-3 py-4">
      {listPublicResearchTopic?.map((item) => {
        return <AcceptanceCardForOrganizer acceptance={item} key={item.id} />;
      })}
    </div>
  );
};
export { ListAcceptanceForStatistic };
