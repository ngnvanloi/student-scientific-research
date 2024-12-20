"use client";
import { Acceptance } from "@/types/Acceptance";
import { SidebarFilter } from "./SidebarFilter";
import { useEffect, useState } from "react";
import {
  ParamsGetListAcceptanceForAllRole,
  useGetListAcceptanceForAllRole,
} from "@/hooks-query/queries/use-get-list-acceptance-for-all-role";
import { ListAcceptanceContext } from "./ListAcceptanceContext";
import { SearchAcceptance } from "./SearchAcceptance";
import { ListAcceptanceForStatistic } from "./ListAcceptanceForStatistic";
import { useSession } from "next-auth/react";

const AcceptanceStatistic = () => {
  const { data: session } = useSession();
  console.log("checking facultyID: ", session?.user?.facultyId);
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
      facultyId: session?.user?.facultyId || 0,
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
    <ListAcceptanceContext.Provider
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
            <SearchAcceptance />
          </div>
          <ListAcceptanceForStatistic />
        </div>
      </div>
    </ListAcceptanceContext.Provider>
  );
};
export { AcceptanceStatistic };
