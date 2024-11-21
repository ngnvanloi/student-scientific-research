import { useQueries } from "@tanstack/react-query";
import {
  GetStatisticForOrganizer,
  ParamsGetStatisticForOrganizer,
  useGetStatisticForOrganizer,
} from "./use-get-statistic-for-organizer";
import { queryKeys } from "./query-keys";

export type ParamsGetStatisticForOrganizerForMultiCompetition = {
  competitionIds: number[];
  year: number;
  disciplineId: number;
};
export const useGetStatisticsForMultipleCompetitions = (
  data: ParamsGetStatisticForOrganizerForMultiCompetition
) => {
  // Tạo mảng các tham số cho mỗi CompetitionId
  const queryParams = data.competitionIds.map((competitionId) => ({
    CompetitionId: competitionId,
    Year: data.year,
    DisciplineId: data.disciplineId,
  }));

  // Sử dụng useQueries để thực hiện nhiều request song song
  const results = useQueries({
    queries: queryParams.map((params) => ({
      queryKey: [
        "statisticForOrganizer",
        params.CompetitionId,
        params.Year,
        params.DisciplineId,
      ],
      queryFn: () => GetStatisticForOrganizer(params),
    })),
  });

  return results;
};
