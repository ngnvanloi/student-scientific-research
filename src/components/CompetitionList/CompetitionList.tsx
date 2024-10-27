"use client";
import CompetitionCard, {
  CompetitionCardForAdmin,
} from "@/components/CompetitionCard/CompetitionCard";
import {
  ParamsGetListCompetition,
  useGetListCompetition,
  useGetListCompetitionAdmin,
} from "@/hooks-query/queries/use-get-competitions";
import { CompetitionContextMenu } from "../ContextMenu/ContextMenu";
import { useEffect } from "react";
import { useCompetitionManagementContext } from "../UseContextProvider/CompetitionManagementContext";

const CompetitionList = () => {
  let params: ParamsGetListCompetition = {
    index: 1,
    pageSize: 8,
  };
  const { data: listCompetitions, refetch: refetchCompetitions } =
    useGetListCompetition(params);
  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          Explore The Competitions
          {listCompetitions?.data.items?.map((item, index) => {
            return <CompetitionCard competition={item} key={index} />;
          })}
        </h1>
      </div>
    </section>
  );
};
const CompetitionListForAdmin = () => {
  let params: ParamsGetListCompetition = {
    index: 1,
    pageSize: 8,
  };
  // USE PROVIDER CONTEXT
  const { isChange, setIsChange } = useCompetitionManagementContext();

  // REACT QUERY - GET POSTS
  const { data: listCompetitions, refetch: refetchCompetitions } =
    useGetListCompetitionAdmin(params);
  // const listCompetitions: Competition[] = data?.data.items;

  // REFETCH POSTS
  useEffect(() => {
    refetchCompetitions();
  }, [isChange]);

  // RENDER UI
  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          {listCompetitions?.data.items?.map((item, index) => {
            return (
              <CompetitionContextMenu competitionID={item.id}>
                <CompetitionCardForAdmin competition={item} key={index} />
              </CompetitionContextMenu>
            );
          })}
        </h1>
      </div>
    </section>
  );
};
export { CompetitionList, CompetitionListForAdmin };
