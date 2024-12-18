"use client";
import {
  ParamsGetListCompetition,
  useGetListCompetitionAdmin,
} from "@/hooks-query/queries/use-get-competitions";
import React from "react";
import { CompetitionCardAdminWithActionEstablishReviewCouncil } from "../CompetitionCard/CompetitionCard";

const EstablishReviewCouncilPageContainer = () => {
  let params: ParamsGetListCompetition = {
    index: 1,
    pageSize: 8,
  };
  const {
    data: listCompetitions,
    refetch: refetchCompetitions,
    isPending,
  } = useGetListCompetitionAdmin(params);
  console.log(
    ">>>>>> checking list competitions for admin: ",
    JSON.stringify(listCompetitions?.data.items, null, 2)
  );

  const filteredCompetitions = listCompetitions?.data.items.filter(
    (competition) => {
      const currentDate = new Date();
      const dateStart = new Date(competition?.dateStart);
      const dateEnd = new Date(competition?.dateEnd);
      return currentDate >= dateStart && currentDate <= dateEnd;
    }
  );

  console.log(
    "===== checking filteredCompetitions: ",
    JSON.stringify(filteredCompetitions, null, 2)
  );
  return (
    <div>
      {filteredCompetitions?.map((item, index) => {
        return (
          <div key={index}>
            <CompetitionCardAdminWithActionEstablishReviewCouncil
              competition={item}
            />
          </div>
        );
      })}
    </div>
  );
};
export { EstablishReviewCouncilPageContainer };
