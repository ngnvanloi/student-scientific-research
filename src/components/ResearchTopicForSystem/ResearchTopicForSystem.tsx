"use client";

import {
  ParamsGetListAcceptanceForAllRole,
  useGetListAcceptanceForAllRole,
} from "@/hooks-query/queries/use-get-list-acceptance-for-all-role";
import { ListPubicResearchTopicContext } from "./ListPublicResearchTopicContext";
import { ListPublicResearchTopicWrapper } from "./ListPublicResearchTopicWrapper";
import { SidebarFilter } from "./SidebarFilter";
import { Acceptance } from "@/types/Acceptance";
import { useEffect, useState } from "react";
import { SearchResearchTopic } from "./SearchResearchTopic";

const ResearchTopicForSystem = () => {
  const [paramsFilter, setParamsFilter] =
    useState<ParamsGetListAcceptanceForAllRole>({
      index: 1,
      pageSize: 100,

      // optional
      idSearch: 0,
      nameTopicSearch: "",
      facultyAcceptedStatus: 0,
      acceptedForPublicationStatus: 0,
      competitionId: 0,
      facultyId: 0,
    });

  const { data: listAcceptance, refetch: refetchListAcceptance } =
    useGetListAcceptanceForAllRole(paramsFilter);

  const [listPublicResearchTopic, setListPublicResearchTopic] = useState<
    Acceptance[] | undefined
  >();
  // refetch listPublicResearchTopic khi paramsFilter thay đổi
  useEffect(() => {
    refetchListAcceptance();
  }, [paramsFilter]);

  // gán dữ liệu cho listPublicResearchTopic khi listAcceptance thay đổi
  useEffect(() => {
    if (listAcceptance) {
      setListPublicResearchTopic(listAcceptance.data.items);
    }
  }, [listAcceptance, refetchListAcceptance]);

  console.log("checking listPublicResearchTopic: ", listPublicResearchTopic);
  // UI
  return (
    <ListPubicResearchTopicContext.Provider
      value={{
        paramsFilter,
        setParamsFilter,
        listPublicResearchTopic,
        setListPublicResearchTopic,
      }}
    >
      <div className="flex gap-2 min-h-screen">
        <div className="border basis-1/4 px-2 py-3">
          <SidebarFilter />
        </div>
        <div className="border basis-3/4">
          <div className="mx-1 my-3">
            <SearchResearchTopic />
          </div>
          <ListPublicResearchTopicWrapper />
        </div>
      </div>
    </ListPubicResearchTopicContext.Provider>
  );
};
export { ResearchTopicForSystem };
