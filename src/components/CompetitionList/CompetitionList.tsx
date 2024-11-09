"use client";
import CompetitionCard, {
  CompetitionCardForAdmin,
  CompetitionCardForAuthor,
} from "@/components/CompetitionCard/CompetitionCard";
import {
  ParamsGetListCompetition,
  useGetListCompetition,
  useGetListCompetitionAdmin,
} from "@/hooks-query/queries/use-get-competitions";
import { CompetitionContextMenu } from "../ContextMenu/ContextMenu";
import { useEffect } from "react";
import { useCompetitionManagementContext } from "../UseContextProvider/CompetitionManagementContext";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { useGetRegistrationCompetitionDetailForAuthor } from "@/hooks-query/queries/use-get-registration-competition-detail-author";

const CompetitionList = () => {
  let params: ParamsGetListCompetition = {
    index: 1,
    pageSize: 8,
  };
  const {
    data: listCompetitions,
    refetch: refetchCompetitions,
    isPending,
  } = useGetListCompetition(params);
  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      {isPending ? <SpinnerLoading /> : ""}
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
  const {
    data: listCompetitions,
    refetch: refetchCompetitions,
    isPending,
  } = useGetListCompetitionAdmin(params);
  // const listCompetitions: Competition[] = data?.data.items;

  // REFETCH POSTS
  useEffect(() => {
    refetchCompetitions();
  }, [isChange]);

  // RENDER UI
  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      {isPending ? <SpinnerLoading /> : ""}
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
const CompetitionListForAuthor = () => {
  let params: ParamsGetListCompetition = {
    index: 1,
    pageSize: 8,
  };
  // dữ liệu list competition
  const {
    data: listCompetitions,
    refetch: refetchCompetitions,
    isPending,
  } = useGetListCompetition(params);

  // dữ liệu list registration form
  const { data, refetch } = useGetRegistrationCompetitionDetailForAuthor();

  // lọc ra list competitions sao cho competitionID có trong RegistrationForm
  const registeredCompetitions = listCompetitions?.data.items.filter(
    (competition) =>
      data?.data.some(
        (registration) => registration.competitionId === competition.id
      )
  );

  console.log(
    "=========>checking new list competitions (registeredCompetitions): ",
    registeredCompetitions
  );
  // UI
  return (
    <section className="mt-5 max-w-screen-lg mx-auto px-4 md:px-8">
      {isPending ? <SpinnerLoading /> : ""}
      <div>
        {registeredCompetitions?.map((item, index) => {
          return <CompetitionCardForAuthor competition={item} key={index} />;
        })}
      </div>
    </section>
  );
};
export { CompetitionList, CompetitionListForAdmin, CompetitionListForAuthor };
