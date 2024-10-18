"use client";
import CompetitionCard from "@/components/CompetitionCard/CompetitionCard";
import { useGetCompetitions } from "@/hooks-query/queries/use-get-competitions";

const CompetitionList = () => {
  const { data: listCompetitions, refetch: refetchCompetitions } =
    useGetCompetitions();
  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          Explore The Jobs
          {listCompetitions?.map((item, index) => {
            return <CompetitionCard competition={item} key={index} />;
          })}
        </h1>
      </div>
    </section>
  );
};
export { CompetitionList };
