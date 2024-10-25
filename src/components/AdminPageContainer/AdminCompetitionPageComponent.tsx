"use client";

import {
  ParamsGetListCompetition,
  useGetListCompetition,
} from "@/hooks-query/queries/use-get-competitions";
import { useState } from "react";
import { CompetitionManagementContext } from "../UseContextProvider/CompetitionManagementContext";
import { ModalAddNewCompetition } from "../Modal/ModalAddNewCompetition";
import { CompetitionListForAdmin } from "../CompetitionList/CompetitionList";

const AdminCompetitionPageComponent = () => {
  const [isChange, setIsChange] = useState<boolean>(false);
  return (
    <CompetitionManagementContext.Provider value={{ isChange, setIsChange }}>
      <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
        <ModalAddNewCompetition />
        <div className="max-w-lg mt-3">
          <h1 className="text-3xl text-gray-800 font-semibold">Competitions</h1>
          <p className="mt-3 text-gray-500">
            Competitions that are loved by the community. Updated every hour.
            The powerful gravity waves resulting from the impact of the planets,
            were finally resolved in 2015
          </p>
        </div>
        <CompetitionListForAdmin />
      </section>
    </CompetitionManagementContext.Provider>
  );
};

export { AdminCompetitionPageComponent };
